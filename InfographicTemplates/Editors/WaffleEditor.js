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

        this._waffleChart.UpdateData(numerator, denominator);
        this._waffleChart.CreateChart();

        this._tr.forceUpdate();
        this._main.batchDraw();
    }
}