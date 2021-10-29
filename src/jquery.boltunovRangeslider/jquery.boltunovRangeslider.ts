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
      /**
       * TODO разбить на две переменные:
       * 1) Получает данные извне или устанавливает значения по умлочанию
       * 2) Остальные данные, которыми нельзя манипулировать извне
       * Объеденить в одну переменную
       */
      private rangesliderStateOptions: RangesliderStateOptions; 

      constructor ( AddonOptions?: object ) {
        this.rangesliderStateOptions = $.extend( {
          pointers: [{
            endValue: 62,
            _percentMarginstartingValue: undefined,
          },{
            endValue: 22,
            _percentMarginstartingValue: undefined,
          },
          ],
          sliderDirection: 'horizontal' as const,
          _sliderPointerDirection: undefined,
          rangesliderType: 'single' as const,
          minValue: 0,
          maxValue: 100,
          step : 5,
          signification: '%',
        }, AddonOptions);

        this.rangesliderStateOptions._sliderPointerDirection = this.rangesliderStateOptions.sliderDirection === 'vertical' 
          ? sliderVerticalDependencies : sliderHorizontalDependencies;
        
        let fixedPointersValues = this.rangesliderStateOptions.pointers.map( (obj) => {

        });
        this.rangesliderStateOptions.pointers[0].endValue = this.pointerValueRoundToStep(this.rangesliderStateOptions.pointers[0].endValue);
        this.rangesliderStateOptions.pointers[0]._percentMarginstartingValue = this.valueToMargin();
      }

      /**
      * Пересчет параметра значения в значение отсутпа в % от начальной точки слайдера
      * @returns margin в % от начальной точки
      * TODO Надо сделать перебор массива для подсчета каждого значения в обеъктах!
      */
      valueToMargin(): number{
        const rangeValue = this.rangesliderStateOptions.maxValue - this.rangesliderStateOptions.minValue;
        const stepInPercents = rangeValue / 100;
        return this.rangesliderStateOptions.pointers[0].endValue / stepInPercents;
      }

      TwopointerValueRoundToStep(array: number): number{
        return 1;
      }

      pointerValueRoundToStep(val: number): number{
        return Math.round(val/this.rangesliderStateOptions.step) * this.rangesliderStateOptions.step;
      }

      getOptions(): RangesliderStateOptions {
        return this.rangesliderStateOptions;
      }

    }

    class View {
      area: SubViewComponent;
      pointerEnd: SubViewComponent;
      pointerTwo: SubViewComponent;
      
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

          updateComponent(): void{
            
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
            this.componentIdSelector.css({
              [`${options._sliderPointerDirection.centeringSliderOnArea}`] : '-50%',
              [`${options._sliderPointerDirection.sliderStartIndent}`] : `${options.pointers[0]._percentMarginstartingValue}%`,
            })
          }

          updateComponent(): void{

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
        this.pointerTwo = this.pointerSubView(this.area.getComponentId(), `${sliderName}-pointer-two`);
      }

      /**
       * Первичная отрисовка всех суб-компонентов
       * @param options "Получаем опции компонента из Модели и передаем в эту функцию."
       */
      renderComponents(options: RangesliderStateOptions): void {
        this.area.renderComponent(options);
        this.pointerEnd.renderComponent(options);
        this.pointerTwo.renderComponent(options);
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
