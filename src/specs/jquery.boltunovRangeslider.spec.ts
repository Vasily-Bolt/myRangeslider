const view = require('./viewTest').View;
const dom = require('./viewTest').dom;
const models = require('./modelTest');
const chaiExpect = require('chai').expect;

console.log( $(dom).children('p').text() );

describe('Testing View', ()=>{

});

// describe('Testing Model', ()=>{
//   models.forEach(element => {
//     /**
//      * Проверки правильности установки стилей в зависимости от направления движения слайдера
//      */
//     describe('_sliderPointerDirection.sliderStartIndent should correspond sliderDirection.', ()=>{
//       const sliderDirectionDependency: object = {
//         horizontal : {
//           start: 'left',
//           centering: null,
//         },
//         vertical : {
//           start: 'top',
//           centering: 'left',
//         },
//       }
//       const sliderDirection = element.getOptions().sliderDirection;
//       const pointersDirection = element.rangesliderStateOptions._sliderPointerDirection;
//       it(`Now direction is "${sliderDirection}", so sliderStartIndent should be "${sliderDirectionDependency[sliderDirection].start}"`, ()=>{
//         chaiExpect(pointersDirection.sliderStartIndent).to.equal(sliderDirectionDependency[sliderDirection].start);
//       });
//     });

//     /**
//      * Проверка округления данных параметров с учетом шага
//      */
//     describe('Checking pointer value to depend on step size', ()=>{
//       const rangeSlider = element.getOptions();
//       describe(`Checking rangeslider with info: Min-${rangeSlider.minValue}, Max-${rangeSlider.maxValue}, step-${rangeSlider.step}; 
//       it has ${rangeSlider.pointers.length} pointers(ranges)`, ()=>{
//         rangeSlider.pointers.forEach(element => {
//           it(`Ending value is ${element.endValue} and must divide by 0 without remain`, ()=>{
//             chaiExpect(element.endValue%rangeSlider.step).to.equal(0);
//           })
//         });
//       });
//     });

//     /**
//      * Проверка значения, чтобы не выходило за пределы min/max
//      */
//     describe('Check values to be in min/max interval', ()=>{
//       const rangeSlider = element.getOptions();
//       rangeSlider.pointers.forEach(element => {
//         it(`${element.endValue} is between ${rangeSlider.minValue} and ${rangeSlider.maxValue}`, ()=>{
//           chaiExpect(element.endValue).to.satisfy(()=> element.endValue >= rangeSlider.minValue && element.endValue <=
//            rangeSlider.maxValue)
//         });
//       });
//     });

//     /**
//      * Получить количество pointers и проверить их значения через метод getPointers 
//      */
//      describe('Check function that get pointers array (qty, values, margin)', ()=>{
//       const rangeSlider = element.getOptions();
//       it(`Pointers quantity must be equal ${rangeSlider.pointers.length}`, ()=>{
//         chaiExpect(element.getPointers().length).to.equal(rangeSlider.pointers.length);
//       });
//       rangeSlider.pointers.forEach((elem, index) => {
//         it(`Pointer ${index} is equal ${elem.endValue}`, ()=>{
//           chaiExpect(element.getPointers()[index].endValue).to.equal(elem.endValue);
//         });
//       });
//     });

//     /**
//      * Если тип указан range, то количество указателей должно быть четным
//      */
//     describe('If rangesliderType is RANGE, then pointers quantity must be even', ()=>{
//       const rangeSlider = element.getOptions();
//       it(`Pointers quantity is ${rangeSlider.pointers.length} and must be even for RANGE type`, ()=>{
//         chaiExpect(rangeSlider.pointers.length%2).to.equal(0);
//       });
//     });

//   });
  
//     /**
//      * Проверка правильности конвертации значения указателя в процент смещения относительно
//      * начала области слайдера
//      */
//      describe('Checking value to percent margin convertation', ()=>{
//       it('min=0, max=100, val=20, margin in % should be 20', ()=>{
//       chaiExpect(models[0].valueToMargin(20,0,100)).to.equal(20);
//       });
//       it('min=0, max=500, val=250, margin in % should be 50', ()=>{
//       chaiExpect(models[0].valueToMargin(250,0,500)).to.equal(50);
//       });
//       it('min=100, max=300, val=150, margin in % should be 25', ()=>{
//         chaiExpect(models[0].valueToMargin(150,100,300)).to.equal(25);
//       });
//       it('min=200, max=300, val=200, margin in % should be 0', ()=>{
//         chaiExpect(models[0].valueToMargin(200,200,300)).to.equal(0);
//       });
//       it('min=100, max=250, val=250, margin in % should be 100', ()=>{
//         chaiExpect(models[0].valueToMargin(250,100,250)).to.equal(100);
//       });
//       it('min=-100, max=250, val=250, margin in % should be 100', ()=>{
//         chaiExpect(models[0].valueToMargin(250,-100,250)).to.equal(100);
//       });
//       it('min=-500, max=-50, val=-500, margin in % should be 0', ()=>{
//         chaiExpect(models[0].valueToMargin(-500,-500,-50)).to.equal(0);
//       });
//       it('min=-500, max=-50, val=-50, margin in % should be 100', ()=>{
//         chaiExpect(models[0].valueToMargin(-50,-500,-50)).to.equal(100);
//       });
//       it('min=-550, max=-50, val=-175, margin in % should be 75', ()=>{
//         chaiExpect(models[0].valueToMargin(-175,-550,-50)).to.equal(75);
//       });

//     });

// })