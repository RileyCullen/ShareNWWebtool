// Cullen, Riley
// December 21, 2020
// MessageBubble.js

import Konva from 'konva';

class MessageBubble 
{
    /**
     * @summary     Creates a message bubble in KonvaJS.
     * @description Constructs a message bubble using the various shapes defined
     *              in the KonvaJS library.
     * 
     * @requires Konva.JS
     * 
     * @param {Konva.Group} group  The group associated with the message bubble.
     * @param {double}      width  The width of the message bubble.
     * @param {double}      height The height of the message bubble.
     * @param {string}      color  The color of the message bubble.
     */
    constructor(group, width, height, color, x, y)
    {
        this._group = group;
        this._width = width;
        this._height = height;
        this._color = color;
        this._x = x;
        this._y = y;
    }

    /**
     * @summary     Creates the message bubble at coordinates (x, y). 
     * @description Adds a Konva.Rect and Konva.Line object to the group specified
     *              in the constructor. Note that the rectangle is aligned at 
     *              (x, y) while the triangle like object created using the Konva
     *              .Line class is dynamically placed.
     * 
     * @param {double} x The x coordinate we want to place our message bubble at.
     * @param {double} y The y coordinate we want to place our message bubble at.
     */
    CreateHeader()
    {
        var helper = new Konva.Group(), x = this._x, y = this._y;
        this._group.add(helper);

        helper.add(new Konva.Rect({
            x: x,
            y: y,
            width: this._width,
            height: this._height,
            fill: this._color,
        }));

        var triangleOffset = 5;
        var x1 = x + triangleOffset, x2 = x1 - (this._width / 10), x3 = x + triangleOffset;
        var y1 = y + (3 / 5) * this._height + 5, y2 = y1 + (this._height / 6),
            y3 = y + (8.5 / 10) * this._height + 5;

        helper.add(new Konva.Line({
            fill: this._color,
            points: [x1, y1, x2, y2, x3, y3, x1, y1],
            closed: true
        }));
    }

    Remove()
    {
        this._group.destroy();
    }

    UpdateHeader(settings)
    {
        this._width = parseFloat(settings.size.width);
        this._height = parseFloat(settings.size.height);

        this._color = settings.display.fill.value;

        this._group.destroyChildren();
    }

    GetSettings()
    {
        return {
            size: {
                width: this._width,
                height: this._height,
            },
            display: {
                fill: {
                    type: 'color-picker',
                    name: 'Fill:',
                    value: this._color,
                },
            }
        }
    }

    GetAttrs()
    {
        return {
            x: this._x,
            y: this._y,
            width: this._width,
            height: this._height,
            group: this._group,
            color: this._color,
        }
    }
}

export { MessageBubble };