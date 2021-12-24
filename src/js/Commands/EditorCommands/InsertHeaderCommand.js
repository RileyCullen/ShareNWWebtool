import { RemoveGraphicCommand } from "..";
import { RectangleHeader, RibbonHeader } from "../../Headers";
import { MessageBubble } from "../../ToolTips";
import { ACommand } from "../ACommand";

class InsertHeaderCommand extends ACommand 
{
    constructor({element, colorScheme, group, handler, transformer, main, 
        infographicWidth = 200, infographicHeight = 200, index = -1})
    {
        super();
        this._element = element;
        this._colorScheme = colorScheme;
        this._group = group;
        this._handler = handler;
        this._tr = transformer;
        this._main = main;
        this._width = infographicWidth;
        this._height = infographicHeight;

        this._id = index;
        this._removeCommand = null;
    }

    Execute()
    {
        if (!this._removeCommand) this._CreateHeader()
        else                 this._removeCommand.Unexecute();
    }

    Unexecute()
    {
        this._removeCommand.Execute();
    }

    _CreateHeader()
    {
        let graphic = 0;
        switch(this._element) {
            case 'ribbon-header':
                graphic = new RibbonHeader({
                    colorOne: this._colorScheme.primary,
                    colorTwo: this._colorScheme.secondary,
                    group: this._group,
                    hWidth: 300,
                    hHeight: 25,
                    iWidth: this._width,
                    iHeight: this._height,
                });
                break;
            case 'rectangle-header':
                graphic = new RectangleHeader({
                    x: 0,
                    y: 0,
                    width: 300,
                    height: 200,
                    cornerRadius: 0,
                    fill: this._colorScheme.primary,
                    group: this._group,
                });
                break;
            case 'message-bubble':
                graphic = new MessageBubble(this._group, 200, 100, this._colorScheme.primary, 0, 0);
                break;
            default:
                break;
        }
        if (this._id === -1) {
            this._handler.AddGraphic({
                type: 'header',
                graphic: graphic,
                group: this._group,
            });
        } else {
            this._handler.AddGraphicAtIndex({
                type: 'header',
                graphic: graphic,
                group: this._group,
                index: this._id,
            });
        }
        this._id = this._handler.GetId();
        this._removeCommand = new RemoveGraphicCommand({
            id: this._id,
            handler: this._handler,
            transformer: this._tr,
            main: this._main,
        });
    }
}

export { InsertHeaderCommand };