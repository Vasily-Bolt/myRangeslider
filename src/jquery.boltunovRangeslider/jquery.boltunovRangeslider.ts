import {rangesliderDependenceStyles, RangesliderStateOptions, SubViewComponent} from './interfaces';

(function ($) {
  $.fn.boltunovRangeslider = <any>function( sliderOptions?: object ){ 

    const sliderHorizontalDependencies: rangesliderDependenceStyles = {
      sliderStartIndent : 'left',
      centeringSliderOnArea : null,
    }
    const sliderVerticalDependencies: rangesliderDependenceStyles = {
      sliderStartIndent : 'top',
      centeringSliderOnArea : 'left',
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
      area: SubViewComponent;
      
      areaSubView( parentBlock: JQuery ): SubViewComponent {
        class AreaSubView {
          componentIdSelector: JQuery
          
          constructor( parentBlock: JQuery ) {
            const sliderName: string = `${parentBlock.attr('id')}`;
            parentBlock.children(`#${sliderName}-container`).append(`<div id='${sliderName}-area' class='boltunov-rangeslider__area'></div>`);
            this.componentIdSelector = parentBlock.find(`#${sliderName}-area`);
          }

          getComponentId(): string {
            return this.componentIdSelector.attr('id');
          }
        }

        return new AreaSubView( parentBlock );
      }

      constructor ( parentBlock: JQuery ) {
        const sliderName: string = `${parentBlock.attr('id')}`;
        parentBlock.prepend(`<div id=${sliderName}-container class='boltunov-rangeslider'></div>`);
        this.area = this.areaSubView( parentBlock );  // area - это подкласс области 
        this.area.getComponentId();
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
