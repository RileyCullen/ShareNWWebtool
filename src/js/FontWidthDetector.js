function GetFontSize(text, font)
{
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    ctx.font = font.fontSize + 'px ' + font.fontFamily;
    var helper = ctx.measureText(text).width;
    canvas.remove();

    return helper;
}