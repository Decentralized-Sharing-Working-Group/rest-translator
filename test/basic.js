var assert = require('chai').assert;
var request = require('supertest');

var translator = require("../src/translator");

describe('translator class', function(){
  it('should have a send method', function(done){
    assert.typeOf(translator.makeSend, 'function');
    done();
  });
  it('should have a makeHandler method', function(done){
    assert.typeOf(translator.makeHandler, 'function');
    done();
  });
});
