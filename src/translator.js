var fs = require('fs'),
    https = require('https'),
    formidable = require('formidable'),
    request_new = require('request');

function makeSend(requestLib) {
  return function(operation, backendHost, backendPort, backendPath, token, filename, contentType,
      stream, formatOut, existingETag, tlsConf, callback) {
    console.log('send', operation, backendHost, backendPort, backendPath, token, filename, contentType,
         stream, formatOut, existingETag, tlsConf, callback);
    if (formatOut === 'cozy') {
      var formData = {
        name: filename,
        path:'',
        file: stream
      };
      var req = request_new.defaults({jar: true});
      console.log('logging in...');
      var remoteClient = req.post({url: "https://paulsharing2.cozycloud.cc/login", qs: {username: "owner", password: "sharing2"}}, function(err, res, body) {
        console.log('logged in', err, body);
        if(err) {
          return console.error(err);
        } else {
          console.log('posting...');
          req.post({url: "https://paulsharing2.cozycloud.cc/apps/files/files", formData: formData}, function(err, res, body) {
            console.log('posted', err, body);
            if (err) {
              callback(err);
            } else {
              console.log("code : " + res.statusCode);
              console.log("body : " + JSON.stringify(body));
              callback(null, 'file was saved to your Cozy');
            }
          });
        }
      });
      return;
    }
    var verb = {
      create: 'PUT',
      read: 'GET',
      update: 'PUT',
      'delete': 'DELETE'
    };
    var streamDirection = {
      create: 'in',
      read: 'out',
      update: 'in'
    };
    var options = {
      hostname: backendHost,
      port: backendPort,
      method: verb[operation],
      path: backendPath
          + filename
          + (formatOut === 'couchdb' ? '/raw' : ''),
      headers: {
        'Content-Type': contentType,
        Authorization: (formatOut === 'remotestorage' ? 'Bearer ' : 'Basic ') + token
      }
    };
    if (existingETag) {
      options.headers['If-Match'] = '"' + existingETag + '"';
    } else if (operation==='create') {
      options.headers['If-None-Match'] = '*';
    }
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
  
      if (streamDirection[operation] === 'out') {
        res.pipe(stream);
        ret.responseBody = '(streamed)';
      } else {
        res.on('data', function(chunk) {
          ret.responseBody += chunk.toString('utf-8');
        });
      }
  
      res.on('error', function(err) {
        callback(err);
      });
  
      res.on('end', function() {
        callback(null, ret);
      });
    });

    if (streamDirection[operation] === 'in') {
      stream.pipe(req);
    } else {
      req.end();
    }
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

function determineOperation(req) {
  if (req.verb === 'GET') {
    return 'read';
  } else if (req.verb === 'DELETE') {
    return 'delete';
  } else if (determineExistingETag(req)) {
    return 'update';
  } else {
    return 'create';
  }
}

function determineExistingETag(req) {
  return req.headers['If-Match'];
}

function serveOwnCloudStatus(res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end('{"installed":true,"maintenance":false,"version":"8.0.0.7","versionstring":"8.0","edition":""}');
}

function displayReceiveDialog(res) {
  fs.createReadStream('./receiveDialog.html').pipe(res);
}  
function fetch(serverTypeFront, shareParams, callback) {
  var fetchOptions, remoteStringParts, req;
  console.log('getFetchOptions', serverTypeFront, shareParams);
  if (serverTypeFront === 'owncloud') {
    remoteStringParts = shareParams.remote.substring('https://'.length).split(':');
    fetchOptions = {
      hostname: remoteStringParts[0],
      port: (remoteStringParts.length > 1 ? Number(remoteStringParts[1]) : 443),
      method: 'GET',
      path: '/index.php/s/' + shareParams.token + '/download'
    };
  } else {
    console.log('do not know how to receive a share from a ' + serverTypeFront + ' server.');
    return;
  }
  req = https.request(fetchOptions, callback);
  req.end();
}

function makeToken(serverTypeBack, usernameBack, passwordBack) {
  if (serverTypeBack === 'remotestorage') {
    return passwordBack;
  } else {
    return new Buffer(usernameBack + ':' + passwordBack).toString('base64');
  }
}

function makeAuthHeader(serverTypeBack, usernameBack, passwordBack) {
  if (serverTypeBack === 'remotestorage') {
    return 'Bearer ' + passwordBack;
  } else {
    return 'Basic ' + new Buffer(usernameBack + ':' + passwordBack).toString('base64');
  }
}
function fetchAndDeliver(argv, send, fields, callback) {
  console.log('fetchAndDeliver', fields);
  fetch(argv.serverTypeFront, { token: fields.token, remote: fields.remote }, function(res) {
    var tokenBack = makeToken(argv.serverTypeBack, fields.username, fields.password);
    send('create', argv.hostBack, argv.portBack, argv.basePathBack, tokenBack, fields.token /*used as the filename here*/,
        res.headers['content-type'], res /*used as a stream here*/,
        argv.serverTypeBack, undefined, undefined, function(err, data) {
      console.log('back in fetchAndDeliver', err, data, typeof callback);
      callback(err, fields.token /*used as the filename here*/);
    });
  });
}
function receiveFormPost(req, res, callback) {
  form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.writeHead(500);
      res.end(err);
    } else {
      callback(fields);
    }
  });
}
function determineRedirectUrl(argv, filename) {
  if (argv.serverTypeBack === 'remotestorage') {
    return 'https://' + argv.hostBack + ':' + argv.portBack + argv.basePathBack + '/public/shares/' + filename;
  } else {
    return 'https://paulsharing2.cozycloud.cc/#apps/files/';
  }
}

function makeHandler(argv, send) {
  return function(req, res) {
    console.log('req.url', req.url);
    if (req.url === '/status.php' && argv.serverTypeFront === 'owncloud') {
      serveOwnCloudStatus(res);
    } else if (req.url === '/index.php/apps/files' && argv.serverTypeFront === 'owncloud') {
      if (req.method === 'GET') {
        displayReceiveDialog(res);
      } else {
        receiveFormPost(req, res, function(fields) {
          fetchAndDeliver(argv, send, fields, function(err, filename) {
            console.log('back in handler', err, filename);
            if (err) {
              res.writeHead(500);
              res.end(err);
            } else {
              res.writeHead(301, {
                Location: determineRedirectUrl(argv, filename)
              });
              res.end('Saved.');
            }
          });
        });
      }
    } else {
      console.log(req.headers);
      send(determineOperation(req), argv.hostBack, argv.portBack,
          argv.basePathBack, translateAuthHeader(argv.serverTypeFront, argv.serverTypeBack, req.headers.authorization),
          determineFilename(req.url, argv.serverTypeFront),
          req.headers['content-type'], req,
          argv.serverTypeBack,
          determineExistingETag(req),
          argv.tlsConfBack, function (err, data) {
        if (err) {
          res.writeHead(500);
          res.end(err.toString());
        } else {
          res.writeHead(data.statusCode, data.responseHeaders);
          res.end(data.responseBody);
        }
      });
    }
  };
}

module.exports.makeSend = makeSend;
module.exports.makeHandler = makeHandler;
