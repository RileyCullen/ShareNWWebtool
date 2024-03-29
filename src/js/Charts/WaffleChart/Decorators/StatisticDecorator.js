// Cullen, Riley
// StatisticDecorator.js
// December 23, 2020

import { AWaffleChartDecorator } from "./AWaffleChartDecorator";
import Konva from 'konva';
import Lodash from 'lodash';

class StatisticDecorator extends AWaffleChartDecorator
{
    /**
     * @summary     Adds a text statistic based on the encapsluated data.
     * @description A concrete decorator class that adds a text statistic to the
     *              canvas based on the encapsulated chart object.
     * 
     * @requires AWaffleChartDecorator.js
     * 
     * @param {*} chart      The chart we want to add the statistic to.
     * @param {*} middleText The preposition between the numerator and denominator.
     *                       (ex. 1 in 2 where in is the middleText variable).
     * @param {*} group      The group we want to add the statistic to.
     * @param {*} font       Font of the text statistic.
     */
    constructor({chart, middleText, x = 0, y = 0, font =  {'fontSize' : 8, 
        'fontFamily' : 'Times New Roman, Times, serif', 'fontStyle' : 400,
        'textColor' : 'black'}})
    {
        super(chart);
        this._top = new Konva.Group({
            name: 'Selectable Decorator',
        });
        this._middleText = middleText;
        this._font = Lodash.cloneDeep(font);
        this._x0 = x;
        this._y0 = y;
    }

    /**
     * @summary     Creates the waffle chart and adds the statistic.
     * @description Calls the encapsulated _chart object's CreateChart method and
     *              then uses _chart's data (numerator and denominator) to create
     *              a text statistic.
     */
    CreateChart()
    {
        this._chart.CreateChart();
        this._CleanTop();
        this._AddStatistic();
    }

    GetDecoratorSettings()
    {
        return {
            statistic: {
                font: this._font,
                display: {
                    middleText: this._middleText,
                    lockToChart: true,
                },
                position: {
                    x: this._top.x(),
                    y: this._top.y(),
                }
            }
        }
    }

    /**
     * @summary     Removes child elements within _top.
     * @description Private function that cleans the _top group so that previous
     *              statistics are deleted.
     */
    _CleanTop()
    {
        this._top.destroyChildren();
    }

    /**
     * @summary     Adds the text statistic to the canvas.
     * @description A private function that adds the text statistic to the canvas.
     */
    _AddStatistic()
    {  
        var text = this._numerator + ' ' + this._middleText + ' ' + this._denominator;
        this._top.x(this._x0);
        this._top.y(this._y0);
        this._top.add(new Konva.Text({
            text: text,
            fontSize: this._font.fontSize,
            fontFamily: this._font.fontFamily,
            fontStyle: this._font.fontStyle,
            fill: this._font.textColor,
        }));

        this._top.moveToTop();
        this._group.add(this._top);
    }
}

export { StatisticDecorator };