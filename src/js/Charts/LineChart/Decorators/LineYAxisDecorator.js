// Cullen, Riley
// LineYAxisDecorator.js
// May 13, 2021

import { ALineChartDecorator } from "./ALineChartDecorator";
import Konva from 'konva';

class LineYAxisDecorator extends ALineChartDecorator
{
    /**
     * 
     * @assumption This class assumes that the same line stroke width is used on both X
     * and Y axis decorators.
     * 
     * @param {*} param0 
     */
    constructor({
        chart,
        axisLabel = 'none',
        tickCount = 2,
        lineColor = 'black',
        lineStrokeWidth = 1,
        tickStrokeWidth = 0.5,
        font = {
            fontSize: 10,
            fontFamily: 'Times New Roman, Times, serif',
            textColor: 'black'
        },
        includeZero = false,
    })
    {
        super(chart);
        this._axisLabel = axisLabel;
        this._lineColor = lineColor;
        this._lineStrokeWidth = lineStrokeWidth;
        this._tickStrokeWidth = tickStrokeWidth;
        this._font = font;
        this._tickCount = tickCount;
        this._includeZero = includeZero;
    }

    /**
     * @summary Creates a chart with a Y axis.
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
                font: this._font,
                axis: {
                    label: this._axisLabel,
                    color: this._lineColor,
                    lineStrokeWidth: this._lineStrokeWidth,
                    tickStrokeWidth: this._tickStrokeWidth,
                    tickCount: this._tickCount,
                    includeZero: this._includeZero,
                }
            }
        }
    }

    /**
     * @summary Helper function that calls _CreateAxis, _CreateTicks, _CreateAxisLabel.
     */
    _CreateYAxis()
    {
        this._CreateAxis();
        var maxWidth = this._CreateTicks();
        this._CreateAxisLabel(maxWidth);
    }

    /**
     * @summary Creates the x-axis using Konva.js.
     */
    _CreateAxis()
    {
        var yAxis = new Konva.Line({
            points: [-this._internalOffsetX, 
                -this._internalOffsetY, 
                -this._internalOffsetX, 
                this._chartHeight - this._internalOffsetY + this._lineStrokeWidth / 2
            ],
            stroke: this._lineColor,
            strokeWidth: this._lineStrokeWidth,
        });
        this._group.add(yAxis); 
    }

    /**
     * @summary Creates the axis label.
     */
    _CreateAxisLabel(maxWidth)
    {
        if (this._axisLabel === 'none') return;

        var textWidth = this._GetFontSize(this._axisLabel, this._font),
            xPos = -this._internalOffsetX - maxWidth - 5,
            yPos = (this._chartHeight / 2) - this._internalOffsetY + (textWidth / 2);

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

    /**
     * @summary Creates the tick marks and tick mark labels.
     * @returns The max width of the tick marks + the tick mark labels.
     */
    _CreateTicks()
    {
        var yTicks = this._yScale.ticks(this._tickCount);
        var helper = new Konva.Group();
        var tickLength = 6;
        var numberHeight = this._GetFontSize('M', this._font);
        
        var maxWidth = 0;

        yTicks.forEach(d => {
            if (this._includeZero === false && d === 0) return;
            console.log(d);
            var numberWidth = this._GetFontSize(d, this._font);

            if (numberWidth > maxWidth) maxWidth = numberWidth;

            helper.add(new Konva.Line({
                points: [-this._internalOffsetX,
                    this._yScale(d) - 0.5 - this._internalOffsetY,
                    -tickLength - this._internalOffsetX, 
                    this._yScale(d) - 0.5 - this._internalOffsetY
                ],
                stroke: this._lineColor,
                strokeWidth: this._tickStrokeWidth,
            }));
            var text = new Konva.Text({
                text: d,
                fill: this._font.textColor,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                x: -tickLength - numberWidth - 5 - this._internalOffsetX,
                y: this._yScale(d) - (numberHeight / 2) - this._internalOffsetY,
            }); 
            helper.add(text);
        });
        this._group.add(helper);
        return maxWidth + tickLength + 5 + this._internalOffsetX;
    }
}

export { LineYAxisDecorator };