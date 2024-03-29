// Cullen, Riley
// GraphicsHandler.js
// July 19, 2021

import Lodash from 'lodash';
import { ArrowHeader, RectangleHeader, RibbonHeader } from "../Headers";
import { MessageBubble } from "../ToolTips";

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
     * @summary     Adds a graphic to the handler at index.
     * @description NOTE that this function assumes that index is less than or 
     *              equal to _curr.
     * @param {*} param0 
     */
    AddGraphicAtIndex({type, graphic, group, index})
    {
        let elem = {};
        this._handler.splice(index, 0, elem);
        this.UpdateGraphic({
            id: index,
            type: type,
            graphic: graphic,
            group: group,
        });
        this._curr++;
        this._UpdateHandlerId();
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
                this._handler[id].graphic.remove();
                break;
            case 'icon':
                this._handler[id].graphic.remove();
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

    /**
     * @summary Get the graphic element at id.
     * @param {int} id 
     */
    GetGraphic(id) { return this._handler[id].graphic; }

    /**
     * @summary Get the group at id.
     * @param {*} id 
     */
    GetGroup(id) { return this._handler[id].group; }

    GetSettings(id)
    {
        let obj = this._handler[id];
        switch(obj.type) {
            case 'icon':
                return Lodash.cloneDeep(obj.graphic.getAttrs());
            case 'image':
                return Lodash.cloneDeep(obj.graphic.getAttrs());
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
            case 'image':
                elem.graphic.clearCache();
                elem.graphic.setAttrs(settings);
                elem.graphic.cache();
                break;
            case 'icon':
                elem.graphic.setAttrs(settings);
                break;
            default:
                break;
        }
    }

    UpdateLayering(id, action) 
    {
        let group = this._handler[id].group;
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

    UpdateDisplayContent(id, element, infogSettings)
    {
        let entry = this._handler[id];
        switch(entry.type) {
            case 'icon':
                entry.graphic.text(String.fromCharCode(parseInt(element, 16)));
                break;
            case 'header':
                let attrs = this._GetCommonAttrs(entry.graphic);
                switch(element) {
                    case 'ribbon-header':
                        entry.graphic = new RibbonHeader({
                            colorOne: attrs.colorOne,
                            colorTwo: attrs.colorTwo,
                            group: attrs.group,
                            hWidth: attrs.width,
                            hHeight: attrs.height,
                            iWidth: infogSettings.width,
                            iHeight: infogSettings.height,
                        });
                        break;
                    case 'rectangle-header':
                        entry.graphic = new RectangleHeader({
                            x: attrs.x,
                            y: attrs.y,
                            width: attrs.width,
                            height: attrs.height,
                            cornerRadius: attrs.cornerRadius,
                            group: attrs.group,
                        });
                        break;
                    case 'message-bubble':
                        entry.graphic = new MessageBubble(attrs.group, attrs.width,
                            attrs.height, attrs.colorOne, attrs.x, attrs.y);
                        break;
                    default: 
                        break;
                };
                entry.graphic.CreateHeader();
                break;
            default:
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

    _GetCommonAttrs(graphicElement)
    {
        let attrs = graphicElement.GetAttrs();
        if (graphicElement instanceof RibbonHeader) {
            return {
                x: 0,
                y: 0,
                width: attrs.hWidth,
                height: attrs.hHeight,
                colorOne: attrs.colorOne,
                colorTwo: attrs.colorTwo,
                group: attrs.group,
                cornerRadius: 0,
            };
        } else if (graphicElement instanceof RectangleHeader) {
            return {
                x: attrs.x,
                y: attrs.y,
                width: attrs.width,
                height: attrs.height,
                cornerRadius: attrs.cornerRadius,
                group: attrs.group,
                colorOne: attrs.fill,
                colorTwo: '#999999',
            };
        } else if (graphicElement instanceof ArrowHeader) {
            return {
                x: attrs.x,
                y: attrs.y,
                width: attrs.width,
                height: attrs.height,
                colorOne: attrs.backgroundColor,
                colorTwo: attrs.borderColor,
                group: attrs.group,
                cornerRadius: 0
            };
        } else if (graphicElement instanceof MessageBubble) {
            return {
                x: attrs.x,
                y: attrs.y,
                width: attrs.width,
                height: attrs.height,
                colorOne: attrs.color,
                colorTwo: '#999999',
                group: attrs.group,
                cornerRadius: 0,
            };
        }
    }
}

export { GraphicsHandler };