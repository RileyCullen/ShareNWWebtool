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
    constructor()
    {
        this._main = document.getElementById('editor');
        this._group = document.createElement('div');
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

    CreatePieEditor(handlerElem, main, tr)
    {
        this._AddGroupToMain();
        this._group.appendChild(new PieChartEditor(handlerElem, main, tr).CreateEditorUI());
    }

    /**
     * @summary Removes the current editor object from DOM.
     */
    RemoveCurrentEditor()
    {
        this._RemoveGroupFromMain();
    }

    /**
     * @summary A private method that appends the _group object to _main.
     */
    _AddGroupToMain()
    {
        this._main.appendChild(this._group);
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