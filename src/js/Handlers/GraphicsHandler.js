class GraphicsHandler
{
    constructor()
    {
        this._handler = [];
        this._curr = -1;
    }

    AddGraphic({type, graphic, group})
    {
        this.UpdateGraphic({
            id: ++this._curr,
            type: type,
            graphic: graphic,
            group: group
        });
    }

    RemoveHandlerElem(id)
    {
        switch(this._handler[id].type) {
            case 'header':
                this._handler[id].graphic.Remove();
                break;
            case 'image':
                this._handler[id].graphic.destroy();
                break;
            case 'icon':
                this._handler[id].group.destroy();
                break;
            default: 
                break;
        }

        this._handler.splice(id, 1);
        this._curr--;
        this._UpdateHandlerId();
    }
    
    GetId() { return this._curr; }
    GetType(id) { return this._handler[id].type; }

    UpdateGraphic({id, type, graphic, group})
    {
        this._handler[id] = {
            type: type,
            graphic: graphic,
            group: group,
        }
        group.setAttr('id', id);
        group.setAttr('name', 'Graphic ' + type)

        switch(type) {
            case 'header':
                graphic.CreateHeader();
                break;
            case 'tooltip':
                graphic.CreateToolTip();
                break;
            case 'icon': 
                group.add(graphic);
                break;
            default:
                break;
        }; 
    }

    _UpdateHandlerId()
    {
        this._handler.forEach((d, i) => {
            d.group.setAttr('id', i);
        });
    }
}

export { GraphicsHandler };