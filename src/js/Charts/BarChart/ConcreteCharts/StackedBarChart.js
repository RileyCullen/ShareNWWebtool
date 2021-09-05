// Cullen, Riley
// StackedBarChart.js
// October 27, 2020

import { ABarChart } from './ABarChart';
import * as d3 from 'd3';
import Konva from 'konva';

class StackedBarChart extends ABarChart
{
    /**
     * @summary     Allows for the creation of a stacked bar chart.
     * @description Uses D3 and Konva.js to create stacked bar charts and display
     *              them on canvas.
     * 
     * @requires ABarChart.js
     * @see ABarChart.js for constructor parameters.
     */
    constructor({data, group, width, height, padding, rotateBy = 0, stacked = true})
    {
        super(data, group, width, height, padding, rotateBy, stacked);
    }   

    /**
     * @summary     Creates the stacked bar chart.
     * @description See BasicBarChart.js for the description. The intent is the
     *              same with the exception that this class defines its own
     *              _BindData and _DrawBars functions.
     */
    CreateChart()
    {
        // Create a virtual container for all of our data elements.
        var virtualDOM = document.createElement('custom');
        var custom = d3.select(virtualDOM);

        this._BindData(custom);
        this._DrawBars(custom);
    }

    /**
     * @summary     Binds data to custom DOM elements.
     * @description See BasicBarChart.js for intent. The only real difference
     *              is that this class needs to also bind an id to each custom
     *              DOM element.
     */
    _BindData(custom)
    {
        // Standard D3 code, with the exception that instead of actually drawing
        // the chart, this code just binds the given pieces of data to the 
        // custom.rect elements contained within custom.
        custom.selectAll('custom.rect')
            .data(this._data)
            .enter()
            .append('custom')
            .attr('class', 'rect')
            .attr('id', (d) => d.category)
            .attr('x', (d) => this._xScale(d.category))
            .attr('y', (d) => this._chartHeight)
            .attr('width', (d) => this._xScale.bandwidth())
            .attr('height', (d) => -(this._chartHeight - this._yScale(d.value)))
            .attr('fillStyle', (d) => d.color);
    }

    /**
     * @summary     Adds bars to the Konva.Group.
     * @description See BasicBarChart for the description. 
     */
    _DrawBars(custom)
    {
        var elements = custom.selectAll('custom.rect');
        var helper = new Konva.Group();

        // Here, the variable groups contains a set of the categories contained
        // within _data (essentially, it returns a unique list of the categories 
        // found in _data).
        // 
        // The variable offsetHelper then uses groups to create a JSON object 
        // where the keys are the unique categories found when group was created.
        // 
        // Note: this is necessary because offsetHelper, as you will see, is 
        // essential to building the stacked bar chart.
        var groups = this.GetGroups();
        var offsetHelper = this._CreateOffsetHelper(groups);

        // Here, elements.each can essentially be thought of as a for loop that 
        // iterates through all of the custom.rect's in custom.
        elements.each(function(d,i) {
            // NOTE: that here an anonymous function is used instead of an arrow 
            // function. This is because anonymous functions do not preserve the 
            // context of the "this" keyword. 
            //
            // If an arrow function were to be used, "this" would refer to the 
            // StackedBarChart object that this function is located in while 
            // if an anonymous function is used, "this" refers to the custom.rect 
            // element we are currently on.
            var node = d3.select(this);

            // Add the bar to helper.
            helper.add(new Konva.Rect({
                x: parseFloat(node.attr('x')),
                y: parseFloat(node.attr('y') - offsetHelper[node.attr('id')]),
                width: parseFloat(node.attr('width')),
                height: parseFloat(node.attr('height')),
                fill: node.attr('fillStyle'),
                draggable: false,
            }));
            
            // Without the following line, all of the bars would start at the bottom of
            // the graph instead of being offset by the current height of the bar.
            offsetHelper[node.attr('id')] += -1 * node.attr('height');
        });
        // Rotate the graph and add helper to the canvas.
        helper.rotate(this._rotateBy);
        this._group.add(helper);
    }
}

export { StackedBarChart };