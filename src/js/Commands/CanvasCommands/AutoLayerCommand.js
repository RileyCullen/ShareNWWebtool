import Konva from "konva";
import { ACommand } from "../ACommand";

class AutoLayerCommand extends ACommand 
{
    constructor({containers, element})
    {
        super();
        this._containers = containers;
        this._element = element;
    }

    /**
     * @summary     Adds _element to a new group based on its position on the 
     *              canvas.
     * @description Checks for an intersection between _element and any group
     *              on the infographic named .Switchable Container. If an
     *              intersection is present, move _element to that group.
     */
    Execute()
    {
        this._containers.forEach(group => {
            if (Konva.Util.haveIntersection(group.getClientRect(), 
                this._element.getClientRect())) {
                let absPos = this._element.getAbsolutePosition();
                this._element.moveTo(group);
                this._element.absolutePosition({
                    x: absPos.x,
                    y: absPos.y
                });
            }
        });
    }

    /**
     * @summary     Wrapper function that calls Execute.
     */
    Unexecute()
    {
        this._Execute();
    }
}

export { AutoLayerCommand };