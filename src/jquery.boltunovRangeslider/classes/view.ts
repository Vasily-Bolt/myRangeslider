import {RangesliderStateOptions, SubViewComponent, PointerSubViewComponent, rangesliderEvents} from '../interfaces';

class View {
  area: SubViewComponent;
  pointers: Array<PointerSubViewComponent>;
  cPanel: SubViewComponent;
  sliderName: string;
  /**
   * Конструктор View. 
   * @param parentBlock - блок родитель, внутри которого будет создан rangeslider 
   */
  constructor ( parentBlock: JQuery ) {
    this.sliderName = `${parentBlock.attr('id')}`;
    this.pointers = [];
    parentBlock.prepend(`<div id=${this.sliderName}-container class='boltunov-rangeslider'></div>`);
    this.area = this.areaSubView( parentBlock );  // area - это подкласс области
    this.cPanel = this.cPanelSubView( parentBlock );

  }

  /**
   * Подкласс для создания и рендера области rangeslider
   * @param parentBlock - блок родитель, внутри которого будет создан rangeslider 
   * @returns - возвращаяет созданный объект подкласса области класса View 
   */
  areaSubView( parentBlock: JQuery ): SubViewComponent {
    class AreaSubView {
      componentIdSelector: JQuery
      htmlStartingClasses: string
      
      constructor( parentBlock: JQuery ) {
        const sliderName: string = `${parentBlock.attr('id')}`;
        this.htmlStartingClasses = `boltunov-rangeslider__area`;
        parentBlock.children(`#${sliderName}-container`).append(`<div id='${sliderName}-area'></div>`);
        this.componentIdSelector = parentBlock.find(`#${sliderName}-area`);
        this.componentIdSelector.addClass(this.htmlStartingClasses);
      }

      getComponentId(): JQuery{
        return this.componentIdSelector;
      }

      renderComponent(name: string): void{
        this.componentIdSelector.addClass(`boltunov-rangeslider__area--${name}`)
      }

      updateComponent(options: string): void{
        this.componentIdSelector.removeClass();
        this.componentIdSelector.addClass(`${this.htmlStartingClasses} boltunov-rangeslider__area--${options}`)
      }
    }

    return new AreaSubView( parentBlock );
  }

  pointerSubView(parentBlock: JQuery, pointerName: string): PointerSubViewComponent {
    class PointerSubView {
      componentIdSelector: JQuery
      
      constructor( parentBlock: JQuery, pointerName: string ) {
        parentBlock.append(`<div id='${pointerName}' class='boltunov-rangeslider-pointer boltunov-rangeslider-pointer--round'>
          <div class='boltunov-rangeslider-pointer__tip'></div></div>`);
        this.componentIdSelector = parentBlock.find(`#${pointerName}`);
      }

      getComponentId(): JQuery{
        return this.componentIdSelector;
      }

      renderComponent(options: string): void{
        this.componentIdSelector.css(options);
      }

      setTipValue(value: number): void{
        this.componentIdSelector.find('div[class*=__tip]').text(value);
      }

      updateComponent(options: string): void{
        this.componentIdSelector.removeAttr('style');
        this.componentIdSelector.css(options);
      }

    }

    return new PointerSubView( parentBlock, pointerName );
  }

  cPanelSubView( parentBlock: JQuery): SubViewComponent {
    class CPanelSubView {
      componentIdSelector: JQuery;
      constructor( parentBlock: JQuery ) {
        const sliderName: string = `${parentBlock.attr('id')}`;
        parentBlock.children(`#${sliderName}-container`).append(`<div id='${sliderName}-CPanel' class='boltunov-rangeslider__control-panel'>
          </div>`);
        this.componentIdSelector = parentBlock.find(`#${sliderName}-CPanel`);
        this.componentIdSelector.append(`
          <p id='${sliderName}-direction'>
            <label class="switch">
              <input type="checkbox" checked>
              <span class="slider"></span>
            </label>
            Vertical/Horizontal
          </p>
          <p id='${sliderName}-MIN'>
            <label class="input">
              <input type="text" value="">
            </label>
            Min
          </p>
          <p id='${sliderName}-MAX'>
            <label class="input">
              <input type="text" value="">
            </label>
            Max
          </p>
          <p id='${sliderName}-rangeOrSingle'>
            <label class="input">
              <input type="text" value="">
            </label>
            Singe/Range
          </p>
          <p id='${sliderName}-rangeOrSingle'>
            <label class="input">
              <input type="text" value="">
            </label>
            Singe/Range
          </p>
          <p id='${sliderName}-tipsToggle'>
            <label class="switch">
              <input type="checkbox">
              <span class="slider"></span>
            </label>
            Toggle Tips
          </p>
        `);
      }

      getComponentId(): JQuery{
        return this.componentIdSelector;
      }

      activateListeners(): void{
        const tipsToggleEvent = new Event(rangesliderEvents.tips,{bubbles:true});
        const directionToggleEvent = new Event(rangesliderEvents.direction,{bubbles:true});
        this.componentIdSelector.find('input').on('click', function() {
          const pIdSplitted = this.closest('p').id.split('-');
          const inputId = pIdSplitted[pIdSplitted.length-1];
          switch (inputId) {
            case 'tipsToggle' : 
              this.dispatchEvent(tipsToggleEvent);
              break;
            case 'direction' :
              this.dispatchEvent(directionToggleEvent);
              break;
          }
        })
      }

      renderComponent(options: RangesliderStateOptions): void{
        this.activateListeners();
        if ( !options.showPanel ) this.componentIdSelector.css('display','none');
        else this.componentIdSelector.css('display','block');
      }

      updateComponent(options: string): void{
        this.componentIdSelector.removeAttr('style');
        this.componentIdSelector.css(options);
      }

    }
    return new CPanelSubView( parentBlock );
  }

  /**
   * Добавляет указатели в HTML разметку
   * @param length количество указателей
   * @returns массив классов указателей
   */
  createPointers(length: number): Array<PointerSubViewComponent>{
    const pointersArray = [];
    for (let index = 0; index < length; index++){
      pointersArray[index] = this.pointerSubView(this.area.getComponentId(), `${this.sliderName}-pointer-${index}`);
    }
    return pointersArray;
  }

  getPointersNodesID(): Array<JQuery>{
    let pointerNodes: Array<JQuery> = [];
    this.pointers.forEach((val) => {
      pointerNodes.push(val.getComponentId());
    });
    return pointerNodes;
  }

  UpdatePointers(options: RangesliderStateOptions ): void{
    options.pointers.forEach( (pointer, index) => {
      let pointerNodeWidth = $(this.pointers[index].getComponentId()).width();
      this.pointers[index].updateComponent({
        [`${options._sliderPointerDirection.centeringSliderOnArea}`] : '-50%',
        [`${options._sliderPointerDirection.sliderStartIndent}`] : `${pointer._percentMarginStartingValue}%`,
        [`margin-${options._sliderPointerDirection.sliderStartIndent}`] : `-${pointerNodeWidth/2}px`,
      });
      this.pointers[index].setTipValue(options.pointers[index].endValue);
    });
  }

  /**
   * Переключает видимость подсказок над указателями
   */
   toggleTips(): void{
    this.pointers.forEach((pointer) => {
      let pointerTipNode:JQuery = pointer.getComponentId().find('.boltunov-rangeslider-pointer__tip');
      if ( pointerTipNode.css('display') === 'none'){
        pointerTipNode.css('display','block');
      }
      else {
        pointerTipNode.css('display','none');
      }
    });
  }

  /**
   * Ниже работа с панелью управления
   */
  showCPanel (): void {
    this.cPanel.updateComponent({'display' : 'block'});
  }

  hideCPanel (): void {
    this.cPanel.updateComponent({'display' : 'none'});
  }

  /**
   * Первичная отрисовка всех суб-компонентов
   * @param options "Опции для рендеринга (направление слайдера, кол-во поинтеров, их позиции)."
   */
  renderComponents(options: RangesliderStateOptions): void{
    this.area.renderComponent(options.sliderDirection);
    this.cPanel.renderComponent(options);
    this.pointers = this.createPointers(options.pointers.length);
    options.pointers.forEach( (pointer, index) => {
      let pointerNodeWidth = $(this.pointers[index].getComponentId()).width();
      this.pointers[index].renderComponent({
        [`${options._sliderPointerDirection.centeringSliderOnArea}`] : '-50%',
        [`${options._sliderPointerDirection.sliderStartIndent}`] : `${pointer._percentMarginStartingValue}%`,
        [`margin-${options._sliderPointerDirection.sliderStartIndent}`] : `-${pointerNodeWidth/2}px`,
      });
      this.pointers[index].setTipValue(options.pointers[index].endValue);
    });
  }

}

export {View}