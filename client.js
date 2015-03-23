var translator = require('./lib/translator'),
    yargv = require('yargs'),
    fs = require('fs'),
    requiredArgs = ['in', 'content-type', 'remote-file-name', 'server-type', 'host', 'port', 'base-path'];

function checkArgs() {
  var argv = yargv.argv, problem = false;
  requiredArgs.forEach(function(option) {
    if (!argv[option]) {
      console.log('Please specify a --' + option + ' option!');
      problem = true;
    }
  });
  if (argv.serverType === 'remotestorage') {
    if (!argv['my-token']) {
      console.log('Request to remoteStorage server requires --my-token');
      problem = true;
    }
  } else if (argv.serverType === 'cozy' || argv.serverType === 'swell' || argv.serverType === 'owncloud') {
    if (!argv['my-username']) {
      console.log('Request to remoteStorage server requires --my-password');
      problem = true;
    }
    if (!argv['my-password']) {
      console.log('Request to remoteStorage server requires --my-password');
      problem = true;
    }
  } else if (argv.serverType) {
    console.log('Server type not supported', argv.serverType);
    problem = true;
  }
  if (!problem) {
    return argv;
  }
}

function getAuthorizationHeader(argv) {
  if (argv.serverType === 'remotestorage') {
    return 'Bearer ' + argv.myToken;
  } else {
    return 'Basic ' + new Buffer(argv.myUsername + ':' + argv.myPassword).toString('base64');
  }
}

function run() {
  var argv = checkArgs();
  if (argv) {
    var stream = fs.createReadStream(argv['in']);
    translator.send(argv.host, argv.port, argv.basePath, getAuthorizationHeader(argv),
        argv.remoteFileName, argv.contentType, stream, argv.serverType, function (err, data) {
      console.log(err, data);
    });
  }
}

//...
run();
