// Cullen, Riley
// LineChart.js
// May 13, 2021

import { ALineChart } from '../ALineChart';
import Konva from 'konva';
import * as d3 from 'd3';

class LineChart extends ALineChart 
{
    /**
     * @summary     A concrete, basic line chart type.
     * @description A basic line chart type that utilizes D3's scaleTime function.
     * 
     * @param {*} param1 See ALineChart.js for the meaning of each of the elements
     *                   in the JSON object.
     */
    constructor({data, group, chartWidth, chartHeight, lineWidth = 3, 
        pointRadius = 5, pointColor = 'none', lineColor = 'black', internalOffsetX = 0,
        internalOffsetY = 0, backgroundColor = '#ffffff'
    })
    {
        super({ 
            data: data, 
            group: group,
            chartWidth: chartWidth,
            chartHeight: chartHeight,
            lineWidth: lineWidth,
            pointRadius: pointRadius,
            lineColor: lineColor,
            pointColor: pointColor, 
            internalOffsetX: internalOffsetX,
            internalOffsetY: internalOffsetY,
        });
        this._backgroundColor = backgroundColor;
    }

    /**
     * @summary     Creates a basic line chart.
     * @description Creates a basic line chart by binding the entries in data 
     *              to custom DOM elements then using Konva.JS to draw the 
     *              chart on the canvas.
     */
    CreateChart()
    {
        var virtualCanvas = document.createElement('custom');
        var custom = d3.select(virtualCanvas);

        this._AddBackgroundRect();
        this._BindData(custom);
        var orderedPairList = this._CreateOrderedPairList(custom)
        this._DrawGraph(custom, orderedPairList)
    }

    /**
     * @summary     Binds the data entries in _data to custom DOM elements.
     * @description Uses D3 to create custom DOM elements that we will bind the 
     *              data in _data to.
     * 
     * @param {DOM element} custom The parent DOM element we will add all of the 
     *                             custom DOM elements to.
     */
    _BindData(custom)
    {
        custom.selectAll('custom.point')
            .data(this._data)
            .enter()
            .append('custom')
            .attr('class', 'point')
            .attr('x', (d) => {
                return this._internalOffsetX + this._xScale(d.category);
            })
            .attr('y', (d) => {
                return -1 * this._internalOffsetY + this._yScale(d.value);
            })
            .attr('pointColor', this._pointColor)
            .attr('pointRadius', this._pointRadius)
    }

    /**
     * @summary     Creates a list of ordered pairs from the data bound to the 
     *              DOM elements.
     * @description Creates a list of ordered pairs that will be used to draw 
     *              the points and lines on the chart.
     * 
     * @param {DOM Element} custom See _BindData.
     * 
     * @returns The ordered pair list.
     */
    _CreateOrderedPairList(custom)
    {
        var elements = custom.selectAll('custom.point');

        var helperList = []
        elements.each(function(d, i){
            var node = d3.select(this);
            helperList[i] = {
                x: node.attr('x'),
                y: node.attr('y'),
            };
        });

        var list = [];
        for (var i = 0; i < helperList.length; i++) {
            if (i !== 0) {
                list[i - 1] = {
                    x1: helperList[i - 1].x,
                    y1: helperList[i - 1].y,
                    x2: helperList[i].x,
                    y2: helperList[i].y,
                }
            }
        }
        
        return list;
    }

    /**
     * @summary     Draws the chart on the canvas.
     * @description Uses the custom DOM elements bound in custom to draw the 
     *              points and lines on canvas using Konva.JS.
     * 
     * @param {DOM Element} custom See _BindData.
     * @param {JSON Array}  list   A list of ordered pairs to help us draw the
     *                             points and lines in the chart.
     */
    _DrawGraph(custom, list)
    {
        var elements = custom.selectAll('custom.point');
        var helper = new Konva.Group();

        list.forEach(d => {
            var line = new Konva.Line({
                points: [parseFloat(d.x1), parseFloat(d.y1), parseFloat(d.x2), parseFloat(d.y2)],
                stroke: this._lineColor,
                strokeWidth: parseFloat(this._lineWidth),
            });
            helper.add(line);
        }); 

        elements.each(function(d, i){
            var node = d3.select(this);
            var point = new Konva.Circle({
                radius: node.attr('pointRadius'),
                fill: node.attr('pointColor'),
                x: parseFloat(node.attr('x')),
                y: parseFloat(node.attr('y')),
            });
            helper.add(point);
        });

        this._group.add(helper);
    }

    /**
     * @description This method is responsible for adding a background rectangle
     *              to the line chart type.
     */
    _AddBackgroundRect()
    {
        let bkgRect = new Konva.Rect({
            fill: this._backgroundColor, 
            y: -this._internalOffsetY,
            x: -this._internalOffsetX,
            width: this._chartWidth + 4 * this._internalOffsetX, 
            height: this._chartHeight,
        });
        this._group.add(bkgRect);
        bkgRect.moveToBottom();
    }
}

export { LineChart };