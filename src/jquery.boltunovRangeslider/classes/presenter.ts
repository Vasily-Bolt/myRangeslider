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
        name : 'tipsToggle',
        tip : 'Toggle Tips',
        event : rangesliderEvents.tips,
        type : 'checkbox',
        value : this.modelThis.getOptions().tip,
      },{
        name : 'directionToggle',
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
    
  }

  renderRangeslider(): void{
    let nowOptions: RangesliderStateOptions = this.modelThis.getOptions()
    this.viewThis.renderComponents(nowOptions);
  }

  updateRangeslider(): void{
    
  }

  activateListeners(): void{
    //Возвращает ID родителя поля в котором произошли изменения
    function getClickedId(eventNode: JQuery<EventTarget>): String {
      return eventNode.closest('p').attr('id');
    }
    //Устанавливает значение 0 если поле пустое
    function zeroIfEmpty(inputField: JQuery<EventTarget>): void {
      const eventTargetValue = inputField.val() as String;
      if ( inputField.val() == '' )  inputField.val('0');
    }
    //Удаляет все символы кроме цифр
    function onlyDigits(eventNode: JQuery<EventTarget>): void {
      const eventTargetValue = eventNode.val() as String;
      if ( eventTargetValue[0] == '-' ) {
        eventNode.val(`-${eventTargetValue.substr(1).replace (/\D/g, '')}`);
        if ( eventTargetValue[1] == '0') eventNode.val( `-${eventTargetValue.substr(2)}`);
      } else {
        eventNode.val(eventTargetValue.replace (/\D/g, ''));
      }
      if ( eventTargetValue[0] == '0' && eventTargetValue.length > 1 ) eventNode.val( eventTargetValue.substr(1) );
    };

    $(this.node).on(rangesliderEvents.tips, ()=> {
      this.viewThis.toggleTips();
    } );

    $(this.node).on(rangesliderEvents.inputFieldChanged, (event: Event)=> {
      const eventTargetNode = $(event.target);
      const blockName = getClickedId(eventTargetNode)
      const fieldName = blockName.slice(blockName.lastIndexOf('-')+1);
      switch(fieldName) {
        case 'min' : 
          onlyDigits(eventTargetNode);
          break;
        case 'max' : 
          onlyDigits(eventTargetNode);
          break;
      }
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