(function ($) {
  $.fn.boltunovRangeslider = <any>function( options?: string[] ){
    
    const sliderName: string = `${this.attr('id')}-container`;
    this.prepend(`<div id=${sliderName}></div>`);
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
        <div id='${sliderName}-area' class='rangeslider__area'>
          <div id='${sliderName}-slider-one' class='rangeslider__slider'></div>
        </div>
        `;


      constructor( options?: string[] ){
        this.stateSettings = $.extend( {
          momentPosition: 50,
        }, options);
      }
      render():void {
        thisSelector.css(this.containerFixedStyles).append(this.rangeslider);
      }
    }
    // const stateSettings:SliderState = $.extend( {
    //   momentPosition: 50,
    // }, options);

    
    const view = new View( options );
    view.render();

    // function view( style:SliderState, operation: 'render'|'update' ): void {
      
    //   const containerFixedStyles = {
    //     width: '100%',
    //     height: '100%',
        
    //   };
    //   const SliderStyles = {
    //     paddingLeft: style.momentPosition,
    //   }

    //   const rangeslider = `
    //   <div id='${sliderName}-area' class='rangeslider__area'>
    //     <div id='${sliderName}-slider-one' class='rangeslider__slider'></div>
    //   </div>
    //   `;

    //   switch( operation ) {
    //   case 'render' : thisSelector.css(containerFixedStyles).append(rangeslider); break;
    //   }
    // }

    // view( stateSettings, 'render' );

    return thisSelector;
  }
})(jQuery);