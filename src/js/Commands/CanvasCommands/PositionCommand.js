// Cullen, Riley
// ACommand.js
// October 27, 2021

import { AutoLayerCommand } from "../index";
import { ACommand } from "../ACommand";

class PositionCommand extends ACommand
{
    constructor({element, x, y})
    {
        super();
        this._element = element;
        this._x0 = x; // starting x
        this._y0 = y; // starting y
        this._x1 = x; // ending (current) x
        this._y1 = y; // ending (current) y
    }

    /**
     * @summary Sets the current coordinates.
     * @param {*} param0 
     */
    SetCurrentCoordinates({x, y}) 
    { 
        this._x1 = x;
        this._y1 = y;
    }
     
    /**
     * @summary Repositions element to its ending position.
     */
    Execute() 
    { 
        this._element.absolutePosition({
            x: this._x1,
            y: this._y1,
        });
    }

    /**
     * @summary Repositions element to its initial position.
     */
    Unexecute() 
    { 
        this._element.absolutePosition({
            x: this._x0,
            y: this._y0,
        });
    }
}

export { PositionCommand }; 