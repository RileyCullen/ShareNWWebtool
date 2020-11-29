class TextHandler
{
    constructor()
    {
        this._handler = [];
        this._curr = -1;
    }

    AddTextElem(textElem, group, x = 0, y = 0)
    {
        this._curr++;
        this._handler[this._curr] = {
            'textElem': textElem,
            'group': group,
            'image': new Konva.Image({
                draggable: true,
                scaleX: 1 / window.devicePixelRatio,
                scaleY: 1 / window.devicePixelRatio,
                x: x, 
                y: y,
            }),
        };
        textElem.id = this._curr;
        textElem.className = 'EditableText';
        textElem.style.textAlign = 'left';
        group.add(this._handler[this._curr].image);
        group.setAttr('id', this._curr);
    }

    GetCurrID()     { return this._curr; }
    GetSize()       { return this._curr + 1; }
    GetTextElem(id) { return this._handler[id].textElem; }
    GetGroup(id)    { return this._handler[id].group; } 
    GetImage(id)    { return this._handler[id].image; }
}
