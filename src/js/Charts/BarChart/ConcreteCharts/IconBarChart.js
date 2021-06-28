// Riley Cullen
// IconBarChart.js
// Lasted Updated: May 31, 2021

class IconBarChart extends ABarChart
{
    /**
     * @summary     A concrete bar chart type that creates a "bar" chart with
     *              icons in place of the bars.
     * @description A concrete bar chart type that uses icons from FontAwesome
     *              and the Konva.Text module to create icon bar charts. 
     *              Essentially, the icons are created using Konva.Text elements
     *              and a linear gradient is applied too the text element to 
     *              simulate the "bar" in a bar chart.
     * 
     * @see ABarChart for documentation on data, group, width, height, and padding.
     * @param {string} icon           The icon that will be displayed on the chart.
     * @param {string} remainderColor The color of the remaining space in the 
     *                                icon. For example, if half an icon is 
     *                                to be colored blue and remainderColor is 
     *                                set to 'white', then the remaining half
     *                                will be colored white.
     * @param {double} iconSize       The size of the icon.
     * @param {bool}   dynamicFont    A boolean that determines if the icons 
     *                                will be dynamically resized based on 
     *                                the given chart width.
     *  
     */
    constructor({data, group, width, height, padding, angleOffset = 0,
        icon = '\uf183', remainderColor = 'black', iconSize = 100, dynamicFont = false})
    {
        super(data, group, width, height, padding, 0, 'Icon');
        this._angleOffset = angleOffset;
        this._icon = icon;
        this._remainderColor = remainderColor;
        this._iconSize = parseFloat(iconSize);
        this._dynamicFont = dynamicFont;
    }

    /**
     * @summary     A method that draws the icon bar chart on canvas.
     * @description A method that creates the icon bar chart by first binding 
     *              the data within _data to custom DOM elements and the using 
     *              that data to draw canvas elements using Konva.js
     */
    CreateBarChart()
    {
        if (this._dynamicFont) this._DetermineFontSize();
        var upperBound = this._UpdateUpperBound();
        
        var virtualCanvas = document.createElement('custom');
        var custom = d3.select(virtualCanvas);

        this._BindData(custom) 

        var points = this._DetermineLinearGradient(upperBound);
        this._Draw(custom, points);
    }

    /**
     * @summary     This function finds the max height, or upper bound, of the
     *              icon.
     * @description This returns the max height of the icon to the caller. An
     *              upper bound is necessary because it allows us to set an accurate
     *              start point for our linear gradient.
     * @returns An integer representing the upperBound of our icon.
     */
    _UpdateUpperBound()
    {
        var upperBound = this._iconSize;
        return parseInt(upperBound);
    }

    /**
     * @summary     Returns an array of points for the linear gradient.
     * @description Creates an array of JSON objects that represent the start
     *              and end points of the linear gradient we will use to simulate 
     *              the bars in a bar chart. 
     * 
     * @param {double} upperBound The height of the icon.
     * @returns An array of JSON objects representing the start and end points of
     *          a linear gradient.
     */
    _DetermineLinearGradient(upperBound)
    {
        // Note that we add one to the start and end points as "padding." Without 
        // it, some icons will have extra white space surrounding the actual linear 
        // gradient.
        return [
            { x: 0, y: upperBound + 1},
            { x: 0, y: -1 }
        ];
    }

    /**
     * @summary     Finds the max value in _data.
     * @description Iterates through _data and returns the max value.
     * @returns     The max value.
     */
    _FindMaxValue()
    {
        var max = (this._data.length > 0) ? this._data[0].value : 0;
        for (var i = 1; i < this._data.length; i++) {
            if (this._data[i].value > max) max = this._data[i].value;
        }
        return max;
    }

    /**
     * @summary     Binds data to custom DOM elements using D3.
     * @description Creates custom DOM elements, accessible through custom,
     *              and binds data to those elements for use later.
     * 
     * @param {DOM Element} custom The container of our custom DOM elements.
     */
    _BindData(custom)
    {
        var minCategory = this._FindMinCategory();
        custom.selectAll('custom.elem')
            .data(this._data)
            .enter()
            .append('custom')
            .attr('class', 'elem')
            .attr('x', (d, i) => {
                /**
                 * NOTE that here, we subtract the xScale of minCategory so that
                 * the first icon starts at 0. In addition, we add offset to account 
                 * for the padding set by the user.
                 */
                var offset = (i == 0) ? 0 : this._padding;
                return this._xScale(d.category) - this._xScale(minCategory) + offset;
            })
            .attr('y', () => {
                // Update to use text metrics to find height
                return (this._iconSize / 2);
            })
            .attr('width', () => {
                return this._xScale.bandwidth();
            })
            .attr('gradientHeight', (d) => {
                /**
                 * This value will determine the height of the gradient. Essentially,
                 * we find the max value in _data and then use the proportion of 
                 * the current value out of this max value to find the point at which
                 * the gradient changes from its intended color to the remainder
                 * color. This value needs to be between 0 and 1.
                 */
                return d.value / this._FindMaxValue();
            })
            .attr('fillStyle', (d) => {
                return d.color;
            })
            .attr('icon', this._icon)
            .attr('remainderColor', this._remainderColor)
            .attr('size', this._iconSize)
            .attr('angleOffset', this._angleOffset);
    }

    /**
     * @summary     Finds the category with the smallest value in _data.
     * @description Iterates through _data and returns the category name corresponding
     *              to the smallest value.
     * @returns     A string representing the category with the smallest value.
     */
    _FindMinCategory()
    {
        var index = 0;
        for (var i = 1; i < this._data.length; i++) {
            if (this._data[i].value > this._data[i].value) index = i;
        }
        return this._data[index].category;
    }

    /**
     * @summary     Draws bar chart on canvas.
     * @description Uses data bound in custom to draw icons to canvas using Konva.JS.
     * 
     * @param {DOM Element} custom The container for our custom DOM elements.
     * @param {JSON Array}  points The start and end points for our linear gradient.
     */
    _Draw(custom, points)
    {
        var elements = custom.selectAll('custom.elem');
        var helper = new Konva.Group({
            x: 0, y: 0
        });
        elements.each(function() {
            var node = d3.select(this);

            var gradientHeight = parseFloat(node.attr('gradientHeight')),
                iconSize = parseFloat(node.attr('size')),
                x = parseFloat(node.attr('x')),
                y = parseFloat(node.attr('y'));

            var icon = new Konva.Text({
                text: node.attr('icon'),
                fontSize: iconSize,
                fontFamily: '"Font Awesome 5 Free"',
                fontStyle: '900',
                x: x,
                y: y,
                fillLinearGradientStartPoint: points[0],
                fillLinearGradientEndPoint: points[1],
                fillLinearGradientColorStops: [0, node.attr('fillStyle'), 
                    gradientHeight, node.attr('fillStyle'), 
                    gradientHeight, node.attr('remainderColor'), 
                    1, node.attr('remainderColor')]
            });
           
            icon.rotate(-node.attr('angleOffset'));
            helper.add(icon)
        });
        this._group.add(helper);
    }
}