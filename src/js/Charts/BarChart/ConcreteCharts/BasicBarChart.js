// Cullen, Riley
// BasicBarChart.js
// October 6, 2020

import { ABarChart } from './ABarChart';
import * as d3 from 'd3';
import Konva from 'konva';

class BasicBarChart extends ABarChart 
{
     /**
     * @summary     A basic bar chart consisting of only vertical bars.
     * @description This type provides the user the possibility of creating a 
     *              basic bar chart. Essentially, this type is only responsible 
     *              for creating the vertical bars contained within a bar chart.
     * 
     * @requires ABarChart.js
     * 
     * @see ABarChart.js for constructor parameters.
     */
    constructor({data, group, width, height, padding, rotateBy = 0})
    {
        super(data, group, width, height, padding, rotateBy);
    }

    /**
     * @summary     This function adds the bar chart to the Konva.Group passed in
     *              to the constructor.
     * @description This function calls _CreationHelper, which is 
     *              responsible for adding the bars to the Konva.Group.
     */
    CreateChart()
    {
        this._CreationHelper();
    }

    /**
     * @summary     Creates the bar chart.
     * @description This function creates a custom DOM container and uses D3
     *              (_BindData) to create custom DOM elements inside the container
     *              and canvas (_DrawBars) to render the bars on canvas.
     */
    _CreationHelper()
    {
        var virtualCanvas = document.createElement('custom');
        var custom = d3.select(virtualCanvas);

        this._BindData(custom);
        this._DrawBars(custom, false);
    }

    /**
     * @summary     Binds data to custom a DOM element in memory.
     * @description Uses D3 to create custom DOM elements named custom.rect and
     *              binds rendering data to it so that it can be correctly drawn
     *              on the canvas.
     */
    _BindData(custom)
    {
        custom.selectAll('custom.rect')
            .data(this._data)
            .enter()
            .append('custom')
            .attr('class', 'rect')
            .attr('x', (d) => {
                return this._xScale(d.category);
            })
            .attr('y', (d) => {
                return this._chartHeight;
            })
            .attr('width', (d) => {
                return this._xScale.bandwidth();
            })
            .attr('height', (d) => {
                return -(this._chartHeight - this._yScale(d.value));
            })
            .attr('fillStyle', d => { return d.color; })
            .attr('fillStyleHidden', d => { return d.color; });
    }

    /**
     * @summary     Uses binded data to add Konva.js elements to group.
     * @description Uses the data bound to the custom DOM elements in _BindData
     *              to create a canvas representation of the D3 chart using 
     *              Konva.js.
     */
    _DrawBars(custom, hidden)
    {
        var elements = custom.selectAll('custom.rect');
        var helper = new Konva.Group();
        elements.each(function(d,i) {
            var node = d3.select(this);
            helper.add(new Konva.Rect({
                x: parseFloat(node.attr('x')),
                y: parseFloat(node.attr('y')),
                width: parseFloat(node.attr('width')),
                height: parseFloat(node.attr('height')),
                fill: hidden ? node.attr('fillStyleHidden') : node.attr('fillStyle')
            }));
        });
        helper.rotate(this._rotateBy);
        this._group.add(helper);
        console.log('group');
        console.log(this._group);
    }
}

export { BasicBarChart };