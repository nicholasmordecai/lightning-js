"use strict";
const jsdom = require('jsdom').jsdom;
const expect = require('chai').expect
const sinon = require('sinon');
var document = jsdom("hello world");
var window = document.defaultView;


describe('mocha tests', function () {
 
  var PIXI
  jsdom({skipWindowCheck: true})
 
  before(function () {
    PIXI = require('pixi.js')
  })
 
  it('works', function () {

  })
 
});