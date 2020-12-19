class FirstStatisticDecorator extends APieChartDecorator 
{
    constructor(chart, font =  {'fontSize' : 8, 'fontFamily' : 'Times New Roman, Times, serif', 'fontStyle' : 400,
        'textColor' : 'black'}, x = 0, y = 0, group = 0)
    {
        super(chart);
        this._top = new Konva.Group();
        this._font = font;
        this._x = x;
        this._y = y;
        this._helper = group;
    }

    CreateChart()
    {
        this._CleanTop();
        this._chart.CreateChart();
        this._AddMajorStatistic();
    }

    _CleanTop()
    {
        this._top.destroyChildren();
    }

    _AddMajorStatistic()
    {
        var text = this._data[0].value + '%';
        this._top.add(new Konva.Text({
            x: this._x -(this._GetFontWidth(text) / 2),
            y: this._y -(this._GetFontWidth('M') / 2),
            text: text,
            fontSize: this._font.fontSize,
            fontFamily: this._font.fontFamily,
            fill: this._font.textColor,
        }));
        this._top.moveToTop();
        if (this._helper === 0) this._group.add(this._top);
        else this._helper.add(this._top);
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