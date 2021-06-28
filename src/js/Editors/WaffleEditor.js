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

        var dataSection = this._CreateBackgroundRegion({
            width: 275,
            height: 90
        });
        dataSection.style.padding = 10 + 'px';
        dataSection.style.marginBottom = 30 + 'px';
        main.appendChild(dataSection);

        dataSection.appendChild(this._CreateNumeratorEditor());
        dataSection.appendChild(this._CreateDenominatorEditor());

        var iconSection = this._CreateBackgroundRegion({
            width: 275,
            height: 90
        });
        iconSection.style.padding = 10 + 'px';
        iconSection.style.marginBottom = 60 + 'px';
        main.appendChild(iconSection);

        iconSection.appendChild(this._CreateIconAEditor())
        iconSection.appendChild(this._CreateIconBEditor())
        
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
     * @summary     Creates a <div> element to group other HTML elements.
     * @description Creates a <div> element styled with the width, height,
     *              and color parameters passed by the caller.
     * 
     * @param {JSON}   param0 A JSON object that holds the width, height, and 
     *                        color of the background region.
     * @param {double} width  The width of the background region.
     * @param {double} height The height of the background region.
     * @param {string} color  The color of the background region.
     * 
     * @returns A <div> element.
     */
    _CreateBackgroundRegion({width, height, color = 'white'})
    {
        var backgroundDiv = document.createElement('div');
        backgroundDiv.style.width = width + 'px';
        backgroundDiv.style.height = height + 'px';
        backgroundDiv.style.backgroundColor = color;
        backgroundDiv.style.boxSizing = 'border-box';
        return backgroundDiv;
    }

    /**
     * @summary     Creates a container for the label and textarea.
     * @description Abstracts the creation of a container for the label and 
     *              textarea so that they are all styled the same.
     * 
     * @param {JSON}   param0 A JSON object containing the ID of the <div> 
     *                        container.
     * @param {string} id     The ID for the <div> container.
     * 
     * @returns A container for the label and textarea.
     */
    _CreateContainer({id})
    {
        var container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.id = id;
        this._AddBottomPadding(container); 
        return container;
    }

    /**
     * @summary     Creates a <label> element.
     * 
     * @returns A <label> element.
     */
    _CreateLabel({id, innerHTML, paddingRight})
    {
        var labelText = document.createElement('label');
        labelText.id = id;
        labelText.innerHTML = innerHTML;
        labelText.style.paddingRight = paddingRight + 'px'; 
        return labelText;
    }

    /**
     * @summary Creates a textarea.
     * @returns A textarea.
     */
    _CreateTextarea({id})
    {
        var textarea = document.createElement('textarea');
        textarea.rows = this._rows;
        textarea.col = this._col;
        textarea.id = id;
        textarea.style.resize = 'none'; 
        return textarea;
    }

    /**
     * @summary Creates the first icon editor.
     * 
     * @returns A DOM container with the A icon editor.
     */
    _CreateIconAEditor()
    {
        var iconAContainer = this._CreateContainer({
            id: 'IconAContainer'
        });

        var labelText = this._CreateLabel({
            id: 'IconALabel',
            innerHTML: 'Icon A Unicode: ',
            paddingRight: 15
        });
        iconAContainer.appendChild(labelText);

        var textarea = this._CreateTextarea({
            id: 'IconAInput'
        })
        iconAContainer.appendChild(textarea);

        return iconAContainer; 
    }

    /**
     * @summary Creates the second icon editor.
     * 
     * @returns A DOM container with the B icon editor.
     */
    _CreateIconBEditor()
    {
        var iconBContainer = this._CreateContainer({
            id: 'IconBContainer'
        });

        var labelText = this._CreateLabel({
            id: 'IconBLabel',
            innerHTML: 'Icon B Unicode: ',
            paddingRight: 15
        });
        iconBContainer.appendChild(labelText);

        var textarea = this._CreateTextarea({
            id: 'IconBInput'
        })
        iconBContainer.appendChild(textarea);

        return iconBContainer; 
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
            presetBValue = document.getElementById('PresetBInput').value,
            iconAValue   = document.getElementById('IconAInput').value,
            iconBValue   = document.getElementById('IconBInput').value;

        this._handlerElem.chart.UpdateData(parseInt(presetAValue), parseInt(presetBValue));
        this._handlerElem.chart.UpdateIcon({
            iconNum: 0, 
            iconCode: iconAValue
        });
        this._handlerElem.chart.UpdateIcon({
            iconNum: 1,
            iconCode: iconBValue,
        })

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