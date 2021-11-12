import { ACommand } from '../ACommand';
import Lodash from 'lodash';

class ChartDecoratorCommand extends ACommand
{
    constructor({decoratorSettings, handler, id})
    {
        super();
        this._decoratorSettings = Lodash.cloneDeep(decoratorSettings);
        this._handler = handler;
        this._id = id;

        this._originalDecorators = Lodash.cloneDeep(this._handler.GetDecoratorSettingsArray(id));
    }

    /**
     * @summary Update selected chart with new decorators.
     */
    Execute()
    {
        this._handler.UpdateChartDecorators(this._id, this._decoratorSettings);
    }

    /**
     * @summary Revert selected chart to original decorators.
     */
    Unexecute()
    {
        this._handler.UpdateChartDecorators(this._id, this._originalDecorators);
    }
}

export { ChartDecoratorCommand };