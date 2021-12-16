// Cullen, Riley
// TextHandler.js
// December 3, 2020

import Konva from 'konva';

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
     * @summary     Adds a non-rendered text element to the handler.
     * @description Essentially, this Add method takes in a text element (DOM) 
     *              and a group. Then, it creates a Konva.Image that will be 
     *              rendered later (when the html2canvas module is called).
     * 
     * @param {HTML Element} textElem The text we wish to render.
     * @param {Konva.Group}  group    The group we want to add the rendered text
     *                                to.
     * @param {double}       x        The x position of the image within the group.
     * @param {double}       y        The y position of the image within the group.
     */
    AddTextElem({textElem, group, x = 0, y = 0, rotateby = 0})
    {
        this._curr++;
        this._handler[this._curr] = {
            'textElem': textElem,
            'group': group,
            'image': this._CreateKonvaImage(this._curr, x, y),
            'spanCSS': []
        };
        textElem.id = this._curr;
        textElem.className = 'EditableText';
        this._handler[this._curr].image.rotate(rotateby);
        group.add(this._handler[this._curr].image);
        group.setAttr('id', this._curr);
    }

    /**
     * @summary     Adds a text element at the location specified by index.
     * @description NOTE that this function assumes that index is less than or
     *              equal to _curr.
     * @param {*} param0 
     */
    AddRenderedTextElemAtIndex({textElem, group, index, image, spanCSS, x = 0, 
        y = 0, rotateby = 0})
    {
        let elem = {
            textElem: textElem,
            group: group,
            image: image,
            spanCSS: spanCSS,
        };
        this._handler.splice(index, 0, elem);
        this._curr++;
        this._UpdateHandlerId();
        textElem.id = index;
        textElem.className = 'EditableText';
        this._handler[index].image.rotate(rotateby);
        group.add(this._handler[index].image);
        group.setAttr('id', index);
    }

    /**
     * @summary     Adds a converted text element to the handler. 
     * @description As opposed to the earlier function, this method exists when
     *              you need to add a text element to the handler that has 
     *              already been rendered.
     * @param {*} param0 
     */
    AddRenderedTextElem({textElem, group, image, spanCSS, rotateby = 0})
    {
        this._curr++;
        this._handler[this._curr] = {
            'textElem': textElem,
            'group': group,
            'image': image,
            'spanCSS': spanCSS
        };
        textElem.id = this._curr;
        textElem.className = 'EditableText';
        this._handler[this._curr].image.rotate(rotateby);
        group.add(this._handler[this._curr].image);
        group.setAttr('id', this._curr);
    }

    UpdateTextElem({index, textElem, group, image, spanCSS})
    {
        if (index === -1) return;
        this._handler[index] = {
            textElem: textElem,
            group: group,
            image: image,
            spanCSS: spanCSS,
        };
        console.log(this._handler)
    }

    UpdateLayering(id, action) 
    {
        let group = this._handler[id].image;

        switch(action) {
            case 'move-to-back':
                group.moveToBottom();
                break;
            case 'move-to-front':
                group.moveToTop();
                break;
            case 'bring-forward':
                group.moveUp();
                break;
            case 'send-backward':
                group.moveDown();
                break;
            default:
                break;
        }
    }

    SetTextInfo({id, font, size, color})
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
    SetCSSInfo({id, fontFamily = '900-museo', fontSize = '10px', 
        textColor = 'black', lineHeight = '1.0', align='left'})
    {
        this._handler[id].spanCSS.push({
            fontFamily: fontFamily,
            fontSize: fontSize,
            textColor: textColor,
            lineHeight: lineHeight,
            align: align,
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

    GetSpanCSS(id) { return this._handler[id].spanCSS; } 

    /**
     * @summary Returns a copy of the handler element at id.
     * 
     * @param {int} id The index of the handler element we want to access.
     * 
     * @returns JSON object.
     */
    GetHandlerElem(id) { 
        return {
            'textElem': this._handler[id].textElem,
            'group': this._handler[id].group,
            'image': this._handler[id].image,
            'spanCSS': this._handler[id].spanCSS
        };
    }

    /**
     * @summary     Removes the handler element at index id.
     * @description Calls image's destroy function then removes the handler element
     *              from the handler.
     * 
     * @param {int} id The index of the handler element that will be removed.
     */
    RemoveHandlerElem(id)
    {
        this._handler[id].image.remove();
        this._handler.splice(id, 1);
        this._curr--;
        this._UpdateHandlerId();
    }

    /**
     * 
     * @param {int}    index The index of the handler element we are adding this
     *                       image to.
     * @param {double} x     The x position of the image.
     * @param {double} y     The y position of the image.
     * 
     * @returns Konva.Image object
     */
    _CreateKonvaImage(index, x, y)
    {
        return new Konva.Image({
            scaleX: 1 / window.devicePixelRatio,
            scaleY: 1 / window.devicePixelRatio,
            x: x, 
            y: y,
            name: 'Selectable EditableText',
            id: index
        });
    }

    /**
     * @summary     Updates the id assigned to the different chart elements in 
     *              the handler.
     */
    _UpdateHandlerId()
    {
        this._handler.forEach((d, i) => {
            d.image.setAttr('id', i); 
        });
    }
}

export { TextHandler };