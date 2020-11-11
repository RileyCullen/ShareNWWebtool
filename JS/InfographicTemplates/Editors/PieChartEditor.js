class PieChartEditor 
{
    constructor(handlerElem, main, tr)
    {
        this._handlerElem = handlerElem;
        this._main = main;
        this._tr = tr;
        console.log(this._handlerElem);
    }

    CreateEditorUI()
    {
        var main = document.createElement('div');
        main.appendChild(this._CreateSlider());
        return main;
    }

    _CreateSlider()
    {
        var sliderContainer = document.createElement('div');
        sliderContainer.id = 'SliderContainer';

        var label = document.createElement('label');
        label.innerHTML = 'Pie Chart Value: ';
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

    _CreateDataArr(percentage)
    {
        var tmp = this._handlerElem.chart.GetDataArr();

        tmp[0].value = percentage;
        tmp[1].value = 100 - percentage;

        return tmp;
    }
}