// Cullen, Riley
// AWaffleChart.js
// December 23, 2020

class AWaffleChart
{
    /**
     * @summary     Abstract class for the waffle chart type.
     * @description Abstract class that provides a common interface for the waffle
     *              chart type to use.
     * 
     * @param {int} numerator        The number of presetA icons to display.
     * @param {int} denominator      The number of total icons.
     * @param {Konva.Group} group    The group we want to add the chart to. 
     * @param {WafflePreset} presetA The first set of icons to display.
     * @param {WafflePreset} presetB The second set of icons to display.
     * @param {int} fontSize         The icon size.
     * @param {bool} isDynamicResize Determines if the waffle chart will dynamically 
     *                               resize the chart when data is updated.
     */
    constructor(numerator, denominator, group, presetA, presetB, fontSize, isDynamicResize)
    {
        if (AWaffleChart === this.constructor) {
            throw new TypeError('Abstract class "AWaffleChart" cannot be instantiated');
        }
        if (this.CreateChart === undefined) {
            throw new TypeError('Types extending "AWaffleChart" must implement CreateChart()');
        }

        this._numerator = numerator;
        this._denominator = denominator;
        this._group = group;
        this._presetA = presetA;
        this._presetB = presetB;
        this._fontSize = fontSize;
        this._isDynamicResize = isDynamicResize;
    }

    /**
     * @summary     Updates the data bound to the given waffle chart.
     * @description Updates the numerator and denominator bound to the calling
     *              waffle chart (note: UpdateData only updates _numerator and
     *              _denominator. CreateChart still needs to be called to actually
     *              change the chart given on the canvas).
     * 
     * @param {int} numerator   The number of presetA icons in a waffle chart.
     * @param {int} denominator The number of total icons in a waffle chart.
     */
    UpdateData(numerator, denominator) 
    {
        if (numerator == null || numerator == '' || denominator == null || denominator == '') return;
        if (isNaN(numerator) || isNaN(denominator)) return;
        this._numerator = numerator;
        this._denominator = denominator;
    }

    /**
     * @summary     Removes group and its children from canvas.
     * @description A wrapper function that call's _group's destroy function. 
     *              This function removes the group and its children from the 
     *              canvas
     */
    Remove()
    {
        this._group.destroy();
    }

    /**
     * @summary     Removes all of the children in _group.
     * @description A wrapper function that calls the Konva.js function 
     *              destroyChildren() which removes all of the children in
     *              _group.
     */
    _DestroyChildren()
    {
        this._group.destroyChildren();
    }

    /**
     * @summary     Generates the data used to create waffle chart.
     * @description A function that creates a JSON array used to draw the waffle 
     *              chart on the canvas.
     */
    _GenerateWaffleDataArr()
    {
        var tmp = []
        for(var i = 0; i < this._denominator; i++) {
            tmp[i] = {
                'iconType': (i < this._numerator) ? this._presetA.icon : this._presetB.icon,
                'color': (i < this._numerator) ? this._presetA.color : this._presetB.color,
                'offset': (i < this._numerator) ? this._presetA.offset : this._presetB.offset,
                'fontSize': this._fontSize,
                'id': (i < this._numerator) ? 0 : 1,
                'fontFamily': (i < this._numerator) ? this._presetA.font : this._presetB.font
            }
        }
        return tmp;
    }

    /**
     * @summary     Removes waffle chart elements the custom DOM container and 
     *              from _group.
     * @description Removes d3 data bound to the chart's DOM container and calls
     *              _DestroyChildren.
     * 
     * @param {D3 selection} custom The D3 selection we want to clean.
     */
    _RemoveWaffleChart(custom)
    {
        this._RemoveCustomElements(custom);
        this._DestroyChildren();
    }

    /**
     * @summary     Removes all of the D3 elements called custom.rect.
     * @description Selects all of the elements named custom.rect and removes them
     *              from the container.
     * 
     * @param {D3 Selection} custom The D3 selection we want to clean.
     */
    _RemoveCustomElements(custom)
    {
        custom.selectAll('custom.rect')
            .remove();
    }

    /**
     * @summary     Determines the size of waffle chart icons.
     * @description Dynamically calculates the size of the icons within a waffle 
     *              chart given the width defined in _group.
     * 
     * @param {double} timeout Max amount of tries the function will take before 
     *                         it times out.
     */
    _DetermineFontSize(timeout = 500)
    {
        // Canvas variables
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        var currentFontSize = 40, 
            widthPA = this._GetIconWidth(ctx, this._presetA, currentFontSize),
            widthPB = this._GetIconWidth(ctx, this._presetB, currentFontSize);

        var actualWidth = 0, difference = 0, tries = 0;

        do {
            actualWidth = (widthPA * this._numerator) + (widthPB * (this._denominator - this._numerator));
            difference = actualWidth - this._group.getAttr('width');

            currentFontSize = (difference > 0) ? currentFontSize - 0.5 : currentFontSize + 0.5;

            widthPA = this._GetIconWidth(ctx, this._presetA, currentFontSize);
            widthPB = this._GetIconWidth(ctx, this._presetB, currentFontSize);

            this._presetA.offset = this._UpdatePresetOffset(widthPA);
            this._presetB.offset = this._UpdatePresetOffset(widthPB);

            tries++;
        } while ((difference < -0.1 || difference > 0.1) && tries < timeout);
        return currentFontSize;
    }

    /**
     * @summary     Calculates the width of an icon within a preset.
     * @description Finds the width of an icon within a preset given a specified 
     *              font size.
     * 
     * @param {Canvas context} ctx   The context of the virtual canvas created 
     *                               in calling function.
     * @param {Waffle Preset} preset The preset associated with the icon we want 
     *                               to calculate the width of.
     * @param {int} fontSize         The size of the icon.
     */
    _GetIconWidth(ctx, preset, fontSize) 
    {
        ctx.font = '900 ' + fontSize + 'px ' + preset.font;
        var sample = preset.icon;
        return ctx.measureText(sample).width;
    }

    /**
     * @summary     Updates the preset's offset.
     * @description Updates the preset's offset using the preset's width.
     * 
     * @param {double} width Width associated with a preset's icon.
     */
    _UpdatePresetOffset(width)
    {
        return width + 3;
    }
}

export { AWaffleChart };