var checkArgs = require('./src/args').checkArgs;

function run() {
  var argv = checkArgs(['username', 'password']);
  if (argv) {
    console.log(new Buffer(argv.username + ':' + argv.password).toString('base64'));
  }
}

//...
run();
