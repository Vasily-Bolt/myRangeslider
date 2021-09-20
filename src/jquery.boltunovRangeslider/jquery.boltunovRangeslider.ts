(function ($) {
  $.fn.boltunovRangeslider = <any>function( sliderOptions?: object ){ 
    const sliderName: string = `${this.attr('id')}`;
    this.prepend(`<div id=${sliderName}-container class='boltunov-rangeslider'></div>`);
    const thisSelector = this.children(`#${sliderName}-container`);

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
      readonly pointerIdSelector: string;
      rangesliderType: 'single' | 'range';
      minValue: number;   // Максимально возможное значение
      maxValue: number;   // Минимально возможное значение
      startRange?: number;
      step: number;
      signification: string;  // Условное обозначение (единица измерения, если угодно)
      sliderDirection: SliderDirection;   // Направление ползунка (горизонтальный или вертикальный)
      readonly idAreaSelectorId: string;
    }

    class Model {

      private rangesliderStateOptions: RangesliderStateOptions; 

      constructor ( AddonOptions?: object ) {
        this.rangesliderStateOptions = $.extend( {
          momentValue: 62,
          sliderPointerDirection: sliderHorizontalDependencies,
          ptrStartMargin: 0,
          pointerIdSelector: `${sliderName}-pointer-one`,
          rangesliderType: 'single' as const,
          minValue: 0,
          maxValue: 100,
          step : 5,
          signification: '%',
          sliderDirection: 'horizontal' as const,
          idAreaSelectorId: `${sliderName}-area`,
        }, AddonOptions);
      }

      getOptions(): RangesliderStateOptions {
        return this.rangesliderStateOptions;
      }
    }
    class View {
      
    }
    class Presenter {

    }

    const model = new Model( sliderOptions );
    const view = new View (  );
    const presenter = new Presenter (  );

    // Это должно быть в презентере. Пока оставлю тут
    model.getOptions();

    return thisSelector;
  }
})(jQuery);
