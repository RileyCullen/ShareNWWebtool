import React from 'react';
import { Editor, Menu } from './Components/index';

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
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    name='Color Settings'
                    isOpen={false}
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    name='Spacing Settings'
                    isOpen={false}
                    content={[]}
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
}

export { LineEditor };