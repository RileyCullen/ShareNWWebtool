// Cullen, Riley
// November 24, 2020
// PercentageBarChart.js

import { ABarChart } from './ABarChart';
import { StackedBarChart } from './StackedBarChart';

class PercentageBarChart extends ABarChart
{
    /**
     * @summary     Provides a bar chart type to represent percentage data.
     * @description Provides a bar chart type where the yScale domain is from
     *              0 - 100. This mimics a percentage bar chart. Note that data 
     *              outside of this range will round down to 100 if above 100 and
     *              up to 0 if below zero.
     * 
     *              This is done by basically encapsulating a StackedBarChart
     *              object and updating it's yScale to reflect the bounds 
     *              explained above.
     * 
     * @requires ABarChart.js
     * 
     * @see ABarChart.js for constructor parameters
     */
    constructor({data, group, width, height, padding, rotateBy = 0})
    {
        super(data, group, width, height, padding, rotateBy);
        this._basicBar = new StackedBarChart({
            data: data, 
            group: group, 
            width: width, 
            height: height, 
            padding: padding, 
            rotateBy: rotateBy
        });
        this._UpdateYScale();
        this._CheckData();
    }

    /**
     * @summary     Creates the bar chart.
     * @description Creates the percentage bar chart by calling _basicBar's CreateBarChart
     *              method.
     */
    CreateChart()
    {
        this._basicBar.UpdateData(this._data);
        this._UpdateYScale();
        this._basicBar.CreateChart();
    }

    /**
     * @summary     Checks data array to ensure all values are within domain.
     * @description Iterate through all of the data elements in _data and ensures
     *              that they are within the bounds.
     */
    _CheckData()
    {
        this._data.forEach(d => {
            if (d.value > 100) d.value = 100;
            if (d.value < 0)   d.value = 0;
        }); 
    }

    /**
     * @summary Updates yScale to have a domain from (0 - 100).
     */
    _UpdateYScale()
    {
        this._basicBar._yScale.domain([0, 100]);
        this._yScale = this._basicBar._yScale;
    }
}

export { PercentageBarChart };