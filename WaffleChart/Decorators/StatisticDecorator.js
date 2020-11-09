class StatisticDecorator extends AWaffleChartDecorator
{
    constructor(chart, middleText, group = 0, font =  {'fontSize' : 8, 
        'fontFamily' : 'Times New Roman, Times, serif', 'fontStyle' : 400,
        'textColor' : 'black'},)
    {
        super(chart);
        this._top = new Konva.Group();
        this._middleText = middleText;
        this._helper = group;
        this._font = font;
    }

    CreateChart()
    {
        this._chart.CreateChart();
        this._CleanTop();
        this._AddStatistic();
    }

    _CleanTop()
    {
        this._top.destroyChildren();
    }

    _AddStatistic()
    {  
        var text = this._numerator + ' ' + this._middleText + ' ' + this._denominator;
        console.log('num: ' + this._numerator);
        this._top.add(new Konva.Text({
            text: text,
            fontSize: this._font.fontSize,
            fontFamily: this._font.fontFamily,
            fontStyle: this._font.fontStyle,
            fill: this._font.textColor,
        }));

        if (this._helper === 0) this._group.add(this._top);
        else this._helper.add(this._top);
    }
}