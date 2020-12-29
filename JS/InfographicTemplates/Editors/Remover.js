class Remover
{
    constructor()
    {
       this._elem = null;
       this._type = null;
       this._layer = null;
    }

    CreateRemoverUI()
    {
        var container = document.createElement('div');
        container.id = 'Remover';
        container.appendChild(this._CreateButton());
        return container;
    }

    SetTextElem(textElem, layer)
    {
        this._elem = textElem;
        this._type = 'text';
        this._layer = layer;
        this._UpdateButtonListener();
    }

    SetChartElem(chartHandler, layer)
    {
        this._elem = chartHandler;
        this._type = 'chart';
        this._layer = layer;
        this._UpdateButtonListener();
    }

    ResetRemover()
    {
        this._elem = null;
        this._type = null;
        this._layer = null;
    }

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

    _RemoveTextElem()
    {
        this._elem.destroy();
        this._layer.batchDraw();
    }

    _RemoveChart()
    {
        this._elem.chart.Remove();
        this._layer.batchDraw();
    }

    _UpdateButtonListener()
    {
        var button = document.querySelector('#RemoverButton');
        button.onclick = () => {
            this._RemoveObject();
        };
    }
}