const models = require('./modelTest');
const chaiExpect = require('chai').expect;

console.log( $("<a>DOM</a>").html() ); // "DOM"



describe('Testing Model', ()=>{
  models.forEach(element => {
    /**
     * Проверки правильности установки стилей в зависимости от направления движения слайдера
     */
    describe('_sliderPointerDirection.sliderStartIndent should correspond sliderDirection.', ()=>{
      const sliderDirectionDependency: object = {
        horizontal : {
          start: 'left',
          centering: null,
        },
        vertical : {
          start: 'top',
          centering: 'left',
        },
      }
      const sliderDirection = element.getOptions().sliderDirection;
      const pointersDirection = element.rangesliderStateOptions._sliderPointerDirection;
      it(`Now direction is "${sliderDirection}", so sliderStartIndent should be "${sliderDirectionDependency[sliderDirection].start}"`, ()=>{
        chaiExpect(pointersDirection.sliderStartIndent).to.equal(sliderDirectionDependency[sliderDirection].start);
      });
    });

    /**
     * Проверка округления данных параметров с учетом шага
     */
    describe('Checking pointer value to depend on step size', ()=>{
      const rangeSlider = element.getOptions();
      describe(`Checking rangeslider with info: Min-${rangeSlider.minValue}, Max-${rangeSlider.maxValue}, step-${rangeSlider.step}; 
      it has ${rangeSlider.pointers.length} pointers(ranges)`, ()=>{
        rangeSlider.pointers.forEach(element => {
          it(`Ending value is ${element.endValue} and must divide by 0 without remain`, ()=>{
            chaiExpect(element.endValue%rangeSlider.step).to.equal(0);
          })

        });
      });
    });

  });
  
    /**
     * Проверка правильности конвертиции значения указателя в процент смещения относительно
     * начала области слайдера
     */
     describe('Checking value to percent margin convertation', ()=>{
      it('min=0, max=100, val=20, margin in % should be 20', ()=>{
      chaiExpect(models[0].valueToMargin(100,20)).to.equal(20);
      });
      it('min=0, max=500, val=250, margin in % should be 50', ()=>{
      chaiExpect(models[0].valueToMargin(500,250)).to.equal(50);
      });
      it('min=100, max=300, val=150, margin in % should be 75', ()=>{
        chaiExpect(models[0].valueToMargin(300-100,150)).to.equal(75);
      });
      it('min=100, max=300, val=50, margin in % should return ERROR', ()=>{
        chaiExpect(() => models[0].valueToMargin(300-100,50)).to.throw('Value doesn\'t exist in Range' );
      });      
    });
})