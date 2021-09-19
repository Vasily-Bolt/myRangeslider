(function ($) {
  $.fn.boltunovRangeslider = <any>function( sliderOptions?: object ){ 
    const sliderName: string = `${this.attr('id')}`;
    this.prepend(`<div id=${sliderName}-container class='boltunov-rangeslider'></div>`);
    const thisSelector = this.children(`#${sliderName}-container`);

    type SliderDirection = 'horizontal' | 'vertical';   // Тип для описания направления ползунка

    interface SliderState {
      momentValue: number;    // Устанавливает текущее значение между minValue и maxValue
      sliderPointerDirection?: rangesliderDependenceStyles; //READONLY или PRIVATE?
      ptrStartMargin: number;
      readonly pointerIdSelector: string;
    }
    interface SliderAreaState {
      // rangesliderType: 'single' | 'range';
      minValue: number;   // Максимально возможное значение
      maxValue: number;   // Минимально возможное значение
      step: number;
      signification: string;  // Условное обозначение (единица измерения, если угодно)
      sliderDirection: SliderDirection;   // Направление ползунка (горизонтальный или вертикальный)
      readonly idAreaSelectorId: string;
    }

    interface RangesliderStateOptions extends SliderState, SliderAreaState {
    }

    interface rangesliderDependenceStyles {   // Зависимые от SliderDirection параметры (от направления)
      sliderStartIndent: 'left' | 'top';    // Отступ от края ползунка - край зависит от направления 
      centeringSliderOnArea: 'left' | null; // Для центровки ползунка на слайдере
    }
    
    const rangesliderStateOptions: RangesliderStateOptions = $.extend( {
        pointerIdSelector: `${sliderName}-pointer-one`,
        momentValue: 62,
        ptrStartMargin: 0,
        minValue: 50,
        maxValue: 100,
        step : 5,
        signification: '%',
        sliderDirection: 'horizontal' as const,
        idAreaSelectorId: `${sliderName}-area`,
      }, sliderOptions);
    const sliderHorizontalDependencies: rangesliderDependenceStyles = {
      sliderStartIndent : 'left',
      centeringSliderOnArea : null,
    }
    const sliderVerticalDependencies: rangesliderDependenceStyles = {
      sliderStartIndent : 'top',
      centeringSliderOnArea : 'left',
    }
    

    class Model {
      // проверка направления области, соответствия значения указателя шагу
      checkStatesAreProper( sliderLocalOptions: RangesliderStateOptions ): void {   
        if ( sliderLocalOptions.sliderDirection == 'vertical' ) sliderLocalOptions.sliderPointerDirection = sliderVerticalDependencies;
        if ( sliderLocalOptions.sliderDirection == 'horizontal' ) sliderLocalOptions.sliderPointerDirection = sliderHorizontalDependencies;

        if ( sliderLocalOptions.momentValue < sliderLocalOptions.minValue ) sliderLocalOptions.momentValue = sliderLocalOptions.minValue;
        else if ( sliderLocalOptions.momentValue > sliderLocalOptions.maxValue )
          sliderLocalOptions.momentValue = sliderLocalOptions.maxValue;
          sliderLocalOptions.momentValue = Math.round(sliderLocalOptions.momentValue/sliderLocalOptions.step) * sliderLocalOptions.step;
        const totalSteps = ( sliderLocalOptions.maxValue - sliderLocalOptions.minValue ) / sliderLocalOptions.step;
        const stepsMade = ( sliderLocalOptions.momentValue - sliderLocalOptions.minValue ) / sliderLocalOptions.step;
        sliderLocalOptions.ptrStartMargin = ( stepsMade / totalSteps ) * 100;
    }
    }

    class View {

      private rangeAreaAppendToHtml( rangesliderState: RangesliderStateOptions ):void {   // Метод с классом для создания области rangeslider
        class RangeArea {   // Класс для создания области слайдера
          readonly containerFixedStyles = {
            width: '100%',
            height: '100%',
          }
          areaState: SliderAreaState;
          private rangeslider: string;
          
          constructor( sliderAreaOptions: RangesliderStateOptions){
            this.areaState = {    // Может просто клонировать полностью объект или просто ссылкой ('=') назначить?
              minValue: sliderAreaOptions.minValue,
              maxValue: sliderAreaOptions.maxValue,
              step : sliderAreaOptions.step,
              signification: sliderAreaOptions.signification,
              sliderDirection: sliderAreaOptions.sliderDirection,
              idAreaSelectorId: sliderAreaOptions.idAreaSelectorId,
            };
            this.rangeslider = `
              <div id='${this.areaState.idAreaSelectorId}' 
              class='boltunov-rangeslider__area boltunov-rangeslider__area--${this.areaState.sliderDirection}'></div>`;
          }
          render():void {
            thisSelector.css(this.containerFixedStyles).append(this.rangeslider);
          }
          
        }
        const areaRenderingFunction = new RangeArea( rangesliderState );
        areaRenderingFunction.render();
        // return areaRenderingFunction.areaSelectorId;

      }

      // Метод для создания подкласса слайдера (указателя).
      private pointerSliderAppendToHtml( rangesliderState: RangesliderStateOptions ){    
        class SliderPointer {
          private sliderPointer: string;

          constructor (){
            this.sliderPointer = `
              <div id='${rangesliderState.pointerIdSelector}' class='boltunov-rangeslider__pointer boltunov-rangeslider__pointer--round' 
              style='${rangesliderState.sliderPointerDirection.centeringSliderOnArea}: -50%; 
              ${rangesliderState.sliderPointerDirection.sliderStartIndent}: ${rangesliderState.ptrStartMargin}%'></div>`;
          }
          
          renderPointer(rangesliderState: RangesliderStateOptions): void{
            $(`#${rangesliderState.idAreaSelectorId}`).append(this.sliderPointer);
          }

        }
        const FirstPointerRenderingFunction = new SliderPointer( );
        FirstPointerRenderingFunction.renderPointer(rangesliderState);
      }

      render( sliderLocalOptions: RangesliderStateOptions ):void {
        this.rangeAreaAppendToHtml( sliderLocalOptions );    // Добавляем область в блок HTML
        this.pointerSliderAppendToHtml( sliderLocalOptions );
      }

      update( sliderLocalOptions: RangesliderStateOptions ):void{
        console.log('update');
        // $(`#${this.sliderLocalOptions.pointerIdSelector}`);
      }

    }
    const model = new Model(  );
    const view = new View(  );
    model.checkStatesAreProper( rangesliderStateOptions ); // Меняет объект... Это не правильно
    view.render( rangesliderStateOptions );

    return thisSelector;
  }
})(jQuery);
