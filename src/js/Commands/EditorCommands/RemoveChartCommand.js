import { ACommand } from '../ACommand';

class RemoveChartCommand extends ACommand 
{
    constructor({id, handler, transformer, main})
    {
        super();
        this._id = id;
        this._handler = handler;
        this._tr = transformer;
        this._main = main;

        this._chart = this._handler.GetChart(this._id);
        this._group = this._handler.GetGroup(this._id);
        this._type = this._handler.GetType(this._id);
        this._parentGroup = this._group.getParent();
    }

    /**
     * @summary Removes a chart from the infographic.
     */
    Execute()
    {
        this._tr.nodes([]);
        this._main.batchDraw();
        this._handler.RemoveHandlerElem(this._id);
    }

    Unexecute()
    {
        this._parentGroup.add(this._group);
        this._handler.AddChart({
            chart: this._chart,
            group: this._group,
            type: this._type
        });
        this._chart.CreateChart();
        this._id = this._handler.GetCurrChartID();
        this._main.batchDraw();
    }
}

export { RemoveChartCommand };