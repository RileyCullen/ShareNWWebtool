// Cullen, Riley
// PieChartEditor.js
// November 16, 2020

class PieChartEditor 
{
    /**
     * @summary     Provides the ability to edit a selected pie chart.
     * @description A concrete class that adds the UI that allows a user to edit 
     *              a selected bar chart. 
     * 
     * @param {Chart Handler Element} handlerElem The handler element associated
     *                                            with the selected pie chart.
     * @param {Konva.Layer}           main        The main layer of the infographic.
     * @param {Konva.Transformer}     tr          The transformer of the pie chart.
     */
    constructor(handlerElem, main, tr)
    {
        this._handlerElem = handlerElem;
        this._main = main;
        this._tr = tr;
    }

    /**
     * @summary Creates the UI that allows for editing of pie charts.
     */
    CreateEditorUI()
    {
        var main = document.createElement('div');
        main.appendChild(this._CreateSlider());
        return main;
    }

    /**
     * @summary Creates the slider that changes the pie chart's value. 
     */
    _CreateSlider()
    {
        var sliderContainer = document.createElement('div');
        sliderContainer.id = 'SliderContainer';

        var data = this._handlerElem.chart.GetDataArr();

        var upperContainer = document.createElement('div');
        upperContainer.style.display = 'flex';
        upperContainer.style.alignItems = 'center';
        upperContainer.style.position = 'relative';
        upperContainer.style.left = 60 + 'px';
        sliderContainer.appendChild(upperContainer);

        var buttonOne = document.createElement('button');
        buttonOne.innerHTML = '-';
        buttonOne.style.marginRight = 10 + 'px';
        upperContainer.appendChild(buttonOne);
        

        var value = document.createElement('textarea');
        value.innerHTML = data[0].value;
        value.style.width = 50 + 'px';
        value.style.height = 20 + 'px';
        value.style.resize = 'none';
        value.style.textAlign = 'center';
        upperContainer.appendChild(value);

        var percentage = document.createElement('p')
        percentage.innerHTML = '%';
        percentage.style.width = 50 + 'px';
        percentage.style.height = 20 + 'px';
        percentage.style.marginLeft = 3 + 'px';
        upperContainer.appendChild(percentage);

        var buttonTwo = document.createElement('button');
        buttonTwo.innerHTML = '+';
        buttonTwo.style.marginLeft = -30 + 'px';
        upperContainer.appendChild(buttonTwo);


        var lowerContainer = document.createElement('div');
        lowerContainer.style.display = 'flex';
        sliderContainer.appendChild(lowerContainer);
        
        var label = document.createElement('label');
        label.innerHTML = 'Pie Chart Value: ';
        label.style.paddingRight = 3 + 'px';
        lowerContainer.appendChild(label);

        var slider = document.createElement('input');
        slider.type = 'range';
        slider.min = 0;
        slider.max = 100;
        slider.step = 1;
        slider.id = 'slider';

        slider.defaultValue = data[0].value;

        slider.oninput = () => {
            value.value = slider.value;
            this._UpdatePieChart();
        };

        buttonOne.onclick = () => {
            if (slider.value == 0) return;
            value.value = slider.value -= 1;
            slider.value = value.value;
            this._UpdatePieChart();
        };

        buttonTwo.onclick = () => {
            if (slider.value == 100) return;
            value.value = ++slider.value;
            slider.value = value.value;
            this._UpdatePieChart();
        };

        value.oninput = () => {
            if (parseInt(value.value) > 100 || parseInt(value.value) < 0) return;
            slider.value = value.value;
            this._UpdatePieChart();
        };

        lowerContainer.appendChild(slider);

        return sliderContainer;
    }

    /**
     * @summary     Updates pie chart and all of its associated decorators.
     * @description An event listener called when the Update button is pressed.
     *              This function updates the PieChart class' data with the new
     *              data array then passes this PieChart to the first decorator.
     *              This first decorator is then passed to the second decorator so
     *              that all of the elements are updated.
     */
    _UpdatePieChart()
    {
        var percentage = document.getElementById('slider').value;
        var updatedData = this._CreateDataArr(percentage);

        this._handlerElem.chart.UpdateData(updatedData);
        
        var prev = this._handlerElem.chart;
        for (var i = 0; i <= this._handlerElem.decoratorSize; i++) {
            this._handlerElem.decorators[i].UpdateDecorator(prev);
            prev = this._handlerElem.decorators[i];
        }
        if (this._handlerElem.decoratorSize === -1) this._handlerElem.chart.CreateChart();
        else prev.CreateChart();
        this._tr.forceUpdate();
        this._main.batchDraw();
    }

    /**
     * @summary     Updates old data array with new percentage values.
     * @description Gets the pie chart's data array and updates it with the new 
     *              percentage values. This data array is then returned to the 
     *              caller. 
     * 
     * @param {*} percentage 
     */
    _CreateDataArr(percentage)
    {
        var tmp = this._handlerElem.chart.GetDataArr();
        tmp[0].value = parseInt(percentage);
        if (tmp[1]) tmp[1].value = 100 - percentage;
        return tmp;
    }
}