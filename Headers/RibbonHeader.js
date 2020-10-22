class RibbonHeader 
{
    constructor(colorOne, colorTwo, group, hWidth, hHeight, iWidth, iHeight)
    {
        this._colorOne = colorOne;
        this._colorTwo = colorTwo;
        this._group = group;
        this._width = hWidth;
        this._height = hHeight;
        this._infogWidth = iWidth;
        this._infogHeight = iHeight;
    }

    CreateHeader()
    {
        this._CreateMainRect();
        this._CreateSideRects();
    }

    _CreateMainRect()
    {
        this._group.add(new Konva.Rect({
            x: (this._infogWidth / 2) - (this._width / 2),
            y: 0,
            fill: this._colorOne,
            width: this._width,
            height: this._height,
            cornerRadius: 5
        }));
    }

    _CreateSideRects()
    {
        var leftX = ((this._infogWidth / 2) - (this._width / 2)) - ((3/4) * this._height / 2),
            rightX = (this._infogWidth / 2) + (this._width / 2) - ((3/4) * this._height / 2);
        this._CreateMiniRect(leftX);
        this._CreateMiniRect(rightX); 
    }

    _CreateMiniRect(x)
    {
        var tmp = new Konva.Rect({
            x: x,
            y: this._height / 4,
            fill: this._colorTwo,
            width: (3/4) * this._height,
            height: this._height,
            cornerRadius: 5,
        });
        this._group.add(tmp);
        tmp.moveToBottom();
    }
}