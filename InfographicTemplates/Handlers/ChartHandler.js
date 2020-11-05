class ChartHandler 
{
    constructor()
    {
        this._handler = [];
        this._curr = -1;
    }

    AddChart(chart, group, type)
    {
        this._curr++;
        this._handler[this._curr] = {
            'chart': chart,
            'decorators': [],
            'decoratorSize': -1,
            'group': group,
        };
        group.setAttr('id', this._curr);
        group.setAttr('name', 'Chart ' + type);
    }

    AddDecorator(decorator, id)
    {
        this._handler[id].decorators[++this._handler[id].decoratorSize] = decorator;
    }

    GetCurrChartID() { return this._curr; }
    GetCurrDecSize() { return this._handler[this._curr].decoratorSize; }
    GetChart(id) { return this._handler[id].chart; }
    GetDecorator(chartID, decoratorID) { return this._handler[chartID].decorators[decoratorID]; }
    GetCurrentGroup() { return this._handler[this._curr].group; }
}