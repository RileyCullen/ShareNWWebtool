import React from 'react';
import { TextField, Menu, Editor } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

class WaffleEditor extends React.Component
{
    constructor(props)
    {
        super(props);
        this._data = {
            numerator: (props.chartData === 0) ? 0 : props.chartData.numerator,
            denominator: (props.chartData === 0) ? 0 : props.chartData.denominator,
        };
    }

    render()
    {
        let rows = 1, cols = 5;

        let chartDataContent = [
            {
                contentElement: 
                    <TextField 
                        id={0}
                        labelName='Numerator:'
                        initialValue={this._data.numerator}
                        rows={rows}
                        cols={cols}
                        labelPaddingRight={25}
                        onchange={(d, i) => { this._SetChartData(i, d); }}
                    />
            },
            {
                contentElement: 
                    <TextField 
                        id={1}
                        labelName='Denominator:'
                        initialValue={this._data.denominator}
                        rows={rows}
                        cols={cols}
                        labelPaddingRight={10}
                        onchange={(d, i) => { this._SetChartData(i, d); }}
                    />
            }
        ]

        let content = {
            chartSettings: [
                <Menu 
                    name='Chart Data'
                    isOpen={true}
                    content={chartDataContent}
                    checkbox={{
                        displayCheckbox: false
                    }}
                />,
                <Menu 
                    name='Icon Settings'
                    isOpen={false}
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    name='Automatic Resizing'
                    isOpen={false}
                    content={[]} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}/>
            ],
            designOptions: [
                <Menu 
                    name='Data Label'
                    isOpen={false}
                    content={[]} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}/>
            ]
        }

        return (
            <div>
                <Editor content={content}/>
            </div>
        );
    }

    /**
     * @summary     Updates _data.
     * @description Updates _data and passes a copy of _data to InfographicEditor.
     * 
     * @param {int} id  The id of the textfield. 
     * @param {*} value The value of the textfield.
     */
    _SetChartData(id, value)
    {
        if (id === 0) {
            this._data.numerator = value;
        } else {
            this._data.denominator = value;
        }

        // copy data
        var tmp = {
            numerator: this._data.numerator,
            denominator: this._data.denominator,
        };
        this.props.setChartData(tmp);
    }
}

export { WaffleEditor };