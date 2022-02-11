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
    console.log(nowOptions);
    this.viewThis.renderComponents(nowOptions);
  }
}

export {Presenter}