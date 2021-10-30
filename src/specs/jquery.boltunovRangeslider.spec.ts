let exp = require('chai').expect;
let path = require('path');
let object = require(`../jquery.boltunovRangeslider/functions.ts`);

console.log(object);

describe('Testing Functions.TS', () => {

	it('"object" should be Object', () => {
		exp(object).to.be.a('object');
	});

	describe('Testing object method', () => {
		it('Method with props "3" and "2" should return "5"', () => {
			exp(object.method(3,2)).to.equal(5);
		});
	});

});