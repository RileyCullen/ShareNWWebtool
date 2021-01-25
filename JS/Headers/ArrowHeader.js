// Cullen, Riley
// ArrowHeader.js
// Janurary 24, 2020

class ArrowHeader 
{
    constructor(x, y, width, height, group, borderColor, backgroundColor)
    {   
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._group = group;
        this._borderColor = borderColor;
        this._backgroundColor = backgroundColor;
    }

    CreateHeader()
    {
        var helper = Math.sqrt(
            Math.pow(this._height / 2, 2) + Math.pow(this._width / 8192, 2)
        );
        var x1 = this._x,
            y1 = this._y,
            x2 = x1 + (this._width - helper),
            y2 = this._height / 2, 
            x3 = x2 + helper;
        var border = new Konva.Line({
            points: [x1, y1, x2, y1, x3, y2, x2, this._height, x1, this._height],
            fill: this._backgroundColor,
            stroke: this._borderColor,
            strokeWidth: this._width / 81,
            closed: true,
        });

        var offset = 7;
        var miniBorder = new Konva.Line({
            points: [x1 + offset, y1 + offset, x2 - offset / 2, y1 + offset, 
                x3 - offset, y2, x2 - offset / 2, this._height - offset, 
                x1 + offset, this._height - offset],
            fill: this._backgroundColor,
            stroke: this._borderColor,
            strokeWidth: this._width / 256,
            closed: true, 
        })

        this._group.add(border);
        this._group.add(miniBorder);
    }
}