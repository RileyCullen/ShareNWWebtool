// Cullen, Riley
// ABarChart.js
// October 6, 2020

import * as d3 from 'd3';

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
     *                               }.
     * @param {Konva.Group} group    The Konva.Group object that holds the bar 
     *                               chart in the cavnas.
     * @param {double}      width    The width of the bar chart.
     * @param {double}      height   The height of the bar chart.
     * @param {double}      padding  The space between the bars within a bar chart.
     * @param {int}         rotateBy The amount we will rotate the bar chart by
     *                               (note that this value can only be 0 or 90
     *                               and goes in the clockwise direction).
    */
    constructor(data, group, width, height, padding, rotateBy, stacked)
    {
        // Since ES6 does not natively support abstract classes, we must manually
        // throw a type error when the programmer tries to instantiate this class.
        // 
        // Essentially, what the following if-block means is that if the programmer
        // tries to instantiate it directly (i.e. let obj = new ABarChart()) then 
        // throw a type error. A type error will NOT be thrown if the constructor 
        // is called when an object that inherits from ABarChart is instantiated 
        // (i.e. let obj = new BasicBarChart()).
        if (this.constructor === ABarChart) {
            throw new TypeError('Abstract class "ABarChart" cannot be instantiated');
        }

        // ES6 also does not support abstract methods. So, we must explicitly throw
        // a type error when this function is not implemented in an extending class.
        if (this.CreateChart === undefined) {
            throw new TypeError('Classes extending ABarChart must implement "CreateBarChart"');
        }

        // Setting up instance variables
        this._data = data;
        this._group = group;
        this._chartWidth = width;
        this._chartHeight = height;
        this._padding = padding;
        this._rotateBy = (rotateBy === 90 || rotateBy === 0) ? rotateBy : 0;
        this._xScale = d3.scaleBand();
        this._yScale = d3.scaleLinear();
        this._stacked = (stacked===true || stacked===false) ? stacked : true;

        // Setting up the x and y scales using D3.
        this._SetUpXRange();
        this._SetUpXDomain();
        this._SetUpYRange();
        this._SetUpYDomain();
    }

    /**
     * @summary     Returns the data bound to a particular BarChart type.
     * @description Returns the JSON array named _data to the caller. Note that 
     *              this returns a reference to the actual data element and not 
     *              a copy.
     */
    GetData()
    {
        return this._data;
    }

    /**
     * @summary     Updates data array.
     * @description Updates data array as well as the yScale since a given BarChart's
     *              yScale is determined by the data. Note that the data array 
     *              passed into this function should follow the form:
     * 
     *              data[i] = {
     *                  'category': 'categoryName',
     *                  'value': value,
     *                  'color: color, 
     *              }. 
     * 
     *              Also note that this function does not make any effort to 
     *              verify that the data array passed in is valid and assumes by
     *              contract that it is so.            
     * 
     * @param {JSON Array} data The new data array we want to bind to our 
     *                          BarChart object.
     */
    UpdateData(data)
    {
        this._Clean();
        this._data = data;

        // NOTE: When chart data is updated, it could contain new categories or 
        // output values that are not within the previously defined x and y domains
        // respectively. To prevent this, we reinitialize the x and y domains to 
        // be consistent with the new data.
        this._SetUpYDomain();
        this._SetUpXDomain();
    }

    UpdateChartSettings(settings)
    {
        this._chartWidth = settings.size.chartWidth;
        this._chartHeight = settings.size.chartHeight;
        this._padding = settings.size.padding; 
        this._rotateBy = (settings.orientation.landscape === true) ? 90 : 0;

        // For similar reasons as explained in the previous method, when the chart
        // settings are updated, we must also update the range of the x and y 
        // scales (this is because both ranges depend on the chart height or 
        // width respectively).
        this._Clean();
        this._SetUpYRange();
        this._SetUpXRange();
    }

    /**
     * @summary     Removes the bar chart from the canvas. 
     * @description A wrapper function that calls the Konva.js method destroy(),
     *              which removes the group from the Konva.Stage.
     */
    Remove()
    {
        this._group.destroy();
    }

    GetChartSettings()
    {
        return {
            orientation: {
                landscape: (this._rotateBy === 90)
            },
            size: {
                chartWidth: this._chartWidth,
                chartHeight: this._chartHeight,
                padding: this._padding,
            },
            backgroundColor: {
                isChecked: false,
                fill: '#fff'
            }
        }
    }

    GetAttrs()
    {
        return {
            data: this._data,
            group: this._group,
            width: this._chartWidth,
            height: this._chartHeight,
            padding: this._padding,
            rotateBy: this._rotateBy,
        }
    }

    /**
     * @summary     Removes all child nodes in this group.
     * @description A wrapper function that calls the Konva.js method 
     *              destroyChildren() which removes all of the child elements 
     *              located with _group.
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
        // Essentially, keys creates a set (unique entries) of strings where the 
        // entries are the categories. The variable tmp then holds a new JSON 
        // object where the keys are the categories passed by the data.
        var keys = this.GetGroups(), tmp = this._CreateOffsetHelper(keys);

        // Using tmp, we now iterate through _data and add all of the entries with
        // a common category together. This allows us to find the maximum bar value
        // for both stacked and non-stacked charts.
        this._data.forEach(d => {
            tmp[d.category] += parseInt(d.value);
        });

        var max = this._FindMax(tmp, keys);

        this._yScale.domain([0, max]);
    }

    _SetUpXRange()
    {
        this._xScale.range([0, this._chartWidth])
            .padding(this._padding);
    }

    _SetUpYRange()
    {
        this._yScale.range([this._chartHeight, 0]);
    }

    /**
     * @summary     Finds the max value in the data array.
     * @description Function that iterates through a set of values created from
     *              _data. This function attempts to find the max value in _data.
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

    _FindMinCategory()
    {
        var index = 0;
        for (var i = 1; i < this._data.length; i++) {
            if (this._data[index].value > this._data[i].value) index = i;
        }
        return this._data[index].category;
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

export { ABarChart };