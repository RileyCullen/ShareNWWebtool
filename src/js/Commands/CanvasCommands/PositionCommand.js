// Cullen, Riley
// ACommand.js
// October 27, 2021

import { AutoLayerCommand } from "../index";
import { ACommand } from "../ACommand";

class PositionCommand extends ACommand
{
    constructor({element, x, y, z, containers})
    {
        super();
        this._element = element;
        this._x0 = x; // starting x
        this._y0 = y; // starting y
        this._x1 = x; // ending (current) x
        this._y1 = y; // ending (current) y
        this._z0 = z;
        this._z1 = z;
        this._layerCommand = new AutoLayerCommand({
            containers: containers,
            element: this._element
        });
    }

    /**
     * @summary Sets the current coordinates.
     * @param {*} param0 
     */
    SetCurrentCoordinates({x, y, z}) 
    { 
        this._x1 = x;
        this._y1 = y;
        this._z1 = z;
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
        this._layerCommand.Execute();
        this._element.setZIndex(this._z1);
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
        this._layerCommand.Execute();
        this._element.setZIndex(this._z0);
    }
}

export { PositionCommand }; 