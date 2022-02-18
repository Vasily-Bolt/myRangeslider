import {Model} from './model';
import {View} from './view';
import {RangesliderDependenceStyles, RangesliderStateOptions, SubViewComponent} from '../interfaces';

class Presenter {
  private modelThis;
  private viewThis;

  constructor ( contructorOptions : {
    options?: Object,
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

  updateRangeslider(): void{
    this.modelThis.setVerticalDirection();
    this.modelThis.updatePointerDirectionDependencies();
    console.log('UPDATING');
    let newOptions: RangesliderStateOptions = this.modelThis.getOptions();
    this.viewThis.area.updateComponent(newOptions.sliderDirection);
    this.viewThis.UpdatePointers(newOptions);
    console.log('DONE');
  }

  activateListeners(): void{
    function consoleLocation() {
      console.log( $(this).css('left') );
    }
    this.viewThis.getPointersNodesID().forEach( function (nodePointer) {
      nodePointer.on('click', consoleLocation );
    });

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