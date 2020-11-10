// Cullen, Riley
// BasicBarChart.js
// October 6, 2020

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
    constructor(data, group, width, height, padding, rotateBy = 0)
    {
        super(data, group, width, height, padding, rotateBy);
    }

    CreateBarChart()
    {
        /**
         * @summary     This function adds the bar chart to the Konva.Group passed in
         *              to the constructor.
         * @description This function calls _CreationHelper, which is 
         *              responsible for adding the bars to the Konva.Group.
         */
        this._CreationHelper();
    }

    _CreationHelper()
    {
        /**
         * @summary     Creates the bar chart.
         * @description This function creates a custom DOM element, binds the data
         *              to this custom svg element, the draws those elements to the 
         *              canvas.
         */
        var virtualCanvas = document.createElement('custom');
        var custom = d3.select(virtualCanvas);

        this._BindData(custom);
        this._DrawBars(custom, false);
    }

    _BindData(custom)
    {
        /**
         * @summary     Binds data to custom DOM elements in memory.
         */
        var selection = custom.selectAll('custom.rect')
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

    _DrawBars(custom, hidden)
    {
        /**
         * @summary     Uses binded data to add Konva.js elements to group.
         */
        var elements = custom.selectAll('custom.rect');
        var helper = new Konva.Group();
        elements.each(function(d,i) {
            var node = d3.select(this);
            helper.add(new Konva.Rect({
                x: node.attr('x'),
                y: node.attr('y'),
                width: node.attr('width'),
                height: node.attr('height'),
                fill: hidden ? node.attr('fillStyleHidden') : node.attr('fillStyle')
            }));
        });
        helper.rotate(this._rotateBy);
        this._group.add(helper);
    }
}