import React from 'react';
import { Editor, Menu } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

class StackedBarEditor extends React.Component 
{
    render()
    {
        let content = {
            chartSettings: [
                <Menu 
                    name='Chart Data'
                    content={[]}
                    checkbox={{ displayCheckbox: false }}/>,
                <Menu 
                    name='Orientation'
                    content={[]} 
                    checkbox={{ displayCheckbox: false }}/>,
                <Menu 
                    name='Background Color'
                    content={[]}
                    checkbox={{ displayCheckbox: false }}/>
            ],
            designOptions: [
                <Menu 
                    name='X-Axis'
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    name='Y-Axis'
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    name='Data Labels'
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    name='Category Labels'
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }}
                />,
                <Menu 
                    name='Category Legend'
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
}

export { StackedBarEditor };