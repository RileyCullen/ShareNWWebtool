import React from 'react';
import { Editor, Menu, BarChartInputFields } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

class IconBarEditor extends React.Component 
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
                    isCheckBox={false} />,
                <Menu 
                    name='Icon Settings'
                    content={[]}
                    isCheckBox={false} />
            ],
            designOptions: [
                <Menu 
                    name='Data Labels'
                    content={[]}
                    isCheckBox={true} />,
                <Menu 
                    name='Category Labels'
                    content={[]} 
                    isCheckBox={true} />
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

export { IconBarEditor };