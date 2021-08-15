import React from 'react';
import { Editor, Menu, BarChartInputFields, LabeledColorPicker, LabeledTextField,
    LabeledCheckbox, FontSelector, LabeledDropdown } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

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
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
                <Menu 
                    key='category-labels'
                    name='Category Labels'
                    isOpen={false}
                    content={this._GetCategoryLabelsContent()} 
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

    _GetIconContent()
    {
        let iconSettings = this.props.cSettings.iconSettings;
        return [
            <div>
                <LabeledColorPicker
                    label='Icon Color'
                    color={iconSettings.iconColor}
                    onChange={(value) => { }}
                />
                <LabeledTextField 
                    label='Icon Size:'
                    index='icon-size'
                    initialValue={iconSettings.iconSize}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
                <LabeledTextField 
                    label='Padding'
                    index='padding'
                    initialValue={iconSettings.padding}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
            </div>
        ]
    }

    _GetDataLabelsContent()
    {
        let settings = (this.props.dSettings.dataValue === undefined) ? {
            font: this._defaultFont,
            display: {
                percentage: true,
                category: false,
                isMiddle: true
            }, 
            backgroundColor: {
                stroke: '#000',
                fill: '#fff',
            }
        } : this.props.dSettings.dataValue;
        return [
            <div>
                <div>
                    <h5>Display Settings:</h5>
                    <LabeledCheckbox 
                        label='Display Category:'
                        initialValue={settings.display.percentage}
                        onClick={() => { }}
                    />
                    <LabeledCheckbox 
                        label='Display Percentage:'
                        initialValue={settings.display.category}
                        onClick={() => { }}
                    />
                    <LabeledDropdown 
                        label='Location:'
                        options={['Middle', 'Top']}
                        selected={(settings.display.isMiddle ? 'Middle' : 'Top')}
                        onChange={(value) => { }}
                    />
                </div>
                <div>
                    <h5>Background Box:</h5>
                    <LabeledColorPicker 
                        label='Border Color:'
                        color={settings.backgroundColor.stroke}
                        onChange={(value) => { }}
                    />
                    <LabeledColorPicker 
                        label='Fill Color:'
                        color={settings.backgroundColor.fill}
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

    _GetCategoryLabelsContent()
    {
        let settings = (this.props.dSettings.category === undefined) ? {
            font: this._defaultFont,
            location: {
                isWithinBArs: this._isWithinBars,
                isTop: this._isTop,
            }
        } : this.props.dSettings.category;
        return [
            <div>
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
}

export { IconBarEditor };