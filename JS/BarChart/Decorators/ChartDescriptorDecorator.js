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
     * @param {Boolean}    isTop    : Determines location of descriptor (top or bottom)
     * @param {JSON Array} font     : Determines font 
     * @param {int}        iconSize : Width/height of descriptor rectangles
     * 
     */
    constructor(chart, isTop = true, font =  {'fontSize' : 8, 
        'fontFamily' : 'Times New Roman, Times, serif', 
        'textColor' : 'black'}, iconSize = 7, maxPerRow = 3) 
    {
        // TODO: vertical vs horizontal descriptor
        super(chart);
        this._font = font;
        this._iconSize = this._chartWidth / 30;
        this._isTop = isTop;
        this._maxPerRow = maxPerRow;
        this._padding = 10
        this._offsetX = 0;
        this._offsetY = 0;
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

    SetPadding(padding) { this._padding = padding; }
    SetOffsetX(offset)  { this._offsetX = offset; }
    SetOffsetY(offset)  { this._offsetY = offset; }

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
        var keys = this._GetSubCategories(), hasPopulated = this._CreateOffsetHelper(keys);
        var startingY = (this._isTop) ? -(this._iconSize + 30) : this._chartHeight + this._iconSize + 30, 
            cumulativeX = this._xScale(this._data[0].category) + this._offsetX;
        var prevOffset = 0, textOffset = 5, groupOffset = 5;

        /*while (this._DoesDescriptorExceedWidth(cumulativeX, textOffset) && this._font.fontSize > 6) {
            this._DecreaseFontSize();
        }*/

        startingY += this._offsetY;

        this._data.slice().reverse().forEach((d, i) => {
            console.log('cat: ' + d.subcategory);
            console.log('key size: ' + keys.size);

            if ((i % this._maxPerRow) === 0 && i !== 0) {
                startingY += 2 * this._iconSize;
                cumulativeX = this._xScale(this._data[0].category) + this._offsetX;
            }
            
            if (keys.size === 1 || hasPopulated[d.subcategory] === 0) {
                console.log('in')
                var textStr = (typeof d.subcategory === 'undefined' || d.subcategory === null)
                    ? d.category : d.subcategory;
                var textWidth = this._GetFontSize(textStr, this._font);

                var rectX = cumulativeX;
                var textX = rectX + this._iconSize + textOffset;

                prevOffset = this._iconSize + textWidth + textOffset;
                cumulativeX += prevOffset + groupOffset + this._padding;

                helper.add(new Konva.Rect({
                    x: rectX,
                    y: startingY,
                    width: this._iconSize,
                    height: this._iconSize,
                    fill: d.color,
                }));
                var text = new Konva.Text({
                    text: textStr,
                    x: textX,
                    y: startingY,
                    fill: this._font.color,
                    fontSize: this._font.fontSize,
                    fontFamily: this._font.fontFamily,
                });
                helper.add(text);
                if (keys.size !== 0) hasPopulated[d.subcategory] = 1;
            }
        });

        if (this._rotateBy === 90) {
            helper.setAttr('x', helper.getAttr('x') - this._chartHeight - this._xScale(this._data[0].category));
            helper.setAttr('y', helper.getAttr('y') - this._xScale.bandwidth());
        }

        this._group.add(helper);
    }

    _GetSubCategories()
    {
        return new Set(this._data.map(d => d.subcategory));
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
            totalWidth += (this._iconSize + this._GetFontSize(d.category, this._font) + textOffset);
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