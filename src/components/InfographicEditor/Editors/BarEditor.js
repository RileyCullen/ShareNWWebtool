import React from 'react';
import { Editor, BarChartInputFields, Menu, LabeledTextField } from './Components/index';

class BarEditor extends React.Component
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
             <BarChartInputFields 
                    chartData={this.props.chartData}
                    setChartData={(d, i) => { this.props.setChartData(d, i); }} />
        ];

        let content = {
            chartSettings: [
                <Menu 
                    name='Chart Data'
                    isOpen={true}
                    content={chartDataContent}
                    checkbox={{ displayCheckbox: false }}/>,
                <Menu 
                    name='Orientation'
                    isOpen={false}
                    content={[]} 
                    checkbox={{ displayCheckbox: false }}/>,
                <Menu 
                    name='Size'
                    isOpen={false}
                    content={this._GetSizeContent()}
                    checkbox={{ displayCheckbox: false }}/>,
                <Menu 
                    name='Background Color'
                    isOpen={false}
                    content={[]}
                    checkbox={{ displayCheckbox: true }}/>
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
                <Editor content={content} />
            </div>
        );
    }

    _GetSizeContent()
    {
        let cSettings = this.props.cSettings;
        return [
            <LabeledTextField 
                label='Width:'
                index={'c-width'}
                initialValue={cSettings.size.chartWidth}
                rows={1}
                cols={5}
                onchange={(d, i) => { }}
                />
        ];
    }
}

export { BarEditor };