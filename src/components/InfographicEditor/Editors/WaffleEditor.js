import React from 'react';
import { Menu, Editor, LabeledColorPicker, LabeledTextField, FontSelector, LabeledCheckbox } from './Components/index';

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

        this._defaultFont = {
            fontFamily: 'Times New Roman, Times, serif',
            fontSize: 10,
            textColor: '#000'
        };
    }

    render()
    {
        let rows = 1, cols = 10;

        let chartDataContent = [
                <div className='center'>
                    <LabeledTextField 
                        label='Numerator:'
                        index={0}
                        initialValue={this._data.numerator}
                        rows={rows}
                        cols={cols}
                        onChange={(d, i) => { this._SetChartData(i, d); }}
                    />
                    <LabeledTextField 
                        label='Denominator:'
                        index={1}
                        initialValue={this._data.denominator}
                        rows={rows}
                        cols={cols}
                        onChange={(d, i) => { this._SetChartData(i, d); }}
                    />
                </div>
        ]

        let content = {
            chartSettings: [
                <Menu 
                    key='chart-data'
                    name='Chart Data'
                    isOpen={true}
                    content={chartDataContent}
                    checkbox={{
                        displayCheckbox: false
                    }}
                />,
                <Menu 
                    key='icon-settings'
                    name='Icon Settings'
                    isOpen={false}
                    content={this._GetIconContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    key='automatic-resizing'
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
                    key='data-labels'
                    name='Data Label'
                    isOpen={false}
                    content={this._GetDataLabelsContent()} 
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

    _SetChartSettings(category, key, value)
    {
        let settings = this.props.cSettings;
        settings[category][key] = value;
        this.props.setChartSettings(settings);
    }

    _GetIconContent()
    {
        let iconSettings = this.props.cSettings.icon;
        return [
            <div className='center'>
                <LabeledColorPicker 
                    label='Icon A Color: '
                    color={iconSettings.aColor}
                    onChange={(value) => { this._SetChartSettings('icon', 'aColor', value); }}
                />
                <LabeledColorPicker 
                    label='Icon B Color: '
                    color={iconSettings.bColor}
                    onChange={(value) => { this._SetChartSettings('icon', 'aColor', value); }}
                />
                <LabeledTextField 
                    label='Max icons per row: '
                    index='max'
                    initialValue={iconSettings.maxIconsPerRow}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('icon', 'maxIconsPerRow', d)}}
                />
            </div>
        ]
    }

    _GetResizeContent()
    {
        let resize = this.props.cSettings.dynamicResize;
        return [
            <div className='center'>
                <LabeledTextField 
                    label='Width'
                    index='c-width'
                    initialValue={resize.width}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { }} 
                />
                <LabeledTextField 
                    label='Height'
                    index='c-height'
                    initialValue={resize.height}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { }} 
                />
            </div>
        ];
    }

    _GetDataLabelsContent()
    {
        let statistic = (this.props.dSettings.statistic === undefined) ?  {
            font: this._defaultFont,
            middleText: '',
            lockToChart: true
        } : this.props.dSettings.statistic;
        return [
            <div className='center'>
                <div>
                    <h5>Display Settings:</h5>
                    <LabeledTextField 
                        label='Text:'
                        index={'text'}
                        initialValue={statistic.middleText}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                    <LabeledCheckbox 
                        label='Lock to Chart'
                        initialValue={statistic.lockToChart}
                        onClick={() => { }}
                    />
                </div>
                <div>
                    <h5>Font Settings:</h5>
                    <FontSelector initialFont='Times New Roman'/>
                </div>
            </div>
        ];
    }
}

export { WaffleEditor };