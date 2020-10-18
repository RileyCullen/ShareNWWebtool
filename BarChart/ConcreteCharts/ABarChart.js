// Cullen, Riley
// ABarChart.js
// October 6, 2020

class ABarChart 
{
    /**
     * @summary     Provides structure for the BarChart type.
     * @description This class is an abstract class the defines the structure
     *              of the BarChart type as well as the methods each BarChart type
     *              must extend.
     * 
     * @requires Konva.JS
     * @requires D3.js
     * 
     * @param {JSON array}  data     : The data that will be used to populate the a
     *                               given bar chart. The data json array MUST be 
     *                               in the following format:
     * 
     *                               data[i] = {
     *                                  'category': 'categoryName',
     *                                  'value': value,
     *                                  'color: color, 
     *                               }
     * @param {Konva.Group} group    : The Konva.Group we will add the bar chart to
     * @param {double}      width    : The width of the bar chart
     * @param {double}      height   : The height of the bar chart
     * @param {double}      padding  : The space between the bars within a bar chart
     * @param {int}         rotateBy : The amount we will rotate the bar chart by
     *                                 (note that this value can only be 0 or 90)
    */
    constructor(data, group, width, height, padding, rotateBy)
    {
        /**
         * @summary     Constructor that initializes the BarChart object.
         * @description Constructor initializes data that is required of all 
         *              objects of the BarChart type.
         * 
         * @param {see class parameters}
         */
        if (this.constructor === ABarChart) {
            throw new TypeError('Abstract class "ABarChart" cannot be instantiated');
        }

        if (this.CreateBarChart === undefined) {
            throw new TypeError('Classes extending ABarChart must implement "CreateBarChart"');
        }

        this._data = data;
        this._group = group;
        this._chartWidth = width;
        this._chartHeight = height;
        this._padding = padding;
        this._rotateBy = (rotateBy == 90 || rotateBy == 0) ? rotateBy : 0;
        this._xScale = d3.scaleBand()
            .range([0, this._chartWidth])
            .padding(this._padding);
        this._yScale = d3.scaleLinear()
            .range([this._chartHeight, 0]);

        this._SetUpXDomain();
        this._SetUpYDomain();
    }

    _SetUpXDomain()
    {
        /**
         * @summary     This function sets up the xScale's domain.
         * @description This function sets up the xScale's domain by mapping 
         *              each of the categories within the data array to a place
         *              in the domain.
         */
        this._xScale.domain(this._data.map(d => { return d.category; }));
    }

    _SetUpYDomain()
    {
        /**
         * @summary     This function sets up the yScale's domain.
         * @description This function dests up the yScale's domain by assigning 
         *              a lower bound of 0 and an upper bound that corresponds 
         *              to the maximum value within the data array.
         */
        this._yScale.domain([0, 
            d3.max(this._data, d => {
                this._data.forEach(d => {
                    d.value = parseInt(d.value);
                });
                return d.value;
            })
        ]);
    }
}