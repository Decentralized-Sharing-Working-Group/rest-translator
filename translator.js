var translator = require('./lib/translator'),
    https = require('https'),
    http = require('http'),
    fs = require('fs'),
    sslRootCAs = require('ssl-root-cas/latest'),
    checkArgs = require('./lib/args').checkArgs;

function checkCredentials(authHeader, serverType, correct) {
  var prefixLength;
  if (serverType === 'remotestorage') {
    prefixLength = 'Bearer '.length;
  } else {
    prefixLength = 'Basic '.length;
  }
  return (authHeader.substring(prefixLength) === correct);
}

function determineFilename(urlPath, serverType) {
  var withoutSlash = urlPath.substring('/');
  if (serverType === 'cozy') {
    return withoutSlash.substring(0, withoutSlash.length - '/raw'.length);
  } else {
    return withoutSlash;
  }
}

function run() {
  var argv = checkArgs(['server-type-front', 'server-type-back', 'host-back', 'port-back', 'base-path-back', 'port-front',
                 'credentials-back', 'credentials-front']);
  sslRootCAs.inject().addFile('./ca.pem');

  function handler(req, res) {
    console.log(req.headers);
    if (checkCredentials(req.headers.authorization, argv['server-type-front'], argv['credentials-front'])) {
      translator.send(argv['host-back'], argv['port-back'], argv['base-path-back'], argv['credentials-back'],
          determineFilename(req.url, argv['server-type-front']), req.headers['content-type'], req,
          argv['server-type-back'], false, function (err, data) {
        if (err) {
          res.writeHead(500);
          res.end(err.toString());
        } else {
          res.writeHead(data.statusCode, data.responseHeaders);
          res.end(data.responseBody);
        }
      });
    } else {
      res.writeHead(401);
      res.end('please match the translator\'s --credentials-front argument in your Authorization header');
    }
  }

  if (argv) {
    if (fs.existsSync('./server.pfx')) {
      https.createServer({ pfx: fs.readFileSync('./server.pfx') }, handler).listen(argv['port-front']);
      console.log('There is now a ' + argv['server-type-front'] + ' to ' + argv['server-type-back'] + ' translator on https://<domain.com>:' + argv['port-front']);
    } else {
      http.createServer(handler).listen(argv['port-front']);
      console.log('There is now a ' + argv['server-type-front'] + ' to ' + argv['server-type-back'] + ' translator on http://localhost:' + argv['port-front']);
    }
  }
}

//...
run();
