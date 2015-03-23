var assert = require('chai').assert;
var request = require('supertest');

var translator = require("../lib/translator");

describe('translator class', function(){
  it('should have a send method', function(done){
    assert.typeOf(translator.send, 'function');
    done();
  });
});
