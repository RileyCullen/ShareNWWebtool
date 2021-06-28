// Cullen, Riley
// StackedBarChartEditor.js
// November 26, 2020

class StackedBarChartEditor
{
    /**
     * @summary     Provides the UI to edit stacked bar charts.
     * @description A concrete class that adds elements to the DOM based on the 
     *              passed in handlerElem to create a UI for editing stacked 
     *              bar charts
     * 
     * @param {Chart Handler Element} handlerElem The handler element associated
     *                                            with the chart we want to edit.
     * @param {Konva.Layer}           main        The layer of the infog.
     * @param {Konva.Transformer}     tr          The infographic's transformer.
     */
    constructor(handlerElem, main, tr)
    {
        this._handlerElem = handlerElem;
        this._main = main;
        this._tr = tr;
    }

    /**
     * @summary Creates the stacked bar chart editing UI.
     */
    CreateEditorUI()
    {
        var main = document.createElement('div');
        main.appendChild(this._CreateBarEditors());
        main.appendChild(this._CreateButton());
        return main;
    }

    /**
     * @summary Creates the individual elements contained within editing UI.
     */
    _CreateBarEditors()
    {
        var categories = this._handlerElem.chart.GetGroups();
        var iter = categories.values();
        var main = document.createElement('div');
        var data = this._handlerElem.chart.GetData();

        for (var i = iter.next().value; i != null; i = iter.next().value) {
            var subsection = document.createElement('div');
            subsection.style.paddingBottom = 23 + 'px';
            subsection.style.paddingRight = 30 + 'px';
            subsection.style.float = 'left';

            var textNode = document.createElement('label');
            textNode.innerHTML = i + ':';
            textNode.style.fontWeight = 'bold';
            textNode.style.fontSize = 25 + 'px';
            subsection.appendChild(textNode);

            data.slice().reverse().forEach(d => {
                console.log(d)
                if (d.category === i) {
                    var group = document.createElement('div');
                    group.style.display = 'flex';
                    group.style.alignItems = 'center';
                    group.style.paddingTop = 13 + 'px';

                    var colorBox = document.createElement('div');
                    colorBox.style.backgroundColor = d.color;
                    colorBox.style.width = 20 + 'px';
                    colorBox.style.height = 20 + 'px';
                    colorBox.style.float = 'left';
                    colorBox.style.marginRight = 15 + 'px';

                    group.appendChild(colorBox);

                    var label = document.createElement('label');
                    label.innerHTML = d.subcategory + ': ';
                    label.className = 'BarLabel';
                    group.appendChild(label);

                    var inputField = document.createElement('textarea');
                    inputField.rows = 1;
                    inputField.cols = 5;
                    inputField.style.resize = 'none';
                    inputField.id = i + d.subcategory;
                    inputField.className = 'BarInput'
                    inputField.innerHTML = d.value;
                    group.appendChild(inputField);

                    subsection.appendChild(group);
                }
            });

            main.appendChild(subsection);
        }

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
            values[i] = {'value': parseFloat(elems[i].value),
                         'id': elems[i].id};
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

        /**
         * Map is needed to "fix" data array. Due to the way I decided to draw
         * the konva.js elements on the canvas, when we reverse the creation of 
         * the HTMLCollection in _CreateBarEditors, it creates an incorrect 
         * representation of the data array which creates an incorrect version
         * of the bar graph. This fixes it.
         */
        var map = [];
        updatedValues.forEach((d) => {
            map[d.id] = d.value;
        });

        data.forEach((d, i) => {
           d.value = map[d.category + d.subcategory];
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