import { ACommand } from '../ACommand';

class TextContentCommand extends ACommand
{
    constructor({ domText, image, spanCSS, handler, id})
    {
        super();
        this._domText = domText;
        this._image = image;
        this._spanCSS = spanCSS;

        this._textElem = {
            textElem: this._domText,
            group: handler.GetGroup(id),
            image: handler.GetImage(id),
            spanCSS: this._spanCSS,
        };

        this._handler = handler;
        this._id = id;

        this._originalDomText = this._handler.GetTextElem(this._id);
        this._originalImage = this._handler.GetImage(this._id).toCanvas();
        this._originalSpanCSS = this._handler.GetSpanCSS(this._id);
    }

    Execute()
    {
        this._textElem.image.image(this._image);
        this._UpdateContent(this._domText, this._spanCSS);
    }

    Unexecute()
    {
        this._textElem.image.image(this._originalImage);
        this._UpdateContent(this._originalDomText, this._originalSpanCSS);
    }

    _UpdateContent(textElem, spanCSS)
    {
        this._handler.UpdateTextElem({
            index: this._id,
            textElem: textElem,
            group: this._textElem.group,
            image: this._textElem.image,
            spanCSS: spanCSS,
        });
    }
}

export { TextContentCommand };