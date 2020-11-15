class BarChartEditor
{
    constructor(handlerElem, main, tr)
    {
        this._handlerElem = handlerElem;
        this._main = main;
        this._tr = tr;
    }

    CreateEditorUI()
    {
        var main = document.createElement('div');
        main.appendChild(this._CreateBarEditors());
        main.appendChild(this._CreateButton());
        return main;
    }

    _CreateBarEditors()
    {
        var data = this._handlerElem.chart.GetData();
        var main = document.createElement('div');

        data.forEach((d, i) => {
            var group = document.createElement('div');
            group.style.paddingBottom = 15 + 'px';
            main.appendChild(group);

            var label = document.createElement('label');
            label.innerHTML = d.category + ': ';
            label.style.paddingRight = 15 + 'px';
            group.appendChild(label);

            var inputField = document.createElement('textarea');
            inputField.rows = 1;
            inputField.cols = 5;
            inputField.style.resize = false;
            group.appendChild(inputField);
        });
        return main;
    }

    _CreateButton()
    {
        var button = document.createElement('button');
        button.textContent = 'Update';
        return button;
    }
}