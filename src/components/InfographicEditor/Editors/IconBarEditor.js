import React from 'react';
import Lodash from 'lodash';
import { Editor, Menu, BarChartInputFields, LabeledColorPicker, LabeledTextField,
    LabeledCheckbox, FontSelector, LabeledDropdown } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';
import { SettingsManager } from '../../Helpers/SettingsManager';

class IconBarEditor extends React.Component 
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
            dataValue: {
                font: this._defaultFont,
                display: {
                    percentage: false,
                    category: false,
                    isMiddle: true
                }, 
                backgroundColor: {
                    stroke: '#000',
                    fill: '#fff',
                }
            },
            category: {
                font: this._defaultFont,
                location: {
                    isWithinBArs: this._isWithinBars,
                    isTop: this._isTop,
                }
            }
        }
    }

    render()
    {
        let chartDataContent = [
            <BarChartInputFields 
                chartData={this.props.chartData} 
                setChartData={(d, i) => { this.props.setChartData(d, i); }}/>,
        ];
        let content = {
            chartSettings: [
                <Menu
                    key='chart-data' 
                    name='Chart Data'
                    isOpen={true}
                    content={chartDataContent}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    key='icon-settings'
                    name='Icon Settings'
                    isOpen={false}
                    content={this._GetIconContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />
            ],
            designOptions: [
                <Menu 
                    key='data-labels'
                    name='Data Labels'
                    isOpen={false}
                    content={this._GetDataLabelsContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.dataValue === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'dataValue', {dataValue: this._defaultSettings.dataValue})
                        }
                    }} />,
                <Menu 
                    key='category-labels'
                    name='Category Labels'
                    isOpen={false}
                    content={this._GetCategoryLabelsContent()} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.category === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'category', {category: this._defaultSettings.category})
                        }
                    }} />
            ]
        }

        return (
            <div>
                <Editor content={content}/>
            </div>
        )
    }

    componentDidUpdate(prevProps)
    {
        if (!Lodash.isEqual(prevProps.dSettings, this.props.dSettings)) {
            this._settingsManager.SetDSettings(this.props.dSettings);
        }

        if (!Lodash.isEqual(prevProps.cSettings, this.props.cSettings)) {
            this._settingsManager.SetCSettings(this.props.cSettings);
        }
    }

    _SetChartSettings(category, key, value)
    {
        this._settingsManager.SetChartSettings(category, key, value);
    }

    _CheckboxHandler(checkboxValue, key, decoratorSettings)
    {
        this._settingsManager.DecoratorToggle(checkboxValue, key, decoratorSettings);
    }

    _UpdateDecoratorSettings(decorator, category, key, value)
    {
        this._settingsManager.UpdateDecoratorSettings(decorator, category, key, value);
    }

    _GetIconContent()
    {
        let iconSettings = this.props.cSettings.iconSettings;
        return [
            <div className='center'>
                <LabeledColorPicker
                    label='Icon Color'
                    color={iconSettings.iconColor}
                    onChange={(value) => { this._SetChartSettings('iconSettings', 'iconColor', value); }}
                />
                <LabeledTextField 
                    label='Icon Size:'
                    index='icon-size'
                    initialValue={iconSettings.iconSize}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('iconSettings', 'iconSize', d); }}
                />
                <LabeledTextField 
                    label='Padding'
                    index='padding'
                    initialValue={iconSettings.padding}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('iconSettings', 'padding', d); }}
                />
            </div>
        ]
    }

    _GetDataLabelsContent()
    {
        let settings = (this.props.dSettings.dataValue === undefined) ? 
            this._defaultSettings.dataValue : this.props.dSettings.dataValue;
        return [
            <div className='center'>
                <div>
                    <h5>Display Settings:</h5>
                    <LabeledCheckbox 
                        label='Display Category:'
                        initialValue={settings.display.category}
                        onClick={(d) => { 
                            this._UpdateDecoratorSettings('dataValue', 'display', 'category', d);
                        }}
                    />
                    <LabeledCheckbox 
                        label='Display Percentage:'
                        initialValue={settings.display.percentage}
                        onClick={(d) => { 
                            this._UpdateDecoratorSettings('dataValue', 'display', 'percentage', d);
                        }}
                    />
                    <LabeledDropdown 
                        label='Location:'
                        options={['Middle', 'Top']}
                        selected={(settings.display.isMiddle ? 'Middle' : 'Top')}
                        onChange={(value) => {
                            let location = false;
                            if (value === 'Middle') location = true;
                            this._UpdateDecoratorSettings('dataValue', 'display', 'isMiddle', location);
                         }}
                    />
                </div>
                <div>
                    <h5>Background Box:</h5>
                    <LabeledColorPicker 
                        label='Border Color:'
                        color={settings.backgroundColor.stroke}
                        onChange={(value) => { 
                            this._UpdateDecoratorSettings('dataValue', 'backgroundColor', 'stroke', value)
                        }}
                    />
                    <LabeledColorPicker 
                        label='Fill Color:'
                        color={settings.backgroundColor.fill}
                        onChange={(value) => { 
                            this._UpdateDecoratorSettings('dataValue', 'backgroundColor', 'fill', value);
                        }}
                    />
                </div>
                <div>
                    <h5>Font Settings:</h5>
                    <FontSelector 
                        initialFont={settings.font}
                        updateFontFamily={(d) => { 
                            this._UpdateDecoratorSettings('dataValue', 'font', 'fontFamily', d);
                        }}
                        updateFontSize={(d) => {
                            this._UpdateDecoratorSettings('dataValue', 'font', 'fontSize', parseFloat(d));
                        }}
                        updateTextColor={(d) => {
                            this._UpdateDecoratorSettings('dataValue', 'font', 'textColor', d);
                        }}
                    />
                </div>
            </div>
        ];
    }

    _GetCategoryLabelsContent()
    {
        let settings = (this.props.dSettings.category === undefined) ? 
            this._defaultSettings.category : this.props.dSettings.category;
        return [
            <div className='center'>
                <div>
                    <h5>Location Settings:</h5>
                    <LabeledDropdown 
                        label='Location:'
                        options={['Top', 'Bottom']}
                        selected={(settings.location.isTop === true) ? 'Top' : 'Bottom'}
                        onChange={(value) => { 
                            let location = false;
                            if (value === 'Top') location = true;
                            this._UpdateDecoratorSettings('category', 'location', 'isTop', location);
                        }}
                    />
                    <LabeledCheckbox 
                        label='Display inside bars:'
                        initialVale={settings.location.isWithinBars}
                        onClick={(d) => { 
                            this._UpdateDecoratorSettings('category', 'location', 'isWithinBars', d);
                        }}
                    /> 
                </div>
                <div>
                    <h5>Font Settings:</h5>
                    <FontSelector 
                        key='icon-category-labels'
                        initialFont={settings.font}
                        updateFontFamily={(d) => { 
                            this._UpdateDecoratorSettings('category', 'font', 'fontFamily', d);
                        }}
                        updateFontSize={(d) => {
                            this._UpdateDecoratorSettings('category', 'font', 'fontSize', parseFloat(d));
                        }}
                        updateTextColor={(d) => {
                            this._UpdateDecoratorSettings('category', 'font', 'textColor', d);
                        }}
                    />
                </div>
            </div>
        ];
    }
}

export { IconBarEditor };