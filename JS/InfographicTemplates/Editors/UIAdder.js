// Cullen, Riley
// UIAdder.js
// November 6, 2020

class UIAdder 
{
    /**
     * @summary     This class manages all of the infographic editing related UI.
     * @description See summary. In particular, this class manages the editing UI 
     *              related to text editing and chart editing.
     * 
     * @requires WaffleEditor.js
     */
    constructor(chartWidth)
    {
        this._main = document.getElementById('editor');
        this._group = document.createElement('div');
        this._chartWidth = chartWidth;
        this._isEditing = false;
    }

    /**
     * @summary     Creates waffle chart editing interface and adds it to the DOM.
     * @description Creates waffle chart UI by appending a new WaffleEditor object to
     *              the parent node.
     * 
     * @param {WaffleChart}       chart The waffle chart we have selected.
     * @param {Konva.Group}       group The group associated with the waffle chart
     *                                  we have selected.
     * @param {Konva.Layer}       main  The main layer of the infographic (so we can
     *                                  redraw the canvas post update).
     * @param {Konva.Transformer} tr    The chart transformer object (so we can
     *                                  update the size of the transformer).
     */
    CreateWaffleEditor(chart, group, main, tr)
    {
        this._AddGroupToMain();
        this._group.appendChild(new WaffleEditor(chart, group, main, tr)
            .CreateWaffleEditor());
    }

    /**
     * @summary     Creates a pie chart editing UI and adds it to the DOM.
     * 
     * @param {Handler Element}   handlerElem The handler element associated with 
     *                                        the selected pie chart.
     * @param {Konva.Layer}       main        The main layer of the infographic (so we can
     *                                        redraw the canvas post update).
     * @param {Konva.Transformer} tr          The chart transformer object (so we can
     *                                        update the size of the transformer).
     */
    CreatePieEditor(handlerElem, main, tr)
    {
        this._AddGroupToMain();
        this._group.appendChild(new PieChartEditor(handlerElem, main, tr)
            .CreateEditorUI());
    }

    /**
     * @summary     Creates a bar chart editing UI and adds it to the DOM.
     * 
     * @param {Handler Element}   handlerElem The handler element associated with 
     *                                        the selected bar chart.
     * @param {Konva.Layer}       main        The main layer of the infographic (so we can
     *                                        redraw the canvas post update).
     * @param {Konva.Transformer} tr          The chart transformer object (so we can
     *                                        update the size of the transformer).
     */
    CreateBarEditor(handlerElem, main, tr)
    {
        this._AddGroupToMain();
        this._group.appendChild(new BarChartEditor(handlerElem, main, tr)
            .CreateEditorUI());
    }

    /**
     * @summary     Creates a stacked bar chart editing UI and adds it to the DOM.
     * 
     * @param {Handler Element}   handlerElem The handler element associated with 
     *                                        the selected bar chart.
     * @param {Konva.Layer}       main        The main layer of the infographic (so we can
     *                                        redraw the canvas post update).
     * @param {Konva.Transformer} tr          The chart transformer object (so we can
     *                                        update the size of the transformer).
     */
    CreateStackedBarEditor(handlerElem, main, tr)
    {
        this._AddGroupToMain();
        this._group.appendChild(new StackedBarChartEditor(handlerElem, main, tr)
            .CreateEditorUI());
    }

    /**
     * @summary Removes the current editor object from DOM.
     */
    RemoveCurrentEditor()
    {
        this._isEditing = false;
        this._RemoveGroupFromMain();
    }

    /**
     * @summary Returns the state of the UIAdder object.
     */
    GetState()
    {
        return this._isEditing;
    }

    /**
     * @summary A private method that appends the _group object to _main.
     */
    _AddGroupToMain()
    {
        this._main.appendChild(this._group);
        this._isEditing = true;
        this._AddCSS();
    }

    /**
     * @summary Adds CSS to the main container of the editing UI.
     */
    _AddCSS()
    {
        this._group.style.position = 'fixed';
        this._group.style.left = this._chartWidth + 55 + 'px';
        this._group.style.top = 70 + 'px';
    }

    /**
     * @summary A private method that removes the _group node and all of its child 
     *          nodes.
     */
    _RemoveGroupFromMain()
    {
        this._main.removeChild(this._group);
        this._RemoveAllChildNodes(this._group);
    }

    /**
     * @summary A private method that removes all of the child nodes from the specified
     *          node.
     * 
     * @param {DOM node} node The node we want to remove all of its chlidren.
     */
    _RemoveAllChildNodes(node)
    {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}