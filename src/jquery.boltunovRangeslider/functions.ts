function someModule() {
}
module.exports = someModule;

someModule.doStuff = function() {
  $('body').append('<div class="some-module"></div>');
}