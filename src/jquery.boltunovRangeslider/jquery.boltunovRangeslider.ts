import {Presenter} from './classes/presenter';

(function ($) {
  $.fn.boltunovRangeslider = <any>function( sliderOptions?: object ){ 
    const presenter = new Presenter ( {
      options : sliderOptions,
      sliderNode : this,
    } );

    return this;
  }
})(jQuery);
