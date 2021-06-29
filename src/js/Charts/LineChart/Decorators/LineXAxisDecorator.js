// Cullen, Riley
// LineXAxisDecorator
// May 13, 2021

import { ALineChartDecorator } from "./ALineChartDecorator";
import Konva from 'konva';
import * as d3 from 'd3';

class LineXAxisDecorator extends ALineChartDecorator
{
    /**
     * @summary     Adds a x-axis to the chart.
     * @description Creates a x-axis in Konva.JS and adds it to the chart.
     * 
     * @param {ALineChart} chart           The chart we want to decorate.
     * @param {string}     axisLabel       The axis label.
     * @param {string}     option          Determines which part of the date we display
     *                                     on the x axis tick labels.
     * @param {double}     lineColor       The color of the axis.
     * @param {double}     lineStrokeWidth The size of the axis.
     * @param {double}     tickStrokeWidth The size of the ticks.
     * @param {JSON Array} font            Font used to display the axis text.
     */
    constructor({
        chart,
        axisLabel = 'none', 
        option = 'Year',
        lineColor = 'black', 
        lineStrokeWidth = 1, 
        tickStrokeWidth = 0.5, 
        font = {
            fontSize: 10, 
            fontFamily: 'Times New Roman, Times, serif', 
            textColor: 'black'
        },
    }) 
    {
        super(chart);
        this._axisLabel = axisLabel;
        this._lineColor = lineColor;
        this._lineStrokeWidth = lineStrokeWidth;
        this._tickStrokeWidth = tickStrokeWidth;
        this._font = font;
        this._option = option;
    }

    /**
     * @summary     Creates a chart with an x-axis.
     */
    CreateChart()
    {
        this._chart.CreateChart();
        this._CreateXAxis();
    }

    /**
     * @summary     Helper function that calls _CreateAxis, _CreateTicks, _CreateAxisLabel.
     */
    _CreateXAxis()
    {
        this._CreateAxis();    
        var maxHeight = this._CreateTicks();
        this._CreateAxisLabel(maxHeight);
    }

    /**
     * @summary Creates the x-axis using Konva.js.
     */
    _CreateAxis()
    {
        var helper = new Konva.Group();
        this._group.add(helper);
        helper.add(new Konva.Line({
            points: [0 - this._internalOffsetX, this._chartHeight - this._internalOffsetY,
                this._chartWidth + 3 * this._internalOffsetX, this._chartHeight - this._internalOffsetY],
            stroke: this._lineColor,
            strokeWidth: this._lineStrokeWidth,
        }));
    }

    /**
     * @summary Creates the tick marks and tick mark labels.
     * @returns The max height of the tick marks + the tick mark labels.
     */
    _CreateTicks()
    {
        var helper = new Konva.Group();
        var textHeight = this._GetFontSize('M', this._font);
        this._group.add(helper);
        this._xScale.domain().forEach(d => {
            helper.add(new Konva.Line({
                points: [this._xScale(d) + this._internalOffsetX, 
                    this._chartHeight - this._internalOffsetY, 
                    this._xScale(d) + this._internalOffsetX, 
                    this._chartHeight + 6 - this._internalOffsetY
                ],
                stroke: this._lineColor,
                strokeWidth: this._tickStrokeWidth,
            }));

            // clean text 
            var label = this._GetTextLabel(d);
            console.log(label)
            var textWidth = this._GetFontSize(label, this._font);
            var text = new Konva.Text({
                text: label,
                fill: this._font.textColor,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                x: this._xScale(d) - (textWidth / 2) + this._internalOffsetX,
                y: this._chartHeight + (textHeight) - this._internalOffsetY,
            }) 
            helper.add(text);
        });
        return 2 * textHeight + this._chartHeight - this._internalOffsetY + 5;
    }

    /**
     * @summary Creates the axis label.
     */
    _CreateAxisLabel(maxHeight)
    {
        if (this._axisLabel === 'none') return;

        var textWidth = this._GetFontSize(this._axisLabel, this._font),
            xPos = (this._chartWidth + this._internalOffsetX) / 2 - (textWidth / 2),
            yPos = maxHeight;

        var textLabel = new Konva.Text({
            x: xPos,
            y: yPos,
            text: this._axisLabel,
            fontSize: this._font.fontSize,
            fontFamily: this._font.fontFamily,
            fill: this._font.textColor,
        });
        this._group.add(textLabel);
    }

    /**
     * @summary Gets the text label based on _option.
     */
    _GetTextLabel(date)
    {
        if (this._option === 'Year') return d3.timeFormat('%Y')(date);
        return date;
    }
}

export { LineXAxisDecorator };