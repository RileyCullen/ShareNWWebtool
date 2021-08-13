import React from 'react';
import { Editor, Menu, LabeledTextField, LabeledColorPicker } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

class LineEditor extends React.Component 
{
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
                    name='Size Settings'
                    isOpen={false}
                    content={this._GetSizeContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    name='Color Settings'
                    isOpen={false}
                    content={this._GetColorContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    name='Spacing Settings'
                    isOpen={false}
                    content={this._GetSpacingContent()}
                    checkbox={{
                        displayCheckbox: false
                    }} />
            ],
            designOptions: [
                <Menu 
                    name='X-Axis'
                    isOpen={false}
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
                <Menu 
                    name='Y-Axis'
                    isOpen={false}
                    content={[]} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
                <Menu 
                    name='Data Labels'
                    isOpen={false}
                    content={[]} 
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
            <div>
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
            <div>
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
            <div>
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
}

export { LineEditor };