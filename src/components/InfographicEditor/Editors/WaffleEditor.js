import React from 'react';
import { Menu, Editor, LabeledColorPicker, LabeledTextField, FontSelector, LabeledCheckbox } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';
import { SettingsManager } from '../../Helpers/SettingsManager';

class WaffleEditor extends React.Component
{
    constructor(props)
    {
        super(props);

        this._defaultFont = {
            fontFamily: 'Times New Roman, Times, serif',
            fontSize: 10,
            textColor: '#000'
        };

        this._settingsManager = new SettingsManager({
            cSettings: this.props.cSettings,
            dSettings: this.props.dSettings,
            setChartSettings: (settings) => { this.props.setChartSettings(settings); },
            setDecoratorSettings: (settings) => { this.props.setDecoratorSettings(settings); }
        });

        this._defaultSettings = {
            statistic: {
                font: this._defaultFont,
                display: {
                    middleText: '',
                    lockToChart: true
                }
            }
        }
    }

    render()
    {
        let rows = 1, cols = 10, data = {
            numerator: (this.props.chartData === 0) ? 0 : this.props.chartData.numerator,
            denominator: (this.props.chartData === 0) ? 1 : this.props.chartData.denominator
        };

        // NOTE: that index is set to data.numerator and data.denominator 
        // respectively because without it, undoing/redoing the changing of 
        // chart data will not be shown in the UI.
        //
        // Essentially, if index = 0, 1 respectively (this is how it was origin-
        // ally), the LabeledTextFields would not rerender when undo/redo is
        // called.
        let chartDataContent = [
                <div className='center'>
                    <LabeledTextField 
                        label='Numerator:'
                        index={data.numerator}
                        initialValue={data.numerator}
                        rows={rows}
                        cols={cols}
                        onChange={(d, i) => { this._SetChartData(0, d); }}
                    />
                    <LabeledTextField 
                        label='Denominator:'
                        index={data.denominator}
                        initialValue={data.denominator}
                        rows={rows}
                        cols={cols}
                        onChange={(d, i) => { this._SetChartData(1, d); }}
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
                        isChecked: this.props.cSettings.dynamicResize.isChecked,
                        checkboxHandler: (d) => { this._SetChartSettings('dynamicResize', 'isChecked', d); }
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
                        isChecked: !(this.props.dSettings.statistic === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'statistic', { statistic: this._defaultSettings.statistic });
                        }
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
        if (value === '') return;
        let data = this.props.chartData;
        if (id === 0) {
            data.numerator = value;
        } else {
            data.denominator = value;
        }
        this.props.setChartData(data);
    }

    _SetChartSettings(category, key, value)
    {
        this._settingsManager.SetChartSettings(category, key, value);
    }

    _UpdateDecoratorSettings(decorator, category, key, value)
    {
        this._settingsManager.UpdateDecoratorSettings(decorator, category, key, value);
    }

    _CheckboxHandler(checkboxValue, key, decoratorSettings)
    {
        this._settingsManager.DecoratorToggle(checkboxValue, key, decoratorSettings);
    }

    _GetIconContent()
    {
        let iconSettings = this.props.cSettings.icon;
        return [
            <div className='center'>
                <LabeledColorPicker 
                    label='Primary Color: '
                    color={iconSettings.aColor}
                    onChange={(value) => { this._SetChartSettings('icon', 'aColor', value); }}
                />
                <LabeledColorPicker 
                    label='Secondary Color: '
                    color={iconSettings.bColor}
                    onChange={(value) => { this._SetChartSettings('icon', 'bColor', value); }}
                />
                <LabeledTextField 
                    label='Icon Size: '
                    index='max'
                    initialValue={iconSettings.size}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('icon', 'size', d)}}
                />
                <LabeledTextField 
                    label='Padding: '
                    index='max'
                    initialValue={iconSettings.padding}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('icon', 'padding', d)}}
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
                    onChange={(d, i) => { this._SetChartSettings('dynamicResize', 'width', d); }} 
                />
                <LabeledTextField 
                    label='Height'
                    index='c-height'
                    initialValue={resize.height}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('dynamicResize', 'height', d); }} 
                />
            </div>
        ];
    }

    _GetDataLabelsContent()
    {
        let statistic = (this.props.dSettings.statistic === undefined) ? 
            this._defaultSettings.statistic : this.props.dSettings.statistic;
        return [
            <div className='center'>
                <div>
                    <h5>Display Settings:</h5>
                    <LabeledTextField 
                        label='Text:'
                        index={'text'}
                        initialValue={statistic.display.middleText}
                        rows={1}
                        cols={5}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('statistic', 'display', 'middleText', d);
                        }} 
                    />
                    <LabeledCheckbox 
                        label='Lock to Chart'
                        initialValue={statistic.display.lockToChart}
                        onClick={(d) => { 
                            this._UpdateDecoratorSettings('statistic', 'display', 'lockToChart', d);
                        }}
                    />
                </div>
                <div>
                    <h5>Font Settings:</h5>
                    <FontSelector 
                        initialFont={statistic.font}
                        updateFontFamily={(d) => { 
                            this._UpdateDecoratorSettings('statistic', 'font', 'fontFamily', d);
                        }}
                        updateFontSize={(d) => {
                            this._UpdateDecoratorSettings('statistic', 'font', 'fontSize', parseFloat(d));
                        }}
                        updateTextColor={(d) => {
                            this._UpdateDecoratorSettings('statistic', 'font', 'textColor', d);
                        }}
                    />
                </div>
            </div>
        ];
    }
}

export { WaffleEditor };