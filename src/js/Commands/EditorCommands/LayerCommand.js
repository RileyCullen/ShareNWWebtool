import { ACommand } from "../ACommand";

class LayerCommand extends ACommand 
{
    constructor()
    {
        super();
    }

    /**
     * @summary Executes the current layer action.
     */
    Execute()
    {

    }

    /**
     * @summary Undos the previous layer action.
     */
    Unexecute()
    {

    }
}

export { LayerCommand };