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
    class View {
      readonly containerFixedStyles = {
        width: '100%',
        height: '100%',
      }
      stateSettings:SliderState; 
      private rangeslider:string
      private sliderSelectorId = `${sliderName}-slider-one`;
      private areaSelectorId = `${sliderName}-area`;
      constructor( options?: object ){
        this.stateSettings = $.extend( {
          momentValue: 99,
          minValue: 50,
          maxValue: 100,
          signification: '%',
          sliderDirection: 'horizontal' as const
        }, options);
        this.rangeslider = `
          <div id='${this.areaSelectorId}' class='boltunov-rangeslider__area boltunov-rangeslider__area--${this.stateSettings.sliderDirection}'>
            <div id='${this.sliderSelectorId}' class='boltunov-rangeslider__slider boltunov-rangeslider__slider--round'></div>
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
        function calculateLeftMargin():number {
          const areaWidth = $(`#${this.areaSelectorId}`).width() - $(`#${this.sliderSelectorId}`).width();
          const stepInPx = areaWidth / (this.stateSettings.maxValue - this.stateSettings.minValue);
          const leftMargin = stepInPx * (this.stateSettings.momentValue - this.stateSettings.minValue);
          return leftMargin;
        }
        
        const leftMargin = calculateLeftMargin.bind(this)();
        $(`#${this.sliderSelectorId}`).css('left',`${leftMargin}px`);
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