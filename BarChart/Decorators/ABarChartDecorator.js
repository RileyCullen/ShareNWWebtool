// Cullen, Riley
// ABarChartDecorator.js
// October 7, 2020

class ABarChartDecorator extends ABarChart
{
    /**
     * @summary     This abstract class provides the structure for the 
     *              BarChartDecorator type.
     * @description This type provides a common structure for all BarChartDecorators
     *              to inherit from. This class also defines an instance variable
     *              unique to the decorators called chart.
     * 
     * @requires ABarChart.js
     * 
     * @see ABarChart.js
     * 
     * @param {BarChart} chart : This type is a concrete bar chart (or decorator)
     *                           that we plan on decorating.
     */
    constructor(chart) {
        super(chart._data, chart._group, chart._chartWidth, chart._chartHeight, chart._padding, chart._rotateBy);
        this._chart = chart;
        
        if (this.constructor === ABarChartDecorator) {
            throw new TypeError('Abstract class "ABarChartDecorator" cannot be instantiated');
        }
    }
}