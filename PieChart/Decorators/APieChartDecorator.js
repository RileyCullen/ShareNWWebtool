// Cullen, Riley
// APieChartDecorator.js
// October 18, 2020

class APieChartDecorator extends APieChart
{
    /**
     * @summary     Provides structure for pie chart decorators.
     * @description An abstract class that provides the pie chart type an ability
     *              to add decorators
     * 
     * @requires APieChart.js
     * 
     * @see APieChart.js
     * 
     * @param {APieChart} chart : The chart we want to decorate.
     */
    constructor(chart)
    {
        super(chart._data, chart._group, chart._radius);
        this._chart = chart;

        if (this.constructor === APieChartDecorator) {
            throw new TypeError('Abstract class "APieChartDecorator" cannot be instantiated');
        }
    }

    UpdateDecorator(chart)
    {
        this._data = chart._data;
        this._chart = chart;
    }
}