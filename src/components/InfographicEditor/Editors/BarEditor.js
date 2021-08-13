import React from 'react';
import { Editor, BarChartInputFields, Menu, LabeledTextField } from './Components/index';
import { LabeledCheckbox } from './Components/LabeledCheckbox';

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
                    content={this._GetOrientationContent()} 
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
            <div style={{position: 'relative', left: '75%'}}>
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
            <div style={{position: 'relative', left: '100%'}}>
                <LabeledCheckbox 
                    label='Landscape:'
                    initialValue={orientation.landscape}
                    onClick={() => { }}/>
            </div> 
        ];
    }
}

export { BarEditor };