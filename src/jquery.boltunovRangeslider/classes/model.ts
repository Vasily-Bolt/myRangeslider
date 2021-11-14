import {RangesliderDependenceStyles, RangesliderStateOptions} from '../interfaces';

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
    
    let fixedPointersValues = this.rangesliderStateOptions.pointers.map( (obj) => {

    });
    this.rangesliderStateOptions.pointers[0].endValue = this.pointerValueRoundToStep(this.rangesliderStateOptions.pointers[0].endValue);
    this.rangesliderStateOptions.pointers[0]._percentMarginstartingValue = this.valueToMargin();
  }

  /**
  * Пересчет параметра значения в значение отсутпа в % от начальной точки слайдера
  * @returns margin в % от начальной точки
  * TODO Надо сделать перебор массива для подсчета каждого значения в обеъктах!
  */
  valueToMargin(): number{
    const rangeValue = this.rangesliderStateOptions.maxValue - this.rangesliderStateOptions.minValue;
    const stepInPercents = rangeValue / 100;
    return this.rangesliderStateOptions.pointers[0].endValue / stepInPercents;
  }

  TwopointerValueRoundToStep(array: number): number{
    return 1;
  }

  pointerValueRoundToStep(val: number): number{
    return Math.round(val/this.rangesliderStateOptions.step) * this.rangesliderStateOptions.step;
  }

  getOptions(): RangesliderStateOptions {
    return this.rangesliderStateOptions;
  }
}

export default Model