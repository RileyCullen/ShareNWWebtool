import { TextHandler } from "../../Handlers";
import { ACommand } from "../ACommand";

class LayerCommand extends ACommand 
{
    constructor({handler, id, layerAction})
    {
        super();
        this._handler = handler;
        this._id = id;
        this._layerAction = layerAction;

        this._object = (this._handler instanceof TextHandler) ? 
            this._handler.GetImage(this._id) : this._handler.GetGroup(this._id);
        this._initialZIndex = (this._handler instanceof TextHandler) ? 
            this._handler.GetImage(this._id).zIndex() : 
            this._handler.GetGroup(this._id).zIndex();
    }

    /**
     * @summary Executes the current layer action.
     */
    Execute()
    {
        this._handler.UpdateLayering(this._id, this._layerAction);
    }

    /**
     * @summary Undos the previous layer action.
     */
    Unexecute()
    {
        this._object.zIndex(this._initialZIndex);
    }
}

export { LayerCommand };