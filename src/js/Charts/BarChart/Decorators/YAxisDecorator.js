// Cullen, Riley
// YAxisDecorator.js
// October 8, 2020

import { ABarChartDecorator } from "./ABarChartDecorator";
import Konva from 'konva';
import Lodash from 'lodash';

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
     * @param {BarChart}   chart           This type is a concrete bar chart (or decorator)
     *                                     that we plan on decorating.
     * @param {string}     lineColor       The color of the axis and its tick marks
     * @param {int}        lineStrokeWidth Width of the x-axis
     * @param {int}        tickStrokeWidth Width of the x-axis ticks
     * @param {JSON Array} font            Determines font size and font family
     */
    constructor({chart, axisLabel = 'Elephant', lineColor = 'black', lineStrokeWidth = 1, tickStrokeWidth = 0.5,
        font = {fontSize : 10, fontFamily : 'Times New Roman, Times, serif', textColor : 'black'}})
    {
        super(chart);
        this._lineColor = lineColor;
        this._axisLabel = axisLabel;
        this._lineStrokeWidth = lineStrokeWidth;
        this._tickStrokeWidth = tickStrokeWidth;
        this._font = Lodash.cloneDeep(font);
    }

    /**
     * @summary     This function adds an y-axis to give BarChart type.
     * @description This function calls _chart's CreateBarChart function
     *              as well as the _CreateYAxis function.
     */
    CreateChart()
    {
        this._chart.CreateChart();
        this._CreateYAxis();
    }

    GetDecoratorSettings()
    {
        return {
            yAxis: {
                label: this._axisLabel,
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
     * @summary     This function adds a y-axis to the given BarChart type.
     * @description This function creates a y-axis by calling _CreateAxis
     *              and _AddTicks.
     */
    _CreateYAxis()
    {
        this._CreateAxis();
        var maxWidth = this._AddTicks();
        this._CreateAxisLabel(maxWidth);
    }

    /**
     * @summary     This function adds the base line of the y-axis.
     * @description This function creates Konva.Line object to represent the
     *              y-axis and adds it to the given Konva.Group.
     */
    _CreateAxis()
    {
        var yAxis = new Konva.Line({
            points: [0, 0, 0, this._chartHeight],
            stroke: this._lineColor,
            strokeWidth: this._lineStrokeWidth,
        });
        yAxis.rotate(this._rotateBy);
        this._group.add(yAxis); 
    }

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
    _AddTicks()
    {
        var yTicks = this._yScale.ticks(10);
        var helper = new Konva.Group();
        var tickLength = 6;
        var numberHeight = this._GetFontSize('M', this._font); 
        var maxNumberWidth = 0;
        yTicks.forEach(d => {
            var numberWidth = this._GetFontSize(d, this._font);
            if (numberWidth>maxNumberWidth){
                maxNumberWidth = numberWidth;
            }
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
                fill: this._font.textColor,
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
        return -2*maxNumberWidth - tickLength - 10;
    }

      /**
     * @summary Creates the axis label.
     */
    _CreateAxisLabel(maxWidth)
    {
        console.log(this._axisLabel);
        if (this._axisLabel === 'none') return;
   
        var textWidth = this._GetFontSize(this._axisLabel, this._font),
            xPos = maxWidth,
            yPos = this._chartHeight/2 + textWidth/2;
   
        var textLabel = new Konva.Text({
            x: xPos,
            y: yPos,
            text: this._axisLabel,
            fontSize: this._font.fontSize,
            fontFamily: this._font.fontFamily,
            fill: this._font.textColor,
        });
        textLabel.rotate(-90);
        this._group.add(textLabel);
    }
}

export { YAxisDecorator };