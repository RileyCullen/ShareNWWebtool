// Cullen, Riley
// ACommand.js
// October 26, 2021

class ACommand 
{
    constructor()
    {
        // if ACommand is instantiated, throw an error
        if (ACommand === this.constructor) {
            throw new TypeError('Abstract class "ACommand" cannot be instantiated');
        }

        // if a class extending ACommand does not have Execute or Unexecute
        // defined, throw an error
        if (this.Execute === undefined) {
            throw new TypeError('Types extending "ACommand" must implement Execute');
        }

        if (this.Unexecute === undefined) {
            throw new TypeError('Types extending "ACommand" must implement Unexecute');
        }
    }
}

export { ACommand };