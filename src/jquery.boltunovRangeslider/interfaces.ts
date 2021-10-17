type SliderDirection = 'horizontal' | 'vertical';   // Тип для описания направления ползунка

interface rangesliderDependenceStyles {   // Зависимые от SliderDirection параметры (от направления)
  sliderStartIndent: 'left' | 'top';    // Отступ от края ползунка - край зависит от направления 
  centeringSliderOnArea: 'left' | null; // Для центровки ползунка на слайдере
}


interface PointerInfo {
  nowValue: number;
  _percentMarginstartingValue: number;
}

interface PointersInfo extends Array<PointerInfo>{}

interface RangesliderStateOptions {
  _sliderPointerDirection: rangesliderDependenceStyles; //READONLY или PRIVATE?
  rangesliderType: 'single' | 'range';
  startingValue: number;    // Устанавливает текущее значение между minValue и maxValue (range) или просто значение 
  pointers: PointersInfo;
  minValue: number;   // Максимально возможное значение
  maxValue: number;   // Минимально возможное значение
  startRange?: number;
  step: number;
  signification: string;  // Условное обозначение (единица измерения, если угодно)
  sliderDirection: SliderDirection;   // Направление ползунка (горизонтальный или вертикальный)
}

interface SubViewComponent {
  componentIdSelector: JQuery;
  getComponentId(): JQuery;
  renderComponent(options: RangesliderStateOptions): void;
  updateComponent(): void;
}

export { SliderDirection, rangesliderDependenceStyles, RangesliderStateOptions, SubViewComponent}