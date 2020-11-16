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

        var label = document.createElement('label');
        label.innerHTML = 'Pie Chart Value: ';
        label.style.paddingRight = 15 + 'px';
        sliderContainer.appendChild(label);

        var slider = document.createElement('input');
        slider.type = 'range';
        slider.min = 0;
        slider.max = 100;
        slider.step = 1;
        slider.id = 'slider';

        var data = this._handlerElem.chart.GetDataArr();
        slider.defaultValue = data[0].value;

        var value = document.createElement('label');
        value.innerHTML = data[0].value + '%';

        slider.oninput = () => {
            value.innerHTML = slider.value + '%';
            this._UpdatePieChart();
        };

        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(value);

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
        else this._handlerElem.decorators[this._handlerElem.decoratorSize].CreateChart();
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

        tmp[0].value = percentage;
        tmp[1].value = 100 - percentage;

        return tmp;
    }
}