(function ($) {
  $.fn.boltunovRangeslider = <any>function( sliderOptions?: object ){ 
    const sliderName: string = `${this.attr('id')}`;
    this.prepend(`<div id=${sliderName}-container class='boltunov-rangeslider'></div>`);
    const thisSelector = this.children(`#${sliderName}-container`);

    type SliderDirection = 'horizontal' | 'vertical';   // Тип для описания направления ползунка

    interface SliderState {
      momentValue: number;    // Устанавливает текущее значение между minValue и maxValue
      sliderPointerDirection?: rangesliderDependenceStyles; //READONLY или PRIVATE?
      readonly idSliderSelector: string;
    }
    interface SliderAreaState {
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
        momentValue: 72,
        idSliderSelector: `${sliderName}-pointer-one`,
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
    



    class View {
      sliderLocalOptions: RangesliderStateOptions;

      constructor( rangesliderOptions: RangesliderStateOptions ){
        // Надо сделать декомпозицию SliderOptions на отдельные объекты для Area и Pointer'ов
        this.sliderLocalOptions = rangesliderOptions;
        if ( this.sliderLocalOptions.sliderDirection == 'vertical' ) this.sliderLocalOptions.sliderPointerDirection = sliderVerticalDependencies;
        if ( this.sliderLocalOptions.sliderDirection == 'horizontal' ) this.sliderLocalOptions.sliderPointerDirection = sliderHorizontalDependencies;
        // this.rangeArea = new RangeArea( sliderAreaOptions );
      }

      private rangeAreaAppendToHtml( rangesliderState: RangesliderStateOptions ):void {   // Метод с классом для создания области rangeslider
        class RangeArea {   // Класс для создания области слайдера
          readonly containerFixedStyles = {
            width: '100%',
            height: '100%',
          }
          areaState: SliderAreaState;
          private rangeslider: string;
          
          constructor( sliderAreaOptions: RangesliderStateOptions){
            this.areaState = {
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
          poinerState: SliderState;
          private sliderPointer: string;

          constructor( sliderOptions: RangesliderStateOptions ){
            this.poinerState = {
              momentValue: sliderOptions.momentValue,
              idSliderSelector: sliderOptions.idSliderSelector,
            }
            this.sliderPointer = `
              <div id='${this.poinerState.idSliderSelector}' class='boltunov-rangeslider__pointer boltunov-rangeslider__pointer--round' 
              style='${sliderOptions.sliderPointerDirection.centeringSliderOnArea}: -50%'></div>`;
          }
          
          renderPointer(): void{
            $(`#${rangesliderState.idAreaSelectorId}`).append(this.sliderPointer);
            // Откуда взять селектор для выбора области для вставки?
          }

        }
        const sliderPointerRenderingFunction = new SliderPointer( rangesliderState );
        sliderPointerRenderingFunction.renderPointer();
      }

      checkStatesAreProper(): number{   // Проверка соответствия значения указателя шагу
        if ( this.sliderLocalOptions.momentValue < this.sliderLocalOptions.minValue ) return this.sliderLocalOptions.minValue;
        else if ( this.sliderLocalOptions.momentValue > this.sliderLocalOptions.maxValue )
          return this.sliderLocalOptions.maxValue;
        return Math.round(this.sliderLocalOptions.momentValue/this.sliderLocalOptions.step) * this.sliderLocalOptions.step;
      }
      
      render():void {
        this.rangeAreaAppendToHtml( this.sliderLocalOptions );    // Добавляем область в блок HTML
        this.pointerSliderAppendToHtml( this.sliderLocalOptions );
      }

      update():void{
        console.log('update func');
        console.log( this.sliderLocalOptions.momentValue );
        this.sliderLocalOptions.momentValue = this.checkStatesAreProper();
        console.log( this.sliderLocalOptions.momentValue );

      }

      // update():void {
      //   function calculateStartMargin():number {
      //     // Установка бегунка в нужное положение в зависимости от направления области бегунка
      //     // Может можно воспользоваться другим способом? 
      //     console.log( this.sliderLocalOptions.sliderDirection );
      //     let areaValue: number;
      //     switch( this.sliderLocalOptions.sliderDirection ) {
      //       case 'vertical' : areaValue = $(`#${this.sliderLocalOptions.idAreaSelectorId}`).height() - 
      //         $(`#${this.sliderLocalOptions.idSliderSelector}`).height(); break;
      //       default : areaValue = $(`#${this.sliderLocalOptions.idAreaSelectorId}`).width() - 
      //         $(`#${this.sliderLocalOptions.idSliderSelector}`).width();
      //     }
      //     console.log( areaValue );
      //     const stepInPx = areaValue / (this.sliderLocalOptions.maxValue - this.sliderLocalOptions.minValue);
      //     console.log( `Step-${stepInPx}, momentValue-${this.sliderLocalOptions.momentValue}` );
      //     const startMargin = stepInPx * (this.sliderLocalOptions.momentValue - this.sliderLocalOptions.minValue);
      //     return startMargin;
      //   }
        
      //   const indent = calculateStartMargin.bind(this)();
      //   // $(`#${this.sliderSelectorId}`).css(this.sliderDependencies.sliderStartIndent,`${indent}px`);
      // }    
    }
    
    const view = new View( rangesliderStateOptions );
    view.render();
    view.update();
    return thisSelector;
  }
})(jQuery);
