class MinorStatisticDecorator extends APieChartDecorator 
{
    constructor(chart, font =  {'fontSize' : 8, 'fontFamily' : 'Times New Roman, Times, serif', 'fontStyle' : 400,
        'textColor' : 'black'})
    {
        super(chart);
        this._font = font;
    }

    CreateChart()
    {
        this._chart.CreateChart();
        this._AddMinorStatistic();
    }

    _AddMinorStatistic()
    {
        var text = d3.min(this._data, d => { return d.value; }) + '%';
        this._group.add(new Konva.Text({
            x: -(this._GetFontWidth(text) / 2),
            y: -(this._GetFontWidth('M') / 2),
            text: text,
            fontSize: this._font.fontSize,
            fontFamily: this._font.fontFamily,
            fill: this._font.textColor,
        }));
    }
    _GetFontWidth(text)
    {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        ctx.font = this._font.fontStyle + ' ' + this._font.fontSize + 'px ' + this._font.fontFamily;
        var helper = ctx.measureText(text).width;
        canvas.remove();

        return helper;
    }
}