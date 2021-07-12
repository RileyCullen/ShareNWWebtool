import React from 'react';
import { TextField } from './Components/index';

class BarEditor extends React.Component
{
    render()
    {
        let barData = this.props.chartData, rows = 1, cols = 5, 
            rightPaddingArray = this._CreateRightPaddingArray();
        return (
            <div className='BarEditor'>
                {
                    barData.map((d, i) => {
                        let category = d.category, value = d.value; 
                        return <TextField
                            id={i}
                            labelName={category + ':'}
                            initialValue={value} 
                            rows={rows}
                            cols={cols}
                            labelPaddingRight={rightPaddingArray[i]}
                            onchange={(d, i) => { this._SetChartData(d, i) }}/>;
                    })
                }
            </div>
        );
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