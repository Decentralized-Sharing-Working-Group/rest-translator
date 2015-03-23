var yargv = require('yargs');

module.exports.checkArgs = function(requiredArgs) {
  var argv = yargv.argv, problem = false;
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
