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
     * @param {JSON array}  data     The data that will be used to populate the a
     *                               given bar chart. The data json array MUST be 
     *                               in the following format:
     * 
     *                               data[i] = {
     *                                  'category': 'categoryName',
     *                                  'value': value,
     *                                  'color: color, 
     *                               }
     * @param {Konva.Group} group    The Konva.Group we will add the bar chart to
     * @param {double}      width    The width of the bar chart
     * @param {double}      height   The height of the bar chart
     * @param {double}      padding  The space between the bars within a bar chart
     * @param {int}         rotateBy The amount we will rotate the bar chart by
     *                                 (note that this value can only be 0 or 90)
    */
    constructor(data, group, width, height, padding, rotateBy)
    {
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

    /**
     * @summary Returns the data bound to a particular BarChart type.
     */
    GetData()
    {
        return this._data;
    }

    /**
     * @summary     Updates data array.
     * @description Updates data array as well as the yScale since a given BarChart's
     *              yScale is determined by the data.
     * 
     * @param {JSON Array} data The updated data we want to bind to our BarChart object.
     */
    UpdateData(data)
    {
        this._Clean();
        this._data = data;
        this._SetUpYDomain();
    }

    Remove()
    {
        this._group.destroy();
    }

    /**
     * @summary     Removes all child nodes in this group.
     */
    _Clean()
    {
        this._group.destroyChildren();
    }

    /**
     * @summary     This function sets up the xScale's domain.
     * @description This function sets up the xScale's domain by mapping 
     *              each of the categories within the data array to a place
     *              in the domain.
     */
    _SetUpXDomain()
    {
        this._xScale.domain(this._data.map(d => { return d.category; }));
    }

    /**
     * @summary     This function sets up the yScale's domain.
     * @description This function dests up the yScale's domain by assigning 
     *              a lower bound of 0 and an upper bound that corresponds 
     *              to the maximum value within the data array.
     */
    _SetUpYDomain()
    {
        var keys = this.GetGroups(), tmp = this._CreateOffsetHelper(keys);

        this._data.forEach(d => {
            tmp[d.category] += parseInt(d.value);
        });

        var max = this._FindMax(tmp, keys);

        this._yScale.domain([0, max]);
    }

    /**
     * @summary     Finds the max value 
     * 
     * @param {} arr 
     * @param {*} keys 
     */
    _FindMax(arr, keys)
    {
        const iter = keys.values();
        var max = 0;
        for (var i = iter.next().value; i != null; i = iter.next().value) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }

    /**
     * @summary     Returns a set of categories.
     * @description Creates a new set and maps each of the categories to a value
     *              within the set.
     */
    GetGroups()
    {
        return new Set(this._data.map(d => d.category));
    }

    /**
     * @summary     Creates an array where the keys are all of the categories found 
     *              in the data array.
     * @description See summary. This allows us to offset the stacked bars in a 
     *              stacked bar chart.
     * 
     * @param {Set} keys A set of unique categories that allows us to create the 
     *                   offset helper array.
     */
    _CreateOffsetHelper(keys)
    {
        var tmp = [];
        const iter = keys.values();
        for (var i = 0; i < keys.size; i++) {
            tmp[iter.next().value] = 0;
        }
        return tmp;
    }
}