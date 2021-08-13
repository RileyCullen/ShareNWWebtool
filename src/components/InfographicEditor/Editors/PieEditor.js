import React from 'react';
import { Editor, LabeledColorPicker, LabeledTextField, Menu } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

class PieEditor extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            currentTab: 0 // 0 - Settings and 1 - Design Options
        };
    }

    render()
    {
        let content = {
            chartSettings: [
                <Menu 
                    name='Chart Data'
                    isOpen={true}
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    name='Color Settings'
                    isOpen={false}
                    content={this._GetColorContents()}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    name='Size Settings'
                    isOpen={false}
                    content={this._GetSizeContents()}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
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
                    name='Chart Outline'
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

    _SetCurrentTab(state)
    {
        this.setState({
            currentTab: state,
        });
    }

    _GetColorContents()
    {
        let color = this.props.chartData;
        return [
            <div>
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
            <div>
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
}

export { PieEditor };