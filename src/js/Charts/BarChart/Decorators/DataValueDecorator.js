// Cullen, Riley
// NumericLabelDecorator.js
// October 10, 2020

class DataValueDecorator extends ABarChartDecorator 
{
    /**
     * @summary     This decorator adds a label to the bars with the bar's value 
     *              as the output.
     * @description This decorator adds a label to the bars. This label can either be
     *              a purely numeric variable, a percentage, a category, or a 
     *              combination of the previously mentioned labels.
     * 
     * @requires ABarChartDecorator.js
     * 
     * @see ABarChart.js
     * 
     * @param {BarChart}   chart        See ABarChartDecorator.js    
     * @param {Boolean}    isPercentage Determines if percentage sign will be displayed
     * @param {Boolean}    isCategory   Determines if category will be displayed
     * @param {Boolean}    isMiddle     Determines the location of data value labels.
     *                                  When true, the data value labels will be located
     *                                  in the middle of the bars. If false, the 
     *                                  values will be located at the top of the bars.
     * @param {JSON array} font         Determines font of labels
     * @param {string}     icon         The icon we passed to IconBarChart. Note
     *                                  that this parameter is only necessary 
     *                                  when using CategoryLabel with IconBarChart.
     * @param {double}     iconSize     The size of the icon. Again, this is only
     *                                  necessary when using CategoryLabel with
     *                                  IconBarChart.
     * @param {string} backgroundStroke The stroke color for the background region
     *                                  created around the data value.
     * @param {string} backgroundFill   The fill color for the background region
     *                                  created around the data value.
     */
    constructor({
        chart, 
        isPercentage = true, 
        isCategory = false, 
        isMiddle = true, 
        font = {
            fontSize: 8, 
            fontFamily: 'Times New Roman, Times, serif', 
            fontColor: 'black'
        },
        icon = 'none',
        iconSize = 0,
        backgroundStroke = 'black',
        backgroundFill = 'white',
    }) 
    {
        super(chart);
        this._font = font;
        this._isPercentage = isPercentage;
        this._isCategory = isCategory;
        this._isMiddle = isMiddle;
        this._icon = icon;
        this._iconSize = iconSize;
        this._backgroundStroke = backgroundStroke;
        this._backgroundFill = backgroundFill;
    }

    /**
     * @summary     This function adds a label to the bars within a bar chart.
     * @description See summary. This is done by calling _chart's CreateBarChart
     *              function and by calling _AddLabels.
     */
    CreateBarChart()
    {
        this._chart.CreateBarChart();

        // NOTE: We essentially need two different methods for creating the 
        //       category labels based on what the chart type is. Essentially,
        //       the IconBarChart class has separate rendering code from the 
        //       Basic, Percentage, and Stacked bar chart classes. Since the 
        //       placement of the labels are based on how the chart is rendered,
        //       we need to call a separate helper function.
        if (this._chartType === 'Icon') {
            if (this._icon === 'none') throw 'No icon provided';
            if (this._iconSize === 0) throw 'No icon size provided';
            this._AddIconLabels();
        }
        else this._AddLabels();
    }

    /**
     * @summary     This function adds the labels to the already drawn bar chart.
     * @description This function iterates through all of the values in _data
     *              and creates a label for each of the bars based on the booleans
     *              passed through the constructor as well as the d.value for 
     *              that particular bar.
     */
    _AddLabels()
    {
        // TODO: add background region code (see icon labels).
        var helper = new Konva.Group();
        var groups = this.GetGroups();
        var offsetHelper = this._CreateOffsetHelper(groups);
        var labelHeight = this._GetFontSize('M', this._font);

        this._data.forEach(d => {
            var label = d.value;

            if (this._isPercentage) label += '%';
            if (this._isCategory) label += ' ' + d.category;

            var labelWidth = this._GetFontSize(label, this._font);

            var yPos = (this._isMiddle) ? (this._chartHeight - 
                ((this._chartHeight - this._yScale(d.value)) / 2)) - labelHeight / 2 
                - offsetHelper[d.category] : (this._yScale(d.value) - offsetHelper[d.category]
                - labelHeight - 5);

            var text = new Konva.Text({
                x: (this._xScale(d.category) + this._xScale.bandwidth() / 2) - (labelWidth / 2),
                y: yPos,
                text: label,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                fill: this._font.fontColor,
            }); 
            offsetHelper[d.category] += (this._chartHeight - this._yScale(d.value));

            // Text y position wrong when we rotate so we need to adjust them
            if (this._rotateBy !== 0) {
                text.x(text.x() + (1/2.5) * labelWidth);
                text.y(this._chartHeight / 2 + labelWidth / 2);
            }

            text.rotate(-this._rotateBy);
            helper.add(text);
        });
        this._group.add(helper);
        helper.rotate(this._rotateBy);
    }

    /**
     * @summary     Creates the data value labels for the IconBar type.
     * @description A function that iterates through all of the data in _data 
     *              and creates a label for each value. 
     */
    _AddIconLabels()
    {
        var helper = new Konva.Group();
        var minCategory = this._FindMinCategory();
        this._data.forEach((d,i) => {
            var label = d.value;

            if (this._isPercentage) label += '%';
            if (this._isCategory) label += ' ' + d.category;

            /**
             * Setting up initial values. See CategoryLabelDecorator for description
             * on what xIcon, xMiddle, and x represent.
             */
            var labelWidth = this._GetTextWidth(label, this._font),
                labelHeight = this._GetTextHeight(label, this._font),
                offset = (i == 0) ? 0 : this._padding,
                iconWidth = this._GetIconWidth(this._icon, this._iconSize),
                iconHeight = this._GetIconHeight(this._icon, this._iconSize),
                xIcon = (this._xScale(d.category) - this._xScale(minCategory) + offset),
                xMiddle = xIcon + (iconWidth / 2),
                x = xMiddle - (labelWidth / 2),
                y = 2.5 * iconHeight / 2;

            var text = new Konva.Text({
                x: x,
                y: y - 1,
                text: label,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                fill: this._font.fontColor,
            }); 
            helper.add(this._CreateBackgroundRegion(x, y, labelWidth, labelHeight));
            helper.add(text);
        });
        this._group.add(helper);
    }

    /**
     * @summary     Creates a background region for the a data value label.
     * 
     * @param {double} x      Starting x position for background region.
     * @param {double} y      Starting y position for background region.
     * @param {double} width  Width of background region.
     * @param {double} height Height of background region.
     * 
     * @returns A Konva.Rect object representing the newly created background 
     *          region.
     */
    _CreateBackgroundRegion(x, y, width, height)
    {
        return new Konva.Rect({
            x: x - 5,
            y: y - 5,
            width: width + 10,
            height: height + 10,
            fill: this._backgroundFill,
            stroke: this._backgroundStroke,
        });
    }
}