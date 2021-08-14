// Cullen, Riley
// CategoryLabelDecorator.js
// November 2, 2020

import { ABarChartDecorator } from "./ABarChartDecorator";
import Konva from 'konva';

class CategoryLabelDecorator extends ABarChartDecorator
{
    /**
     * @summary     Adds category labels to the parameterized bar chart.
     * @description Draws unique category labels based on the this._data array
     *              to the canvas using Konva.js. 
     * 
     *              Notethat each bar chart has two elements. Categories 
     *              describe entire bars while subcategories describe the individual
     *              elements in a bar. In stacked bar charts, these two notions are 
     *              different while in regular bar charts they are the same.
     * 
     * @requires ABarChartDecorator.js
     * @see ABarChartDecorator.js
     * 
     * @param {Bar Chart}  chart        The chart we want to decorate
     * @param {Boolean}    isWithinBars Determines if category label is within the bars
     *                                  or if it is outside of the bars
     * @param {Boolean}    isTop        Determines if the label is located at the
     *                                  top or bottom
     * @param {JSON Array} font         The font of the label. Note that font is
     *                                  a JSON object with the following format:
     *                  
     *                                  {
     *                                      'fontSize': (number),
     *                                      'fontFamily': (string),
     *                                      'textColor': (string),
     *                                  }
     * @param {string}     icon         The icon we passed to IconBarChart. Note
     *                                  that this parameter is only necessary 
     *                                  when using CategoryLabel with IconBarChart.
     * @param {double}     iconSize     The size of the icon. Again, this is only
     *                                  necessary when using CategoryLabel with
     *                                  IconBarChart.
     */
    constructor({
        chart, 
        isWithinBars = true, 
        isTop = true, 
        font = { 
            fontSize : 10, 
            fontFamily : 'Times New Roman, Times, serif', 
            textColor : 'black'
        },

    })
    {
        super(chart);
        
        this._isWithinBars = isWithinBars;
        this._isTop = isTop;
        this._keys = this.GetGroups();
        this._font = font;
    }

    /**
     * @summary     Creates bar chart and adds category labels.
     * @description Calls _chart's CreateBarChart method and then creates
     *              the labels by calling _CreateLabels.
     */
    CreateChart()
    {
        this._chart.CreateChart();
        this._CreateLabels();
    }

    GetDecoratorSettings()
    {
        return {
            categoryLabel: {
                font: this._font,
                location: {
                    isTop: this._isTop,
                    isWithinBars: this._isWithinBars,
                }
            }
        }
    }

    /**
     * @summary     Creates the category labels for the Basic, Percentage, and
     *              Stacked BarChart types.
     * @description Dynamically positions the category labels within the Konva.Group.
     */
    _CreateLabels()
    {
        var iter = this._keys.values();
        var helper = new Konva.Group();
        var textHeight = this._GetFontSize('M', this._font);
        for (var i = iter.next().value; i != null; i = iter.next().value) {
            var width = this._GetFontSize(i, this._font);
            var height = this._GetBarHeight(i);
            var x = (this._xScale(i) + this._xScale.bandwidth() / 2) - (width / 2)
            var y = (this._isTop) ? this._chartHeight - height + textHeight / 2: this._chartHeight - 1.5 * textHeight;

            if (!this._isWithinBars) {
                y = (this._isTop) ? y - 2 * textHeight : y + 2 * textHeight;
            }

            var text = new Konva.Text({
                text: i,
                x: x,
                y: y,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                fill: this._font.textColor,
            });
            text.rotate(-this._rotateBy);

            if (this._rotateBy === 90) {
                if ((this._isWithinBars && !this._isTop) || (this._isWithinBars && this._isTop)) {
                    text.setAttr('y', text.getAttr('y') + width);
                }
            }

            helper.add(text);
        }
        helper.rotate(this._rotateBy);
        this._group.add(helper);
    }

    /**
     * @summary     Gets the bar height for the given category.
     * @description Iterates through all of the data and finds the cummulative
     *              heights of all the bars for that particular category
     * 
     * @param {String} category : The category we want to calculate the bar height on.
     * 
     * @returns {int} Function returns the bar height.
     */
    _GetBarHeight(category)
    {
        var barHeight = 0;
        this._data.forEach(d => {
            if (d.category === category) barHeight += (this._chartHeight - this._yScale(d.value));
        });
        return barHeight;
    }
}

export { CategoryLabelDecorator };