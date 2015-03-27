var http = require('http'),
    https = require('https'),
    fs = require('fs');

function send(backendHost, backendPort, backendPath, credentials, filename, contentType, stream, formatOut, tlsConf, callback) {
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
      Authorization: (formatOut === 'remotestorage' ? 'Bearer ' : 'Basic ') + credentials
    }
  };
  if (tlsConf === 'allow-self-signed') {
    rejectUnauthorized = false;
  }
  
  console.log('sending request', options, tlsConf);
  var req = (tlsConf === 'http' ? http : https).request(options, function(res) {
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
}

module.exports.send = send;
