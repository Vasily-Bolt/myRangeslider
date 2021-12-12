import Model from './classes/model';
import {View} from './classes/view';
import {Presenter} from './classes/presenter';
import {RangesliderDependenceStyles, RangesliderStateOptions, SubViewComponent} from './interfaces';

(function ($) {
  $.fn.boltunovRangeslider = <any>function( sliderOptions?: object ){ 

    const model = new Model( sliderOptions );
    const view = new View ( this );
    let nowOptions: RangesliderStateOptions = model.getOptions()
    view.renderComponents(nowOptions);
    console.log( model.getPointers() );
    const presenter = new Presenter (  );
  
    // Это должно быть в презентере. Пока оставлю тут
    
    return this;
  }
})(jQuery);
