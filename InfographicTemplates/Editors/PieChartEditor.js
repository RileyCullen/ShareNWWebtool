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
        main.appendChild(this._CreateButton());
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

        var value = document.createElement('label');
        value.innerHTML = '50%';

        slider.oninput = () => {
            value.innerHTML = slider.value + '%';
        };

        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(value);

        return sliderContainer;
    }

    _CreateButton()
    {
        var button = document.createElement('button');
        button.textContent = 'Update';
        button.onclick = () => {
            this._UpdatePieChart();
        };
        return button;
    }

    _UpdatePieChart()
    {
        var percentage = document.getElementById('slider').value;
        var updatedData = this._CreateDataArr(percentage);

        this._handlerElem.chart.UpdateData(updatedData);
        
        var prev = this._handlerElem.chart;
        for (var i = 0; i < this._handlerElem.decoratorSize; i++) {
            console.log(this._handlerElem.decorators[i]);
            this._handlerElem.decorators[i].UpdateDecorator(prev);
            prev = this._handlerElem.decorators[i];
        }

        this._handlerElem.decorators[this._handlerElem.decoratorSize].CreateChart();
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