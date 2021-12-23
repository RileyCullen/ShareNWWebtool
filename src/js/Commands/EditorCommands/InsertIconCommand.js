import { RemoveGraphicCommand } from '..';
import { ACommand } from '../ACommand';
import Konva from 'konva';

class InsertIconCommand extends ACommand 
{
    constructor({element, colorScheme, group, handler, transformer, main, absPos = null})
    {
        super();
        this._element = element;
        this._colorScheme = colorScheme;
        this._group = group;
        this._handler = handler;
        this._tr = transformer;
        this._main = main;
        this._absPos = absPos;

        this._id = -1;
        this._hasCreated = false;
        this._removeCommand = null;
    }

    /**
     * @summary Create an icon and add it to the infographic.
     */
    Execute()
    {
        if (!this._hasCreated) this._CreateIcon();
        else                   this._removeCommand.Unexecute();
    }

    /**
     * @summary Remove icon from infographic.
     */
    Unexecute()
    {  
        this._removeCommand.Execute();
    }

    _CreateIcon()
    {
        // Create Icon
        let icon = new Konva.Text({
            text: String.fromCharCode(parseInt(this._element, 16)),
            fontFamily: '"Font Awesome 5 Free"',
            fontStyle: '900',
            fill: this._colorScheme.primary,
            fontSize: 100,
        });
        this._handler.AddGraphic({
            type: 'icon',
            graphic: icon,
            group: this._group,
        });

        if (this._absPos) icon.absolutePosition(this._absPos);

        // Update command object
        this._id = this._handler.GetId();
        this._hasCreated = true;
        this._removeCommand = new RemoveGraphicCommand({
            id: this._id,
            handler: this._handler,
            transformer: this._tr,
            main: this._main,
        });
    }
}

export { InsertIconCommand };