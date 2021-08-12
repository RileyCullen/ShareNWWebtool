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
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    name='Size Settings'
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    name='Color Settings'
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }} />,
                <Menu 
                    name='Spacing Settings'
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }} />
            ],
            designOptions: [
                <Menu 
                    name='X-Axis'
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
                <Menu 
                    name='Y-Axis'
                    content={[]} 
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
                <Menu 
                    name='Data Labels'
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