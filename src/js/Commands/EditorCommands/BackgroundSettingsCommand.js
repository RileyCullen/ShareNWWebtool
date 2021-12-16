import { ACommand } from '../ACommand';
import Lodash from 'lodash';

class BackgroundSettingsCommand extends ACommand
{
    constructor({ background, settings })
    {
        super();
        this._background = background;
        this._settings = settings;
        this._originalSettings = Lodash.cloneDeep(this._background.getAttrs());
    }

    Execute()
    {
        this._background.setAttrs({
            fill: this._settings.fill,
        });
    }

    Unexecute()
    {
        this._background.setAttrs({
            fill: this._originalSettings.fill
        });
    }
}

export { BackgroundSettingsCommand };