import React from 'react';
import { Editor, Menu, LabeledTextField, LabeledColorPicker, FontSelector, LabeledDropdown, LineChartInputFields } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

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
                    name='X-Axis'
                    isOpen={false}
                    content={this._GetXAxisContent()}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
                <Menu 
                    key='y-axis'
                    name='Y-Axis'
                    isOpen={false}
                    content={this._GetYAxisContent()} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
                <Menu 
                    key='data-labels'
                    name='Data Labels'
                    isOpen={false}
                    content={this._GetDataLabelContent()} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
            ]
        }

        return (
            <div>
                <Editor content={content} />
            </div>
        )
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
                    onchange={(d, i) => { }}
                />
                <LabeledTextField 
                    label='Chart Height:'
                    index='c-height'
                    initialValue={sizeSettings.chartHeight}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
                <LabeledTextField 
                    label='Line Width:'
                    index='l-width'
                    initialValue={sizeSettings.lineWidth}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
                <LabeledTextField 
                    label='Point Radius:'
                    index='p-radius'
                    initialValue={sizeSettings.pointRadius}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
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
                    onChange={(value) => { }}
                />
                <LabeledColorPicker 
                    label='Point Color:'
                    color={colorSettings.pointColor}
                    onChange={(value) => { }}
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
                    label='Space between chart and x-axis:'
                    index='x-offset'
                    initialValue={spacingSettings.internalOffsetX}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
                <LabeledTextField 
                    label='Space between chart and y-axis:'
                    index='y-offset'
                    initialValue={spacingSettings.internalOffsetY}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
            </div>
        ];
    }

    _GetXAxisContent()
    {
        let settings = (this.props.dSettings.xAxis === undefined) ? {
            font: this._defaultFont,
            axis: {
                label: '',
                color: '#000',
                axisStrokeWidth: 1,
                axisTickWidth: 0.5
            }
        } : this.props.dSettings.xAxis;
        return [
            <div className='center'>
                <div>
                    <h5>Axis Settings</h5>
                    <LabeledTextField 
                        label='Label:'
                        index={'x-label'}
                        initialValue={settings.axis.label}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }}
                    />
                    <LabeledTextField 
                        label='Axis Width:'
                        index={'x-stroke'}
                        initialValue={settings.axis.axisStrokeWidth}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                    <LabeledTextField 
                        label='Tick Width:'
                        index={'x-tick'}
                        initialValue={settings.axis.axisTickWidth}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                    <LabeledColorPicker 
                        label='Axis Color: '
                        color={settings.axis.color}
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


    _GetYAxisContent()
    {
        let settings = (this.props.dSettings.yAxis === undefined) ? {
            font: this._defaultFont,
            axis: {
                label: '',
                color: '#000',
                axisStrokeWidth: 1,
                axisTickWidth: 0.5
            }
        } : this.props.dSettings.yAxis;
        return [
            <div className='center'>
                <div>
                    <h5>Axis Settings</h5>
                    <LabeledTextField 
                        label='Label:'
                        index={'y-label'}
                        initialValue={settings.axis.label}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }}
                    />
                    <LabeledTextField 
                        label='Axis Width:'
                        index={'y-stroke'}
                        initialValue={settings.axis.axisStrokeWidth}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                    <LabeledTextField 
                        label='Tick Width:'
                        index={'y-tick'}
                        initialValue={settings.axis.axisTickWidth}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                    <LabeledColorPicker 
                        label='Axis Color: '
                        color={settings.axis.color}
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
    _GetDataLabelContent()
    {
        let settings = (this.props.dSettings.dataValue === undefined) ? {
            font: this._defaultFont,
            location: 'Bottom',
        } : this.props.dSettings.dataValue;

        return [
            <div className='center'>
                <div>
                    <h5>Location:</h5>
                    <LabeledDropdown 
                        label='Location:'
                        options={['Bottom', 'Top', 'Left', 'Right']}
                        selected={settings.location}
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
}

export { LineEditor };