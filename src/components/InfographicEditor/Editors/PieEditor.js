import React from 'react';
import Lodash from 'lodash';
import { Editor, FontSelector, LabeledColorPicker, LabeledTextField, Menu, 
    PieChartInputFields, LabeledNumericTextField } from './Components/index';
import '../../../css/React/Editors/ChartEditor.css';
import { SettingsManager } from '../../Helpers/SettingsManager';

class PieEditor extends React.Component 
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
            chartOutline: {
                size: {
                    radius: 100,
                    outlineWidth: 2,
                },
                color: {
                    outlineColor: '#000'
                }
            },
            statistic: {
                font: this._defaultFont,
                position: {
                    x: 0,
                    y: 0
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
                    content={this._GetChartData()}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    key='color-settings'
                    name='Color Settings'
                    isOpen={false}
                    content={this._GetColorContents()}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    key='size-settings'
                    name='Size Settings'
                    isOpen={false}
                    content={this._GetSizeContents()}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
            ],
            designOptions: [
                <Menu 
                    key='data-labels'
                    name='Data Labels'
                    isOpen={false}
                    content={this._GetDataLabelContents()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.statistic === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'statistic', { statistic: this._defaultSettings.statistic});
                        }
                    }} />,
                <Menu 
                    key='chart-outline'
                    name='Chart Outline'
                    isOpen={false}
                    content={this._GetChartOutlineContents()} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: !(this.props.dSettings.chartOutline === undefined),
                        checkboxHandler: (d) => { 
                            this._CheckboxHandler(d, 'chartOutline', { chartOutline: this._defaultSettings.chartOutline});
                        }
                    }} />
            ]
        }

        return (
            <div style={{height: '100%'}}>
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

    _SetCurrentTab(state)
    {
        this.setState({
            currentTab: state,
        });
    }

    _UpdateDecoratorSettings(decorator, category, key, value)
    {
        this._settingsManager.UpdateDecoratorSettings(decorator, category, key, value);
    }

    _CheckboxHandler(checkboxValue, key, decoratorSettings)
    {
        this._settingsManager.DecoratorToggle(checkboxValue, key, decoratorSettings);
    }

    _GetChartData()
    {
        return [
            <PieChartInputFields 
                value={this.props.chartData[0].value}
                rows={1}
                cols={4}
                setChartData={(value) => { this._SetChartData(value); }}
            />
        ];
    }

    _SetChartData(value)
    {
        let data = [
            {
                category: this.props.chartData[0].category,
                value: parseFloat(value),
                color: this.props.chartData[0].color,
            },
            {
                category: this.props.chartData[1].category,
                value: 100 - value,
                color: this.props.chartData[1].color,
            }
        ];
        this.props.setChartData(data);
    }

    _GetColorContents()
    {
        let color = this.props.chartData;
        return [
            <div className='center'>
                <LabeledColorPicker 
                    label='Primary Color:'
                    color={color[0].color}
                    onChange={(value) => { this._SetColor(value, 0); }}
                />
                <LabeledColorPicker 
                    label='Background Color:'
                    color={color[1].color}
                    onChange={(value) => { this._SetColor(value, 1); }}
                />
            </div>
        ];
    }

    _SetColor(color, i)
    {
        let data = [
            {
                category: this.props.chartData[0].category,
                value: this.props.chartData[0].value,
                color: this.props.chartData[0].color,
            },
            {
                category: this.props.chartData[1].category,
                value: this.props.chartData[1].value,
                color: this.props.chartData[1].color,
            }
        ];
        data[i].color = color;
        this.props.setChartData(data);
    }

    _SetRadius(radius)
    {
        let settings = this.props.cSettings;
        settings.size.chartRadius = radius;
        this.props.setChartSettings(settings);
    }

    _SetDonutRadius(thickness)
    {
        let settings = this.props.cSettings;
        settings.size.innerRadius = settings.size.chartRadius - thickness;
        this.props.setChartSettings(settings);
    }

    _GetSizeContents()
    {
        let size = this.props.cSettings.size;
        let innerRadiusContent = (this.props.type === 'pie-editor') ? false : 
            ( <LabeledNumericTextField 
                label='Thickness:'
                index='donut-radius'
                initialValue={parseFloat(size.chartRadius) - parseFloat(size.innerRadius)}
                rows={1}
                cols={5}
                onChange={ (d, i) => { this._SetDonutRadius(d); }}
            />);
        return [
            <div className='center'>
                <LabeledNumericTextField 
                     label='Radius:'
                     index='chart-radius'
                     initialValue={size.chartRadius}
                     rows={1}
                     cols={5}
                     onlyPositive={true}
                     onChange={(d, i) => { 
                        this._SetRadius(d); 
                    }}
                />
                {innerRadiusContent}
            </div>
        ]
    }

    _GetDataLabelContents()
    {
        let isDisabled = this.props.dSettings.statistic === undefined;
        let statistic = (isDisabled) ? this._defaultSettings.statistic : this.props.dSettings.statistic;
        return [
            <div className='center'>
                <div>
                    <h5>Position Settings:</h5>
                    <LabeledTextField 
                        label='X:'
                        index='label-x'
                        initialValue={statistic.position.x}
                        rows={1}
                        cols={5}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('statistic', 'position', 'x', d);
                        }} 
                        isDisabled={isDisabled}
                    />
                    <LabeledTextField 
                        label='Y:'
                        index='label-y'
                        initialValue={statistic.position.y}
                        rows={1}
                        cols={5}
                        onChange={(d, i) => { 
                            this._UpdateDecoratorSettings('statistic', 'position', 'y', d);
                        }} 
                        isDisabled={isDisabled}
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
                        isDisabled={isDisabled}
                    />
                </div>
            </div>
        ];
    }

    _GetChartOutlineContents()
    {
        let isDisabled = this.props.dSettings.chartOutline === undefined;
        let chartOutline = (isDisabled) ? this._defaultSettings.chartOutline : this.props.dSettings.chartOutline;
        return [
            <div className='center'>
                <div>
                    <h5>Size Settings:</h5>
                    <LabeledNumericTextField 
                        label='Radius:'
                        index='outline-radius'
                        initialValue={chartOutline.size.radius}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        onChange={(d, i) => {
                            this._UpdateDecoratorSettings('chartOutline', 'size', 'radius', parseFloat(d));
                        }} 
                        isDisabled={isDisabled}
                    />
                    <LabeledNumericTextField 
                        label='Stroke Width:'
                        index='stroke-width'
                        initialValue={chartOutline.size.outlineWidth}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        onChange={(d, i) => { 
                            if (d === '') return;
                            this._UpdateDecoratorSettings('chartOutline', 'size', 'outlineWidth', parseFloat(d));
                        }} 
                        isDisabled={isDisabled}
                    />
                </div>
                <div>
                    <h5>Color Settings:</h5>
                    <LabeledColorPicker 
                        label='Outline Color:'
                        color={chartOutline.color.outlineColor}
                        onChange={(value) => { 
                            this._UpdateDecoratorSettings('chartOutline', 'color', 'outlineColor', value);
                        }}
                        isDisabled={isDisabled}
                    />
                </div>
            </div>
        ]
    }
}

export { PieEditor };