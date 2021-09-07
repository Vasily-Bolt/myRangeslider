(function ($) {
  $.fn.boltunovRangeslider = <any>function( options?: object ){
    
    const sliderName: string = `${this.attr('id')}-container`;
    this.prepend(`<div id=${sliderName} class='boltunov-rangeslider'></div>`);
    const thisSelector = this.children(`#${sliderName}`);

    interface SliderState {
      momentPosition: number;
    }

    class View {
      readonly containerFixedStyles = {
        width: '100%',
        height: '100%',
      }
      stateSettings:SliderState; 
      private rangeslider:string = `
        <div id='${sliderName}-area' class='boltunov-rangeslider__area boltunov-rangeslider__area--horizontal'>
          <div id='${sliderName}-slider-one' class='boltunov-rangeslider__slider boltunov-rangeslider__slider--round'></div>
        </div>
        `;

      constructor( options?: object ){
        this.stateSettings = $.extend( {
          momentPosition: 0,
        }, options);
      }
      render():void {
        thisSelector.css(this.containerFixedStyles).append(this.rangeslider);
      }
    }
    
    const view = new View( options );
    view.render();

    return thisSelector;
  }
})(jQuery);