var assert = require('chai').assert;
var request = require('supertest');

var translator = require("../src/translator");

describe('the handler function returned by translator.makeHandler', function(){
  it('should handle a simple request', function(done){
    var argv = {
    };
    var stub = {
      request: function (options) {
        return {
          send: function() {}
        }
      }
    };
    var handler = translator.makeHandler(argv, stub);
    handler({
      url: '/',
      headers: {
        authorization: 'Bearer 123'
      },
      pipe: function() {}
    }, {
    });
    done();
  });
});
