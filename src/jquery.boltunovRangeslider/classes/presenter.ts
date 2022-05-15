import {Model} from './model';
import {View} from './view';
import {RangesliderDependenceStyles, RangesliderStateOptions, SubViewComponent, rangesliderEvents} from '../interfaces';
import { timers } from 'jquery';

class Presenter {
  private modelThis;
  private viewThis;
  private node : JQuery;
  constructor ( contructorOptions : {
    options?: Object,
    sliderNode: JQuery
  }){
    this.node = contructorOptions.sliderNode;
    this.modelThis = new Model( contructorOptions.options );
    this.viewThis = new View ( contructorOptions.sliderNode );
    this.renderRangeslider();
  }

  renderRangeslider(): void{
    let nowOptions: RangesliderStateOptions = this.modelThis.getOptions()
    this.viewThis.renderComponents(nowOptions);
  }

  updateRangeslider(): void{
    


  }

  activateListeners(): void{
    $(this.node).on(rangesliderEvents.tips, ()=> {
      this.viewThis.toggleTips();
    } );

    $(this.node).on(rangesliderEvents.direction, ()=> {
      if (this.modelThis.getOptions().sliderDirection == 'horizontal') {
        this.modelThis.setVerticalDirection();
      } else {
        this.modelThis.setHorizontalDirection();
      }
      const updatedOptions = this.modelThis.getOptions();
      this.viewThis.area.updateComponent(updatedOptions.sliderDirection);
      this.viewThis.UpdatePointers(updatedOptions);


    } );
      
  }
}

export {Presenter}