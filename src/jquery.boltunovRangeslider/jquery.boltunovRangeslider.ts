import {Presenter} from './classes/presenter';

(function ($) {
  $.fn.boltunovRangeslider = <any>function( sliderOptions?: object ){ 
    const presenter = new Presenter ( {
      options : sliderOptions,
      sliderNode : this,
    } );
    presenter.activateListeners();
    setTimeout(() => {
      presenter.updateRangeslider();
    }, 3000);
    return this;
  }
})(jQuery);
