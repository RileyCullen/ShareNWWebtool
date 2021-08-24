// Cullen, Riley
// GraphicsHandler.js
// July 19, 2021

class GraphicsHandler
{
    constructor()
    {
        this._handler = [];
        this._curr = -1;
    }

    /**
     * @summary     Adds a graphic element to the handler.
     * @description Creates a JSON object connecting the type, graphic, and group
     *              in one location and adds that JSON object to the handler.
     * 
     * @param {string}      type    The type of graphic element. This can either
     *                              be 'image', 'icon', or 'header.'
     * @param {misc}        graphic The graphic element that is added to the 
     *                              infographic. Note that this can either be a
     *                              Konva.Image (for images and SVGs), a Konva.
     *                              Text (for icons), or a Header object.
     * @param {Konva.Group} group   The group that the element will be added to.
     */
    AddGraphic({type, graphic, group})
    {
        this.UpdateGraphic({
            id: ++this._curr,
            type: type,
            graphic: graphic,
            group: group
        });
    }

    /**
     * @summary     Removes the element at id from the handler.
     * @summary     Calls the graphic object's remove (or destroy) function, which
     *              removes the instance from the infographic. Then, the instance
     *              is removed from the handler.
     * @param {int} id The index of the handler we want to access.
     */
    RemoveHandlerElem(id)
    {
        if (id > this._curr || id < 0) return;
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
    
    /**
     * @summary Return the current index of the handler to the user.
     * @returns An integer representing the current index of the handler.
     */
    GetId() { return this._curr; }

    /**
     * @summary Returns the type of the element at id to the user.
     * 
     * @param {int} id The index of the handler we want to access.
     * 
     * @returns A string representing the type of graphic element at index id.
     */
    GetType(id) { return this._handler[id].type; }

    GetSettings(id)
    {
        let obj = this._handler[id];
        switch(obj.type) {
            case 'icon':
            case 'image':
                return obj.graphic.getAttrs();
            case 'header':
                return obj.graphic.GetSettings();
            default:
                break;
        }
    }

    /**
     * @summary     Updates the handler at index id.
     * @description Replaces the handler at index id with the parameterized values.
     */
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

    UpdateGraphicSettings({id, settings})
    {
        let elem = this._handler[id];

        switch(elem.type) {
            case 'header':
                elem.graphic.UpdateHeader(settings);
                elem.graphic.CreateHeader();
                break;
        }
    }

    /**
     * @summary     Updates the ids of each object in the handler.
     * @description See summary. This function is typically called when an object
     *              is removed from the handler. In this case, when the array elements
     *              are restructured, the groups (which are used to access them on
     *              the infog) must be explicitly updated.
     */
    _UpdateHandlerId()
    {
        this._handler.forEach((d, i) => {
            d.group.setAttr('id', i);
        });
    }
}

export { GraphicsHandler };