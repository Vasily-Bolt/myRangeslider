import {Model} from './model';
import {View} from './view';
import {RangesliderDependenceStyles, RangesliderStateOptions, SubViewComponent} from '../interfaces';

class Presenter {
  private modelThis;
  private viewThis;

  constructor ( contructorOptions : {
    options?: object,
    sliderNode: JQuery
  }){
    this.modelThis = new Model( contructorOptions.options );
    this.viewThis = new View ( contructorOptions.sliderNode );
    this.renderRangeslider();
  }

  renderRangeslider(): void{
    let nowOptions: RangesliderStateOptions = this.modelThis.getOptions()
    this.viewThis.renderComponents(nowOptions);
  }

  activateListeners(): void{
    function consoleLocation() {
      console.log( $(this).css('left') );
    }
    this.viewThis.getPointersNodesID().forEach( function (nodePointer) {
      nodePointer.on('click', consoleLocation );
    });
  }
}

export {Presenter}