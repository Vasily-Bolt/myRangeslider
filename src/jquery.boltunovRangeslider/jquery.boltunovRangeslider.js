(function ($) {

  $.fn.boltunovRangeslider = function( action, options ){
    function render ( text ) {
      this.html(text);
    }
    if ( typeof action === 'object' ) {
      options = action;
      action = 'render';
    }

    let settings = $.extend( {
      'text' : '3222'
    }, options);

    switch( action ){
      case 'render' : this.html(settings['text']); break;
      // case 'render' : render( settings['text'] ); break;
    }
    this.on('click', () => {
      settings['text'] = '3222';
      render.apply(this, [settings['text']]);
    });

    return this;
  }
})(jQuery);



$( document ).ready(function() {
  console.log( "ready!" );
  const rangeslider = $('.rangeslider-1');
  rangeslider.boltunovRangeslider({
    'text' : '321'
  })
  

});



