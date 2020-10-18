// Cullen, Riley
// YAxisDecorator.js
// October 8, 2020

class YAxisDecorator extends ABarChartDecorator
{
    /**
     * @summary     This type is a concrete decorator that adds a y-axis to the 
     *              bar chart. 
     * @description This class adds a y-axis line, tick marks, and tick labels
     *              to the given bar chart (or decorator).
     * 
     * @requires ABarChartDecorator.js
     * 
     * @see ABarChartDecorator.js
     * 
     * @param {BarChart}   chart           : This type is a concrete bar chart (or decorator)
     *                                       that we plan on decorating.
     * @param {string}     lineColor       : The color of the axis and its tick marks
     * @param {int}        lineStrokeWidth : width of the x-axis
     * @param {int}        tickStrokeWidth : width of the x-axis ticks
     * @param {JSON Array} font            : determines font size and font family
     */
    constructor(chart, lineColor = 'black', lineStrokeWidth = 1, tickStrokeWidth = 0.5,
        font = {'fontSize' : 10, 'fontFamily' : 'Times New Roman, Times, serif', 'textColor' : 'black'})
    {
        super(chart);
        this._lineColor = lineColor;
        this._lineStrokeWidth = lineStrokeWidth;
        this._tickStrokeWidth = tickStrokeWidth;
        this._font = font;
    }

    CreateBarChart()
    {
        /**
         * @summary     This function adds an y-axis to give BarChart type.
         * @description This function calls _chart's CreateBarChart function
         *              as well as the _CreateYAxis function.
         */
        this._chart.CreateBarChart();
        this._CreateYAxis();
    }

    _CreateYAxis()
    {
        /**
         * @summary     This function adds a y-axis to the given BarChart type.
         * @description This function creates a y-axis by calling _CreateAxis
         *              and _AddTicks.
         */
        this._CreateAxis();
        this._AddTicks();
    }

    _CreateAxis()
    {
        /**
         * @summary     This function adds the base line of the y-axis.
         * @description This function creates Konva.Line object to represent the
         *              y-axis and adds it to the given Konva.Group.
         */
        var yAxis = new Konva.Line({
            points: [0, 0, 0, this._chartHeight],
            stroke: this._lineColor,
            strokeWidth: this._lineStrokeWidth,
        });
        yAxis.rotate(this._rotateBy);
        this._group.add(yAxis); 
    }

    _AddTicks()
    {
        /**
         * @summary     This function adds the tick marks and labels to the y-axis.
         * @description This function iterates through the yScale's range yTick 
         *              times and assigns each of those ticks a numeric value. 
         *              These tick marks and corresponding tick mark values are 
         *              added to the Konva.Group. It should be noted that the 
         *              canvas API does NOT offer a built in function to determine
         *              the height of text. Thus, we approximate the height of text
         *              using the width captial 'M'.
         */
        var yTicks = this._yScale.ticks(10);
        var helper = new Konva.Group();
        var tickLength = 6;
        var numberHeight = GetFontSize('M', this._font); 
        yTicks.forEach(d => {
            var numberWidth = GetFontSize(d, this._font);
            helper.add(new Konva.Line({
                points: [0, this._yScale(d) - 0.5, -tickLength, this._yScale(d) - 0.5],
                stroke: this._lineColor,
                strokeWidth: this._tickStrokeWidth,
            }));
            var text = new Konva.Text({
                text: d,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                x: -tickLength - numberWidth - 5,
                y: this._yScale(d) - (numberHeight / 2),
            }); 

            if (this._rotateBy === 90) {
                text.setAttr('x', text.getAttr('x') + (numberWidth / 2) - (numberHeight));
                text.setAttr('y', text.getAttr('y') + (numberHeight) - numberWidth / 2);
                text.rotate(-this._rotateBy)
            }
            helper.add(text);
        });
        this._group.add(helper);
        helper.rotate(this._rotateBy);
    }
}