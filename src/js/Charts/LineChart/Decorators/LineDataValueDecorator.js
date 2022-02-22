// Cullen, Riley
// LineDataValueDecorator.js
// May 13, 2021

import { ALineChartDecorator } from "./ALineChartDecorator";
import Konva from 'konva';
import Lodash from 'lodash';

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
        location = 'Bottom', 
        font = {
            fontSize: 8,
            fontFamily: 'Times New Roman, Times, serif',
            textColor: 'black'
        }
    })
    {
        super(chart);
        this._font = Lodash.cloneDeep(font);
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

    GetDecoratorSettings()
    {
        return {
            dataValue: {
                font: this._font,
                location: {
                    location: this._location,
                },
            }
        }
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
                xPos       = this._xScale(d.category) + this._internalOffsetX - textWidth / 2,
                yPos       = this._yScale(d.value) - this._internalOffsetY,
                fontHeight = this._GetFontSize('M', this._font);

            switch(this._location) {
                case 'Bottom':
                    yPos += (fontHeight / 2) + this._pointRadius;
                    break;
                case 'Top':
                    yPos -= (fontHeight / 2) + this._pointRadius + 20;
                    break;
                case 'Left':
                    xPos -= (textWidth / 2) + this._pointRadius + 10;
                    yPos -= (fontHeight / 2);
                    break;
                case 'Right':
                    xPos += (textWidth / 2) + this._pointRadius + 10;
                    yPos -= (fontHeight / 2);
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
                fill: this._font.textColor,
            });
            this._group.add(textObj);
        });
    }
}

export { LineDataValueDecorator };