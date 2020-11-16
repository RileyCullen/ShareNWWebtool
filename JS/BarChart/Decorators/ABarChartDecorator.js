// Cullen, Riley
// ABarChartDecorator.js
// October 7, 2020

class ABarChartDecorator extends ABarChart
{
    /**
     * @summary     This abstract class provides the structure for the 
     *              BarChartDecorator type.
     * @description This type provides a common structure for all BarChartDecorators
     *              to inherit from. This class also defines an instance variable
     *              unique to the decorators called chart.
     * 
     * @requires ABarChart.js
     * 
     * @see ABarChart.js
     * 
     * @param {BarChart} chart : This type is a concrete bar chart (or decorator)
     *                           that we plan on decorating.
     */
    constructor(chart) {
        super(chart._data, chart._group, chart._chartWidth, chart._chartHeight, chart._padding, chart._rotateBy);
        this._chart = chart;
        
        if (this.constructor === ABarChartDecorator) {
            throw new TypeError('Abstract class "ABarChartDecorator" cannot be instantiated');
        }
    }

    /**
     * @summary     Updates the decorator with a new chart value.
     * @description Updates the data, chart, and yScale associated with this
     *              particular decorator.
     * 
     * @param {BarChart} chart The bar chart we want to base our update on.
     */
    UpdateDecorator(chart)
    {
        this._data = chart._data;
        this._chart = chart;
        this._yScale = chart._yScale;
    }

    /**
     * @summary     Returns the width of a given piece of text in pixels.
     * @description Uses the canvas measureText function to determine the width
     *              of a particular piece of text given a specific font. 
     * 
     * @param {String} text      The text we want to measure.
     * @param {JSON Object} font The font of the text we want to measure. 
     */
    _GetFontSize(text, font)
    {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        ctx.font = font.fontSize + 'px ' + font.fontFamily;
        var helper = ctx.measureText(text).width;
        canvas.remove();

        return helper;
    }
}