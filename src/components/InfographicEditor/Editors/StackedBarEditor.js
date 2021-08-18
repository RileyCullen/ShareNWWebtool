import React from 'react';
import { Editor, Menu, LabeledTextField, LabeledCheckbox } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

class StackedBarEditor extends React.Component 
{
    render()
    {
        let content = {
            chartSettings: [
                <Menu 
                    name='Chart Data'
                    isOpen={true}
                    content={[]}
                    checkbox={{ displayCheckbox: false }}/>,
                <Menu 
                    name='Size'
                    isOpen={false}
                    content={this._GetSizeContent()} 
                    checkbox={{ displayCheckbox: false }}/>,
                <Menu 
                    name='Orientation'
                    isOpen={false}
                    content={this._GetOrientationContent()} 
                    checkbox={{ displayCheckbox: false }}/>,
                <Menu 
                    name='Background Color'
                    isOpen={false}
                    content={[]}
                    checkbox={{ displayCheckbox: false }}/>
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
                    }}
                />,
                <Menu 
                    name='Y-Axis'
                    isOpen={false}
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    name='Data Labels'
                    isOpen={false}
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    name='Category Labels'
                    isOpen={false}
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    name='Category Legend'
                    isOpen={false}
                    content={[]}
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
                <Editor content={content}/>
            </div>
        )
    }


    _GetSizeContent()
    {
        let cSettings = this.props.cSettings;
        return [
            <div className='center'>
                <LabeledTextField 
                    label='Width:'
                    index={'c-width'}
                    initialValue={cSettings.size.chartWidth}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                    />
                <LabeledTextField
                    label='Height:'
                    index={'c-height'}
                    initialValue={cSettings.size.chartHeight}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }} 
                />
                <LabeledTextField
                    label='Bar Padding:'
                    index={'c-padding'}
                    initialValue={cSettings.size.padding}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }} 
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
                    onClick={() => { }}/>
            </div> 
        ];
    }
}

export { StackedBarEditor };