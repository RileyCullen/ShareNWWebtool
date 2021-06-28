// Cullen, Riley
// TitleDecorator.js
// November 25, 2020

class TitleDecorator extends ABarChartDecorator
{
    /**
     * @depreciated Note that this decorator was depreciated due to the difficulty 
     *              in determining where to place titled (i.e. it is not used
     *              anywhere).
     * 
     * @summary     Provides the bar chart type the ability to add a title.
     * @description A concrete class that adds a Konva.Text node to the bar chart's
     *              _group variable.
     * 
     * @requires Konva.js
     * @requires ABarChartDecorator.js
     * 
     * @param {ABarChart} chart The chart we want to add a title to.
     * @param {string}    text  The title.
     * @param {boolean}   isTop Title's location (top or bottom).
     * @param {string}    font  The title's font.
     */
    constructor(chart, text, isTop = true, font = {'fontSize': 8, 'fontFamily': 
        'Times New Roman, Times, serif', 'textColor': 'black', 'fontStyle': 100})
    {
        super(chart);
        this._text = text;
        this._isTop = isTop;
        this._font = font;
    }

    /**
     * @summary     Adds title to bar chart.
     * @description Call's _chart's CreateBarChart method and then adds the title
     *              in addition to whatever is previously decorated.
     */
    CreateBarChart()
    {
        this._chart.CreateBarChart();
        this._CreateTitle();
    }

    /**
     * @summary     Adds title to bar chart.
     * @description Creates a Konva.Text node, dynamically positions it on the 
     *              bar chart, the adds the text node to _group.
     */
    _CreateTitle()
    {
        var keys = this.GetGroups(), tmp = this._CreateOffsetHelper(keys), 
            max = this._FindMax(tmp, keys), width = this._GetFontSize(this._text, this._font),
            height = this._GetFontSize('M', this._font);
        var textElem = new Konva.Text({
            text: this._text,
            x: (this._chartWidth / 2) - (width / 2),
            y: this._chartHeight - this._yScale(max) - 4 * height,
            fontFamily: this._font.fontFamily,
            fontSize: this._font.fontSize,
            fontStyle: this._font.fontStyle, 
            fill: this._font.textColor,
        });
        this._group.add(textElem);
    }
}