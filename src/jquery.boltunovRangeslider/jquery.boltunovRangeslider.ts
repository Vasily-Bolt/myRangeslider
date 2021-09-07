(function ($) {

  $.fn.boltunovRangeslider = <any>function( options?: string[] ){
    this.html('333');
    console.log('plugin');
    return this;
  }
})(jQuery);

$( document ).ready(function() {
  console.log( "ready!" );
  const rangeslider: JQuery<HTMLElement> = $('.rangeslider-1');
  $('.rangeslider-1').boltunovRangeslider();
});