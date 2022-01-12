import Konva from "konva";
import { InsertHeaderCommand, InsertIconCommand, InsertImageCommand, RemoveGraphicCommand } from "..";
import { ACommand } from "../ACommand";

class ReplaceGraphicCommand extends ACommand
{
    constructor({
        id,
        handler,
        transformer,
        main, 
        element,
        colorScheme, 
        infogWidth = 200,
        infogHeight = 200,
    })
    {
        super();
        this._id = id;
        this._handler = handler;
        this._tr = transformer;
        this._main = main;
        this._element = element;
        this._colorScheme = colorScheme;
        this._group = this._handler.GetGroup(this._id);
        this._infogWidth = infogWidth;
        this._infogHeight = infogHeight;

        this._removeObj = null;
        this._insertObj = null;

        this._absPos = this._GetAbsPos();
    }

    Execute()
    {
        if (!this._removeObj && !this._insertObj) {
            this._removeObj = new RemoveGraphicCommand({
                id: this._id,
                handler: this._handler,
                transformer: this._tr,
                main: this._main,
            });
            this._insertObj = this._CreateInsertObject();
        } 
        this._removeObj.Execute();
        this._insertObj.Execute();
    }

    Unexecute()
    {
        this._insertObj.Unexecute();
        this._removeObj.Unexecute();
    }

    _CreateInsertObject()
    {
        switch(this._handler.GetType(this._id)) {
            case 'icon':
                return new InsertIconCommand({
                    element: this._element,
                    colorScheme: this._colorScheme,
                    group: this._group,
                    handler: this._handler,
                    transformer: this._tr,
                    main: this._main,
                    absPos: this._absPos,
                    index: this._id,
                });
            case 'header':
                return new InsertHeaderCommand({
                    element: this._element,
                    colorScheme: this._colorScheme,
                    group: this._group,
                    handler: this._handler,
                    transformer: this._tr,
                    main: this._main,
                    infographicHeight: this._infogHeight,
                    infographicWidth: this._infogWidth,
                    index: this._id,
                });
            case 'image':
                let imageHelper = new Konva.Image();
                this._group.add(imageHelper);
                return new InsertImageCommand({
                    image: this._element,
                    imageHelper: imageHelper,
                    group: this._group,
                    handler: this._handler,
                    transformer: this._tr,
                    main: this._main,
                });
            default: return null;
        }
    }

    _GetAbsPos()
    {
        switch(this._handler.GetType(this._id)) {
            case 'icon': return this._handler.GetGraphic(this._id).absolutePosition();
            default: return null;
        }
    }
}

export { ReplaceGraphicCommand };