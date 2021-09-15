// Cullen, Riley
// XAxisDecorator.js
// October 10, 2020

import { ABarChartDecorator } from "./ABarChartDecorator";
import Konva from 'konva';
import Lodash from 'lodash';

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
     * @param {BarChart}   chart           This type is a concrete bar chart (or decorator)
     *                                     that we plan on decorating.
     * @param {string}     lineColor       The color of the axis and its tick marks
     * @param {int}        lineStrokeWidth Width of the x-axis
     * @param {int}        tickStrokeWidth Width of the x-axis ticks
     * @param {JSON Array} font            Determines font size and font family
     */
    constructor({chart, axisLabel = 'none', lineColor = 'black', lineStrokeWidth = 1, tickStrokeWidth = 0.5,
        font = {fontSize : 10, fontFamily : 'Times New Roman, Times, serif', textColor : '#000'}})
    {
        super(chart);
        this._lineColor = lineColor;
        this._axisLabel = axisLabel;
        this._lineStrokeWidth = lineStrokeWidth;
        this._tickStrokeWidth = tickStrokeWidth;
        this._font = Lodash.cloneDeep(font);
    }

    /**
     * @summary     This function adds an x-axis to the given BarChart type.
     * @description This function calls _chart's CreateBarChart method as well
     *              as _CreateXAxis.
     */
    CreateChart()
    {
        this._chart.CreateChart();
        this._CreateXAxis();
    }

    GetDecoratorSettings()
    {
        return {
            xAxis: {
                axis: {
                    label: this._axisLabel
                },
                font: this._font,
                color: {
                    lineColor: this._lineColor,
                },
                size: {
                    lineStrokeWidth: this._lineStrokeWidth,
                    tickStrokeWidth: this._tickStrokeWidth,
                }
            }
        }
    }

    /**
     * @summary     This function adds an x-axis to the given BarChart type.
     * @description This function creates an x-axis by calling _CreateAxis
     *              and _AddTicks.
     */
    _CreateXAxis()
    {
        this._CreateAxis();
        var maxHeight = this._AddTicks();
        this._CreateAxisLabel(maxHeight);
    }

    /**
     * @summary     This function adds a base line that represents the x-axis.
     * @description This function adds a line to the Konva.Group that will
     *              serve as the base for the x-axis.
     */
    _CreateAxis()
    {
        var helper = new Konva.Group();
        helper.add(new Konva.Line({
            points: [0, this._chartHeight, this._chartWidth, this._chartHeight],
            stroke: this._lineColor,
            strokeWidth: this._lineStrokeWidth,
        }));
        helper.rotate(this._rotateBy)
        this._group.add(helper);
    }

    /**
     * @summary     This function adds tick marks and labels to the x-axis.
     * @description This function iterates through all of the previously mapped
     *              values in the xScale's domain and assigns them a tick 
     *              mark. The tick mark and the name of the mapped value are
     *              then added to the Konva.Group.
     */
    _AddTicks()
    {
        var helper = new Konva.Group();
        var textHeight = this._GetFontSize('M', this._font);
        this._xScale.domain().forEach(d => {
            helper.add(new Konva.Line({
                points: [this._xScale(d) + this._xScale.bandwidth() / 2, 
                    this._chartHeight, this._xScale(d) + this._xScale.bandwidth() / 2, 
                    this._chartHeight + 6],
                stroke: this._lineColor,
                strokeWidth: this._tickStrokeWidth,
            }));

            var textWidth = this._GetFontSize(d, this._font);
            var text = new Konva.Text({
                text: d,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                x: (this._xScale(d) + this._xScale.bandwidth() / 2) - (textWidth / 2),
                y: this._chartHeight + (textHeight),
                fill: this._font.color,
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
        return 2 * textHeight + this._chartHeight + 5;
    }

    /**
     * @summary Creates the axis label.
     */
    _CreateAxisLabel(maxHeight)
    {
        if (this._axisLabel === 'none') return;
        var textWidth = this._GetFontSize(this._axisLabel, this._font),
            xPos = this._chartWidth/2 - textWidth/2,
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
}

export { XAxisDecorator };