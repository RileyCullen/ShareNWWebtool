import { ACommand } from '../ACommand';

class TextContentCommand extends ACommand
{
    constructor({ textElem, handler, id})
    {
        super();
        this._textElem = textElem;
        this._handler = handler;
        this._id = id;

        this._originalTextElem = this._handler.GetHandlerElem(this._id);
    }

    Execute()
    {
        this._UpdateContent(this._textElem);
    }

    Unexecute()
    {
        this._UpdateContent(this._originalTextElem);
    }

    _UpdateContent(textElem)
    {
        this._handler.UpdateTextElem({
            index: this._id,
            textElem: textElem.textElem,
            group: textElem.group,
            image: textElem.image,
            spanCSS: textElem.spanCSS,
        });
    }
}

export { TextContentCommand };