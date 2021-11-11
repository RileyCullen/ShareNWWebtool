import { ACommand } from '../ACommand';

class ChartDecoratorCommand extends ACommand
{
    constructor({decoratorSettings, handler, id})
    {
        super();
        this._decoratorSettings = decoratorSettings;
        this._handler = handler;
        this._id = id;

        this._originalDecorators = this._handler.GetDecoratorSettingsArray(id);
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
        console.log(this._originalDecorators)
        this._handler.UpdateChartDecorators(this._id, this._originalDecorators);
    }
}

export { ChartDecoratorCommand };