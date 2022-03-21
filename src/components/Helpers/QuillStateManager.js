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
        this._shouldReformat = false;
        this._reformatIndex = -1;
    }

    ToggleUpdate()
    {
       this._isUpdating = !this._isUpdating; 
    }

    ToggleReformat(index = -1)
    {
        this._shouldReformat = !this._shouldReformat;
        this._reformatIndex = index;
    }

    IsUpdating() { return this._isUpdating; }

    ShouldReformat() { return this._shouldReformat; }

    GetReformatIndex() { return this._reformatIndex; }
}

const instance = new QuillStateManager();

export default instance;