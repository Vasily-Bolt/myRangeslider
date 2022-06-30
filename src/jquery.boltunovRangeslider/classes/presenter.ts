import {Model} from './model';
import {View} from './view';
import {RangesliderDependenceStyles, RangesliderStateOptions, SubViewComponent, cPanelElementObject, rangesliderEvents} from '../interfaces';
import { event, timers } from 'jquery';

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
    const controlPanelElems : Array<cPanelElementObject> = [
      {
        name : rangesliderEvents.tips,
        tip : 'Toggle Tips',
        event : rangesliderEvents.tips,
        type : 'checkbox',
        value : this.modelThis.getOptions().tip,
      },{
        name : rangesliderEvents.direction,
        tip : 'Toggle direction',
        event : rangesliderEvents.direction,
        type : 'checkbox',
        value : false,
      },{
        name : 'min',
        tip : 'MIN',
        event : rangesliderEvents.inputFieldChanged,
        type : 'input',
        value : this.modelThis.getOptions().minValue,
      },{
        name : 'max',
        tip : 'MAX',
        event : rangesliderEvents.inputFieldChanged,
        type : 'input',
        value : this.modelThis.getOptions().maxValue,
      },
    ];
    this.renderRangeslider();
    controlPanelElems.forEach(elem => {
      this.viewThis.addCPanelElement(elem);
    })
    // this.viewThis.addCPanelElement({
    //   name : rangesliderEvents.tips,
    //   tip : 'Toggle Tips',
    //   type : 'checkbox',
    //   value : this.modelThis.getOptions().tip,
    // });
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
    $(this.node).on(rangesliderEvents.inputFieldChanged, (event)=> {
      console.log(event.target.closest('p').id);
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