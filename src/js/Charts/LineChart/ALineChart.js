// Cullen, Riley
// ALineChart.js
// May 8, 2021

import * as d3 from 'd3';
 
class ALineChart 
{
    /**
     * @summary     Abstract class for LineChart type.
     * @description Abstract class that is used to provide common structure to
     *              the LineChart type.
     * 
     * @param {JSON Array}  data        Data used to populate line chart.
     *                              
     *                                  Should be in the following format:
     *                                      data = [dataElems]
     *          
     *                                  Where dataElem = {
     *                                      year: string,
     *                                      month: string,
     *                                      day: string,
     *                                      value: (integer)
     *                                  }       
     * 
     * @param {Konva.Group} group           The group that contains the line chart.
     * @param {double}      chartWidth      Line chart width.
     * @param {double}      chartHeight     Line chart height.
     * @param {double}      lineWidth       Size of the line on the line chart.
     * @param {double}      pointRadius     Size of the points on the line chart.
     * @param {string}      pointColor      The color of the point on the line chart.
     * @param {string}      lineColor       Color of line on line chart.
     * @param {double}      internalOffsetX The x space between the chart bounding box and the chart itself.
     * @param {double}      internalOffsetY The y space between the chart bounding box and the chart itself.
     */
    constructor({data, group, chartWidth, chartHeight, lineWidth = 1, 
        pointRadius = 1, pointColor = 'none', lineColor = 'black', internalOffsetX = 0,
        internalOffsetY = 0, paddingInner = 0.9})
    {
        if (ALineChart === this.constructor) {
            throw new TypeError('Abstract class "ALineChart" cannot be instantiated.')
        }
        if (this.CreateChart === undefined) {
            throw new TypeError('Types extending "ALineChart" must implement CreateChart')
        }

        this._data = data;
        this._group = group;
        this._chartWidth = chartWidth;
        this._chartHeight = chartHeight;
        this._lineWidth = lineWidth;
        this._pointRadius = pointRadius;
        this._pointColor = pointColor;
        this._lineColor = lineColor;
        this._internalOffsetX = internalOffsetX;
        this._internalOffsetY = internalOffsetY;
        this._paddingInner = paddingInner;

        this._xScale = d3.scaleBand()
            .range([0, this._chartWidth])
            .paddingInner(this._paddingInner);
        
        this._yScale = d3.scaleLinear()
            .range([this._chartHeight, 0])

        this._SetUpXDomain();
        this._SetUpYDomain();
    }
   
    GetData()
    {
        return this._data;
    }

    GetChartSettings()
    {
        return {
            size: {
                chartWidth: this._chartWidth,
                chartHeight: this._chartHeight,
                lineWidth: this._lineWidth,
                pointRadius: this._pointRadius,
            },
            color: {
                lineColor: this._lineColor,
                pointColor: this._pointColor,
            },
            spacing: {
                internalOffsetX: this._internalOffsetX,
                internalOffsetY: this._internalOffsetY,
            }
        }
    }

    UpdateData(data)
    {
        this._group.destroyChildren();
        this._data = data;
        this._SetUpXDomain();
        this._SetUpYDomain();
    }

    /**
     * @summary     Initializes the x scale's domain.
     * @description Inserts all of the date values from the data array into 
     *              xScale's domain.
     */
    _SetUpXDomain()
    {
        this._xScale.domain(this._data.map(d => { return d.date; }));
    }

    /**
     * @summary     Initializes the y scale's domain.
     * @description Sets the minimum y domain to zero and the max value in y's
     *              domain to whatever the max value in _data is.
     */
    _SetUpYDomain()
    {
        this._yScale.domain([0, d3.max(this._data, function(d) { return +d.value; })]);
    }
}

export { ALineChart };