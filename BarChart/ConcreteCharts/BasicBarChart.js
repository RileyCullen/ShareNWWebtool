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
         * @description This function calls _CreateHelperNoBinding, which is 
         *              responsible for adding the bars to the Konva.Group.
         */
        this._CreationHelperNoBinding();
        // this._CreationHelper();
    }

    _CreationHelper()
    {
        var virtualCanvas = document.createElement('custom');
        var custom = d3.select(virtualCanvas);

        this._BindData(custom);
        this._DrawBars(custom, false);
    }

    _BindData(custom)
    {
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
        var elements = custom.selectAll('custom.rect');
        elements.each((d, i) => {
            var node = d3.select(this);
            this._group.add(new Konva.Rect({
                x: node.attr('x'),
                y: node.attr('y'),
                width: node.attr('width'),
                height: node.attr('height'),
                fill: hidden ? node.attr('fillStyleHidden') : node.attr('fillStyle')
            }));
        });
    }

    _CreationHelperNoBinding()
    {
        /**
         * @summary     This function adds the bars to the Konva.Group.
         * @description This function iterates through all of the data within 
         *              data and adds a rectangle whose height corresponds to
         *              a scaled value of d.value and whose x location corresponds
         *              to a mapped value of d.category.
         */
        var helper = new Konva.Group();
        this._data.forEach(d => {
            helper.add(new Konva.Rect({
                x: this._xScale(d.category),
                y: this._chartHeight,
                width: this._xScale.bandwidth(),
                height: -(this._chartHeight - this._yScale(d.value)),
                fill: d.color,
            }));
        });
        this._group.add(helper);
        helper.rotate(this._rotateBy);
    }
}