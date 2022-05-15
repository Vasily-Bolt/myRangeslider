// const jsdomJquery = require('jquery-jsdom');
// let $ = jsdomJquery;

// /*
//   Нужно обойтись без изменения глобальной переменной
// */
// declare global {
//   module NodeJS {
//     interface Global {
//       $: any;
//     }
//   }
// }
// global.$ = $;

import {Model} from '../jquery.boltunovRangeslider/classes/model';

let modelVerticalOptions = {
  pointers: [{
    endValue: 522,
  },{
    endValue: 122,
  },{
    endValue: 25,
  },{
    endValue: 451,
  },{
    endValue: 400,
  },
  ],
  sliderDirection: 'vertical' as const,
  rangesliderType: 'range' as const,
  minValue: 100,
  maxValue: 500,
  step : 5,
  signification: '%',
};

const models: Array<object> = [
  new Model(),
  new Model (modelVerticalOptions),
]

module.exports = models;

//!!! КАК С ЭТИМ РАЗБЕРЕШЬСЯ - ДОБАВЬ STRICT В TSCONFIG