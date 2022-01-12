import Konva from 'konva';
import { RemoveGraphicCommand } from '..';
import { ACommand } from '../ACommand';

class InsertImageCommand extends ACommand
{
    constructor({ image, imageHelper, group, handler, transformer, main, absPos = null})
    {
        super();
        this._image = image;
        this._imageHelper = imageHelper;
        this._group = group;
        this._handler = handler;
        this._id = -1;
        this._tr = transformer;
        this._main = main;
        this._absPos = absPos;

        this._removeCommand = null;
    }

    Execute()
    {
        if (this._id === -1) this._CreateImage();
        else                  this._removeCommand.Unexecute();
    }

    Unexecute()
    {
        this._removeCommand.Execute();
    }

    _CreateImage()
    {
        let imageObj = new Image();
        imageObj.onload = () => {
            this._imageHelper.image(imageObj);
            this._imageHelper.cache();
            this._imageHelper.filters([
                Konva.Filters.Contrast,
                Konva.Filters.Brighten,
                Konva.Filters.Blur,
            ]);
            this._imageHelper.brightness(0);
            this._imageHelper.blurRadius(0);
            this._imageHelper.contrast(0);
            imageObj.onload = null;
        };
        this._imageHelper.setAttrs({
            x: 0, 
            y: 0,
            height: 200,
            width: 200,
            opacity: 1,
            stroke: 'black',
            strokeWidth: 0
        });

        if (this._absPos !== null) {
            this._imageHelper.absolutePosition(this._absPos)
        }

        imageObj.src = this._image;
        
        this._group.add(this._imageHelper);
        this._handler.AddGraphic({
            type: 'image',
            graphic: this._imageHelper,
            group: this._group,
        });
        this._id = this._handler.GetId();

        this._hasLoaded = true;

        this._removeCommand = new RemoveGraphicCommand({
            id: this._id,
            handler: this._handler,
            transformer: this._tr,
            main: this._main,
        });
    }
}

export { InsertImageCommand };