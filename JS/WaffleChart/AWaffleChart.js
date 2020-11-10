class AWaffleChart
{
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

    UpdateData(numerator, denominator) 
    {
        this._numerator = numerator;
        this._denominator = denominator;
    }

    _DestroyChildren()
    {
        this._group.destroyChildren();
    }

    // desc: This function returns an array of json objects that BindData uses to 
    //       create custom icon elements in memory
    //
    // parameters:
    // -----------
    // numerator : int 
    //      The number of presetA.icon's we will draw to the screen
    // denominator : int
    //      The number of total icons that will be drawn to the screen
    // fontSize : int
    //      The size of the icons being drawn to the screen
    // presetA : preset object
    //      The icons that will be drawn first
    // presetB : preset object
    //      The icons that will be drawn second
    //
    // return type:
    // ------------
    // This function returns an array of json objects hereafter called a WaffleDataArr
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

    // desc: Private function that removes the original waffle chart from the 
    //       container and removes the custom DOM elements from memory
    //
    // parameters: 
    // -----------
    // custom : d3.select() object
    //      The custom DOM element that contains our binded data
    // container : Konva.Group
    //      The container that contains our waffle chart
    _RemoveWaffleChart(custom)
    {
        this._RemoveCustomElements(custom);
        this._DestroyChildren();
    }

    // desc: Remove all of the custom DOM elements from memory
    // 
    // parameters:
    // -----------
    // custom : d3.select() object
    //      See _RemoveWaffleChart()
    _RemoveCustomElements(custom)
    {
        custom.selectAll('custom.rect')
            .remove();
    }

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

    _GetIconWidth(ctx, preset, fontSize) 
    {
        ctx.font = '900 ' + fontSize + 'px ' + preset.font;
        var sample = preset.icon;
        return ctx.measureText(sample).width;
    }

    _UpdatePresetOffset(width)
    {
        return width + 3;
    }
}