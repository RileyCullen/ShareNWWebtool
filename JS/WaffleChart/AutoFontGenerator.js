function DetermineFontSize(num, denom, presetA, presetB, width, timeout = 500)
{
    // Canvas variables
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var currentFontSize = 40, 
        widthPA = _GetIconWidth(ctx, presetA, currentFontSize),
        widthPB = _GetIconWidth(ctx, presetB, currentFontSize);

    var actualWidth = 0, difference = 0, tries = 0;

    do {
        actualWidth = (widthPA * num) + (widthPB * (denom - num));
        difference = actualWidth - width;

        currentFontSize = (difference > 0) ? currentFontSize - 0.5 : currentFontSize + 0.5;

        widthPA = _GetIconWidth(ctx, presetA, currentFontSize);
        widthPB = _GetIconWidth(ctx, presetB, currentFontSize);

        presetA.offset = _UpdatePresetOffset(widthPA);
        presetB.offset = _UpdatePresetOffset(widthPB);

        tries++;
    } while ((difference < -0.1 || difference > 0.1) && tries < timeout);
    return currentFontSize;
}

function _GetIconWidth(ctx, preset, fontSize) 
{
    ctx.font = fontSize + 'px ' + preset.font;
    var sample = preset.icon;
    return ctx.measureText(sample).width;
}

function _UpdatePresetOffset(width)
{
    return width;
}