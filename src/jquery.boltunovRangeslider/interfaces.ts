export type SliderDirection = 'horizontal' | 'vertical';   // Тип для описания направления ползунка

export interface rangesliderDependenceStyles {   // Зависимые от SliderDirection параметры (от направления)
  sliderStartIndent: 'left' | 'top';    // Отступ от края ползунка - край зависит от направления 
  centeringSliderOnArea: 'left' | null; // Для центровки ползунка на слайдере
}

export interface RangesliderStateOptions {
  _sliderPointerDirection: rangesliderDependenceStyles; //READONLY или PRIVATE?
  rangesliderType: 'single' | 'range';
  minValue: number;   // Максимально возможное значение
  momentValue: number;    // Устанавливает текущее значение между minValue и maxValue (range) или просто значение 
  _percentMarginMomentValue: number; //% от края основываясь на momentValue
  maxValue: number;   // Минимально возможное значение
  startRange?: number;
  step: number;
  signification: string;  // Условное обозначение (единица измерения, если угодно)
  sliderDirection: SliderDirection;   // Направление ползунка (горизонтальный или вертикальный)
}

export interface SubViewComponent {
  componentIdSelector: JQuery;
  getComponentId(): JQuery;
  renderComponent(options: RangesliderStateOptions): void;
}