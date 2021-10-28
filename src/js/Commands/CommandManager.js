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
     * @summary     Adds command to undoStack.
     * @description Adds but does NOT execute a given command to the undo stack.
     * @param {*} command 
     */
    Add(command)
    {
        this._undoStack.push(command);
    }

    /**
     * @summary     Removes the top element from the stack
     * @returns An ICommand object corresponding to the top element of the undo
     *          stack.
     */
    RemoveFromUndoStack() 
    { 
        return this._undoStack.pop();
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
        if (this._undoStack.length === 0) return;
        var elem = this._undoStack.pop();
        elem.Unexecute();
        this._redoStack.push(elem);
    }

    /**
     * @summary     Redo the most recently undone command.
     * @description Pops from the redoStack and calls that command object's 
     *              execute method.
     */
    Redo()
    {
        if (this._redoStack.length === 0) return;
        var elem = this._redoStack.pop();
        elem.Execute();
        this._undoStack.push(elem);
    }
}

export { CommandManager };  