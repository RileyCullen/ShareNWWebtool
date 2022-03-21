import React from 'react';
import { Menu, Editor, LabeledColorPicker, LabeledTextField, FontSelector, LabeledCheckbox,
    LabeledNumericTextField } from './Components/index';
import Lodash from 'lodash';
import '../../../css/React/Editors/WaffleEditor.css';
import '../../../css/React/Editors/ChartEditor.css';
import { SettingsManager } from '../../Helpers/SettingsManager';
import { BoundedTextField } from './Components/BoundedTextField';

class WaffleEditor extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            iconSize: this.props.cSettings.icon.size,
            padding: this.props.cSettings.icon.padding,
            width: this.props.cSettings.dynamicResize.width,
        }

        this._defaultFont = {
            fontFamily: 'Times New Roman, Times, serif',
            fontSize: 30,
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
                    middleText: 'out of',
                    lockToChart: true
                },
                position: {
                    x: 0, 
                    y: 0,
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
                    <LabeledNumericTextField 
                        label='Numerator:'
                        index={data.numerator}
                        initialValue={data.numerator}
                        rows={rows}
                        cols={cols}
                        onlyPositive={true}
                        onChange={(d, i) => { this._SetChartData(0, d); }}
                    />
                    <LabeledTextField 
                        label='Denominator:'
                        index={data.denominator}
                        initialValue={data.denominator}
                        rows={rows}
                        cols={cols}
                        onlyPositive={true}
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
                    key='color-settings'
                    name='Color Settings'
                    isOpen={false}
                    content={this._GetColorContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    key='size-settings'
                    name='Size settings'
                    isOpen={false}
                    content={this._GetResizeContent()} 
                    checkbox={{
                        displayCheckbox: false,
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
            <div style={{height: '100%'}}>
                <Editor content={content}/>
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

    _GetColorContent()
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
            </div>
        ]
    }

    _GetResizeContent()
    {
        let resize = this.props.cSettings.dynamicResize,
            iconSettings = this.props.cSettings.icon;

        const MAX_ICON_SIZE = 100, MIN_ICON_SIZE = 20;
        const MIN_PADDING = 10, MAX_PADDING = 100;
        const MIN_WIDTH = 50, MAX_WIDTH = 500;
        return [
            <div className='center'>
                <div className="waffle-icon-size-container">
                    <label>Width:</label>
                    <input 
                        type='range'
                        disabled={!this.props.cSettings.dynamicResize.isChecked}
                        min={MIN_WIDTH}
                        max={MAX_WIDTH}
                        step={1}
                        value={resize.width}
                        onChange={this._UpdateWidth.bind(this)}></input>
                    <BoundedTextField 
                        id={0}
                        index='icon-size'
                        initialValue={resize.width}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        isDisabled={!this.props.cSettings.dynamicResize.isChecked}
                        onChange={(d, i) => { this._SetChartSettings('dynamicResize', 'width', d)}}
                        lowerBound={MIN_WIDTH}
                        upperBound={MAX_WIDTH}
                    />
                </div>
                {false && <LabeledNumericTextField 
                    label='Height'
                    index='c-height'
                    initialValue={resize.height}
                    rows={1}
                    cols={5}
                    onlyPositive={true}
                    onChange={(d, i) => { this._SetChartSettings('dynamicResize', 'height', d); }} 
                />}
                <LabeledNumericTextField 
                    label='Max icons per row: '
                    index='max'
                    initialValue={iconSettings.maxIconsPerRow}
                    rows={1}
                    cols={5}
                    onlyPositive={true}
                    onChange={(d, i) => { this._SetChartSettings('icon', 'maxIconsPerRow', d)}}
                />
                <hr />
                <LabeledCheckbox 
                    label="Check box for automatic resizing:"
                    initialValue={this.props.cSettings.dynamicResize.isChecked}
                    onClick={(d) => { this._SetChartSettings('dynamicResize', 'isChecked', d); }} 
                />
                <div className="waffle-icon-size-container">
                    <label>Icon size:</label>
                    <input 
                        type='range'
                        disabled={this.props.cSettings.dynamicResize.isChecked}
                        min={MIN_ICON_SIZE}
                        max={MAX_ICON_SIZE}
                        step={1}
                        value={iconSettings.size}
                        onChange={this._UpdateIconSize.bind(this)}></input>
                    <BoundedTextField 
                        id={0}
                        index='icon-size'
                        initialValue={iconSettings.size}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        isDisabled={this.props.cSettings.dynamicResize.isChecked}
                        onChange={(d, i) => { this._SetChartSettings('icon', 'size', d)}}
                        lowerBound={MIN_ICON_SIZE}
                        upperBound={MAX_ICON_SIZE}
                    />
                </div>
                <div className="waffle-icon-padding-container">
                    <label>Padding:</label>
                    <input 
                        type='range'
                        disabled={this.props.cSettings.dynamicResize.isChecked}
                        min={MIN_PADDING}
                        max={MAX_PADDING}
                        step={1}
                        value={iconSettings.padding}
                        onChange={this._UpdateIconPadding.bind(this)}></input>
                    <BoundedTextField 
                        id={0}
                        index='icon-size'
                        initialValue={iconSettings.padding}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        isDisabled={this.props.cSettings.dynamicResize.isChecked}
                        onChange={(d, i) => { this._SetChartSettings('icon', 'padding', d)}}
                        lowerBound={MIN_PADDING}
                        upperBound={MAX_PADDING}
                    />
                </div>
            </div>
        ];
    }

    _UpdateIconSize(e)
    {
        let d = e.target.value;
        this.setState({
            iconSize: d,
        });
        this._SetChartSettings('icon', 'size', d);
    }

    _UpdateIconPadding(e) 
    {
        let d = e.target.value;
        this.setState({
            padding: d,
        });
        this._SetChartSettings('icon', 'padding', d);
    }

    _UpdateWidth(e) 
    {
        let d = e.target.value;
        this.setState({
            width: d,
        });
        this._SetChartSettings('dynamicResize', 'width', d);
    }


    _GetDataLabelsContent()
    {
        let isDisabled = this.props.dSettings.statistic === undefined;
        let statistic = (isDisabled) ? this._defaultSettings.statistic : this.props.dSettings.statistic;
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
}

export { WaffleEditor };