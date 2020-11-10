class AWaffleChartDecorator extends AWaffleChart
{
    constructor(chart)
    {
        super(chart._numerator, chart._denominator, chart._group, chart._presetA, chart._presetB, chart._fontSize, chart._isDynamicResize);
        this._chart = chart;

        if (this.constructor === AWaffleChartDecorator) {
            throw new TypeError('Abstract class "AWaffleChartDecorator" cannot be instantiated');
        }
    }

    UpdateDecorator(chart)
    {
        this._numerator = chart._numerator;
        this._denominator = chart._denominator;
        this._chart = chart;
    }
}