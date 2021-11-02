import { ACommand } from "../ACommand";

class RemoveTextCommand extends ACommand 
{
    constructor({id, handler, transformer, main})
    {
        super();
        this._id = id;
        this._handler = handler;
        this._tr = transformer;
        this._main = main;

        this._textElem = this._handler.GetTextElem(this._id);
        this._group = this._handler.GetGroup(this._id);
        this._image = this._handler.GetImage(this._id);
        this._spanCSS = this._handler.GetSpanCSS(this._id);
    }

    Execute()
    {
        this._tr.nodes([]);
        this._main.batchDraw();
        this._handler.RemoveHandlerElem(this._id);
    }

    Unexecute()
    {
        this._handler.AddRenderedTextElem({
            textElem: this._textElem,
            group: this._group,
            image: this._image,
            spanCSS: this._spanCSS
        });
        console.log(this._handler)
        this._id = this._handler.GetCurrID();
        this._image.id(this._id);
        this._main.batchDraw();
    }
}

export { RemoveTextCommand }; 