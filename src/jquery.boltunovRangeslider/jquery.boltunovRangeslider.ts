(function ($) {
  $.fn.boltunovRangeslider = <any>function( sliderAreaOptions?: object ){
    
    const sliderName: string = `${this.attr('id')}`;
    this.prepend(`<div id=${sliderName}-container class='boltunov-rangeslider'></div>`);
    const thisSelector = this.children(`#${sliderName}-container`);

    type SliderDirection = 'horizontal' | 'vertical';   // Тип для описания направления ползунка

    interface SliderState {
      momentValue: number;    // Устанавливает текущее значение между minValue и maxValue
      minValue: number;   // Максимально возможное значение
      maxValue: number;   // Минимально возможное значение
      step: number;
      signification: string;  // Условное обозначение (единица измерения, если угодно)
      sliderDirection: SliderDirection;   // Направление ползунка (горизонтальный или вертикальный)
    }
    interface SliderAreaState {
      minValue: number;   // Максимально возможное значение
      maxValue: number;   // Минимально возможное значение
      step: number;
      signification: string;  // Условное обозначение (единица измерения, если угодно)
      sliderDirection: SliderDirection;   // Направление ползунка (горизонтальный или вертикальный)
    }

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
    

    class RangeArea {   // Класс для создания области слайдера
      readonly containerFixedStyles = {
        width: '100%',
        height: '100%',
      }
      areaState: SliderAreaState;
      private rangeslider: string;
      private areaSelectorId = `${sliderName}-area`;
      constructor( sliderAreaOptions?: object){
        this.areaState = $.extend( {
          minValue: 50,
          maxValue: 100,
          step : 5,
          signification: '%',
          sliderDirection: 'horizontal' as const  
        }, sliderAreaOptions);
        this.rangeslider = `
          <div id='${this.areaSelectorId}' class='boltunov-rangeslider__area boltunov-rangeslider__area--${this.areaState.sliderDirection}'></div>`;
      }
      render():void {
        thisSelector.css(this.containerFixedStyles).append(this.rangeslider);
      }
    }

    class View {
      // readonly containerFixedStyles = {
      //   width: '100%',
      //   height: '100%',
      // }
      
      stateSettings: SliderState;
      private sliderDependencies: rangesliderDependenceStyles;
      private rangeslider: string;
      private sliderSelectorId = `${sliderName}-slider-one`;
      private areaSelectorId = `${sliderName}-area`;
      private rangeArea: RangeArea;
      constructor( sliderAreaOptions?: object ){
        this.rangeArea = new RangeArea( sliderAreaOptions );
      }

      render() {
        this.rangeArea.render();
      }
    }


      //   this.stateSettings = $.extend( {
      //     momentValue: 53,
      //     minValue: 50,
      //     maxValue: 100,
      //     step : 5,
      //     signification: '%',
      //     sliderDirection: 'vertical' as const
      //   }, sliderAreaOptions);
      //   if ( this.stateSettings.sliderDirection == 'vertical' ) this.sliderDependencies = sliderVerticalDependencies;
      //   if ( this.stateSettings.sliderDirection == 'horizontal' ) this.sliderDependencies = sliderHorizontalDependencies;
      //   this.rangeslider = `
      //     <div id='${this.areaSelectorId}' class='boltunov-rangeslider__area boltunov-rangeslider__area--${this.stateSettings.sliderDirection}'>
      //       <div id='${this.sliderSelectorId}' class='boltunov-rangeslider__slider boltunov-rangeslider__slider--round' 
      //       style='${this.sliderDependencies.centeringSliderOnArea}: -50%'></div>
      //     </div>
      //     `;
      // }

      // checkStatesAreProper(){
      //   if ( this.stateSettings.momentValue < this.stateSettings.minValue ) this.stateSettings.momentValue = this.stateSettings.minValue
      //   else if ( this.stateSettings.momentValue > this.stateSettings.maxValue )
      //     this.stateSettings.momentValue = this.stateSettings.maxValue;
      //   console.log( Math.round(this.stateSettings.momentValue/this.stateSettings.step)*this.stateSettings.step );
      // }

      // update():void {
      //   this.checkStatesAreProper();
      //   function calculateStartMargin():number {
      //     // Установка бегунка в нужное положение в зависимости от направления области бегунка
      //     // Может можно воспользоваться другим способом? 
      //     let areaValue: number;
      //     switch( this.stateSettings.sliderDirection ) {
      //       case 'vertical' : areaValue = $(`#${this.areaSelectorId}`).height() - $(`#${this.sliderSelectorId}`).height(); break;
      //       default : areaValue = $(`#${this.areaSelectorId}`).width() - $(`#${this.sliderSelectorId}`).width();
      //     }
          
      //     const stepInPx = areaValue / (this.stateSettings.maxValue - this.stateSettings.minValue);
      //     console.log( `Step-${stepInPx}, momentValue-${this.stateSettings.momentValue}` );
      //     const startMargin = stepInPx * (this.stateSettings.momentValue - this.stateSettings.minValue);
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
    
    const view = new View( sliderAreaOptions );
    view.render();

    return thisSelector;
  }
})(jQuery);