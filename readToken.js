var checkArgs = require('./src/args').checkArgs;

function run() {
  var argv = checkArgs(['hash']), usrpwd, colonPos;
  if (argv) {
    usrpwd = new Buffer(argv.hash, 'base64').toString('ascii');
    colonPos = usrpwd.indexOf(':');
    console.log('username is \"' + usrpwd.substring(0, colonPos) + '".');
    console.log('password is \"' + usrpwd.substring(colonPos + 1) + '".');
  }
}

//...
run();
