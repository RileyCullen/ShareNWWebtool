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

    /**
     * @summary     Executes a given command.
     * @description Calls a ICommand object's Execute method and adds it to the
     *              undo stack
     * @param {*} command 
     */
    Execute(command) 
    {
        this._undoStack.push(command);
        command.Execute();
    }
}

export { CommandManager };  