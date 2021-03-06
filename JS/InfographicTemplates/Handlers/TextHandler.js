// Cullen, Riley
// TextHandler.js
// December 3, 2020

class TextHandler
{
    /**
     * @summary     A concrete class that manages all of the text elements within
     *              an infographic.
     * @description Groups all of the individual text elements into one place 
     *              so that operations on text are easier to perform.
     */
    constructor()
    {
        this._handler = [];
        this._curr = -1;
    }

    /**
     * @summary     Adds a text element to the handler.
     * @description Adds a handler element at this._curr to the handler. This 
     *              element includes: the text to be rendered, its associated 
     *              group, and the Konva.Image element that corresponds to the 
     *              text.
     * 
     * @param {HTML Element} textElem The text we wish to render.
     * @param {Konva.Group}  group    The group we want to add the rendered text
     *                                to.
     * @param {double}       x        The x position of the image within the group.
     * @param {double}       y        The y position of the image within the group.
     */
    AddTextElem(textElem, group, x = 0, y = 0, rotateby = 0)
    {
        this._curr++;
        this._handler[this._curr] = {
            'textElem': textElem,
            'group': group,
            'image': new Konva.Image({
                scaleX: 1 / window.devicePixelRatio,
                scaleY: 1 / window.devicePixelRatio,
                x: x, 
                y: y,
                name: 'Selectable EditableText',
                id: this._curr
            }),
            'textInfo': {
                'color': 'black',
                'initialSize': '10px',
                'initialFont': '900-museo',
            },
            'spanCSS': []
        };
        textElem.id = this._curr;
        textElem.className = 'EditableText';
        textElem.style.textAlign = 'left';
        this._handler[this._curr].image.rotate(rotateby);
        group.add(this._handler[this._curr].image);
        group.setAttr('id', this._curr);
    }

    SetTextInfo(id, font, size, color)
    {
        this._handler[id].textInfo.initialFont = font;
        this._handler[id].textInfo.initialSize = size;
        this._handler[id].textInfo.color = color;
    }

    /**
     * @summary     Associates CSS attributes with the <span> elements in textElem.
     * @description Stores the CSS attributes associated with the <span> elements
     *              in textElem so that the QuillEditor can properly output the
     *              text in the text editor. 
     * 
     * @param {Integer} id  The id of the handler element we want to access. 
     * @param {JSON} param1 A JSON object that holds the necessary CSS attributes.
     */
    SetCSSInfo(id, {fontFamily = '900-museo', fontSize = '10px', 
        textColor = 'black', lineHeight = '1.0'})
    {
        this._handler[id].spanCSS.push({
            fontFamily: fontFamily,
            fontSize: fontSize,
            textColor: textColor,
            lineHeight: lineHeight
        });
    }

    /**
     * @summary Accessor that returns the current index of the handler.
     */
    GetCurrID()     { return this._curr; }

    /**
     * @summary Accessor that returns the current size of the handler.
     */
    GetSize()       { return this._curr + 1; }

    /**
     * @summary Accessor that returns the text element at index id.
     * @param {int} id The index of the text element we want to find. 
     */
    GetTextElem(id) { return this._handler[id].textElem; }

    /**
     * @summary Accessor that returns the Konva.Group element at index id.
     * @param {int} id The index of the text element we want to find. 
     */
    GetGroup(id)    { return this._handler[id].group; } 

    /**
     * @summary Accessor that returns the Konva.Image element at index id.
     * @param {int} id The index of the text element we want to find. 
     */
    GetImage(id)    { return this._handler[id].image; }

    GetHandlerElem(id) { return this._handler[id]; }
}
