// Cullen, Riley
// November 24, 2020
// PercentageBarChart.js

class PercentageBarChart extends ABarChart
{
    /**
     * @summary     Provides a type of bar chart that acts like a percentage.
     * @description Provides a bar chart type where the yScale domain is from
     *              0 - 100. This mimics a percentage bar chart.
     * 
     * @requires ABarChart.js
     * 
     * @see ABarChart.js for constructor parameters
     */
    constructor(data, group, width, height, padding, rotateBy = 0)
    {
        super(data, group, width, height, padding, rotateBy);
        this._basicBar = new StackedBarChart(data, group, width, height, padding, rotateBy);
        this._UpdateYScale();
        this._CheckData();
    }

    /**
     * @summary     Creates the bar chart.
     * @description Creates the percentage bar chart by calling _basicBar's CreateBarChart
     *              method.
     */
    CreateBarChart()
    {
        this._basicBar.CreateBarChart();
    }

    /**
     * @summary     Updates the data array and yScale
     * 
     * @param {JSON Array} data The new data array we want to use for our bar chart
     */
    UpdateData(data)
    {
        this._Clean();
        this._data = data;
        this._CheckData();
    }

    /**
     * @summary Checks data array to ensure all values are within domain.
     */
    _CheckData()
    {
        this._data.forEach(d => {
            if (d.value > 100) d.value = 100;
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