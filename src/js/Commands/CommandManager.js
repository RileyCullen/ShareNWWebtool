// Cullen, Riley
// CommandManager.js
// October 27, 2021

class CommandManager 
{
    /**
     * @summary Constructor for CommandManger class.
     */
    constructor()
    {
        this._undoStack = [];
        this._redoStack = [];
    }
}

export { CommandManager };  