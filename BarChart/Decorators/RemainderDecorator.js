// Cullen, Riley
// RemainderDecorator.js
// October 10, 2020

class RemainderDecorator extends ABarChartDecorator 
{
    /**
     * @summary     A decorator type that fills in the remainder of space for
     *              each of the bars.
     * @description See summary. Essentially, if a bar takes up 50% of the given
     *              space, then this class will create bars to fill in the remainder
     *              of that space. This is dynamic and only needs to be declared 
     *              once for each bar chart (rather than multiple times for each
     *              bar within a chart).
     * 
     * @requires ABarChart.js
     * 
     * @param {BarChart} chart    : See ABarChartDecorator
     * @param {string}   barColor : Color of 'remainder' bars
     */

    constructor(chart, barColor = 'gray') 
    {
        super(chart);
        this._barColor = barColor;
    }

    CreateBarChart()
    {
        /**
         * @summary     This function fills in the remainder of space within a 
         *              bar chart.
         * @description This function fills in the remainder of space within a bar
         *              chart by calling the _chart's CreateBarChart function 
         *              as well as _DrawBars.
         */
        this._chart.CreateBarChart();
        this._DrawBars();
    }

    _DrawBars()
    {
        /**
         * @summary     This function draws the remainder bars.
         * @description See summary.
         */
        var helper = new Konva.Group();
        this._data.forEach(d => {
            helper.add(new Konva.Rect({
                x: this._xScale(d.category),
                y: this._yScale(d.value),
                width: this._xScale.bandwidth(),
                height: -(this._yScale(d.value)),
                fill: this._barColor,
            }));
        });
        this._group.add(helper);
        helper.rotate(this._rotateBy);
    }
}