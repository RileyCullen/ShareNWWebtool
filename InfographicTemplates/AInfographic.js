class AInfographic 
{
    constructor(height, width)
    {
        if (AInfographic === this.constructor) {
            throw new TypeError('Abstract class "AInfographic" cannot be instantiated');
        }

        if (this.CreateInfographic === undefined) {
            throw new TypeError('Types extending "AInfographic" must implement CreateInfographic()');
        }

        if (this.Draw === undefined) {
            throw new TypeError('Types extending "AInfographic" must implement Draw()');
        }
        this._chartHeight = height;
        this._chartWidth = width;
        this._stage = new Konva.Stage({
            container: 'container',
            width: this._chartWidth,
            height: this._chartHeight,
        });
        this._main = new Konva.Layer();

        this._stage.add(this._main);
        this._AddStageBorder();
    }

    _AddStageBorder()
    {
        this._main.add(new Konva.Rect({
            x: 0,
            y: 0,
            width: this._stage.width(),
            height: this._stage.height(),
            fill: 'white',
            stroke: 'black',
        }));
    }

    _GetTextWidth(text, fontSize, fontFamily)
    {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        ctx.font = fontSize + 'px ' + fontFamily;
        var helper = ctx.measureText(text).width;
        canvas.remove();

        return helper;
    }

    _CenterXAbout(width, center)
    {
        return center - (width / 2);
    }
}