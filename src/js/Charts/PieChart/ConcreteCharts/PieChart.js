// Cullen, Riley
// PieChart.js
// October 16, 2020

class PieChart extends APieChart
{
    /**
     * @summary     Allows for the creation of pie charts.
     * @description This class allows for the user to create a simple bar chart. 
     *              Note that this code only works for pie charts of two categories.
     * 
     * @requires APieChart.js
     * 
     * @see APieChart.js
     * 
     * @param {JSON Array}  data 
     * @param {Konva.Group} group 
     * @param {float}       radius 
     */
    constructor(data, group, radius = 100)
    {
        super(data, group, radius);
    }

    /**
     * @summary     This function adds the bar chart elements to the Konva
     *              group.
     * @description This function creates a virtual DOM element in memory, binds the
     *              data from data to custom DOM elements in memory, and uses
     *              the custom elements to create the slices.
     */
    CreateChart()
    {
        var virtualCanvas = document.createElement('custom');
        var custom = d3.select(virtualCanvas);
        this._BindData(custom);
        this._Draw(custom);
    }

    /**
     * @summary     This function binds the data to custom DOM elements located
     *              in custom.
     * @description See summary.
     * 
     * @param {DOM Element} custom : The virtual DOM element that holds all of
     *                               our custom DOM elements.
     */
    _BindData(custom)
    {
        var startAngle = 0, prevAngle = 0;
        var tmp = custom.selectAll('custom.circle')
            .data(this._data)
            .enter()
            .append('custom')
            .attr('class', 'circle')
            .attr('startAngle', () => {
                return startAngle += prevAngle
            })
            .attr('sliceAngle', d => {  
                return 360 * (d.value / this._totalValue);
            })
            .attr('color', d => {
                return d.color;
            })
            .attr('x', () => {
                return this._startingX;
            })
            .attr('y', () => {
                return this._startingY;
            })
            .attr('radius', () => {
                return this._radius;
            });
    }

    /**
     * @summary     This function creates the wedge pieces.
     * @description This function iterates through all of the custom DOM
     *              elements in custom and adds them to the group.
     * 
     * @param {DOM Element} custom : See _BindData.
     */
    _Draw(custom) 
    { 
        var elements = custom.selectAll('custom.circle')
        var helper = new Konva.Group();

        var wedgeArr = [], angleArr = [];

        elements.each(function(d,i) {
            var node = d3.select(this);
            var wedge = new Konva.Wedge({
                x: node.attr('x'), 
                y: node.attr('y'),
                radius: node.attr('radius'),
                angle: node.attr('sliceAngle'),
                fill: node.attr('color'),
                draggable: false,
            });

            angleArr[i] = parseFloat(node.attr('sliceAngle'));

            helper.add(wedge);
            wedgeArr[i] = wedge;
        });

        if (this._data[0].value > 50) this._RotateSlices(wedgeArr, angleArr[0]);
        else this._RotateSlices(wedgeArr, 360 - angleArr[1]);
        this._group.add(helper);
    }

    /**
     * @summary     Rotates the wedges by theta to create full circle
     * @description Iterates backwards through all of the konva wedges and 
     *              applies a rotation factor that rotates the wedges to 
     *              for a full circle.
     * 
     * @param {Array} wedgeArr       : An array of konva wedges that we want to apply
     *                                 a rotation factor to.
     * @param {Float} rotationOffset : The amount of rotational offset the entire 
     *                                 chart is offset by. This is equal to 
     *                                 the largest angle in the pie chart 
     */
    _RotateSlices(wedgeArr, rotationOffset = -90)
    {
        var theta = 0, cTheta = parseFloat(wedgeArr[0].getAttr('angle') - 90);
        for (var i = wedgeArr.length - 1; i > -1; i--) {
            theta = (i === -1) ? 0 : 360 - cTheta;
            cTheta += parseFloat(wedgeArr[i].getAttr('angle'));
            wedgeArr[i].rotation(-1 * (theta + rotationOffset));
        }
    }
}