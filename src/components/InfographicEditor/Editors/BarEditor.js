import React from 'react';
import { TextField, TabContainer } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

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
        let tabContent = this._DisplayTabContent();
        return (
            <div className='chart-editor'>
                <TabContainer
                    currentTab={this.state.currentTab} 
                    onClick={(state) => { this._SetCurrentTab(state); }}/>
                {
                    tabContent
                }
            </div>
        );
    }

    _SetCurrentTab(state)
    {
        this.setState({
            currentTab: state,
        });
    }

    _DisplayTabContent()
    {
        let barData = this.props.chartData, rows = 1, cols = 5, 
            rightPaddingArray = this._CreateRightPaddingArray();
        if (this.state.currentTab === 0) {
             return barData.map((d, i) => {
                let category = d.category, value = d.value; 
                return <TextField
                    id={i}
                    labelName={category + ':'}
                    initialValue={value} 
                    rows={rows}
                    cols={cols}
                    labelPaddingRight={rightPaddingArray[i]}
                    onchange={(d, i) => { this._SetChartData(d, i) }}/>;
            });
        } else {
            return <p>hello</p>
        }
    }

    _FindLongestLabel()
    {
        let length = 0;
        this.props.chartData.forEach(d => {
            if (d.category.length > length) length = d.category.length;
        });
        return length;
    }

    _CreateRightPaddingArray()
    {
        let longestLabel = this._FindLongestLabel(), tmp = [];
        this.props.chartData.forEach((d, i) => {
            let offset = (longestLabel === d.category.length) ? 0 : d.category.length * 3;
            tmp.splice(i, 0, longestLabel - d.category.length + 10 + offset);
        });
        return tmp;
    }

    _SetChartData(d, i)
    {
        if (d === '') return;
        var data = this.props.chartData.map(d => { return {
            category: d.category,
            value: d.value,
            color: d.color,
        }});
        data[i].value = parseFloat(d);
        this.props.setChartData(data);
    }
}

export { BarEditor };