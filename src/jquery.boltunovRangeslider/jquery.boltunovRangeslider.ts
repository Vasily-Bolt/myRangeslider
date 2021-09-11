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
        momentValue: 53,
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
      // poinerState: SliderState;
      // private rangeslider: string;
      // private areaSelectorId = `${sliderName}-area`;
      // readonly areaSelectorId = `${sliderName}-area`;
      // readonly sliderSelectorId = `${sliderName}-pointer-one`;
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
              idAreaSelectorId: sliderAreaOptions.idAreaSelectorId
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

      private pointerSliderAppendToHtml( rangesliderState: RangesliderStateOptions ): void{    // Метод для создания подкласса слайдера (указателя)
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
          checkStatesAreProper(){   // Проверка соответствия значения указателя шагу
            if ( this.poinerState.momentValue < rangesliderState.minValue ) this.poinerState.momentValue = rangesliderState.minValue
            else if ( this.poinerState.momentValue > rangesliderState.maxValue )
              this.poinerState.momentValue = rangesliderState.maxValue;
            console.log( Math.round(this.poinerState.momentValue/rangesliderState.step)*rangesliderState.step );
          }
          renderPointer(): void{
            this.checkStatesAreProper();
            $(`#${rangesliderState.idAreaSelectorId}`).append(this.sliderPointer);
            // Откуда взять селектор для выбора области для вставки?
          }
        }
        const sliderPointerRenderingFunction = new SliderPointer( rangesliderState );
        sliderPointerRenderingFunction.renderPointer();
      }
      // 
      render() {
        const areaSelector = this.rangeAreaAppendToHtml( this.sliderLocalOptions );    // Добавляем область в блок HTML
        this.pointerSliderAppendToHtml( this.sliderLocalOptions );
      }
    }


      //   this.poinerState = $.extend( {
      //     momentValue: 53,
      //     minValue: 50,
      //     maxValue: 100,
      //     step : 5,
      //     signification: '%',
      //     sliderDirection: 'vertical' as const
      //   }, sliderAreaOptions);
      //   if ( this.poinerState.sliderDirection == 'vertical' ) this.sliderDependencies = sliderVerticalDependencies;
      //   if ( this.poinerState.sliderDirection == 'horizontal' ) this.sliderDependencies = sliderHorizontalDependencies;
      //   this.rangeslider = `
      //     <div id='${this.areaSelectorId}' class='boltunov-rangeslider__area boltunov-rangeslider__area--${this.poinerState.sliderDirection}'>
      //       <div id='${this.sliderSelectorId}' class='boltunov-rangeslider__slider boltunov-rangeslider__slider--round' 
      //       style='${this.sliderDependencies.centeringSliderOnArea}: -50%'></div>
      //     </div>
      //     `;
      // }

      // checkStatesAreProper(){
      //   if ( this.poinerState.momentValue < this.poinerState.minValue ) this.poinerState.momentValue = this.poinerState.minValue
      //   else if ( this.poinerState.momentValue > this.poinerState.maxValue )
      //     this.poinerState.momentValue = this.poinerState.maxValue;
      //   console.log( Math.round(this.poinerState.momentValue/this.poinerState.step)*this.poinerState.step );
      // }

      // update():void {
      //   this.checkStatesAreProper();
      //   function calculateStartMargin():number {
      //     // Установка бегунка в нужное положение в зависимости от направления области бегунка
      //     // Может можно воспользоваться другим способом? 
      //     let areaValue: number;
      //     switch( this.poinerState.sliderDirection ) {
      //       case 'vertical' : areaValue = $(`#${this.areaSelectorId}`).height() - $(`#${this.sliderSelectorId}`).height(); break;
      //       default : areaValue = $(`#${this.areaSelectorId}`).width() - $(`#${this.sliderSelectorId}`).width();
      //     }
          
      //     const stepInPx = areaValue / (this.poinerState.maxValue - this.poinerState.minValue);
      //     console.log( `Step-${stepInPx}, momentValue-${this.poinerState.momentValue}` );
      //     const startMargin = stepInPx * (this.poinerState.momentValue - this.poinerState.minValue);
      //     return startMargin;
      //   }
        
      //   const indent = calculateStartMargin.bind(this)();
      //   $(`#${this.sliderSelectorId}`).css(this.sliderDependencies.sliderStartIndent,`${indent}px`);
      // }

      // render():void {
      //   thisSelector.css(this.containerFixedStyles).append(this.rangeslider);
      //   this.update();
      // }

    // }
    
    const view = new View( rangesliderStateOptions );
    view.render();

    return thisSelector;
  }
})(jQuery);