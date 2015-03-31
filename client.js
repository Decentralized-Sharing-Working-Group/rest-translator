var translator = require('./src/translator'),
    checkArgs = require('./src/args').checkArgs,
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    sslRootCAs = require('ssl-root-cas/latest'),
    requiredArgsPerOperation = {
      create: ['in', 'content-type', 'remote-file-name', 'server-type', 'host', 'port', 'base-path', 'token'],
      read: ['out', 'remote-file-name', 'server-type', 'host', 'port', 'base-path', 'token'],
      update: ['in', 'content-type', 'remote-file-name', 'server-type', 'host', 'port', 'base-path', 'existing-etag', 'token'],
      'delete': ['remote-file-name', 'server-type', 'host', 'port', 'base-path', 'existing-etag', 'token']
    };

function run() {
  sslRootCAs.inject().addFile('./ca.pem');
  var argv = checkArgs(requiredArgsPerOperation);
  if (argv) {
    var stream;
    if (argv['in']) {
      stream = fs.createReadStream(argv['in']);
    } else if (argv.out) {
      stream = fs.createWriteStream(argv.out);
    }
    var send = translator.makeSend( argv.tlsConf === 'http' ? http : https );
    send(argv.operation, argv.host, argv.port, argv.basePath, argv.token,
        argv.remoteFileName, argv.contentType, stream, argv.serverType, argv.existingEtag, argv.tlsConf, function (err, data) {
      console.log(err, data);
    });
  }
}

//...
run();
