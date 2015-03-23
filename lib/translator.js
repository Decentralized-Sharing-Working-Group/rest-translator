var https = require('https'),
    fs = require('fs');

function parse(req, formatIn, callback) {
  var filename = (formatIn === 'cozy' ? req.url.substr(-4) : req.url);
  callback(null, {
    authorizationHeader: req.headers.Authorization,
    filename: filename
  });
}

function send(backendHost, backendPort, backendPath, authorizationHeader, filename, contentType, stream, formatOut, callback) {
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
      Authorization: authorizationHeader
    }
  };
console.log(options);
  var req = https.request(options, function(res) {
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

  req.on('error', function(e) {
    console.error(e);
  });
  req.on('end', function() {
    callback(null, {
      status: 201,
      headers: {},
      body: ''
    });
  });
}

module.exports.send = send;
module.exports.parse = parse;
module.exports.server = function(cert, formatIn, formatOut, backendPort) {
  https.createServer(cert, function(req, res) {
    parse(req, formatIn, function(err, metadata, stream) {
      send(backendHost, backendPort, metadata.authorizationHeader, metadata.filename, stream, formatOut, function (err, result) {
        if (err) {
          res.writeHead(500);
          res.end(err.toString());
        } else {
          res.writeHead(result.code, result.headers);
          res.end(result.body);
        }
      });
    });
  });
};
