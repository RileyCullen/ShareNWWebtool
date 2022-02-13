import React from 'react';
import Lodash from 'lodash';
import { Editor, BarChartInputFields, Menu, LabeledTextField, LabeledColorPicker 
    , FontSelector, LabeledDropdown, StackedBarInputFields, LabeledNumericTextField} from './Components/index';
import { LabeledCheckbox } from './Components/LabeledCheckbox';
import { SettingsManager } from '../../Helpers/SettingsManager';

class BarEditor extends React.Component
{
    constructor(props) 
    {
        super(props);
        this.state = {
            currentTab: 0 // 0 - Settings and 1 - Design Options
        };

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
            remainder: {
                color: {
                    barColor: '#000'
                }
            },
            xAxis: {
                font: this._defaultFont,
                axis: {
                    label: 'none'
                },
                color: {
                    lineColor: '#000'
                },
                size: {
                    lineStrokeWidth: 1,
                    tickStrokeWidth: 0.5,
                }
            },
            yAxis: {
                font: this._defaultFont,
                axis: {
                    label: 'none'
                },
                color: {
                    lineColor: '#000'
                },
                size: {
                    lineStrokeWidth: 1,
                    tickStrokeWidth: 0.5,
                }
            }, 
            dataValue: {
                font: this._defaultFont,
                location: { isMiddle: true, },
                display: { 
                    isPercentage: true,
                    isCategory: false,
                }
            },
            categoryLabel: {
                font: this._defaultFont,
                location: {
                    isTop: true,
                    isWithinBars: true,
                }
            },
            chartDescriptor: {
                font: this._defaultFont,
                location: { isTop: true },
                labelSettings: {
                    maxPerRow: 3,
                }
            }
        };
    }

    render()
    {        
        let content = {
            chartSettings: [
                <Menu 
                    key='chart-data'
                    name='Chart Data'
                    isOpen={true}
                    content={this._GetChartDataContent()}
                    checkbox={{ displayCheckbox: false }}/>,
                <Menu 
                    key='size'
                    name='Size'
                    isOpen={false}
                    content={this._GetSizeContent()}
                    checkbox={{ displayCheckbox: false }}/>,
                <Menu 
                    key='background-color'
                    name='Background Color'
                    isOpen={false}
                    content={this._GetRemainderContent()}
                    checkbox={{ 
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.remainder === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'remainder', {remainder: this._defaultSettings.remainder});
                        }
                    }}/>,
                <Menu 
                    key='orietation'
                    name='Orientation'
                    isOpen={false}
                    content={this._GetOrientationContent()} 
                    checkbox={{ displayCheckbox: false }}/>,
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
                            this._CheckboxHandler(d, 'xAxis', {xAxis: this._defaultSettings.xAxis});
                        }
                    }}
                />,
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
                            this._CheckboxHandler(d, 'yAxis', {yAxis: this._defaultSettings.yAxis});
                        }
                    }}
                />,
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
                    content={this._GetDataLabelsContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.dataValue === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'dataValue', {dataValue: this._defaultSettings.dataValue});
                        }
                    }}
                />,
                <Menu 
                    keys='category-labels'
                    name='Category Labels'
                    isOpen={false}
                    content={this._GetCategoryContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.categoryLabel === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'categoryLabel', {categoryLabel: this._defaultSettings.categoryLabel})
                        }
                    }}
                />,
                <Menu 
                    keys='category-legend'
                    name='Category Legend'
                    isOpen={false}
                    content={this._GetDescriptionContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.chartDescriptor === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'chartDescriptor', {chartDescriptor: this._defaultSettings.chartDescriptor});
                        }
                    }}
                />,
            ]
        }
        return (
            <div style={{height: '100%'}}>
                <Editor content={content} />
            </div>
        );
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

    /**
     * @summary     Update existing decorator entry 
     */
    _UpdateDecoratorSettings(decorator, category, key, value)
    {
        this._settingsManager.UpdateDecoratorSettings(decorator, category, key, value);
    }

    _CheckboxHandler(checkboxValue, key, decoratorSettings)
    {
        this._settingsManager.DecoratorToggle(checkboxValue, key, decoratorSettings);
    }

    _GetChartDataContent()
    {
        if (this.props.type === 'bar-editor') {
            return [
                <BarChartInputFields 
                    chartData={this.props.chartData}
                    setChartData={(d) => { this.props.setChartData(d); }} />
            ];
        } 
        return [
            <StackedBarInputFields 
                chartData={this.props.chartData}
                setChartData={(d) => { this.props.setChartData(d); }}/>
        ];
    }

    _GetSizeContent()
    {
        let cSettings = this.props.cSettings, cols = 15;
        return [
            <div className='center'>
                <LabeledNumericTextField 
                    label='Width:'
                    index={'c-width'}
                    initialValue={cSettings.size.chartWidth}
                    rows={1}
                    cols={cols}
                    onlyPositive={true}
                    onChange={(d, i) => { 
                        this._SetChartSettings('size', 'chartWidth', parseFloat(d)); 
                    }}
                    />
                <LabeledNumericTextField
                    label='Height:'
                    index={'c-height'}
                    initialValue={cSettings.size.chartHeight}
                    rows={1}
                    cols={cols}
                    onlyPositive={true}
                    onChange={(d, i) => { 
                        this._SetChartSettings('size', 'chartHeight', parseFloat(d)); 
                    }} 
                />
                <LabeledNumericTextField
                    label='Bar Padding:'
                    index={'c-padding'}
                    initialValue={cSettings.size.padding}
                    rows={1}
                    cols={cols}
                    onlyPositive={true}
                    onChange={(d, i) => {
                        this._SetChartSettings('size', 'padding', parseFloat(d)); 
                    }} 
                />
            </div>
        ];
    }

    _GetOrientationContent()
    {
        let orientation = this.props.cSettings.orientation;
        return [
            <div className='center'>
                <LabeledCheckbox 
                    label='Landscape:'
                    initialValue={orientation.landscape}
                    onClick={(value) => { this._SetChartSettings('orientation', 'landscape', value)}}/>
            </div> 
        ];
    }

    _GetRemainderContent()
    {
        let isSelected = this.props.dSettings.remainder === undefined;
        let color = (this.props.dSettings.remainder === undefined) ? '#000' 
            : this.props.dSettings.remainder.color.barColor;
        return [
            <div className='center'>
                <LabeledColorPicker 
                    key='remainder-color-picker'
                    label='Bar Color:'
                    color={color}
                    onChange={(value) => { this._UpdateDecoratorSettings('remainder', 'color', 'barColor', value); }} 
                    isDisabled={isSelected}
                />
            </div>
        ];
    }

    _GetXAxisContent()
    {
        let isDisabled = this.props.dSettings.xAxis === undefined;
        let xAxisSettings = (isDisabled) ? this._defaultSettings.xAxis : this.props.dSettings.xAxis;
        return [
            <div className='center'>
                <div>
                    <h5>Axis Settings:</h5>
                    <LabeledTextField
                        label='Axis Label:'
                        index={'x-axis'}
                        initialValue={xAxisSettings.axis.label}
                        rows={1}
                        cols={5}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('xAxis', 'axis', 'label', d);
                        }} 
                        isDisabled={isDisabled}
                    />
                    <LabeledColorPicker 
                        label='Axis Color:'
                        color={xAxisSettings.color.lineColor}
                        onChange={(value) => { 
                            this._UpdateDecoratorSettings('xAxis', 'color', 'lineColor', value);
                        }}
                        isDisabled={isDisabled}
                    />
                    <LabeledNumericTextField
                        label='Line width:'
                        index={'x-axis'}
                        initialValue={xAxisSettings.size.lineStrokeWidth}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('xAxis', 'size', 'lineStrokeWidth', d);
                        }} 
                        isDisabled={isDisabled}
                    />
                    <LabeledNumericTextField
                        label='Tick width:'
                        index={'x-axis'}
                        initialValue={xAxisSettings.size.tickStrokeWidth}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('xAxis', 'size', 'tickStrokeWidth', d);
                        }} 
                        isDisabled={isDisabled}
                    />
                </div>
            </div>
        ];
    }

    _GetYAxisContent()
    {
        let isDisabled = (this.props.dSettings.yAxis === undefined);
        let yAxisSettings = (isDisabled) ? this._defaultSettings.yAxis : this.props.dSettings.yAxis;
        return [
            <div className='center'>
                <div>
                    <h5>Axis Settings:</h5>
                    <LabeledTextField
                        label='Axis Label:'
                        index={'y-axis'}
                        initialValue={yAxisSettings.axis.label}
                        rows={1}
                        cols={5}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('yAxis', 'axis', 'label', d);
                        }} 
                        isDisabled={isDisabled}
                    />
                    <LabeledColorPicker 
                        label='Axis Color:'
                        color={yAxisSettings.color.lineColor}
                        onChange={(value) => { 
                            this._UpdateDecoratorSettings('yAxis', 'color', 'lineColor', value);
                        }}
                        isDisabled={isDisabled}
                    />
                    <LabeledNumericTextField
                        label='Line width:'
                        index={'y-axis'}
                        initialValue={yAxisSettings.size.lineStrokeWidth}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('yAxis', 'size', 'lineStrokeWidth', parseFloat(d));
                        }} 
                        isDisabled={isDisabled}
                    />
                    <LabeledNumericTextField
                        label='Tick width:'
                        index={'y-axis'}
                        initialValue={yAxisSettings.size.tickStrokeWidth}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('yAxis', 'size', 'tickStrokeWidth', parseFloat(d));
                        }} 
                        isDisabled={isDisabled}
                    />
                </div>
            </div>
        ];    
    }

    _GetFontContent(decoratorType)
    {
        let isDisabled = (this.props.dSettings[decoratorType] === undefined);
        let settings = (isDisabled) ? this._defaultSettings[decoratorType] : this.props.dSettings[decoratorType];
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
                        isDisabled={isDisabled}
                    />
            </div>
        ]
    }

    _GetDataLabelsContent()
    {
        let isDisabled = this.props.dSettings.dataValue === undefined;
        let settings = isDisabled ? this._defaultSettings.dataValue : this.props.dSettings.dataValue;
        return [
            <div className='center'>
                <div>
                    <h5>Display Settings</h5>
                    <LabeledCheckbox 
                        label='Display Category:'
                        initialValue={settings.display.isCategory}
                        onClick={(d) => { 
                            this._UpdateDecoratorSettings('dataValue', 'display', 'isCategory', d);
                        }}
                        isDisabled={isDisabled}
                    />
                    <LabeledCheckbox 
                        label='Display Percentage:'
                        initialValue={settings.display.isPercentage}
                        onClick={(d) => { 
                            this._UpdateDecoratorSettings('dataValue', 'display', 'isPercentage', d);
                        }}
                        isDisabled={isDisabled}
                    />
                    <LabeledDropdown 
                        label='Location:'
                        options={['Middle', 'Top']}
                        selected={(settings.location.isMiddle ? 'Middle' : 'Top')}
                        onChange={(value) => {
                            let location = false;
                            if (value === 'Middle') location = true;
                            this._UpdateDecoratorSettings('dataValue', 'location', 'isMiddle', location);
                        }}
                        isDisabled={isDisabled}
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
                        isDisabled={isDisabled}
                    />
                </div>
            </div>
        ];
    }

    _GetCategoryContent()
    {
        let isDisabled = this.props.dSettings.categoryLabel === undefined;
        let settings = (isDisabled) ? this._defaultSettings.categoryLabel : this.props.dSettings.categoryLabel;
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
                            this._UpdateDecoratorSettings('categoryLabel', 'location', 'isTop', location);
                        }}
                        isDisabled={isDisabled}
                    />
                    <LabeledCheckbox 
                        label='Display inside bars:'
                        initialValue={settings.location.isWithinBars}
                        onClick={(d) => { 
                            this._UpdateDecoratorSettings('categoryLabel', 'location', 'isWithinBars', d);
                        }}
                        isDisabled={isDisabled}
                    /> 
                </div>
                <div>
                    <h5>Font Settings:</h5>
                    <FontSelector 
                        initialFont={settings.font}
                        updateFontFamily={(d) => { 
                            this._UpdateDecoratorSettings('categoryLabel', 'font', 'fontFamily', d);
                        }}
                        updateFontSize={(d) => {
                            this._UpdateDecoratorSettings('categoryLabel', 'font', 'fontSize', parseFloat(d));
                        }}
                        updateTextColor={(d) => {
                            this._UpdateDecoratorSettings('categoryLabel', 'font', 'textColor', d);
                        }}
                        isDisabled={isDisabled}
                    />
                </div>
            </div>
        ];
    }

    _GetDescriptionContent()
    {
        let isDisabled = this.props.dSettings.chartDescriptor === undefined;
        let settings = (isDisabled) ? this._defaultSettings.chartDescriptor : this.props.dSettings.chartDescriptor;
        return [
            <div className='center'>
                <div>
                    <h5>Display Settings:</h5>
                    <LabeledDropdown 
                        label='Location:'
                        options={['Top', 'Bottom']}
                        selected={(settings.location.isTop === true) ? 'Top' : 'Bottom'}
                        onChange={(value) => {
                            let location = false;
                            if (value === 'Top') location = true;
                            this._UpdateDecoratorSettings('chartDescriptor', 'location', 'isTop', location)
                        }}
                        isDisabled={isDisabled}
                    /> 
                    <LabeledNumericTextField 
                        label='Max per row:'
                        index={'maxPerRow'}
                        initialValue={settings.labelSettings.maxPerRow}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        onChange={(d, i) => {
                            this._UpdateDecoratorSettings('chartDescriptor', 'labelSettings', 'maxPerRow', parseFloat(d));
                        }} 
                        isDisabled={isDisabled}
                    />
                </div>
                <div>
                    <h5>Font Settings:</h5>
                    <FontSelector 
                        initialFont={settings.font}
                        updateFontFamily={(d) => { 
                            this._UpdateDecoratorSettings('chartDescriptor', 'font', 'fontFamily', d);
                        }}
                        updateFontSize={(d) => {
                            this._UpdateDecoratorSettings('chartDescriptor', 'font', 'fontSize', parseFloat(d));
                        }}
                        updateTextColor={(d) => {
                            this._UpdateDecoratorSettings('chartDescriptor', 'font', 'textColor', d);
                        }}
                        isDisabled={isDisabled}
                    />
                </div>
            </div>
        ];
    }
}

export { BarEditor };