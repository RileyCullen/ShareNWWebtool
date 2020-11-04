class MessageBubble 
{
    constructor(group, width, height, color)
    {
        this._group = group;
        this._width = width;
        this._height = height;
        this._color = color;
    }

    CreateMessageBubble(x, y)
    {
        var helper = new Konva.Group();
        this._group.add(helper);

        helper.add(new Konva.Rect({
            x: x,
            y: y,
            width: this._width,
            height: this._height,
            fill: this._color,
        }));

        var x1 = x, x2 = x1 - (this._width / 10), x3 = x;
        var y1 = y + (3/5) * this._height + 5, y2 = y1 + (this._height / 6),
            y3 = y + (8.5/10) * this._height + 5;

        helper.add(new Konva.Line({
            fill: this._color,
            points: [x1, y1, x2, y2, x3, y3, x1, y1],
            fill: this._color,
            closed: true
        }));
    }

    AddMessage()
    {
        
    }
}