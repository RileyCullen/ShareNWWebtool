class WaffleEditor 
{

    constructor(chart, group, main, tr)
    {
        this._rows = 1;
        this._col = 5;
        this._waffleChart = chart;
        this._group = group;
        this._main = main;
        this._tr = tr;
    }

    CreateWaffleEditor()
    {
        var main = document.createElement('div');
        main.appendChild(this._CreateNumeratorEditor());
        main.appendChild(this._CreateDenominatorEditor());
        main.appendChild(this._CreateButton());
        return main;
    }

    _CreateNumeratorEditor()
    {
        var numeratorContainer = document.createElement('div');
        numeratorContainer.id = 'NumeratorContainer';

        var labelText = document.createTextNode('Numerator:');
        numeratorContainer.appendChild(labelText);

        var textarea = document.createElement('textarea');
        textarea.rows = this._rows;
        textarea.col = this._col;
        textarea.id = 'num';
        textarea.style.resize = false;
        numeratorContainer.appendChild(textarea);

        return numeratorContainer;
    }

    _CreateDenominatorEditor()
    {
        var denomContainer = document.createElement('div');

        var labelText = document.createTextNode('Denominator:');
        denomContainer.appendChild(labelText);

        var textarea = document.createElement('textarea');
        textarea.rows = this._rows;
        textarea.id = 'denom';
        textarea.col = this._col;
        textarea.style.resize = false;
        denomContainer.appendChild(textarea);

        return denomContainer;
    }

    _CreateButton()
    {
        var button = document.createElement('button');
        button.textContent = 'Update';
        button.onclick = () => {
            this._UpdateWaffleChart();
        };
        return button;
    }

    _UpdateWaffleChart()
    {
        var numerator = document.getElementById('num').value,
            denominator = document.getElementById('denom').value;

        if (numerator == null || numerator == '' || denominator == null || denominator == '') return;
        if (isNaN(numerator) || isNaN(denominator)) return;

        console.log(this._waffleChart);

        this._waffleChart.UpdateSettings(numerator, denominator, this._waffleChart.GetFontSize(),
            this._waffleChart.GetPresetA(), this._waffleChart.GetPresetB());
        this._waffleChart.GenerateChart(this._waffleChart.GetStartingX(), this._waffleChart.GetStartingY(), this._group);

        this._tr.forceUpdate();
        this._main.batchDraw();
    }
}