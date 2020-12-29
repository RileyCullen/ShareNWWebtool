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
        this._toolbar = document.createElement('div');
        this._remover = new Remover();

        this._main.appendChild(this._toolbar);
        this._AddRemovalUI();

        this._chartWidth = chartWidth;
        this._isEditing = false;

        this._AddCSS();
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
        this._SetChartRemover(chart, main);
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
        this._SetChartRemover(handlerElem, main);
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
        var editor = new BarChartEditor(handlerElem, main, tr);
        this._AddGroupToMain();
        this._group.appendChild(editor.CreateEditorUI());
        editor.AlignInputFields();
        this._SetChartRemover(handlerElem, main);
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
        var editor = new StackedBarChartEditor(handlerElem, main, tr);
        this._AddGroupToMain();
        this._group.appendChild(editor.CreateEditorUI());
        editor.AlignInputFields();
        this._SetChartRemover(handlerElem, main);
    }

    /**
     * @summary     Creates a text editing UI and adds it to the DOM.
     * 
     * @param {Konva.Image}       handlerElem The image element we want to update.
     * @param {Konva.Layer}       main        The main layer of the infographic (so we can
     *                                        redraw the canvas post update).
     * @param {Konva.Transformer} tr          The chart transformer object (so we can
     *                                        update the size of the transformer).
     */
    CreateTextEditor(textElem, main, tr)
    {
        var editor = new QuillEditor(textElem, main, tr);
        this._AddGroupToMain();
        this._group.appendChild(editor.CreateEditorUI());
        editor.CreateQuillObject();
        this._SetTextRemover(textElem, main);
    }

    /**
     * @summary Removes the current editor object from DOM.
     */
    RemoveCurrentEditor()
    {
        if (this._isEditing) {
            this._isEditing = false;
            this._RemoveGroupFromMain();
            this._ResetRemover();
        }
    }

    /**
     * @summary Returns the state of the UIAdder object.
     */
    GetState()
    {
        return this._isEditing;
    }

    _AddRemovalUI()
    {
        var container = document.querySelector('#Remover');
        if (!container) this._toolbar.appendChild(this._remover.CreateRemoverUI());
    }

    /**
     * @summary A private method that appends the _group object to _main.
     */
    _AddGroupToMain()
    {
        this._main.appendChild(this._group);
        this._isEditing = true;
    }

    /**
     * @summary Adds CSS to the main container of the editing UI.
     */
    _AddCSS()
    {
        this._main.style.position = 'fixed';
        this._main.style.left = this._chartWidth + 55 + 'px';
        this._main.style.top = 70 + 'px';
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

    _ResetRemover()
    {
        this._remover.ResetRemover();
    }

    _SetTextRemover(textElem, main)
    {
        this._remover.SetTextElem(textElem, main);
    }

    _SetChartRemover(chartHandler, main) 
    {
        this._remover.SetChartElem(chartHandler, main);
    }
}