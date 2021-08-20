// Cullen, Riley
// ABarChartDecorator.js
// October 7, 2020

import { ABarChart } from '../ConcreteCharts/ABarChart';

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
     * @param {BarChart} chart This type is a concrete bar chart (or decorator)
     *                           that we plan on decorating.
     */
    constructor(chart) 
    {
        super(chart._data, chart._group, chart._chartWidth, chart._chartHeight, chart._padding, chart._rotateBy, chart._chartType);
        this._chart = chart;
        this._yScale = chart._yScale;

        if (this.constructor === ABarChartDecorator) {
            throw new TypeError('Abstract class "ABarChartDecorator" cannot be instantiated');
        }
    }

    /**
     * @summary     Updates the decorator with a new data array.
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
        this._xScale = chart._xScale;

        this._chartWidth = chart._chartWidth;
        this._chartHeight = chart._chartHeight;
        this._padding = chart._padding;
        this._rotateBy = chart._rotateBy;
    }

    /**
     * @summary     Returns the width of a given piece of text in pixels.
     * @description Uses the canvas measureText function to determine the width
     *              of a particular piece of text given a specific font. 
     * 
     * @param {String} text      The text we want to measure.
     * @param {JSON Object} font The font of the text we want to measure. 
     * 
     * NOTE: This is an old method. _GetTextWidth/_GetTextHeight should be used instead.
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

    _GetTextWidth(text, font)
    {
        var canvas = document.createElement('canvas');
        var ctx    = canvas.getContext('2d');

        document.getElementById('body').appendChild(canvas)

        ctx.font = font.fontSize + 'px ' + font.fontFamily;
        var textMetrics = ctx.measureText(text);
        var width = Math.abs(textMetrics.actualBoundingBoxLeft 
            - textMetrics.actualBoundingBoxRight);

        canvas.remove();

        return width; 
    }

    _GetIconWidth(icon, iconSize)
    {
        var font = {
            fontSize: '900 ' + iconSize,
            fontFamily: '"Font Awesome 5 Free"',
        }
        return this._GetTextWidth(icon, font);
    }

    _GetTextHeight(text, font)
    {
        var canvas = document.createElement('canvas');
        var ctx    = canvas.getContext('2d');

        ctx.font = font.fontSize + 'px ' + font.fontFamily;
        var textMetrics = ctx.measureText(text);
        var height = Math.abs(textMetrics.actualBoundingBoxAscent) - 
            Math.abs(textMetrics.actualBoundingBoxDescent);
        
        canvas.remove();

        return height;
    }

    _GetIconHeight(icon, iconSize)
    {
        var font = {
            fontSize: '900 ' + iconSize,
            fontFamily: '"Font Awesome 5 Free"',
        }
        return this._GetTextHeight(icon, font);
    }
}

export { ABarChartDecorator };