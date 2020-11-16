// Cullen, Riley
// NumericLabelDecorator.js
// October 10, 2020

class DataValueDecorator extends ABarChartDecorator 
{
    /**
     * @summary     This decorator adds a label to the bars.
     * @description This decorator adds a label to the bars. This label can either be
     *              a purely numeric variable, a percentage, a category, or a 
     *              combination of the previously mentioned labels.
     * 
     * @requires ABarChartDecorator.js
     * 
     * @see ABarChart.js
     * 
     * @param {BarChart}   chart        : See ABarChartDecorator.js    
     * @param {Boolean}    isPercentage : Determines if percentage sign will be displayed
     * @param {Boolean}    isCategory   : Determines if category will be displayed
     * @param {Boolean}    isMiddle     : Determines the location of data value labels.
     *                                    When true, the data value labels will be located
     *                                    in the middle of the bars. If false, the 
     *                                    values will be located at the top of the bars.
     * @param {JSON array} font         : Determines font of labels
     */
    constructor(chart, isPercentage = true, isCategory = false, isMiddle = true, 
        font = {'fontSize': 8, 'fontFamily': 'Times New Roman, Times, serif', 'fontColor': 'black'}) 
    {
        super(chart);
        this._font = font;
        this._isPercentage = isPercentage;
        this._isCategory = isCategory;
        this._isMiddle = isMiddle;
    }

    /**
     * @summary     This function adds a label to the bars within a bar chart/
     * @description See summary. This is done by calling _chart's CreateBarChart
     *              function and by calling _AddLabels.
     */
    CreateBarChart()
    {
        this._chart.CreateBarChart();
        this._AddLabels();
    }

    /**
     * @summary     This function adds the labels to the already drawn bar chart.
     * @description This function iterates through all of the values in _data
     *              and create a label for each of the bars based on the booleans
     *              passed through the constructor as well as the d.value for 
     *              that particular bar.
     */
    _AddLabels()
    {
        var helper = new Konva.Group();
        var groups = this._GetGroups();
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
}