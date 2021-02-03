// Cullen, Riley
// WaffleEditor.js
// November 6, 2020

class WaffleEditor 
{
    /**
     * @summary     This class creates the DOM elements related to editing waffle
     *              charts.
     * @description See summary. 
     * 
     * @requires WaffleChart/WaffleChart.js
     * 
     * @param {WaffleChart}       chart The chart we want to edit.
     * @param {Konva.Group}       group The group associated with the given chart.
     * @param {Konva.Layer}       main  The main layer that lets us redraw.
     * @param {Konva.Transformer} tr    The chart transformer.git 
     */    
    constructor(handlerElem, main, tr)
    {
        this._rows = 1;
        this._col = 5;
        this._handlerElem = handlerElem;
        this._main = main;
        this._tr = tr;
        this._iconData = this._handlerElem.chart.GetIconData();
    }

    /**
     * @summary     Creates the waffle chart editing UI.
     * @description See summary. This is done by calling the _Create functions
     *              and appending their return values to the main container.
     */
    CreateWaffleEditor()
    {
        var main = document.createElement('div');
        main.appendChild(this._CreateNumeratorEditor());
        main.appendChild(this._CreateDenominatorEditor());
        main.appendChild(this._CreateButton());
        return main;
    }

    /**
     * @summary Adds padding to the bottom of the parameterized element.
     * 
     * @param {HTML DOM Element} elem The element we want to add bottom padding to.
     */
    _AddBottomPadding(elem)
    {
        elem.style.paddingBottom = 25 + 'px';
    }

    /**
     * @summary     Creates the editor associated for adding icons of presetA.
     * @description Creates an icon and input field that allows for the updating 
     *              of presetA icons located in the selected waffle chart.
     */
    _CreatePresetAEditor()
    {   
        var presetAContainer = document.createElement('div');
        presetAContainer.id = 'PresetAContainer';
        this._AddBottomPadding(presetAContainer);

        var icon = this._CreateIcon(this._iconData[0]);
        presetAContainer.appendChild(icon);
        presetAContainer.appendChild(this._CreateInputField('PresetAInput'));

        return presetAContainer;
    }   

    /**
     * @summary     Creates the editor associated for adding icons of presetB.
     * @description Creates an icon and input field that allows for the updating 
     *              of presetB icons located in the selected waffle chart.
     */
    _CreatePresetBEditor()
    {
        var presetBContainer = document.createElement('div');
        presetBContainer.id = 'PresetBContainer';
        this._AddBottomPadding(presetBContainer);

        var icon = this._CreateIcon(this._iconData[1]);
        presetBContainer.appendChild(icon);

        presetBContainer.appendChild(this._CreateInputField('PresetBInput'));

        return presetBContainer;
    }

    /**
     * @summary     Creates an icon and returns it to caller.
     * 
     * @param {JSON array element} presetData An element of this._iconData.
     */
    _CreateIcon(presetData)
    {
        var label = document.createElement('label');
        var iconContainer = document.createElement('i');
        iconContainer.className = 'FontAwesome';
        iconContainer.style.color = presetData.color;
        iconContainer.style.fontSize = 50 + 'px';
        iconContainer.style.float = 'left';
        iconContainer.innerHTML = presetData.icon;
        label.appendChild(iconContainer);
        var para = document.createElement('p');
        para.style.paddingTop = 12 + 'px';
        para.style.marginLeft = 20 + 'px'
        para.innerHTML = ': ';
        label.appendChild(para);
        return label;
    }

    /**
     * @summary     Creates a textfield and returns it to the caller.
     * @param {string} id The id we want to give to the textarea. 
     */
    _CreateInputField(id)
    {
        var textarea = document.createElement('textarea');
        textarea.rows = this._rows;
        textarea.col = this._col;
        textarea.id = id;
        textarea.style.resize = false;
        textarea.style.float = 'left';
        textarea.style.position = 'relative';
        textarea.style.marginLeft = 20 + 'px';
        textarea.style.bottom = 30 + 'px'; 
        return textarea;
    }

    /**
     * @summary Creates and adds a label and a textarea to the main container.
     */
    _CreateNumeratorEditor()
    {
        var numeratorContainer = document.createElement('div');
        numeratorContainer.style.display = 'flex';
        numeratorContainer.style.alignItems = 'center';
        numeratorContainer.id = 'NumeratorContainer';
        this._AddBottomPadding(numeratorContainer);

        var labelText = document.createElement('label');
        labelText.innerHTML = 'Numerator: ';
        labelText.style.paddingRight = 25 + 'px';
        numeratorContainer.appendChild(labelText);

        var textarea = document.createElement('textarea');
        textarea.rows = this._rows;
        textarea.col = this._col;
        textarea.id = 'PresetAInput';
        textarea.style.resize = 'none';
        numeratorContainer.appendChild(textarea);

        return numeratorContainer;
    }

    /**
     * @summary Creates and adds a label as well as a textarea to the main container.
     */
    _CreateDenominatorEditor()
    {
        var denomContainer = document.createElement('div');
        denomContainer.id = 'DenominatorContainer';
        denomContainer.style.display = 'flex';
        denomContainer.style.alignItems = 'center';
        this._AddBottomPadding(denomContainer);

        var labelText = document.createElement('label');
        labelText.innerHTML = 'Denominator: ';
        labelText.style.paddingRight = 10 + 'px';
        denomContainer.appendChild(labelText);

        var textarea = document.createElement('textarea');
        textarea.rows = this._rows;
        textarea.id = 'PresetBInput';
        textarea.col = this._col;
        textarea.style.resize = 'none';
        denomContainer.appendChild(textarea);

        return denomContainer;
    }

    /**
     * @summary Creates a button and adds it to the main container.
     */
    _CreateButton()
    {
        var button = document.createElement('button');
        button.id = 'WaffleButton';
        button.textContent = 'Update';
        button.onclick = () => {
            this._UpdateWaffleChart();
        };
        return button;
    }

    /**
     * @summary     Updates the waffle chart with new numerator/denominator values.
     * @description An event listener that handles the updating of the selected 
     *              waffle chart once the update button is pressed. This function also
     *              handles error checking for incorrect input values.
     */
    _UpdateWaffleChart()
    {
        var presetAValue = document.getElementById('PresetAInput').value,
            presetBValue = document.getElementById('PresetBInput').value;

        console.log(presetAValue);
        console.log(presetBValue);

        if (presetAValue == null || presetAValue == '' || presetBValue == null || presetBValue == '') return;
        if (isNaN(presetAValue) || isNaN(presetBValue)) return;

        this._handlerElem.chart.UpdateData(parseInt(presetAValue), parseInt(presetBValue));

        var prev = this._handlerElem.chart;
        for (var i = 0; i <= this._handlerElem.decoratorSize; i++) {
            this._handlerElem.decorators[i].UpdateDecorator(prev);
            prev = this._handlerElem.decorators[i];
        }

        if (this._handlerElem.decoratorSize === -1) this._handlerElem.chart.CreateChart();
        else this._handlerElem.decorators[this._handlerElem.decoratorSize].CreateChart();
        this._tr.forceUpdate();
        this._main.batchDraw();
    }
}