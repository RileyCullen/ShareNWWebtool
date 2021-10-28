// Cullen, Riley
// ACommand.js
// October 27, 2021

import { ACommand } from "../ACommand";

class PositionCommand extends ACommand
{
    constructor({id, x, y})
    {
        super();
        this._id = id;
        this._x0 = x; // starting x
        this._y0 = y; // starting y
        this._x1 = x; // ending (current) x
        this._y1 = y; // ending (current) y
    }

    /**
     * @summary Sets the current coordinates.
     * @param {*} param0 
     */
    SetCurrentCoordinates({x ,y}) 
    { 
        this._x1 = x;
        this._y1 = y;
    }
     
    Execute() { }
    Unexecute() { }
}

export { PositionCommand }; 