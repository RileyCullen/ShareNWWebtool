import React from 'react';
import { Editor, BarChartInputFields, Menu, LabeledTextField, LabeledColorPicker 
    , FontSelector, LabeledDropdown, StackedBarInputFields} from './Components/index';
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
                            this._CheckboxHandler(d, 'remainder', this._GetDefaultDecorator('remainder'));
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
                    name='X-Axis'
                    isOpen={false}
                    content={this._GetXAxisContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    key='y-axis'
                    name='Y-Axis'
                    isOpen={false}
                    content={this._GetYAxisContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    key='data-labels'
                    name='Data Labels'
                    isOpen={false}
                    content={this._GetDataLabelsContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    keys='category-labels'
                    name='Category Labels'
                    isOpen={false}
                    content={this._GetCategoryContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    keys='category-legend'
                    name='Category Legend'
                    isOpen={false}
                    content={this._GetDescriptionContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
            ]
        }
        return (
            <div>
                <Editor content={content} />
            </div>
        );
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

    _GetDefaultDecorator(type)
    {
        switch(type) {
            case 'remainder':
                return {
                    remainder: {
                        color: {
                            barColor: '#000'
                        }
                    }
                };
            case 'x-axis':
                return {
                    font: this._defaultFont,
                    color: {
                        lineColor: '#000'
                    },
                    size: {
                        lineStrokeWidth: 1,
                        tickStrokeWidth: 0.5,
                    }
                };
            case 'y-axis':
                return {
                    font: this._defaultFont,
                    color: {
                        lineColor: '#000'
                    },
                    size: {
                        lineStrokeWidth: 1,
                        tickStrokeWidth: 0.5,
                    }
                };
            case 'data-labels':
                return {
                    font: this._defaultFont,
                    location: { isMiddle: true, },
                    display: { 
                        isPercentage: true,
                        isCategory: false,
                    }
                };
            case 'category-labels':
                return {
                    font: this._defaultFont,
                    location: {
                        isTop: true,
                        isWithinBars: true,
                    }
                };  
            case 'legend-table':
                return {
                    font: this._defaultFont,
                    location: { isTop: true },
                    labelSettings: {
                        maxPerRow: 3,
                    }
                }; 
            default:
                return false;
        }
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
                <LabeledTextField 
                    label='Width:'
                    index={'c-width'}
                    initialValue={cSettings.size.chartWidth}
                    rows={1}
                    cols={cols}
                    onChange={(d, i) => { this._SetChartSettings('size', 'chartWidth', parseFloat(d)); }}
                    />
                <LabeledTextField
                    label='Height:'
                    index={'c-height'}
                    initialValue={cSettings.size.chartHeight}
                    rows={1}
                    cols={cols}
                    onChange={(d, i) => { this._SetChartSettings('size', 'chartHeight', parseFloat(d)); }} 
                />
                <LabeledTextField
                    label='Bar Padding:'
                    index={'c-padding'}
                    initialValue={cSettings.size.padding}
                    rows={1}
                    cols={cols}
                    onChange={(d, i) => { this._SetChartSettings('size', 'padding', parseFloat(d)); }} 
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
        let color = (this.props.dSettings.remainder === undefined) ? '#000' 
            : this.props.dSettings.remainder.color.barColor;
        return [
            <div className='center'>
                <LabeledColorPicker 
                    key='remainder-color-picker'
                    label='Bar Color:'
                    color={color}
                    onChange={(value) => { this._UpdateDecoratorSettings('remainder', 'color', 'barColor', value); }} 
                />
            </div>
        ];
    }

    _GetXAxisContent()
    {
        let xAxisSettings = (this.props.dSettings.xAxis === undefined) ? 
            this._GetDefaultDecorator('x-axis') : this.props.dSettings.xAxis;
        return [
            <div className='center'>
                <div>
                    <h5>Axis Settings:</h5>
                    <LabeledTextField
                        label='Axis Label:'
                        index={'x-axis'}
                        initialValue={''}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                    <LabeledColorPicker 
                        label='Axis Color:'
                        color={xAxisSettings.color.lineColor}
                        onChange={(value) => { }}
                    />
                    <LabeledTextField
                        label='Line width:'
                        index={'x-axis'}
                        initialValue={xAxisSettings.size.lineStrokeWidth}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                    <LabeledTextField
                        label='Tick width:'
                        index={'x-axis'}
                        initialValue={xAxisSettings.size.tickStrokeWidth}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                </div>
                <div>
                    <h5>Font Settings:</h5>
                    <FontSelector 
                        initialFont='Times New Roman'/>
                </div>
            </div>
        ];
    }

    _GetYAxisContent()
    {
        let yAxisSettings = (this.props.dSettings.yAxis === undefined) ? 
            this._GetDefaultDecorator('y-axis') : this.props.dSettings.yAxis;
        return [
            <div className='center'>
                <div>
                    <h5>Axis Settings:</h5>
                    <LabeledTextField
                        label='Axis Label:'
                        index={'y-axis'}
                        initialValue={''}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                    <LabeledColorPicker 
                        label='Axis Color:'
                        color={yAxisSettings.color.lineColor}
                        onChange={(value) => { }}
                    />
                    <LabeledTextField
                        label='Line width:'
                        index={'y-axis'}
                        initialValue={yAxisSettings.size.lineStrokeWidth}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                    <LabeledTextField
                        label='Tick width:'
                        index={'y-axis'}
                        initialValue={yAxisSettings.size.tickStrokeWidth}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                </div>
                <div>
                    <h5>Font Settings:</h5>
                    <FontSelector initialFont='Roboto'/>
                </div>
            </div>
        ];    
    }

    _GetDataLabelsContent()
    {
        let settings = (this.props.dSettings.dataValue === undefined) ? 
            this._GetDefaultDecorator('data-labels') : this.props.dSettings.dataValue;
        return [
            <div className='center'>
                <div>
                    <h5>Display Settings</h5>
                    <LabeledCheckbox 
                        label='Display Category:'
                        initialValue={settings.display.isPercentage}
                        onClick={() => { }}
                    />
                    <LabeledCheckbox 
                        label='Display Percentage:'
                        initialValue={settings.display.isCategory}
                        onClick={() => { }}
                    />
                    <LabeledDropdown 
                        label='Location:'
                        options={['Middle', 'Top']}
                        selected={(settings.location.isMiddle ? 'Middle' : 'Top')}
                        onChange={(value) => { }}
                    />
                </div>
                <div>
                    <h5>Font Settings:</h5>
                    <FontSelector initialFont='Times New Roman'/>
                </div>
            </div>
        ];
    }

    _GetCategoryContent()
    {
        let settings = (this.props.dSettings.categoryLabel === undefined) ? 
            this._GetDefaultDecorator('category-labels') : this.props.dSettings.categoryLabel;
        return [
            <div className='center'>
                <div>
                    <h5>Location Settings:</h5>
                    <LabeledDropdown 
                        label='Location:'
                        options={['Top', 'Bottom']}
                        selected={(settings.location.isTop === true) ? 'Top' : 'Bottom'}
                        onChange={(value) => { }}
                    />
                    <LabeledCheckbox 
                        label='Display inside bars:'
                        initialVale={settings.location.isWithinBars}
                        onClick={() => { }}
                    /> 
                </div>
                <div>
                    <h5>Font Settings:</h5>
                    <FontSelector initialFont='Times New Roman' />
                </div>
            </div>
        ];
    }

    _GetDescriptionContent()
    {
        let settings = (this.props.dSettings.chartDescriptor === undefined) ? 
            this._GetDefaultDecorator('legend-table') : this.props.dSettings.chartDescriptor;

        return [
            <div className='center'>
                <div>
                    <h5>Display Settings:</h5>
                    <LabeledDropdown 
                        label='Location:'
                        options={['Top', 'Bottom']}
                        selected={(settings.location.isTop === true) ? 'Top' : 'Bottom'}
                        onChange={(value) => { }}
                    /> 
                    <LabeledTextField 
                        label='Max per row:'
                        index={'maxPerRow'}
                        initialValue={settings.labelSettings.maxPerRow}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
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

export { BarEditor };