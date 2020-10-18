// Cullen, Riley
// ChartDescriptorDecorator.js
// October 14, 2020

class ChartDescriptorDecorator extends ABarChartDecorator
{
    /**
     * @summary     This decorator adds color descriptors to the chart.
     * @description See summary. 
     * 
     * @requires ABarChartDecorator.js
     * @requires FontWidthDetector.js
     *  
     * @param {BarChart}   chart    : Chart object we are adding to 
     * @param {JSON Array} font     : Determines font 
     * @param {int}        iconSize : Width/height of descriptor rectangles
     * 
     */
    constructor(chart, font =  {'fontSize' : 8, 
        'fontFamily' : 'Times New Roman, Times, serif', 
        'textColor' : 'black'}, iconSize = 7) 
    {
        // TODO: vertical vs horizontal descriptor
        super(chart);
        this._font = font;
        this._iconSize = this._chartWidth / 30;

        // not working
        this._font.fontSize = (this._iconSize > 8) ? this._iconSize : 8;
    }

    CreateBarChart()
    {
        /**
         * @summary     This function adds descriptors to the chart.
         * @description See summary. This function does so by calling _chart's 
         *              CreateBarChart function and _CreateDescriptor
         */
        this._chart.CreateBarChart();
        this._CreateDescriptor();
    }

    _CreateDescriptor()
    {
        /**
         * @summary     This function adds descriptors to the chart
         * @description This function iterates through all of the data and adds
         *              a descriptor that corresponds to each piece of data.
         */

        // TODO: Update dynamic fitting so that instead of constantly decreasing 
        //       font size, after a certain lower bound that descriptors go to the
        //       'next line'.
        var helper = new Konva.Group();
        var startingY = -(this._iconSize + 10), cumulativeX = this._xScale(this._data[0].category);
        var prevOffset = 0, textOffset = 5, groupOffset = 5;

        while (this._DoesDescriptorExceedWidth(cumulativeX, textOffset) && this._font.fontSize > 6) {
            this._DecreaseFontSize();
        }

        this._data.forEach((d, i) => {
            var textWidth = GetFontSize(d.category, this._font);
            var textHeight = GetFontSize('M', this._font);

            var rectX = cumulativeX;
            var textX = rectX + this._iconSize + textOffset;

            prevOffset = this._iconSize + textWidth + textOffset;
            cumulativeX += prevOffset + groupOffset;

            helper.add(new Konva.Rect({
                x: rectX,
                y: startingY,
                width: this._iconSize,
                height: this._iconSize,
                fill: d.color,
            }));
            var text = new Konva.Text({
                text: d.category,
                x: textX,
                y: startingY,
                fill: this._font.color,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
            });
            helper.add(text);
        });

        if (this._rotateBy === 90) {
            helper.setAttr('x', helper.getAttr('x') - this._chartHeight - this._xScale(this._data[0].category));
            helper.setAttr('y', helper.getAttr('y') - this._xScale.bandwidth());
        }

        this._group.add(helper);
    }

    _DoesDescriptorExceedWidth(startingX, textOffset)
    {
        /**
         * @summary     This function returns if the total with of all the descriptors
         *              exceeds the total width of the chart
         * @description See summary. 
         */
        var totalWidth = startingX;
        this._data.forEach(d => {
            totalWidth += (this._iconSize + GetFontSize(d.category, this._font) + textOffset);
        }); 
        return totalWidth > this._chartWidth;
    }

    _DecreaseFontSize()
    {
        /**
         * @summary     This function decreases the font size by one.
         * @description See summary.
         */
        this._font.fontSize--;
    }
}