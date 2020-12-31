// Cullen, Riley
// DonutDecorator.js
// October 18, 2020

class DonutDecorator extends APieChartDecorator
{
    /**
     * @summary     Turns chart into a donut chart.
     * @description This decorator turns a given pie chart into a donut chart
     *              by adding a smaller circle in the center of a given pie chart.
     * 
     * @requires APieChartDecorator.js
     * 
     * @see APieChartDecorator.js
     * 
     * @param {APieChart} chart       : The chart we want to decorate
     * @param {float}     innerRadius : Radius of smaller circle
     * @param {string}    color       : The color of the smaller circle
     */
    constructor(chart, innerRadius, color = 'white')
    {
        super(chart);
        this._innerRadius = (innerRadius > this._radius - 10) ? this._radius - 30 : innerRadius;
        this._color = color;
    }

    /**
     * @summary     Creates pie chart, decorates it, and adds it to group.
     * @description Calls _chart's CreateChart method and calls _DrawInnerCircle
     *              to turn the given pie chart into a donut chart.
     */
    CreateChart()
    {
        this._chart.CreateChart();
        this._DrawInnerCircle();
    }

    /**
     * @summary     Draws inner circle.
     * @description See summary.
     */
    _DrawInnerCircle()
    {
        this._group.add(new Konva.Circle({
            radius: this._innerRadius,
            fill: this._color,
            x: this._startingX,
            y: this._startingY,
        }));
    }

    /**
     * @summary Updates GetRadius to return _innerRadius instead of _radius.
     */
    GetRadius()
    {
        return this._innerRadius;
    }
}