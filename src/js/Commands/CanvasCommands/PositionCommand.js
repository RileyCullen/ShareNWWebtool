// Cullen, Riley
// ACommand.js
// October 27, 2021

import { ACommand } from "../ACommand";

class PositionCommand extends ACommand
{
    constructor({id, x, y})
    {
        this._id = id;
        this._x = x;
        this._y = y;
    }
}

export { PositionCommand }; 