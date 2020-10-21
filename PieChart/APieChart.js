// Cullen, Riley
// APieChart.js
// October 16, 2020

class APieChart 
{
    constructor(data, group, radius)
    {
        /**
         * @summary     This abstract class provides the structure for the PieChart
         *              type.
         * @description See summary. 
         * 
         * @requires D3.js
         * @requires Konva.js
         * 
         * @param {JSON Array}  data   : Data used to create chart.
         * @param {Konva Group} group  : Konva.Group we want to add our chart to
         * @param {float}       radius : This is the radius we want our chart to
         *                               confine to
         */
        if (this.constructor === APieChart) {
            throw new TypeError('Abstract class "APieChart" cannot be instantiated');
        }

        if (this.CreateChart === undefined) {
            throw new TypeError('Classes extending APieChart must implement "CreateBarChart"');
        }

        this._data = data;
        this._group = group;
        this._radius = radius;
        this._centerX = radius;
        this._centerY = radius;
        this._totalValue = this._CalculateTotal()
    }

    _CalculateTotal()
    {
        /**
         * @summary     This function calculates the total of all of the d.value's
         *              in data.
         * @description This function iterates through all of the data elements in
         *              data and sums up their d.value to find the total so that the
         *              pie chart can be broken into percentages.
         */
        var total = 0;
        this._data.forEach(d => {
            total += d.value;
        });
        return total;
    }

    GetRadius()
    {
        return this._radius;
    }
}