class CategoryLabelDecorator extends ABarChartDecorator
{
    // TODO add rotation factor
    constructor(chart, isWithinBars = true, isTop = true, font = 
        {'fontSize' : 10, 'fontFamily' : 'Times New Roman, Times, serif', 'textColor' : 'black'})
    {
        super(chart);
        this._isWithinBars = isWithinBars;
        this._isTop = isTop;
        this._keys = this._GetGroups();
        this._font = font;
    }

    CreateBarChart()
    {
        this._chart.CreateBarChart();
        this._CreateLabels();
    }

    _CreateLabels()
    {
        var iter = this._keys.values();
        var helper = new Konva.Group();
        var textHeight = GetFontSize('M', this._font);
        for (var i = iter.next().value; i != null; i = iter.next().value) {
            var width = GetFontSize(i, this._font);
            var height = this._GetBarHeight(i);
            var x = (this._xScale(i) + this._xScale.bandwidth() / 2) - (width / 2)
            var y = (this._isTop) ? chartHeight - height + textHeight / 2: chartHeight - 1.5 * textHeight;

            if (!this._isWithinBars) {
                y = (this._isTop) ? y - 2 * textHeight : y + 2 * textHeight;
            }

            var text = new Konva.Text({
                text: i,
                x: x,
                y: y,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                fill: this._font.textColor,
            });
            helper.add(text);
        }
        this._group.add(helper);
    }

    _GetBarHeight(category)
    {
        var barHeight = 0;
        this._data.forEach(d => {
            if (d.category === category) barHeight += (this._chartHeight - this._yScale(d.value));
        });
        return barHeight;
    }
}