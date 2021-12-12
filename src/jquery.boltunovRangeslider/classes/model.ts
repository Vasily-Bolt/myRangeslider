import {RangesliderDependenceStyles, RangesliderStateOptions, PointersInfo} from '../interfaces';

class Model {
  private sliderHorizontalDependencies: RangesliderDependenceStyles = {
    sliderStartIndent : 'left',
    centeringSliderOnArea : null,
  }
  private sliderVerticalDependencies: RangesliderDependenceStyles = {
    sliderStartIndent : 'top',
    centeringSliderOnArea : 'left',
  }

  /**
   * TODO разбить на две переменные:
   * 1) Получает данные извне или устанавливает значения по умлочанию
   * 2) Остальные данные, которыми нельзя манипулировать извне
   * Объеденить в одну переменную
   */
  private rangesliderStateOptions: RangesliderStateOptions; 

  constructor ( AddonOptions?: object ) {
    this.rangesliderStateOptions = $.extend( {
      pointers: [{
        endValue: 62,
        _percentMarginstartingValue: undefined,
      },{
        endValue: 22,
        _percentMarginstartingValue: undefined,
      },
      ],
      sliderDirection: 'horizontal' as const,
      _sliderPointerDirection: undefined,
      rangesliderType: 'single' as const,
      minValue: 0,
      maxValue: 100,
      step : 5,
      signification: '%',
    }, AddonOptions);

    this.rangesliderStateOptions._sliderPointerDirection = this.rangesliderStateOptions.sliderDirection === 'vertical' 
      ? this.sliderVerticalDependencies : this.sliderHorizontalDependencies;

    if (this.rangesliderStateOptions.rangesliderType == 'range' || this.rangesliderStateOptions.pointers.length%2 != 0) {
      this.rangesliderStateOptions.pointers.length = this.rangesliderStateOptions.pointers.length-1;
    }
    
    const fixedPointersValues = this.rangesliderStateOptions.pointers.map( (obj) => {
      const rangeValue = this.rangesliderStateOptions.maxValue - this.rangesliderStateOptions.minValue;
      const newObj = Object.assign({},obj);
      newObj.endValue = this.pointerValueRoundToStep(obj.endValue);
      newObj.endValue = this.pointerValueCheckMinMax(this.rangesliderStateOptions.maxValue, this.rangesliderStateOptions.minValue, newObj.endValue);
      newObj._percentMarginstartingValue = this.valueToMargin(rangeValue, obj.endValue);
      return newObj;
    });
    this.rangesliderStateOptions.pointers = Array.from(fixedPointersValues);
  }

  /**
  * Пересчет параметра значения в значение отсутпа в % от начальной точки слайдера
  * @returns margin в % от начальной точки
  */
  valueToMargin(rangeValue: number, value: number): number{
    const stepInPercents = rangeValue / 100;
    return value / stepInPercents;
  }

  /**
   * Проверка, чтобы значение соответствовало промежутку между max и min
   * @param val Значение pointer
   * @returns Исправленное значение с при нахождении вне промежутка
   */
  pointerValueCheckMinMax(max: number, min: number, val: number): number{
    if (val < min) return min;
    if (val > max) return max;
    return val;
  }

  /**
   * Округление значения указателя до шага
   * @param val значение, которые будем проверять.
   * @returns исправленное значение, которое округлено до шага
   */
  pointerValueRoundToStep(val: number): number{
    return Math.round(val/this.rangesliderStateOptions.step) * this.rangesliderStateOptions.step;
  }
  
  /**
   * Возвращает опции.
   * TODO - убрать из возвращаемых все с "_"
  */
  getOptions(): RangesliderStateOptions {
    return this.rangesliderStateOptions;
  }

  /**
   * Возвращает массив указателей (pointers)
   */
  getPointers():PointersInfo {
    return this.rangesliderStateOptions.pointers;
  }
}

export default Model