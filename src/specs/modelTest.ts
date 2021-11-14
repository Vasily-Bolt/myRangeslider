const jsdomJquery = require('jquery-jsdom');
let $ = jsdomJquery;
global.$ = $;

import Model from '../jquery.boltunovRangeslider/classes/model';

let modelOptions = {
  pointers: [{
    endValue: 62,
  },{
    endValue: 22,
  },
  ],
  sliderDirection: 'horizontal' as const,
  rangesliderType: 'single' as const,
  minValue: 0,
  maxValue: 100,
  step : 5,
  signification: '%',
};
const model = new Model;
module.exports = model;

//!!! КАК С ЭТИМ РАЗБЕРЕШЬСЯ - ДОБАВЬ STRICT В TSCONFIG