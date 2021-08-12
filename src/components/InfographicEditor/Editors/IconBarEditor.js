import React from 'react';
import { Editor, Menu, BarChartInputFields } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

class IconBarEditor extends React.Component 
{
    render()
    {
        let chartDataContent = [
            {contentElement: <BarChartInputFields 
                chartData={this.props.chartData} 
                setChartData={(d, i) => { this.props.setChartData(d, i); }}/>},
        ];
        let content = {
            chartSettings: [
                <Menu 
                    name='Chart Data'
                    content={chartDataContent}
                    checkbox={{
                        displayCheckbox: false
                    }}/>,
                <Menu 
                    name='Icon Settings'
                    content={[]}
                    checkbox={{
                        displayCheckbox: false
                    }} />
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
                    name='Category Labels'
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
}

export { IconBarEditor };