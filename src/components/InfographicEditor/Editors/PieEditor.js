import React from 'react';
import { Editor, FontSelector, LabeledColorPicker, LabeledTextField, Menu, 
    PieChartInputFields } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

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
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
                <Menu 
                    key='chart-outline'
                    name='Chart Outline'
                    isOpen={false}
                    content={this._GetChartOutlineContents()} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />
            ]
        }

        return (
            <div>
                <Editor content={content}/>
            </div>
        )
    }

    _SetCurrentTab(state)
    {
        this.setState({
            currentTab: state,
        });
    }

    _GetChartData()
    {
        return [
            <PieChartInputFields 
                value={this.props.chartData[0].value}
                rows={1}
                cols={4}
            />
        ];
    }

    _GetColorContents()
    {
        let color = this.props.chartData;
        return [
            <div className='center'>
                <LabeledColorPicker 
                    label='Primary Color:'
                    color={color[0].color}
                    onChange={(value) => { }}
                />
                <LabeledColorPicker 
                    label='Background Color:'
                    color={color[1].color}
                    onChange={(value) => { }}
                />
            </div>
        ];
    }

    _GetSizeContents()
    {
        let size = this.props.cSettings.size;
        return [
            <div className='center'>
                <LabeledTextField 
                     label='Radius'
                     index='chart-radius'
                     initialValue={size.chartRadius}
                     rows={1}
                     cols={5}
                     onchange={(d, i) => { }}
                />
            </div>
        ]
    }

    _GetDataLabelContents()
    {
        let statistic = (this.props.dSettings.statistic === undefined) ? {
            font: this._defaultFont,
            position: {
                x: 0,
                y: 0
            }
        } : this.props.dSettings.statistic;
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
                        onchange={(d, i) => { }} 
                    />
                    <LabeledTextField 
                        label='Y:'
                        index='label-y'
                        initialValue={statistic.position.y}
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

    _GetChartOutlineContents()
    {
        let chartOutline = (this.props.dSettings.chartOutline === undefined) ? {
            size: {
                radius: 100,
                outlineWidth: 2,
            },
            color: {
                outlineColor: '#000'
            }
        } : this.props.dSettings.chartOutline;
        return [
            <div className='center'>
                <div>
                    <h5>Size Settings:</h5>
                    <LabeledTextField 
                        label='Radius:'
                        index='outline-radius'
                        initialValue={chartOutline.size.radius}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                    <LabeledTextField 
                        label='Stroke Width:'
                        index='stroke-width'
                        initialValue={chartOutline.size.outlineWidth}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }} 
                    />
                </div>
                <div>
                    <h5>Color Settings:</h5>
                    <LabeledColorPicker 
                        label='Outline Color:'
                        color={chartOutline.color.outlineColor}
                        onChange={(value) => { }}
                    />
                </div>
            </div>
        ]
    }
}

export { PieEditor };