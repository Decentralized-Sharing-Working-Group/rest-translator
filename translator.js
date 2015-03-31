
var https = require('https'),
    http = require('http'),
    fs = require('fs'),
    sslRootCAs = require('ssl-root-cas/latest'),
    checkArgs = require('./src/args').checkArgs;
    translator = require('./src/translator');

function run() {
  var argv = checkArgs(['server-type-front', 'server-type-back', 'host-back', 'port-back', 'base-path-back', 'port-front']);
  sslRootCAs.inject().addFile('./ca.pem');


  if (argv) {
    var backRequestLib = ( argv.tlsConf === 'http' ? http : https);
    var handler = translator.makeHandler(argv, translator.makeSend(backRequestLib));
    if (fs.existsSync('./server.pfx')) {
      https.createServer({ pfx: fs.readFileSync('./server.pfx') }, handler).listen(argv['port-front']);
      console.log('There is now a ' + argv['server-type-front']
          + ' to ' + argv['server-type-back'] + ' translator on https://<domain.com>:' + argv['port-front']);
    } else {
      http.createServer(handler).listen(argv['port-front']);
      console.log('There is now a ' + argv['server-type-front']
          + ' to ' + argv['server-type-back'] + ' translator on http://localhost:' + argv['port-front']);
      if (argv['server-type-front'] === 'remotestorage' && argv['server-type-back'] !== 'remotestorage') {
        console.log('Please use \'Bearer \' + base64(\'backendusername:backendpassword\') as the \'Authorization\' header in your http request.');
      } else if (argv['server-type-front'] !== 'remotestorage' && argv['server-type-back'] === 'remotestorage') {
        console.log('Please use "guest" as the username and use your access token as the password');
      } else {
        console.log('Please use the same token as for the server behind this translator.');
      }
    }
  }
  console.log('Option --tls-conf-back is optional');
}

//...
run();
