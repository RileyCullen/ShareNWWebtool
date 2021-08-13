// Cullen, Riley
// ChartHandler.js
// November 5, 2020

class ChartHandler 
{
    /**
     * @summary     A concrete class that handles the addition of various charts to
     *              an infographic.
     * @description A concrete class that abstracts handling of different charts,
     *              decorators, and groups.
     */
    constructor()
    {
        this._handler = [];
        this._curr = -1;
    }

    /**
     * @summary     Adds a chart to the handler.
     * @description See summary. Also sets up other metadata sections of the handler
     *              like binding the chart to a group as well as assigning it a unique
     *              id and chart type for identification.
     * 
     * @param {Chart}       chart The chart we are adding to the handler.
     * @param {Konva.Group} group The group associated with the chart we added.
     * @param {string}      type  The type of chart we are adding.
     */
    AddChart({chart, group, type})
    {
        this._curr++;
        this._handler[this._curr] = {
            'chart': chart,
            'decorators': [],
            'decoratorSize': -1,
            'group': group,
        };
        group.setAttr('id', this._curr);
        group.setAttr('name', 'Selectable Chart ' + type);
    }

    /**
     * @summary     Adds a decorator to the chart specified by id.
     * @description See summary. 
     * 
     * @param {Chart Decorator} decorator The decorator we want to add.
     * @param {int}             id        The id of the chart we want to add the decorator to.
     */
    AddDecorator({decorator, id})
    {
        this._handler[id].decorators[++this._handler[id].decoratorSize] = decorator;
    }

    /**
     * @summary Returns the index of the most recently added chart.
     */
    GetCurrChartID() { return this._curr; }

    /**
     * @summary Returns the index of the most recent decorator for the current chart.
     */
    GetCurrDecSize() { return this._handler[this._curr].decoratorSize; }

    /**
     * @summary Returns the chart specified at index id.
     * 
     * @param {int} id The index of the chart we want to get.
     */
    GetChart(id) { return this._handler[id].chart; }

    /**
     * @summary Gets the decorator specified at chartID and decoratorID and returns it.
     * 
     * @param {int} chartID     The chart of the decorator we want to return.
     * @param {int} decoratorID The decorator we want to return.
     */
    GetDecorator({chartID, decoratorID}) { return this._handler[chartID].decorators[decoratorID]; }

    /**
     * @summary Returns the group of the current handler entry.
     */
    GetCurrentGroup() { return this.GetGroup(this._curr); }

    /**
     * @summary Returns the group of the element at id.
     * 
     * @param {int} id The index of the handler element we want to access. 
     * 
     * @returns A Konva.Group object. 
     */
    GetGroup(id) { return this._handler[id].group; }

    /**
     * @summary Returns the entire handler element at id to the caller.
     * 
     * @param {int} id The index of the handler element we want to access.
     * 
     * @returns A JSON object consisting of the handler at index id. 
     */
    GetHandlerElem(id) { return this._handler[id]; }

    GetSettingsArray(id)
    {
        return this._handler[id].chart.GetChartSettings();
    }

    /**
     * @summary     Removes the handler element at index id.
     * @description Calls chart's Remove function then removes the handler element
     *              from the handler.
     * 
     * @param {int} id The index of the handler element that will be removed.
     */
    RemoveHandlerElem(id) 
    {
        this._handler[id].chart.Remove();
        this._handler.splice(id, 1);
        this._curr--;
        this._UpdateHandlerId(); 
    }

    /**
     * @summary     Updates the id assigned to the different chart elements in 
     *              the handler.
     */
    _UpdateHandlerId()
    {
        this._handler.forEach((d, i) => {
            d.group.setAttr('id', i);
        });
    }
}

export { ChartHandler }; 