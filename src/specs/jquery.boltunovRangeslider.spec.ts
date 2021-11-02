const chaiExpect = require('chai').expect;
const someModule = require('../jquery.boltunovRangeslider/functions.ts');

// const jsdom = require('mocha-jsdom');
const jsdomJquery = require('jquery-jsdom');
const $dom = jsdomJquery("<html><body><p>DOM</p></body></html>").html(); // "DOM"
let $ = jsdomJquery;
global.$ = $;


console.log($dom);

describe('someModule', function() {
  it('does stuff', function() {
    someModule.doStuff();
    // $('div.some-module').length.should.equal(1);
  });
});