class QuillStateManager
{
    /**
     * @description This class arises from an issue with async functions in the 
     *              QuillEditor. Essentially, we don't want to unselect an element
     *              in AInfographic until after the async function has been 
     *              executed and the text has been updated. This class gives
     *              us the capabilities to do that.
     */
    constructor()
    {
        this._isUpdating = false;
    }

    ToggleUpdate()
    {
       this._isUpdating = !this._isUpdating; 
    }

    IsUpdating() { return this._isUpdating; }
}

const instance = new QuillStateManager();

export default instance;