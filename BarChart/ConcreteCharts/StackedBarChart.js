// Cullen, Riley
// StackedBarChart.js
// October 27, 2020

class StackedBarChart extends ABarChart
{
    /**
     * @summary     Allows for the creation of a stacked bar chart.
     * @description Uses D3 and Konva.js to create stacked bar charts and display
     *              them on canvas.
     */
    constructor(data, group, width, height, padding, rotateBy = 0)
    {
        super(data, group, width, height, padding, rotateBy);
        this._SetUpXDomain();
        this._SetUpYDomain();
    }   

    CreateBarChart()
    {
        var virtualDOM = document.createElement('custom');
        var custom = d3.select(virtualDOM);

        this._BindData(custom);
        this._DrawBars(custom);
    }

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

    _DrawBars(custom)
    {
        var elements = custom.selectAll('custom.rect');
        var helper = new Konva.Group();

        var groups = this._GetGroups();
        var offsetHelper = this._CreateOffsetHelper(groups);

        console.log(offsetHelper);

        elements.each(function(d,i) {
            var node = d3.select(this);
            console.log('oH: ' + offsetHelper[node.attr('id')]);
            helper.add(new Konva.Rect({
                x: node.attr('x'),
                y: node.attr('y') - offsetHelper[node.attr('id')],
                width: node.attr('width'),
                height: node.attr('height'),
                fill: node.attr('fillStyle'),
                draggable: true,
            }));

            offsetHelper[node.attr('id')] += -1 * node.attr('height');
        });
        helper.rotate(this._rotateBy);
        this._group.add(helper);
    }

    _GetGroups()
    {
        return new Set(this._data.map(d => d.category));
    }

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