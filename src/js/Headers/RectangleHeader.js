import Konva from 'konva';

class RectangleHeader
{
    constructor({x, y, width, height, cornerRadius, fill, group})
    {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._cornerRadius = cornerRadius;
        this._fill = fill;
        this._group = group;
    }

    CreateHeader()
    {
        var rect = new Konva.Rect({
            cornerRadius: this._cornerRadius, 
            x: this._x, 
            y: this._y,
            width: this._width,
            height: this._height,
            fill: this._fill,
        });
        this._group.add(rect); 
    }

    Remove()
    {
        this._group.destroy();
    }
}

export { RectangleHeader };