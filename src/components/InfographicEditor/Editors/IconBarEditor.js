import React from 'react';
import { Editor, Menu, BarChartInputFields, LabeledColorPicker, LabeledTextField } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

class IconBarEditor extends React.Component 
{
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
                    name='Chart Data'
                    isOpen={true}
                    content={chartDataContent}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    name='Icon Settings'
                    isOpen={false}
                    content={this._GetIconContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />
            ],
            designOptions: [
                <Menu 
                    name='Data Labels'
                    isOpen={false}
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
                <Menu 
                    name='Category Labels'
                    isOpen={false}
                    content={[]} 
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
}

export { IconBarEditor };