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
        icon = 'none',
        iconSize = 0,
    })
    {
        super(chart);
        
        this._isWithinBars = isWithinBars;
        this._isTop = isTop;
        this._keys = this.GetGroups();
        this._font = font;
        this._icon = icon;
        this._iconSize = iconSize;
    }

    /**
     * @summary     Creates bar chart and adds category labels.
     * @description Calls _chart's CreateBarChart method and then creates
     *              the labels by calling _CreateLabels.
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
            this._CreateIconLabels();
        } else {
            this._CreateLabels();
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
     * @summary     Creates labels for the IconBarChart type.
     * @description Dynamically places labels onto an IconBarChart either above
     *              or below the icon chart.
     */
    _CreateIconLabels()
    {
        var iter = this._keys.values();
        var helper = new Konva.Group();
        var minCategory = this._FindMinCategory();
        var counter = 0;

        for (var i = iter.next().value; i != null; i = iter.next().value) {

            /**
             * Setting up the position of the category labels.
             * 
             * Note that:
             *  1. xIcon represents the starting x position for the icon
             *  2. xMiddle represents the middle of the icon
             *  3. x is the final position of the category label.
             *  4. For some reason, we have to multiple the icon height by 2.1.
             *     Not sure why, but it holds for all icons.
             */
            var offset = (counter === 0) ? 0 : this._padding;
            var width = this._GetFontSize(i, this._font);
            var iconWidth = this._GetIconWidth(this._icon, this._iconSize);
            var iconHeight = this._GetIconHeight(this._icon, this._iconSize);
            var xIcon = (this._xScale(i) - this._xScale(minCategory) + offset),
                xMiddle = xIcon + iconWidth / 2,
                x = xMiddle - width / 2;
            var y = (this._isTop) ? 25 : 2.1 * iconHeight;

            var text = new Konva.Text({
                text: i,
                x: x,
                y: y,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                fill: this._font.textColor,
            });

            helper.add(text);
            counter++;
        }
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