(function ($) {
  $.fn.boltunovRangeslider = <any>function( sliderOptions?: object ){ 
    

    type SliderDirection = 'horizontal' | 'vertical';   // Тип для описания направления ползунка

    interface rangesliderDependenceStyles {   // Зависимые от SliderDirection параметры (от направления)
      sliderStartIndent: 'left' | 'top';    // Отступ от края ползунка - край зависит от направления 
      centeringSliderOnArea: 'left' | null; // Для центровки ползунка на слайдере
    }
    const sliderHorizontalDependencies: rangesliderDependenceStyles = {
      sliderStartIndent : 'left',
      centeringSliderOnArea : null,
    }
    const sliderVerticalDependencies: rangesliderDependenceStyles = {
      sliderStartIndent : 'top',
      centeringSliderOnArea : 'left',
    }
    interface RangesliderStateOptions {
      momentValue: number;    // Устанавливает текущее значение между minValue и maxValue
      sliderPointerDirection: rangesliderDependenceStyles; //READONLY или PRIVATE?
      ptrStartMargin: number;
      // readonly pointerIdSelector: string;
      rangesliderType: 'single' | 'range';
      minValue: number;   // Максимально возможное значение
      maxValue: number;   // Минимально возможное значение
      startRange?: number;
      step: number;
      signification: string;  // Условное обозначение (единица измерения, если угодно)
      sliderDirection: SliderDirection;   // Направление ползунка (горизонтальный или вертикальный)
      // readonly idAreaSelectorId: string;
    }

    class Model {

      private rangesliderStateOptions: RangesliderStateOptions; 

      constructor ( AddonOptions?: object ) {
        this.rangesliderStateOptions = $.extend( {
          momentValue: 62,
          sliderPointerDirection: sliderHorizontalDependencies,
          ptrStartMargin: 0,
          // pointerIdSelector: `${sliderName}-pointer-one`,
          rangesliderType: 'single' as const,
          minValue: 0,
          maxValue: 100,
          step : 5,
          signification: '%',
          sliderDirection: 'horizontal' as const,
          // idAreaSelectorId: `${sliderName}-area`,
        }, AddonOptions);
      }

      getOptions(): RangesliderStateOptions {
        return this.rangesliderStateOptions;
      }
    }

    class View {
      private pointerIdSelector: string;
      area: object;
      areaSubView( parentBlock: JQuery ): object {
        class AreaSubView {
          areaIdSelector: JQuery
          
          constructor( parentBlock: JQuery ) {
            const sliderName: string = `${parentBlock.attr('id')}`;
            parentBlock.children(`#${sliderName}-container`).append(`<div id='${sliderName}-area' class='boltunov-rangeslider__area'></div>`);
            this.areaIdSelector = parentBlock.find(`#${sliderName}-area`);
            console.log('Made');
          }

          getAreaId(): string {
            return this.areaIdSelector.attr('id');
          }
        }

        return new AreaSubView( parentBlock );
      }

      constructor ( parentBlock: JQuery ) {
        const sliderName: string = `${parentBlock.attr('id')}`;
        parentBlock.prepend(`<div id=${sliderName}-container class='boltunov-rangeslider'></div>`);
        this.area = this.areaSubView( parentBlock );  // area - это подкласс области 
        // this.area.getAreaId();
        this.pointerIdSelector = `${sliderName}-pointer-one`;
      }

    }
    class Presenter {

    }

    const model = new Model( sliderOptions );
    const view = new View ( this );
    const presenter = new Presenter (  );
  
    // Это должно быть в презентере. Пока оставлю тут
    

    return this;
  }
})(jQuery);
