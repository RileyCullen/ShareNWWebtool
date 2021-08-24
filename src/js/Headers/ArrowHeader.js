// Cullen, Riley
// ArrowHeader.js
// Janurary 24, 2020

import Konva from 'konva';

class ArrowHeader 
{
    /**
     * @summary     Constructs a new ArrowHeader and adds it to the parameterized
     *              group.
     * @description Constructor that sets up the instance variable associated with
     *              an ArrowHeader object. This object draws an arrow like section
     *              background and adds it to the canvas via the parameterized 
     *              group object.
     * 
     * @requires Konva.js
     * 
     * @param {double}      x               The x position of the arrow.
     * @param {double}      y               The y position of the arrow.
     * @param {double}      width           Width of arrow. 
     * @param {double}      height          Height of arrow.
     * @param {Konva.Group} group           The group we want to add the arrow object to.
     * @param {string}      borderColor     Color of arrow's border.
     * @param {string}      backgroundColor Color of arrow's background.
     */
    constructor(x, y, width, height, group, borderColor, backgroundColor)
    {   
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._group = new Konva.Group();
        this._borderColor = borderColor;
        this._backgroundColor = backgroundColor;
        
        group.add(this._group);
    }

    /**
     * @summary     Creates the ArrowHeader section in group.
     */
    CreateHeader()
    {
        var helper = this._width / 10;
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

    /**
     * @summary Returns the Konva.Group of this header to the caller.
     * @returns A Konva.Group object.
     */
    GetGroup()
    {
        return this._group;
    }

    /**
     * @summary     Removes the header from the infographic.
     * @description A wrapper function that calls the Konva.Group function 
     *              destroy(), which removes the group as well as its children
     *              forever.
     */
    Remove()
    {
        this._group.destroy();
    }

    GetSettings()
    {
        return {
            size: {
                width: this._width,
                height: this._height,
            },
            display: {
                borderColor: {
                    type: 'color-picker',
                    name: 'Border Color:',
                    value: this._borderColor,
                },
                backgroundColor: {
                    type: 'color-picker',
                    name: 'Background Color:',
                    value: this._backgroundColor
                },
            }
        }
    }
}

export { ArrowHeader };