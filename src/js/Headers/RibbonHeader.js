// Cullen, Riley
// RibbonHeader.js
// November 16, 2020

import Konva from 'konva';

class RibbonHeader 
{
    /**
     * @summary     Creates a ribbon like icon.
     * @description Creates a ribbon like icon by creating three rounded rectangles.
     * 
     * @requires Konva.js
     * 
     * @param {String}      colorOne The color of the large, central rectangle.
     * @param {String}      colorTwo The color of the two smaller rectangles.
     * @param {Konva.Group} group    The group we add the ribbon to.
     * @param {Double}      hWidth   The width of the ribbon.
     * @param {Double}      hHeight  The height of the ribbon.
     * @param {Double}      iWidth   The width of the infographic.
     * @param {Double}      iHeight  The height of the infographic.
     */
    constructor({colorOne, colorTwo, group, hWidth, hHeight, iWidth, iHeight})
    {
        this._colorOne = colorOne;
        this._colorTwo = colorTwo;
        this._group = group;
        this._width = hWidth;
        this._height = hHeight;
        this._infogWidth = iWidth;
        this._infogHeight = iHeight;
    }

    /**
     * @summary Creates the ribbon.
     */
    CreateHeader()
    {
        this._CreateMainRect();
        this._CreateSideRects();
    }

    /**
     * @see ArrowHeader.js for summary and description.
     */    
    Remove()
    {
        this._group.destroy();
    }

    /**
     * @summary     Creates the main, central rectangle in the ribbon.
     * @description Adds a Konva.Rect to the group. The position of the Rect is
     *              dynamically calculated based on the width of the ribbon.
     */
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

    /**
     * @summary     Creates the two smaller side rectangles.
     * @description Dynamically calculates the x positions of the two smaller 
     *              rectangles so that they are roughly half way down. These
     *              values are then passed to _CreateMiniRect() which actually 
     *              creates the Konva.Rect's.
     */
    _CreateSideRects()
    {
        var leftX = ((this._infogWidth / 2) - (this._width / 2)) - ((3/4) * this._height / 2),
            rightX = (this._infogWidth / 2) + (this._width / 2) - ((3/4) * this._height / 2);
        this._CreateMiniRect(leftX);
        this._CreateMiniRect(rightX); 
    }

    /**
     * @summary     Creates a smaller rectangles to the side of the main rectangle.
     * @description Adds a Konva.Rect's to the group. This is done by dynamically
     *              calculating the x position so that it is roughly one half of the
     *              way down.
     * 
     * @param {Double} x The x position of the rectangle.
     */
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

export { RibbonHeader };