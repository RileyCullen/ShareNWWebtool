import React from 'react';
import Lodash from 'lodash';
import { Editor, Menu, LabeledTextField, LabeledColorPicker, FontSelector, 
    LabeledDropdown, LineChartInputFields } from './Components/index';
import '../../../css/React/Editors/ChartEditor.css';
import { SettingsManager } from '../../Helpers/SettingsManager';

class LineEditor extends React.Component 
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
            xAxis: {
                font: this._defaultFont,
                axis: {
                    label: '',
                    color: '#000',
                    axisStrokeWidth: 1,
                    axisTickWidth: 0.5
                }
            },
            yAxis: {
                font: this._defaultFont,
                axis: {
                    label: '',
                    color: '#000',
                    lineStrokeWidth: 1,
                    tickStrokeWidth: 0.5
                }
            },
            dataValue: {
                font: this._defaultFont,
                location: {location: 'Bottom'},
            }
        }
    }

    render()
    {
        let content = {
            chartSettings: [
                <Menu 
                    key='chart-data'
                    name='Chart Data'
                    isOpen={true}
                    content={[
                        <LineChartInputFields 
                            chartData={this.props.chartData}
                            setChartData={(data) => { this.props.setChartData(data); }}
                        />
                    ]}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    key='size-settings'
                    name='Size Settings'
                    isOpen={false}
                    content={this._GetSizeContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    key='color-settings'
                    name='Color Settings'
                    isOpen={false}
                    content={this._GetColorContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    key='spacing-settings'
                    name='Spacing Settings'
                    isOpen={false}
                    content={this._GetSpacingContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />
            ],
            designOptions: [
                <Menu 
                    key='x-axis'
                    name='X-Axis - Settings'
                    isOpen={false}
                    content={this._GetXAxisContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.xAxis === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'xAxis', { xAxis: this._defaultSettings.xAxis })
                        }
                    }} />,
                <Menu 
                    key='x-axis-font'
                    name='X-Axis - Font Settings'
                    isOpen={false}
                    content={this._GetFontContent('xAxis')}
                    checkbox={{
                        displayCheckbox: false,
                    }}
                />,
                <Menu 
                    key='y-axis'
                    name='Y-Axis - Settings'
                    isOpen={false}
                    content={this._GetYAxisContent()} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.yAxis === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'yAxis', { yAxis: this._defaultSettings.yAxis }) 
                        }
                    }} />,
                <Menu 
                    key='y-axis-font'
                    name='Y-Axis - Font Settings'
                    isOpen={false}
                    content={this._GetFontContent('yAxis')}
                    checkbox={{
                        displayCheckbox: false,
                    }}
                />,
                <Menu 
                    key='data-labels'
                    name='Data Labels'
                    isOpen={false}
                    content={this._GetDataLabelContent()} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.dataValue === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'dataValue', { dataValue: this._defaultSettings.dataValue })
                        }
                    }} />,
            ]
        }

        return (
            <div style={{height: '100%'}}>
                <Editor content={content} />
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

    _GetSizeContent()
    {
        let sizeSettings = this.props.cSettings.size;
        return [
            <div className='center'>
                <LabeledTextField 
                    label='Chart Width:'
                    index='c-width'
                    initialValue={sizeSettings.chartWidth}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('size', 'chartWidth', d); }}
                />
                <LabeledTextField 
                    label='Chart Height:'
                    index='c-height'
                    initialValue={sizeSettings.chartHeight}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('size', 'chartHeight', d); }}
                />
                <LabeledTextField 
                    label='Line Width:'
                    index='l-width'
                    initialValue={sizeSettings.lineWidth}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('size', 'lineWidth', d); }}
                />
                <LabeledTextField 
                    label='Point Radius:'
                    index='p-radius'
                    initialValue={sizeSettings.pointRadius}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('size', 'pointRadius', d); }}
                />
            </div>
        ];
    }

    _GetColorContent()
    {
        let colorSettings = this.props.cSettings.color;
        return [
            <div className='center'>
                <LabeledColorPicker 
                    label='Line Color:'
                    color={colorSettings.lineColor}
                    onChange={(value) => { this._SetChartSettings('color', 'lineColor', value); }}
                />
                <LabeledColorPicker 
                    label='Point Color:'
                    color={colorSettings.pointColor}
                    onChange={(value) => { this._SetChartSettings('color', 'pointColor', value); }}
                />
                <LabeledColorPicker 
                    label='Background Color:'
                    color={colorSettings.backgroundColor}
                    onChange={(value) => { this._SetChartSettings('color', 'backgroundColor', value); }}
                />
            </div>
        ];
    }

    _GetSpacingContent() 
    {
        let spacingSettings = this.props.cSettings.spacing;
        return [
            <div className='center'>
                <LabeledTextField 
                    label='Space between chart and y-axis:'
                    index='x-offset'
                    initialValue={spacingSettings.internalOffsetX}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { this._SetChartSettings('spacing', 'internalOffsetX', d); }}
                />
            </div>
        ];
    }

    _GetXAxisContent()
    {
        let settings = (this.props.dSettings.xAxis === undefined) ? 
            this._defaultSettings.xAxis : this.props.dSettings.xAxis;
        return [
            <div className='center'>
                <div>
                    <h5>Axis Settings</h5>
                    <LabeledTextField 
                        label='Label:'
                        index={'x-label'}
                        initialValue={settings.axis.label}
                        rows={1}
                        cols={20}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('xAxis', 'axis', 'label', d);
                        }}
                    />
                    <LabeledTextField 
                        label='Axis Width:'
                        index={'x-stroke'}
                        initialValue={settings.axis.axisStrokeWidth}
                        rows={1}
                        cols={5}
                        onChange={(d, i) => {
                            if (d === ''); 
                            this._UpdateDecoratorSettings('xAxis', 'axis', 'axisStrokeWidth', parseFloat(d));
                        }} 
                    />
                    <LabeledTextField 
                        label='Tick Width:'
                        index={'x-tick'}
                        initialValue={settings.axis.axisTickWidth}
                        rows={1}
                        cols={5}
                        onChange={(d, i) => { 
                            if (d === '') return;
                            this._UpdateDecoratorSettings('xAxis', 'axis', 'axisTickWidth', parseFloat(d));
                        }} 
                    />
                    <LabeledColorPicker 
                        label='Axis Color: '
                        color={settings.axis.color}
                        onChange={(value) => { 
                            this._UpdateDecoratorSettings('xAxis', 'axis', 'color', value);
                        }} 
                    />
                </div>
            </div>
        ];
    }


    _GetYAxisContent()
    {
        let settings = (this.props.dSettings.yAxis === undefined) ? 
            this._defaultSettings.yAxis : this.props.dSettings.yAxis;
            console.log(settings);
        return [
            <div className='center'>
                <div>
                    <h5>Axis Settings</h5>
                    <LabeledTextField 
                        label='Label:'
                        index={'y-label'}
                        initialValue={settings.axis.label}
                        rows={1}
                        cols={20}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('yAxis', 'axis', 'label', d);
                        }}
                    />
                    <LabeledTextField 
                        label='Axis Width:'
                        index={'y-stroke'}
                        initialValue={settings.axis.lineStrokeWidth}
                        rows={1}
                        cols={5}
                        onChange={(d, i) => { 
                            if (d === '') return;
                            this._UpdateDecoratorSettings('yAxis', 'axis', 'lineStrokeWidth', parseFloat(d));
                        }} 
                    />
                    <LabeledTextField 
                        label='Tick Width:'
                        index={'y-tick'}
                        initialValue={settings.axis.tickStrokeWidth}
                        rows={1}
                        cols={5}
                        onChange={(d, i) => {
                            if (d === '') return;
                            this._UpdateDecoratorSettings('yAxis', 'axis', 'tickStrokeWidth', parseFloat(d));
                        }} 
                    />
                    <LabeledColorPicker 
                        label='Axis Color: '
                        color={settings.axis.color}
                        onChange={(value) => { 
                            this._UpdateDecoratorSettings('yAxis', 'axis', 'color', value);
                        }} 
                    />
                </div>
            </div>
        ];
    }

    _GetFontContent(decoratorType)
    {
        let settings = (this.props.dSettings[decoratorType] === undefined) ?
            this._defaultSettings[decoratorType] : this.props.dSettings[decoratorType];
        return [
            <div className='center'>
                <h5>Font Settings:</h5>
                    <FontSelector 
                        initialFont={settings.font}
                        updateFontFamily={(d) => { 
                            this._UpdateDecoratorSettings(decoratorType, 'font', 'fontFamily', d);
                        }}
                        updateFontSize={(d) => {
                            this._UpdateDecoratorSettings(decoratorType, 'font', 'fontSize', parseFloat(d));
                        }}
                        updateTextColor={(d) => {
                            this._UpdateDecoratorSettings(decoratorType, 'font', 'textColor', d);
                        }}
                    />
            </div>
        ]
    }

    _GetDataLabelContent()
    {
        let settings = (this.props.dSettings.dataValue === undefined) ? 
            this._defaultSettings.dataValue : this.props.dSettings.dataValue;

        return [
            <div className='center'>
                <div>
                    <h5>Location:</h5>
                    <LabeledDropdown 
                        label='Location:'
                        options={['Bottom', 'Top', 'Left', 'Right']}
                        selected={settings.location.location}
                        onChange={(value) => { 
                            this._UpdateDecoratorSettings('dataValue', 'location', 'location', value);
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
}

export { LineEditor };