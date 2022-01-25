// Cullen, Riley
// ALineChartDecorator.js
// May 13, 2021

import { ALineChart } from '../ALineChart';

class ALineChartDecorator extends ALineChart 
{
    /**
     * @summary     Abstract class defining the Decorator type for the LineChart
     *              type.
     * @description An abstract class that provides a common interface for the 
     *              line chart decorators.
     * 
     * @param {ALineChart} chart The chart we want to decorate.
     */
    constructor(chart)
    {
        super({
            data: chart._data,
            group: chart._group,
            chartWidth: chart._chartWidth,
            chartHeight: chart._chartHeight,
            lineWidth: chart._lineWidth,
            pointRadius: chart._pointRadius,
            pointColor: chart._pointColor,
            lineColor: chart._lineColor,
            internalOffsetX: chart._internalOffsetX,
            internalOffsetY: chart._internalOffsetY,
            backgroundColor: chart._backgroundColor,
        });
        this._chart = chart;
        
        if (this._constructor === ALineChartDecorator) {
            throw new TypeError('Abstract class "ALineChartDecorator" cannot' + 
                ' be instantiated.');
        }
    }

    /**
     * @summary     Updates the decorator.
     * @description Updates the decorators chart, which will then update the 
     *              chart's instance variables.
     * 
     * @param {ALineChart} chart The chart we want to base our update on.
     */
    UpdateDecorator(chart) 
    { 
        this._data = chart._data;
        this._chart = chart;
        this._yScale = chart._yScale;
        this._xScale = chart._xScale;

        this._chartHeight = chart._chartHeight;
        this._chartWidth = chart._chartWidth;
        this._lineWidth = chart._lineWidth;
        this._pointRadius = chart._pointRadius;
        this._pointColor = chart._pointColor;
        this._lineColor = chart._lineColor;
        this._internalOffsetX = chart._internalOffsetX;
        this._internalOffsetY = chart._internalOffsetY;
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

export { ALineChartDecorator };