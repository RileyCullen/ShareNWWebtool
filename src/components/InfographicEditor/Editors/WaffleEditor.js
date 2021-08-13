import React from 'react';
import { TextField, Menu, Editor, LabeledColorPicker, LabeledTextField } from './Components/index';

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
                <div>
                    <TextField 
                        id={0}
                        labelName='Numerator:'
                        initialValue={this._data.numerator}
                        rows={rows}
                        cols={cols}
                        labelPaddingRight={25}
                        onchange={(d, i) => { this._SetChartData(i, d); }}
                    />
                    <TextField 
                        id={1}
                        labelName='Denominator:'
                        initialValue={this._data.denominator}
                        rows={rows}
                        cols={cols}
                        labelPaddingRight={10}
                        onchange={(d, i) => { this._SetChartData(i, d); }}
                    />
                </div>
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
                    content={this._GetIconContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    name='Automatic Resizing'
                    isOpen={false}
                    content={this._GetResizeContent()} 
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

    _GetIconContent()
    {
        let iconSettings = this.props.cSettings.icon;
        return [
            <div>
                <LabeledColorPicker 
                    label='Icon A Color: '
                    color={iconSettings.aColor}
                    onChange={(value) => { }}
                />
                <LabeledColorPicker 
                    label='Icon B Color: '
                    color={iconSettings.bColor}
                    onChange={(value) => { }}
                />
                <LabeledTextField 
                    label='Max icons per row: '
                    index='max'
                    initialValue={iconSettings.maxIconsPerRow}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
            </div>
        ]
    }

    _GetResizeContent()
    {
        let resize = this.props.cSettings.dynamicResize;
        return [
            <div>
                <LabeledTextField 
                    label='Width'
                    index='c-width'
                    initialValue={resize.width}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }} 
                />
                <LabeledTextField 
                    label='Height'
                    index='c-height'
                    initialValue={resize.height}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }} 
                />
            </div>
        ];
    }
}

export { WaffleEditor };