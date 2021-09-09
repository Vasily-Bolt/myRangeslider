(function ($) {
  $.fn.boltunovRangeslider = <any>function( options?: object ){
    
    const sliderName: string = `${this.attr('id')}`;
    this.prepend(`<div id=${sliderName}-container class='boltunov-rangeslider'></div>`);
    const thisSelector = this.children(`#${sliderName}-container`);

    type SliderDirection = 'horizontal' | 'vertical';

    interface SliderState {
      momentValue: number;
      minValue: number;
      maxValue: number;
      signification: string;
      sliderDirection: SliderDirection;
    }

    interface rangesliderDependenceStyles {
      sliderStartIndent: 'left' | 'top';
      centeringSliderOnArea: 'left' | null;
    }

    const sliderHorizontalDependencies: rangesliderDependenceStyles = {
      sliderStartIndent : 'left',
      centeringSliderOnArea : null,
    }
    const sliderVerticalDependencies: rangesliderDependenceStyles = {
      sliderStartIndent : 'top',
      centeringSliderOnArea : 'left',
    }
    
    class View {
      readonly containerFixedStyles = {
        width: '100%',
        height: '100%',
      }
      stateSettings: SliderState;
      private sliderDependencies: rangesliderDependenceStyles;
      private rangeslider: string;
      private sliderSelectorId = `${sliderName}-slider-one`;
      private areaSelectorId = `${sliderName}-area`;
      constructor( options?: object ){
        this.stateSettings = $.extend( {
          momentValue: 89,
          minValue: 50,
          maxValue: 100,
          signification: '%',
          sliderDirection: 'vertical' as const
        }, options);
        if ( this.stateSettings.sliderDirection == 'vertical' ) this.sliderDependencies = sliderVerticalDependencies;
        if ( this.stateSettings.sliderDirection == 'horizontal' ) this.sliderDependencies = sliderHorizontalDependencies;
        this.rangeslider = `
          <div id='${this.areaSelectorId}' class='boltunov-rangeslider__area boltunov-rangeslider__area--${this.stateSettings.sliderDirection}'>
            <div id='${this.sliderSelectorId}' class='boltunov-rangeslider__slider boltunov-rangeslider__slider--round' 
            style='${this.sliderDependencies.centeringSliderOnArea}: -50%'></div>
          </div>
          `;
      }

      checkStatesAreProper(){
        if ( this.stateSettings.momentValue < this.stateSettings.minValue ) this.stateSettings.momentValue = this.stateSettings.minValue
        else if ( this.stateSettings.momentValue > this.stateSettings.maxValue )
          this.stateSettings.momentValue = this.stateSettings.maxValue;
      }

      update():void {
        this.checkStatesAreProper();
        function calculateStartMargin():number {
          // Установка бегунка в нужное положение в зависимости от направления области бегунка
          // Может можно воспользоваться другим способом? 
          let areaValue: number;
          switch( this.stateSettings.sliderDirection ) {
            case 'vertical' : areaValue = $(`#${this.areaSelectorId}`).height() - $(`#${this.sliderSelectorId}`).height(); break;
            default : areaValue = $(`#${this.areaSelectorId}`).width() - $(`#${this.sliderSelectorId}`).width();
          }
          
          const stepInPx = areaValue / (this.stateSettings.maxValue - this.stateSettings.minValue);
          const startMargin = stepInPx * (this.stateSettings.momentValue - this.stateSettings.minValue);
          return startMargin;
        }
        
        const indent = calculateStartMargin.bind(this)();
        $(`#${this.sliderSelectorId}`).css(this.sliderDependencies.sliderStartIndent,`${indent}px`);
      }

      render():void {
        thisSelector.css(this.containerFixedStyles).append(this.rangeslider);
        this.update();
      }

    }
    
    const view = new View( options );
    view.render();

    return thisSelector;
  }
})(jQuery);