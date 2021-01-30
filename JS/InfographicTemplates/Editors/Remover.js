// Cullen, Riley
// Remover.js
// December 30, 2020

class Remover
{
    /**
     * @summary     Removes infographic elements from canvas when selected.
     * @description Creates an object that handles the removal of selectable 
     *              infographic elements from the canvas. Also creates the UI 
     *              elements responsible for removal.
     */
    constructor(chartWidth, chartHeight)
    {
       this._elem = null;
       this._type = null;
       this._layer = null;

       this._chartWidth = chartWidth + 75;
       this._chartHeight = chartHeight;
    }

    /**
     * @summary     Creates the UI responsible for removing selected infographic elements.
     * @description Creates a <div> element with id "Remover" and returns it to the 
     *              caller. This <div> element contains a button.
     */
    CreateRemoverUI()
    {
        var container = document.createElement('div');
        container.id = 'Remover';
        container.style.position = 'fixed';
        container.style.left = this._chartWidth + 'px';

        var height = Math.max(
            window.innerHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight);

        if (this._chartHeight > height){
            container.style.top = height - 50 + 'px';
        } else {
            container.style.top = this._chartHeight + 45 + 'px';
        }

        container.appendChild(this._CreateButton());
        return container;
    }

    /**
     * @summary     Sets _elem, which is the element we want to remove from the 
     *              canvas.
     * @description Assigns textElem to _elem, sets the type to "text", and sets
     *              _layer to layer so we can call batchDraw. This function also
     *              updates the button listener.
     * 
     * @param {Konva.Image} textElem The text element we want to remove.
     * @param {Konva.Layer} layer    The main layer of the infographic.
     */
    SetTextElem(textElem, layer)
    {
        this._elem = textElem;
        this._type = 'text';
        this._layer = layer;
        this._UpdateButtonListener();
    }

    /**
     * @summary     Sets _elem to chartHandler and _type to 'chart'.
     * @description Sets up instance variables (see SetTextElem description).
     * 
     * @param {JSONArray} chartHandler The chart handler element associated with
     *                                 the chart we want to remove.
     * @param {Konva.Layer} layer      The main layer of the canvas.
     */
    SetChartElem(chartHandler, layer)
    {
        this._elem = chartHandler;
        this._type = 'chart';
        this._layer = layer;
        this._UpdateButtonListener();
    }

    /**
     * @summary     Resets the current Remover object.
     * @description Nullifies all of the instance variables so infographic elements
     *              aren't deleted when unselected.
     */
    ResetRemover()
    {
        this._elem = null;
        this._type = null;
        this._layer = null;
    }

    /**
     * @summary     Creates a button responsible for removing selected elements.
     * @description Creates a button with id "RemoverButton" and a trash icon. 
     *              This button is responsible for removing selected infographic 
     *              elements but this capability is not set here and is instead 
     *              set in the SetChart and SetText methods.
     */
    _CreateButton()
    {
        var container = document.createElement('div');
        var button = document.createElement('button');
        button.id = 'RemoverButton';

        var icon = document.createElement('i');
        icon.className = 'fas fa-trash';
        button.appendChild(icon);

        container.appendChild(button);
        return container;
    }

    /**
     * @summary     Event listener responsible for removing selected infographic 
     *              element.
     * @description Event listener bound to the button created in _CreateButton.
     *              This function determines the type of _elem and then calls
     *              its type's respective removal funcion.
     */
    _RemoveObject()
    {
        if (this._elem) {
            if (this._type === 'text') {
                this._RemoveTextElem();
            } else if (this._type === 'chart') {
                this._RemoveChart();
            }
        }
    }

    /**
     * @summary     Removes text element from infographic.
     * @description Calls _elem's destroy function and then redraws the changed
     *              portion of the infographic.
     */
    _RemoveTextElem()
    {
        this._elem.destroy();
        this._layer.batchDraw();
    }

    /**
     * @summary     Removes chart from infographic.
     * @description Calls _elem.chart's Remove function and redraws the changed
     *              portion of the canvas.
     */
    _RemoveChart()
    {
        this._elem.chart.Remove();
        this._layer.batchDraw();
    }

    /**
     * @summary     Updates the button's event listener.
     * @description Set's the button's event listener to _RemoveObject.
     */
    _UpdateButtonListener()
    {
        var button = document.querySelector('#RemoverButton');
        button.onclick = () => {
            this._RemoveObject();
        };
    }
}