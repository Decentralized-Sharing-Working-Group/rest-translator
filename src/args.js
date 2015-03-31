var yargv = require('yargs');

module.exports.checkArgs = function(requiredArgs) {
  var argv = yargv.argv, problem = false;
  if (!Array.isArray(requiredArgs)) {
    if (argv.operation) {
      requiredArgs = requiredArgs[argv.operation];
    } else {
      console.log('Please specify a --' + option + ' option!');
      problem = true;
    }
  }

  requiredArgs.forEach(function(option) {
    if (!argv[option]) {
      console.log('Please specify a --' + option + ' option!');
      problem = true;
    }
  });
  if (!problem) {
    return argv;
  }
};
