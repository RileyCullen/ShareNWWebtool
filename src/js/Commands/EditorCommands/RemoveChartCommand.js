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
        this._decorators = this._handler.GetDecorators(this._id);
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

    /**
     * @summary Adds the chart back to the infographic.
     */
    Unexecute()
    {
        // Re-add infographic's group to the canvas.
        this._parentGroup.add(this._group);

        // Re-add the chart to the handler.
        this._handler.AddChart({
            chart: this._chart,
            group: this._group,
            type: this._type
        });

        // Update the id.
        this._id = this._handler.GetCurrChartID();

        // Re-add the decorators to the handler.
        this._decorators.forEach(decorator => {
            this._handler.AddDecorator({
                decorator: decorator,
                id: this._id,
            });
        });

        // Create the chart and draw main.
        if (this._decorators.length !== 0) this._decorators[
            this._decorators.length - 1].CreateChart();
        else this._chart.CreateChart();
        this._main.batchDraw();
    }
}

export { RemoveChartCommand };