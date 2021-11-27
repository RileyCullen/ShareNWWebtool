import { ACommand } from '../ACommand';

class ChartDataCommand extends ACommand 
{
    constructor({data, handler, id})
    {
        super();
        this._data = data;
        this._handler = handler;
        this._id = id;

        this._originalData = this._handler.GetChart(this._id).GetData();
    }

    /**
     * @summary Updates the selected chart's data to use the new data.
     */
    Execute()
    {
        this._UpdateChartData(this._data);
        this._UpdateDecorators();
    }

    /**
     * @summary Updates the selected chart's data to use the original data.
     */
    Unexecute()
    {
        this._UpdateChartData(this._originalData);
        this._UpdateDecorators();
    }

    _UpdateChartData(data)
    {
        let name = this._handler.GetGroup(this._id).getAttr('name'),
            elem = this._handler.GetChart(this._id);

        if (name === 'Selectable Chart Waffle') {
            let numerator = data.numerator, denominator = data.denominator;
            elem.UpdateData(parseInt(numerator), parseInt(denominator));
        } else {
            elem.UpdateData(data);
        }
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

export { ChartDataCommand };