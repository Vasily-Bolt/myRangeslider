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
      pointerEnd: SubViewComponent;
      
      /**
       * Подкласс для создания и рендера области rangeslider
       * @param parentBlock - блок родитель, внутри которого будет создан rangeslider 
       * @returns - возвращаяет созданный объект подкласса области класса View 
       */
      areaSubView( parentBlock: JQuery ): SubViewComponent {
        class AreaSubView {
          componentIdSelector: JQuery
          
          constructor( parentBlock: JQuery ) {
            const sliderName: string = `${parentBlock.attr('id')}`;
            parentBlock.children(`#${sliderName}-container`).append(`<div id='${sliderName}-area' class='boltunov-rangeslider__area'></div>`);
            this.componentIdSelector = parentBlock.find(`#${sliderName}-area`);
          }

          getComponentId(): JQuery{
            return this.componentIdSelector;
          }

          renderComponent(options: RangesliderStateOptions): void{
            this.componentIdSelector.addClass(`boltunov-rangeslider__area--${options.sliderDirection}`)
          }
        }

        return new AreaSubView( parentBlock );
      }

      pointerSubView(parentBlock: JQuery, pointerName: string): SubViewComponent {
        class PointerSubView {
          componentIdSelector: JQuery
          
          constructor( parentBlock: JQuery, pointerName: string ) {
            parentBlock.append(`<div id='${pointerName}' class='boltunov-rangeslider__pointer boltunov-rangeslider__pointer--round'></div>`);
            this.componentIdSelector = parentBlock.find(`#${pointerName}`);
          }

          getComponentId(): JQuery{
            return this.componentIdSelector;
          }

          renderComponent(options: RangesliderStateOptions): void{
            // this.componentIdSelector.addClass(`boltunov-rangeslider__area--${options.sliderDirection}`)
          }
        }

        return new PointerSubView( parentBlock, pointerName );
      }

      /**
       * Конструктор View. 
       * @param parentBlock - блок родитель, внутри которого будет создан rangeslider 
       */
      constructor ( parentBlock: JQuery ) {
        const sliderName: string = `${parentBlock.attr('id')}`;
        parentBlock.prepend(`<div id=${sliderName}-container class='boltunov-rangeslider'></div>`);
        this.area = this.areaSubView( parentBlock );  // area - это подкласс области 
        this.pointerEnd = this.pointerSubView(this.area.getComponentId(), `${sliderName}-pointer-end`);
        this.pointerIdSelector = `${sliderName}-pointer-end`;
      }

      /**
       * Перерисовка всех суб-компонентов
       * @param options "Получаем опции компонента из Модели и передаем в эту функцию."
       */
      renderComponents(options: RangesliderStateOptions): void {
        this.area.renderComponent(options);
      }

    }
    class Presenter {

    }

    const model = new Model( sliderOptions );
    const view = new View ( this );
    let nowOptions: RangesliderStateOptions = model.getOptions()
    view.renderComponents(nowOptions);
    const presenter = new Presenter (  );
  
    // Это должно быть в презентере. Пока оставлю тут
    

    return this;
  }
})(jQuery);
