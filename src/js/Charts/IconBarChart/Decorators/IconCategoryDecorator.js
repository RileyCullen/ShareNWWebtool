import { AIconBarDecorator } from './AIconBarDecorator';
import Konva from 'konva';

class IconCategoryDecorator extends AIconBarDecorator
{
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
        this._CreateIconLabels();
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
}

export { IconCategoryDecorator };