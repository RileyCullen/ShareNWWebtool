// Cullen, Riley
// ChartOutlineDecorator.js
// October 26, 2020

import { APieChartDecorator } from "./APieChartDecorator";
import Konva from 'konva';

class ChartOutlineDecorator extends APieChartDecorator
{
    /**
     * @summary     Adds an outline at radius to the given pie chart.
     * @description Adds a circle outline at radius by adding a Konva.Ring object
     *              to the pie chart's group.
     * 
     * @see APieChartDecorator.js
     * @requires APieChartDecorator.js
     * 
     * @param {APieChart} chart        The chart we want to add an outline
     * @param {double}    radius       The radius of the outline
     * @param {double}    outlineWidth The width of the outline
     * @param {string}    outlineColor The color of the outline
     */
    constructor({chart, outlineWidth, outlineColor})
    {
        super(chart);
        this._outlineWidth = outlineWidth;
        this._outlineColor = outlineColor;
        this._startingRadius = this._radius;
    }

    /**
     * @summary     Adds outline to the pie chart.
     * @description Adds outline to pie chart by creating a Konva.Ring object 
     *              and adding it to this._group.
     */
    CreateChart()
    {
        this._chart.CreateChart();
        this._DrawOutline();
    }

    GetDecoratorSettings()
    {
        return {
            chartOutline: {
                size: {
                    outlineWidth: this._outlineWidth,
                },
                color: {
                    outlineColor: this._outlineColor
                }
            }
        };
    }

    /**
     * @description Overrides APieChartDecorator's UpdateDecorator method, 
     *              adding the additional step to update the outline's radius 
     *              to match the new chart.
     * @param {APieChart} chart 
     */
    UpdateDecorator(chart)
    {
        super.UpdateDecorator(chart);
        this._startingRadius = chart._radius;
    }

    /**
     * @summary     Adds outline to pie chart.
     * @description Creates a Konva.Ring object and adds it to this._group.
     */
    _DrawOutline()
    {
        this._group.add(new Konva.Ring({
            innerRadius: this._startingRadius,
            outerRadius: this._startingRadius + (3/2) * this._outlineWidth,
            fill: this._outlineColor,
        }));
    }
}

export { ChartOutlineDecorator };