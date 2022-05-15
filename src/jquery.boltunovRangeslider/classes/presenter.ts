import {Model} from './model';
import {View} from './view';
import {RangesliderDependenceStyles, RangesliderStateOptions, SubViewComponent, rangesliderEvents} from '../interfaces';

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

    /**
     * Проверка появления подсказок по клику
     */
    this.viewThis.getPointersNodesID().forEach( (nodePointer) => {
      nodePointer.on('click', () => {
        this.viewThis.toggleTips();
      });
      
    });
  }
}

export {Presenter}