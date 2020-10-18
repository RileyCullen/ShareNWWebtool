// Cullen, Riley
// XAxisDecorator.js
// October 10, 2020

class XAxisDecorator extends ABarChartDecorator
{
    /**
     * @summary     This type is a concrete decorator that adds a x-axis to the 
     *              bar chart. 
     * @description This class adds a x-axis line, tick marks, and tick labels
     *              to the given bar chart (or decorator).
     * 
     * @requires ABarChartDecorator.js
     * @requires FontWidthDetector.js
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
         * @summary     This function adds an x-axis to the given BarChart type.
         * @description This function calls _chart's CreateBarChart method as well
         *              as _CreateXAxis.
         */
        this._chart.CreateBarChart();
        this._CreateXAxis();
    }

    _CreateXAxis()
    {
        /**
         * @summary     This function adds an x-axis to the given BarChart type.
         * @description This function creates an x-axis by calling _CreateAxis
         *              and _AddTicks.
         */
        this._CreateAxis();
        this._AddTicks();
    }

    _CreateAxis()
    {
        /**
         * @summary     This function adds a base line that represents the x-axis.
         * @description This function adds a line to the Konva.Group that will
         *              serve as the base for the x-axis.
         */
        var helper = new Konva.Group();
        helper.add(new Konva.Line({
            points: [0, this._chartHeight, this._chartWidth, this._chartHeight],
            stroke: this._lineColor,
            strokeWidth: this._lineStrokeWidth,
        }));
        helper.rotate(this._rotateBy)
        this._group.add(helper);
    }

    _AddTicks()
    {
        /**
         * @summary     This function adds tick marks and labels to the x-axis.
         * @description This function iterates through all of the previously mapped
         *              values in the xScale's domain and assigns them a tick 
         *              mark. The tick mark and the name of the mapped value are
         *              then added to the Konva.Group.
         */
        var helper = new Konva.Group();
        var textHeight = GetFontSize('M', this._font);
        this._xScale.domain().forEach(d => {
            helper.add(new Konva.Line({
                points: [this._xScale(d) + this._xScale.bandwidth() / 2, 
                    this._chartHeight, this._xScale(d) + this._xScale.bandwidth() / 2, 
                    this._chartHeight + 6],
                stroke: this._lineColor,
                strokeWidth: this._tickStrokeWidth,
            }));

            var textWidth = GetFontSize(d, this._font);
            var text = new Konva.Text({
                text: d,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                x: (this._xScale(d) + this._xScale.bandwidth() / 2) - (textWidth / 2),
                y: this._chartHeight + (textHeight / 2),
            }) 
            helper.add(text);
            if (this._rotateBy === 90) {
                text.setAttr('x', text.getAttr('x') + (textWidth / 2) - (textHeight / 2));
                text.setAttr('y', text.getAttr('y') + (textHeight) + textWidth);
                text.rotate(-this._rotateBy);
            }
        });
        this._group.add(helper);
        helper.rotate(this._rotateBy);
    }
}