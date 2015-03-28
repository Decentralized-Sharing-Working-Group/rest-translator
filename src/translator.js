function makeSend(requestLib) {
  return function(backendHost, backendPort, backendPath, token, filename, contentType, stream, formatOut, tlsConf, callback) {
    console.log('send', backendHost, backendPort, backendPath, token, filename, contentType, stream, formatOut, tlsConf, callback);
    var options = {
      hostname: backendHost,
      port: backendPort,
      method: 'PUT',
      path: backendPath
          + filename
          + (formatOut === 'cozy' ? '/raw' : ''),
      headers: {
        'If-None-Match': '*',
        'Content-Type': contentType,
        Authorization: (formatOut === 'remotestorage' ? 'Bearer ' : 'Basic ') + token
      }
    };
    if (tlsConf === 'allow-self-signed') {
      options.rejectUnauthorized = false;
    }
    
    console.log('sending request', options, tlsConf);
    var req = requestLib.request(options, function(res) {
      var ret = {
        statusCode: res.statusCode,
        responseHeaders: res.headers,
        responseBody: ''
      };
  
      res.on('data', function(chunk) {
        ret.responseBody += chunk.toString('utf-8');
      });
  
      res.on('error', function(err) {
        callback(err);
      });
  
      res.on('end', function() {
        callback(null, ret);
      });
    });
    stream.pipe(req);
  };
}

function translateAuthHeader(serverTypeFront, serverTypeBack, valueFront) {
  //console.log('translateAuthHeader', serverTypeFront, serverTypeBack, valueFront);
  var usrpwd;
  if (serverTypeFront === 'remotestorage') {
    return valueFront.substring('Bearer '.length);
  } else if (serverTypeBack === 'remotestorage') {
    usrpwd = new Buffer(valueFront.substring('Basic '.length), 'base64').toString('ascii');
    colonPos = usrpwd.indexOf(':');
    if (usrpwd.substring(0, colonPos) === 'guest') {
      console.log('WARNING! username is not "guest"');
    }
    return usrpwd.substring(colonPos+1);
  } else {
    return valueFront.substring('Basic '.length);
  }
}

function determineFilename(urlPath, serverType) {
  console.log('determineFilename', urlPath, serverType);
  var withoutSlash = urlPath.substring(1);
  if (serverType === 'cozy') {
    return withoutSlash.substring(0, withoutSlash.length - '/raw'.length);
  } else {
    return withoutSlash;
  }
}

function makeHandler(argv, requestLib) {
  var send = makeSend(requestLib);
  return function(req, res) {
    console.log(req.headers);
    send(argv.hostBack, argv.portBack,
        argv.basePathBack, translateAuthHeader(argv.serverTypeFront, argv.serverTypeBack, req.headers.authorization),
        determineFilename(req.url, argv.serverTypeFront),
        req.headers['content-type'], req,
        argv.serverTypeBack, argv.tlsConfBack, function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end(err.toString());
      } else {
        res.writeHead(data.statusCode, data.responseHeaders);
        res.end(data.responseBody);
      }
    });
  };
}
module.exports.makeSend = makeSend;
module.exports.makeHandler = makeHandler;
