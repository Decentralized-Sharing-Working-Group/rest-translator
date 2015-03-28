var assert = require('chai').assert;
var request = require('supertest');

var translator = require("../src/translator");

describe('the send function returned by translator.makeSend', function(){
  it('should send a simple request', function(done){
    var stub = {
      request: function (options) {
        return {
          send: function() {}
        }
      }
    };
    var send = translator.makeSend(stub);
    send('backendHost', 12345, 'backendPath', 'token', 'filename', 'contentType', {
      pipe: function() {}
    }, 'formatOut', undefined, function(err, data) {
      console.log(err, data);
    });
    done();
  });
});
