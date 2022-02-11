$( document ).ready(function() {
  const rangeslider: JQuery<HTMLElement> = $('.rangeslider-1');
  rangeslider.boltunovRangeslider({
    popit: 'itpop',
    pointers: [
      {
        endValue: 20
      },{
        endValue: 50
      },{
        endValue: 300
      },
      // {
      //   endValue: 77
      // }
    ]
    // sliderDirection : 'vertical',
  });
});