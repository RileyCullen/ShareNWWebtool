// Cullen, Riley
// StackedBarChart.js
// October 27, 2020

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
    constructor(data, group, width, height, padding, rotateBy = 0)
    {
        super(data, group, width, height, padding, rotateBy);
    }   

    /**
     * @summary     Creates the stacked bar chart.
     */
    CreateBarChart()
    {
        var virtualDOM = document.createElement('custom');
        var custom = d3.select(virtualDOM);

        this._BindData(custom);
        this._DrawBars(custom);
    }

    /**
     * @summary     Binds data to custom DOM elements.
     */
    _BindData(custom)
    {
        var selection = custom.selectAll('custom.rect')
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
     * @summary Adds bars to the Konva.Group
     */
    _DrawBars(custom)
    {
        var elements = custom.selectAll('custom.rect');
        var helper = new Konva.Group();

        var groups = this.GetGroups();
        var offsetHelper = this._CreateOffsetHelper(groups);

        elements.each(function(d,i) {
            var node = d3.select(this);

            helper.add(new Konva.Rect({
                x: node.attr('x'),
                y: node.attr('y') - offsetHelper[node.attr('id')],
                width: node.attr('width'),
                height: node.attr('height'),
                fill: node.attr('fillStyle'),
                draggable: false,
            }));
            offsetHelper[node.attr('id')] += -1 * node.attr('height');
        });
        helper.rotate(this._rotateBy);
        this._group.add(helper);
    }
}