class TextHandler
{
    constructor()
    {
        this._handler = [];
        this._curr = -1;
    }

    AddTextElem(textElem, group)
    {
        this._curr++;
        this._handler[this._curr] = {
            'textElem': textElem,
            'group': group
        };
        group.add(textElem);
        group.setAttr('id', this._curr);
        textElem.setAttr('name', 'EditableText');
    }

    GetCurrID() { return this._curr; }
    GetTextElem(id) { return this._handler[id].textElem; }
    GetGroup(id) { return this._handler[id].group; } 
}