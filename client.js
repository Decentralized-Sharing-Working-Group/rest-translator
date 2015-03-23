var translator = require('./lib/translator'),
    checkArgs = require('./lib/args').checkArgs,
    fs = require('fs'),
    sslRootCAs = require('ssl-root-cas/latest'),
    requiredArgs = ['in', 'content-type', 'remote-file-name', 'server-type', 'host', 'port', 'base-path', 'credentials'];

function run() {
  sslRootCAs.inject().addFile('./ca.pem');
  var argv = checkArgs(requiredArgs);
  if (argv) {
    var stream = fs.createReadStream(argv['in']);
    translator.send(argv.host, argv.port, argv.basePath, argv.credentials,
        argv.remoteFileName, argv.contentType, stream, argv.serverType, function (err, data) {
      console.log(err, data);
    });
  }
}

//...
run();
