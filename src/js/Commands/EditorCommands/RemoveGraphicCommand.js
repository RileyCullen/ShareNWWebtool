import { ACommand } from '../ACommand';

class RemoveGraphicCommand extends ACommand
{
    constructor({id, handler, transformer, main})
    {
        super();
        this._id = id;
        this._handler = handler;
        this._tr = transformer;
        this._main = main;

        this._type = this._handler.GetType(this._id);
        this._graphic = this._handler.GetGraphic(this._id);
        this._group = this._handler.GetGroup(this._id);
    }

    /**
     * @summary     Removes a given graphic element from the canvas.
     * @description Clears the canvas' transformer, redraws canvas, and removes
     *              the graphic element from the handler.
     */
    Execute()
    {
        this._tr.nodes([]);
        this._main.batchDraw();
        this._handler.RemoveHandlerElem(this._id);
    }

    /**
     * @summary     Adds the graphic element to the canvas.
     * @description Adds the graphic element back to the canvas and redraws the
     *              canvas.
     */
    Unexecute()
    {
        if (this._type !== 'header') this._group.add(this._graphic)
        
        this._handler.AddGraphic({
            type: this._type,
            graphic: this._graphic,
            group: this._group,
        });
        this._id = this._handler.GetId();
        this._main.batchDraw();
    }
}

export { RemoveGraphicCommand };