// Cullen, Riley
// NumericLabelDecorator.js
// October 10, 2020

class LabelDecorator extends ABarChartDecorator 
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
     * @param {JSON array} font         : Determines font of labels
     */
    constructor(chart, isPercentage = true, isCategory = false, font = {'fontSize': 8, 
        'fontFamily': 'Times New Roman, Times, serif', 'fontColor': 'black'}) 
    {
        super(chart);
        this._font = font;
        this._isPercentage = isPercentage;
        this._isCategory = isCategory;
    }

    CreateBarChart()
    {
        /**
         * @summary     This function adds a label to the bars within a bar chart/
         * @description See summary. This is done by calling _chart's CreateBarChart
         *              function and by calling _AddLabels.
         */
        this._chart.CreateBarChart();
        this._AddLabels();
    }

    _AddLabels()
    {
        /**
         * @summary     This function adds the labels to the already drawn bar chart.
         * @description This function iterates through all of the values in _data
         *              and create a label for each of the bars based on the booleans
         *              passed through the constructor as well as the d.value for 
         *              that particular bar.
         */
        var helper = new Konva.Group();
        this._data.forEach(d => {
            var label = d.value;

            if (this._isPercentage) label += '%';
            if (this._isCategory) label += ' ' + d.category;

            var labelWidth = GetFontSize(label, this._font);
            var text = new Konva.Text({
                x: (this._xScale(d.category) + this._xScale.bandwidth() / 2) - (labelWidth / 2),
                y: this._chartHeight - ((this._chartHeight - this._yScale(d.value)) / 2),
                text: label,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                fill: this._font.fontColor,
            }); 
            text.rotate(-this._rotateBy);
            helper.add(text);
        });
        this._group.add(helper);
        helper.rotate(this._rotateBy);
    }
}