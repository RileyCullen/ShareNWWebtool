// Cullen, Riley
// BarChartEditor.js
// November 15, 2020 

class BarChartEditor
{
    /**
     * @summary     Provides the ability to edit a selected bar chart.
     * @description A concrete class that adds the bar chart editing UI to the DOM
     *              as well as handles the updating of a selected bar chart once
     *              all of the necessary data has been entered.
     * 
     * @param {ChartHandler element} handlerElem The handler element associated 
     *                                           with the selected bar chart.
     * @param {Konva.Layer}          main        The main layer of the infographic.
     * @param {Konva.Transformer}    tr          The transformer of the infographic.
     */
    constructor(handlerElem, main, tr)
    {
        this._handlerElem = handlerElem;
        this._main = main;
        this._tr = tr;
    }

    /**
     * @summary     Creates the bar chart editing UI and adds it to the DOM.
     * @description Creates a new <div> element, adds the bar editors and button
     *              to the newly created <div> element, and returns the <div>
     *              to the caller.
     */
    CreateEditorUI()
    {
        var main = document.createElement('div');
        main.appendChild(this._CreateBarEditors());
        main.appendChild(this._CreateButton());
        return main;
    }

    /**
     * @summary     A private method that creates the bar editors.
     */
    _CreateBarEditors()
    {
        var data = this._handlerElem.chart.GetData();
        var main = document.createElement('div');

        data.forEach((d, i) => {
            var group = document.createElement('div');
            group.style.display = 'flex';
            group.style.alignItems = 'center';
            group.style.paddingBottom = 15 + 'px';
            main.appendChild(group);

            var label = document.createElement('label');
            label.innerHTML = d.category + ': ';
            label.style.paddingRight = 15 + 'px';
            label.className = 'BarLabel';
            group.appendChild(label);

            var inputField = document.createElement('textarea');
            inputField.rows = 1;
            inputField.cols = 5;
            inputField.style.resize = 'none';
            inputField.id = i;
            inputField.className = 'BarInput'
            inputField.innerHTML = d.value;
            group.appendChild(inputField);
        });
        return main;
    }

    /**
     * @summary     A private method that creates the update button.
     */
    _CreateButton()
    {
        var button = document.createElement('button');
        button.textContent = 'Update';
        button.onclick = () => {
            this._UpdateBarChart();
        };
        return button;
    }

    /**
     * @summary     A private method that updates the bar chart when update is 
     *              pressed.
     * @description A private method that modifies the original data array to 
     *              include the new values. The function then passes this modified
     *              data array to the chart object and then updates all of the 
     *              corresponding decorators.
     */
    _UpdateBarChart()
    {
        var input = this._GetInputFieldValues();
        var updatedData = this._UpdateDataArr(input);

        if (this._ValidateInput(input)) {
            this._handlerElem.chart.UpdateData(updatedData);
            var prev = this._handlerElem.chart;
            for (var i = 0; i <= this._handlerElem.decoratorSize; i++) {
                this._handlerElem.decorators[i].UpdateDecorator(prev);
                prev = this._handlerElem.decorators[i];
            }
            prev.CreateBarChart();
            this._tr.forceUpdate();
            this._main.batchDraw();
        }
    }

    /**
     * @summary     Validates all of the inputs to ensure the input is a number.
     * 
     * @param {Array} input The array of inputs we want to evaluate.
     */
    _ValidateInput(input)
    {
        input.forEach((d, i) => {
            if (d === null || d === '' || isNaN(d)) return false;
        });
        return true;
    }

    /**
     * @summary     Gets all of the values within the editor's input fields.
     */
    _GetInputFieldValues()
    {
        var values = [];
        var elems = document.getElementsByClassName('BarInput');
        for (var i = 0; i < elems.length; i++) {
            values[i] = parseFloat(elems[i].value);
        }
        return values;
    }

    /**
     * @summary     Updates the selected bar chart's data array.
     *   
     * @param {Array} updatedValues The new values we want to use to updated this._data.
     */
    _UpdateDataArr(updatedValues)
    {
        var data = this._handlerElem.chart.GetData();
        data.forEach((d, i) => {
            d.value = updatedValues[i];
        });
        return data;
    }

    /**
     * @summary     Aligns the UI's textareas so they are consistent with each other.
     * @description Iterates through all of the label's to find the label with the 
     *              largest width then uses that to align all of the textareas 
     *              located to the left of the label.
     */
    AlignInputFields()
    {
        var labelArr = document.getElementsByClassName('BarLabel');
        var largestWidth = this._FindLargestLabel(labelArr);
    
        console.log('largest width: ' + largestWidth);

        for (var i = 0; i < labelArr.length; i++) {
            console.log(i + ' width: ' + labelArr[i].offsetWidth);
            labelArr[i].style.paddingRight = (largestWidth - labelArr[i].offsetWidth) + 10 + 'px';
        }
    }

    /**
     * @summary     Finds the label with the largest width.
     * @description Iterates through all of the elements in labelArr, finds the 
     *              label with the largest width, and returns that width.
     * 
     * @param {Array} labelArr The label array we want to iterate through.
     */
    _FindLargestLabel(labelArr)
    {
        var largestWidth = labelArr[0].offsetWidth;
        for (var i = 1; i < labelArr.length; i++) {
            if (labelArr[i].offsetWidth > largestWidth) largestWidth = labelArr[i].offsetWidth;
        }
        return largestWidth;
    }
}