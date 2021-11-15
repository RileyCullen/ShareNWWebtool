import { ACommand } from '../ACommand';

class GraphicSettingsCommand extends ACommand
{
    constructor({settings, handler, id})
    {
        super();
        this._settings = settings;
        this._handler = handler;
        this._id = id;

        this._originalSettings = this._handler.GetSettings(this._id);
    }

    Execute()
    {
        this._UpdateSettings(this._settings);
    }

    Unexecute()
    {
        this._UpdateSettings(this._originalSettings);
    }

    _UpdateSettings(settings)
    {
        this._handler.UpdateGraphicSettings({
            id: this._id,
            settings: settings,
        });
    }
}

export { GraphicSettingsCommand };