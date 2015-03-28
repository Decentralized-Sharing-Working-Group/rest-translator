var translator = require('./src/translator'),
    checkArgs = require('./src/args').checkArgs,
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    sslRootCAs = require('ssl-root-cas/latest'),
    requiredArgs = ['in', 'content-type', 'remote-file-name', 'server-type', 'host', 'port', 'base-path', 'token'];

function run() {
  sslRootCAs.inject().addFile('./ca.pem');
  var argv = checkArgs(requiredArgs);
  if (argv) {
    var stream = fs.createReadStream(argv['in']);
    var send = translator.makeSend( tlsConf === 'http' ? http : https );
    send(argv.host, argv.port, argv.basePath, argv.token,
        argv.remoteFileName, argv.contentType, stream, argv.serverType, argv.tlsConf, function (err, data) {
      console.log(err, data);
    });
  }
}

//...
run();
