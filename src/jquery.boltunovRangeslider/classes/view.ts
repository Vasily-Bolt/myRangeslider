import {RangesliderStateOptions, SubViewComponent} from '../interfaces';

class View {
  area: SubViewComponent;
  pointers: Array<SubViewComponent>;
  
  /**
   * Конструктор View. 
   * @param parentBlock - блок родитель, внутри которого будет создан rangeslider 
   */
   constructor ( parentBlock: JQuery ) {
    const sliderName: string = `${parentBlock.attr('id')}`;
    parentBlock.prepend(`<div id=${sliderName}-container class='boltunov-rangeslider'></div>`);
    this.area = this.areaSubView( parentBlock );  // area - это подкласс области 
    this.pointers = [
      this.pointerSubView(this.area.getComponentId(), `${sliderName}-pointer-end`), 
      this.pointerSubView(this.area.getComponentId(), `${sliderName}-pointer-two`)
    ];
  }

  /**
   * Подкласс для создания и рендера области rangeslider
   * @param parentBlock - блок родитель, внутри которого будет создан rangeslider 
   * @returns - возвращаяет созданный объект подкласса области класса View 
   */
  areaSubView( parentBlock: JQuery ): SubViewComponent {
    class AreaSubView {
      componentIdSelector: JQuery
      
      constructor( parentBlock: JQuery ) {
        const sliderName: string = `${parentBlock.attr('id')}`;
        parentBlock.children(`#${sliderName}-container`).append(`<div id='${sliderName}-area' class='boltunov-rangeslider__area'></div>`);
        this.componentIdSelector = parentBlock.find(`#${sliderName}-area`);
      }

      getComponentId(): JQuery{
        return this.componentIdSelector;
      }

      renderComponent(name: string): void{
        this.componentIdSelector.addClass(`boltunov-rangeslider__area--${name}`)
      }

      updateComponent(): void{
        
      }
    }

    return new AreaSubView( parentBlock );
  }

  pointerSubView(parentBlock: JQuery, pointerName: string): SubViewComponent {
    class PointerSubView {
      componentIdSelector: JQuery
      
      constructor( parentBlock: JQuery, pointerName: string ) {
        parentBlock.append(`<div id='${pointerName}' class='boltunov-rangeslider__pointer boltunov-rangeslider__pointer--round'></div>`);
        this.componentIdSelector = parentBlock.find(`#${pointerName}`);
      }

      getComponentId(): JQuery{
        return this.componentIdSelector;
      }

      renderComponent(options: string): void{
        this.componentIdSelector.css(options);
      }

      updateComponent(): void{

      }
    }

    return new PointerSubView( parentBlock, pointerName );
  }


  /**
   * Первичная отрисовка всех суб-компонентов
   * @param options "Получаем опции компонента из Модели и передаем в эту функцию."
   */
  renderComponents(options: RangesliderStateOptions): void {
    this.area.renderComponent(options.sliderDirection);
    options.pointers.forEach( (pointer, index) => {
      this.pointers[index].renderComponent({
        [`${options._sliderPointerDirection.centeringSliderOnArea}`] : '-50%',
        [`${options._sliderPointerDirection.sliderStartIndent}`] : `${pointer._percentMarginstartingValue}%`,
      });
    });
  }

}

export {View}