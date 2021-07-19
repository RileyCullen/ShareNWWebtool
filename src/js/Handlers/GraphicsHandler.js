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
        if (this._handler[id].type === 'header' || 
            this._handler[id].type === 'tooltip') {
            this._handler[id].graphics.Remove();
        }
    }
    
    GetId() { return this._curr; }

    UpdateGraphic({id, type, graphic, group})
    {
        this._handler[id] = {
            type: type,
            graphic: graphic,
            group: group,
        }
        
        /*if (type !== 'image') {
            group.setAttr('id', id);
            group.setAttr('name', 'Graphic ' + type);
        } else {
            graphic.setAttr('id', id);
            graphic.setAttr('name', 'Graphic ' + type)
        }*/
        group.setAttr('id', id);
        group.setAttr('name', 'Graphic ' + type)

        switch(type) {
            case 'header':
                graphic.CreateHeader();
                break;
            case 'tooltip':
                graphic.CreateToolTip();
                break;
            default:
                break;
        }; 
    }
}

export { GraphicsHandler };