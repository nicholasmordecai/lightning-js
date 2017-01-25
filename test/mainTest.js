"use strict";
var fs = require('fs');
var assert = require('assert');

describe('index', function () {
    var subject;

    beforeEach(function () {
        //subject = new index["default"]();
    });

    describe('#testWorking', function() {
        it('should check if 1 equals 1', function(done) {
            assert.equal(1, 1, 'expected: ' + 1 + ', result: ' + 1);
            done();
        });
    });
    
});