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
    constructor(chart, radius, outlineWidth, outlineColor)
    {
        super(chart);
        this._outlineWidth = outlineWidth;
        this._outlineColor = outlineColor;
        this._startingRadius = radius;
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