import React from 'react';
import { Editor, Menu } from './Components/index';

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
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    name='Color Settings'
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    name='Size Settings'
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
            ],
            designOptions: [
                <Menu 
                    name='Data Labels'
                    content={[]}
                    checkbox={{
                        displayCheckbox: true,
                        isChecked: false,
                        checkboxHandler: () => { }
                    }} />,
                <Menu 
                    name='Chart Outline'
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
}

export { PieEditor };