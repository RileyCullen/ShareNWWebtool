import { AIconBar } from '../AIconBar';

class AIconBarDecorator extends AIconBar
{
    constructor(chart)
    {
        super({
            data: chart._data,
            group: chart._group,
            width: chart._chartWidth,
            height: chart._chartHeight,
            padding: chart._padding,
            angleOffset: chart._angleOffset,
            icon: chart._icon,
            remainderColor: chart._remainderColor,
            iconSize: chart._iconSize,
            dynamicFont: chart._dynamicFont,
        });

        if (this.constructor === AIconBarDecorator) {
            throw new TypeError('Abstract class "ABarChartDecorator" cannot be instantiated');
        }

        this._chart = chart;
        this._yScale = chart._yScale;
    }

    /**
     * @summary     Updates the decorator with a new data array.
     * @description Updates the data, chart, and yScale associated with this
     *              particular decorator.
     * 
     * @param {BarChart} chart The bar chart we want to base our update on.
     */
     UpdateDecorator(chart)
     {
         this._data = chart._data;
         this._chart = chart;
         this._yScale = chart._yScale;
     }
 
     /**
      * @summary     Returns the width of a given piece of text in pixels.
      * @description Uses the canvas measureText function to determine the width
      *              of a particular piece of text given a specific font. 
      * 
      * @param {String} text      The text we want to measure.
      * @param {JSON Object} font The font of the text we want to measure. 
      * 
      * NOTE: This is an old method. _GetTextWidth/_GetTextHeight should be used instead.
      */
     _GetFontSize(text, font)
     {
         var canvas = document.createElement('canvas');
         var ctx = canvas.getContext('2d');
 
         ctx.font = font.fontSize + 'px ' + font.fontFamily;
         var helper = ctx.measureText(text).width;
         canvas.remove();
 
         return helper;
     }
 
     _GetTextWidth(text, font)
     {
         var canvas = document.createElement('canvas');
         var ctx    = canvas.getContext('2d');
 
         document.getElementById('body').appendChild(canvas)
 
         ctx.font = font.fontSize + 'px ' + font.fontFamily;
         var textMetrics = ctx.measureText(text);
         var width = Math.abs(textMetrics.actualBoundingBoxLeft 
             - textMetrics.actualBoundingBoxRight);
 
         canvas.remove();
 
         return width; 
     }
 
     _GetIconWidth(icon, iconSize)
     {
         var font = {
             fontSize: '900 ' + iconSize,
             fontFamily: '"Font Awesome 5 Free"',
         }
         return this._GetTextWidth(icon, font);
     }
 
     _GetTextHeight(text, font)
     {
         var canvas = document.createElement('canvas');
         var ctx    = canvas.getContext('2d');
 
         ctx.font = font.fontSize + 'px ' + font.fontFamily;
         var textMetrics = ctx.measureText(text);
         var height = Math.abs(textMetrics.actualBoundingBoxAscent) - 
             Math.abs(textMetrics.actualBoundingBoxDescent);
         
         canvas.remove();
 
         return height;
     }
 
     _GetIconHeight(icon, iconSize)
     {
         var font = {
             fontSize: '900 ' + iconSize,
             fontFamily: '"Font Awesome 5 Free"',
         }
         return this._GetTextHeight(icon, font);
     }
}

export { AIconBarDecorator };