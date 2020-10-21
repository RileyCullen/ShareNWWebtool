class ChartOutlineDecorator extends APieChartDecorator
{
    constructor(chart, radius, outlineWidth, outlineColor)
    {
        super(chart);
        this._outlineWidth = outlineWidth;
        this._outlineColor = outlineColor;
        this._startingRadius = radius;
    }

    CreateChart()
    {
        this._chart.CreateChart();
        this._DrawOutline();
    }

    _DrawOutline()
    {
        this._group.add(new Konva.Ring({
            innerRadius: this._startingRadius,
            outerRadius: this._startingRadius + (3/2) * this._outlineWidth,
            fill: this._outlineColor,
        }));
    }
}