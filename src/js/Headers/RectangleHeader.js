// Cullen, Riley
// RectangleHeader.js
// July 20, 2021

import Konva from 'konva';

class RectangleHeader
{
    /**
     * @summary     Creates a reactangle header.
     * @description A regular class that uses KonvaJS to create a rectangular 
     *              header and add it to the infographic.
     * 
     * @param {double} x            The x position of the rectangle.
     * @param {double} y            The y position of the rectangle.
     * @param {double} width        The width of the rectangle.
     * @param {double} height       The height of the rectangle.
     * @param {double} cornerRadius A parameter that defines how circular the 
     *                              border of the rectangle is.
     * @param {string} fill         The fill color of the rectangle.
     * @param {Konva.Group} group   The group the rectangle is added to.
     */
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

    /**
     * @summary     Creates the header and adds it the the infographic.
     * @description Creates a Konva.Rect with all of the parameters specified
     *              in the constructor then adds it to the group.
     */
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

    /**
     * @see ArrowHeader.js for summary and description.
     */
    Remove()
    {
        this._group.destroy();
    }
}

export { RectangleHeader };