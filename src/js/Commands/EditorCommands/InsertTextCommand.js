import { RemoveTextCommand } from '..';
import { ACommand } from '../ACommand';

class InsertTextCommand extends ACommand 
{
    constructor({group, element, fontFamily, handler, transformer, main})
    {
        super();
        this._group = group;
        this._element = element;
        this._fontFamily = fontFamily;
        this._id = -1;
        this._handler = handler;
        this._tr = transformer;
        this._main = main;
        this._hasCreated = false;

        this._removeCommand = null;
    }

    /**
     * @summary     Creates a text element and adds it to the handler.
     * @description NOTE that the actual rendering occurs in AInfographic, not 
     *              in this method. 
     */
    Execute()
    {
        if (!this._hasCreated) this._CreateTextElem();
        else                   this._removeCommand.Unexecute();
    }

    /**
     * @summary Removes text element from the infographic.
     */
    Unexecute()
    {
        this._removeCommand.Execute();
    }

    _CreateTextElem()
    {
        // Set up text
        let div = document.createElement('div'),
            textElem = '<p><span style="line-height: 1.2; font-size: 20px; font-family: museo, serif;">' 
            + this._element + '</span></p>';
        div.innerHTML = textElem;

        // Set up text handler 
        this._handler.AddTextElem({
            textElem: div,
            group: this._group,
            x: 0,
            y: 0,
            rotateBy: 0,
        });

        this._id = this._handler.GetCurrID()

        this._handler.SetCSSInfo({
            id: this._id,
            fontFamily: this._fontFamily,
            fontSize: '20px',
            textColor: '#000',
            lineHeight: '1.2',
            align: 'center',
        });

        this._removeCommand = new RemoveTextCommand({
            id: this._id,
            handler: this._handler,
            transformer: this._tr,
            main: this._main
        });
    }
}

export { InsertTextCommand };