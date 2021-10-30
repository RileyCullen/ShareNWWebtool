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
        this._group = new Konva.Group();
        this._container = group;
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
        this._container.add(this._group);
        this._group.add(rect); 
    }

    /**
     * @see ArrowHeader.js for summary and description.
     */
    Remove()
    {
        this._group.remove();
    }

    UpdateHeader(settings)
    {
        this._width = parseFloat(settings.size.width);
        this._height = parseFloat(settings.size.height);
        
        this._fill = settings.display.fill.value;
        this._cornerRadius = settings.display.cornerRadius.value;

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
                    value: this._fill
                },
                cornerRadius: {
                    type: 'text-field',
                    name: 'Corner Radius:',
                    value: this._cornerRadius
                }
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
            cornerRadius: this._cornerRadius,
            fill: this._fill,
            group: this._group,
        }
    }
}

export { RectangleHeader };