// Cullen, Riley
// FirstStatisticDecorator.js
// December 30, 2020

import { APieChartDecorator } from "./APieChartDecorator";
import Konva from 'konva';
import Lodash from 'lodash';

class FirstStatisticDecorator extends APieChartDecorator 
{
    /**
     * @summary     Displays the first statistic in _data to the user.
     * @description Prints the statistic in _data at index 0 to the canvas.
     * 
     * @requires Konva.js
     * @requires APieChartDecorator.js
     * 
     * @see APieChartDecorator.js
     * 
     * @param {APieChart} chart   The chart we want to decorate.
     * @param {string} font       The font of the statistic.
     * @param {double} x          The x position of the statistic.
     * @param {double} y          The y position of the statistic.
     */
    constructor({chart, font =  {'fontSize' : 8, 'fontFamily' : 'Times New Roman, Times, serif', 'fontStyle' : 400,
        'textColor' : 'black'}, x = 0, y = 0})
    {
        super(chart);
        this._top = new Konva.Group();
        this._font = Lodash.cloneDeep(font);
        this._x = x;
        this._y = y;
    }

    /**
     * @summary     Creates a pie chart and displays the first statistic in _data.
     * @description Calls _chart's CreateChart method and then adds the statistic
     *              to the already drawn pie chart.
     */
    CreateChart()
    {
        this._CleanTop();
        this._chart.CreateChart();
        this._AddMajorStatistic();
    }


    GetDecoratorSettings()
    {
        return {
            statistic: { 
                font: this._font,
                position: {
                    x: this._x,
                    y: this._y
                }
            }
        };
    }

    /**
     * @summary     Cleans the group named _top.
     * @description Removes all of the elements contained with the Konva.Group
     *              named _top.
     */
    _CleanTop()
    {
        this._top.destroyChildren();
    }

    /**
     * @summary     Adds the first statistic in _data to the canvas.
     * @description Create a dynamically placed Konva.Text element whose text value
     *              is the first numerical value in _data. This text element is then
     *              appended to _top.
     */
    _AddMajorStatistic()
    {
        var text = this._data[0].value + '%';
        this._top.add(new Konva.Text({
            x: this._x -(this._GetFontWidth(text) / 2),
            y: this._y -(this._GetFontWidth('M') / 2),
            text: text,
            fontSize: this._font.fontSize,
            fontFamily: this._font.fontFamily,
            fill: this._font.textColor,
        }));
        this._top.moveToTop();
        this._group.add(this._top);
    }

    /**
     * @summary     Gets the size of a given piece of text.
     * @description Creates a virtual canvas element that is used to calculate 
     *              the width of the parameterized piece of text. NOTE that to 
     *              determine the height of a particular piece of text, passing 'M'
     *              gives a close approximation.
     * 
     * @param {string} text The text we want to determine the width of.
     */
    _GetFontWidth(text)
    {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        ctx.font = this._font.fontStyle + ' ' + this._font.fontSize + 'px ' + this._font.fontFamily;
        var helper = ctx.measureText(text).width;
        canvas.remove();

        return helper;
    }
}

export { FirstStatisticDecorator };