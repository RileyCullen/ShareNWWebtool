import { ACommand } from '../ACommand';

class ChartSettingsCommand extends ACommand 
{
    constructor({ settings, handler, id })
    {
        super();
        this._settings = settings;
        this._handler = handler;
        this._id = id;

        this._originalSettings = this._handler.GetSettingsArray(this._id);
    }

    Execute()
    {
        let elem = this._handler.GetHandlerElem(this._id);
        elem.chart.UpdateChartSettings(settings);
        this._UpdateDecorators();
    }

    Unexecute()
    {
        
    }

    _UpdateDecorators()
    {
        let handlerElem = this._handler.GetHandlerElem(this._id),
            prev = handlerElem.chart;
        for (let i = 0; i <= handlerElem.decoratorSize; i++) {
            handlerElem.decorators[i].UpdateDecorator(prev);
            prev = handlerElem.decorators[i];
        }
        prev.CreateChart();
    }
}

export { ChartSettingsCommand };