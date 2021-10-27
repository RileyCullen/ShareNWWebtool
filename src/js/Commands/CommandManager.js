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

    /**
     * @summary     Undo the most recent command.
     * @description Pops from the undoStack and calls that command object's 
     *              unexecute method.
     */
    Undo()
    {
        if (this._undoStack === 0) return;
        var elem = this._undoStack.pop();
        elem.Unexecute();
        this._redoStack.push(elem);
    }
}

export { CommandManager };  