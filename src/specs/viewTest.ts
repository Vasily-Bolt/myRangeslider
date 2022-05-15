import {View} from '../jquery.boltunovRangeslider/classes/view';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jsdomJquery = require('jquery-jsdom');
let $ = jsdomJquery;
const dom = (`
<p id='-direction'>
            <label class="switch">
              <input type="checkbox" checked>
              <span class="slider"></span>
            </label>
            Vertical/Horizontal
          </p>
          <p id='-MIN'>
            <label class="input">
              <input type="text" value="">
            </label>
            Min
          </p>
          <p id='-MAX'>
            <label class="input">
              <input type="text" value="">
            </label>
            Min
          </p>
`);
/*
  Нужно обойтись без изменения глобальной переменной
*/
declare global {
  module NodeJS {
    interface Global {
      $: any;
    }
  }
}
global.$ = $;
const view = new View($(dom).children('#rangeslider'));

module.exports.view = view;
module.exports.dom = dom;