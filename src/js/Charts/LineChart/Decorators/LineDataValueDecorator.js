// Cullen, Riley
// LineDataValueDecorator.js
// May 13, 2021

import { ALineChartDecorator } from "./ALineChartDecorator";
import Konva from 'konva';

class LineDataValueDecorator extends ALineChartDecorator
{
    /**
     * @summary     Displays each data value point on the chart.
     * @description For each data element in _data, this decorator will create
     *              a label displaying the point's value on the chart.
     * 
     * @param {ALineChart} chart    The chart element we want decorate.
     * @param {string}     location The location relative the point we want to
     *                              display the decorator.
     * @param {JSON Array} font     The font of the data value decorator.
     */
    constructor({
        chart, 
        location = 'bottom', 
        font = {
            fontSize: 8,
            fontFamily: 'Times New Roman, Times, serif',
            fontColor: 'black'
        }
    })
    {
        super(chart);
        this._font = font;
        this._location = location;
    }

    /**
     * @summary     Creates a chart with the data value decorators.
     * @description Calls _chart's CreateChart function and then calls _AddValues.
     */
    CreateChart() 
    {
        this._chart.CreateChart();
        this._AddValues();
    }

    /**
     * @summary     Creates the data value decorators.
     * @description Iterates through all of the entries in _data and creates a
     *              data value decorator.
     */    
    _AddValues()
    {
        this._data.forEach((d) => {
            var text       = d.value,
                textWidth  = this._GetFontSize(text, this._font),
                xPos       = this._xScale(d.date) + this._internalOffsetX - textWidth / 2,
                yPos       = this._yScale(d.value) + this._internalOffsetY,
                fontHeight = this._GetFontSize('M', this._font);

            switch(this._location) {
                case 'bottom':
                    yPos += (fontHeight / 2) + this._pointRadius;
                    break;
                case 'top':
                    yPos -= (fontHeight / 2) + this._pointRadius;
                    break;
                case 'left':
                    xPos -= (textWidth / 2) + this._pointRadius;
                    break;
                case 'right':
                    xPos += (textWidth / 2) + this._pointRadius;
                    break;
                default: 
                    break;
            }

            var textObj = new Konva.Text({
                x: xPos,
                y: yPos,
                text: text,
                fontSize: this._font.fontSize,
                fontfamily: this._font.fontFamily,
                fill: this._font.fontColor,
            });
            this._group.add(textObj);
        });
    }
}

export { LineDataValueDecorator };