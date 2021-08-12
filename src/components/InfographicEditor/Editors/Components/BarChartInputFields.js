import React from 'react';

import { TextField, ColorPicker } from './index';

import '../../../../css/React/Editors/BarChartInputFields.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class BarChartInputFields extends React.Component 
{
    render()
    {
        let barData = this.props.chartData, rows = 1, cols = 7;
        return (
            <div className='bar-input-container'>
                <div className='data-input-container'>
                    <p className='bar-input-text'>Color</p>
                    <p id='bar-category-label' className='bar-input-text'>Category</p>
                    <p id='bar-value-label' className='bar-input-text'>Value</p>
                </div>
            {
                barData.map((d, i) => {
                let category = d.category, value = d.value; 
                return (
                    <div className='data-input-container'>
                        <ColorPicker 
                            color='red'
                            onChange={(color) => { }}/>
                        <TextField 
                            id={i + '-category'}
                            index={i}
                            initialValue={category}
                            rows={rows}
                            cols={cols}
                            onchange={(d, i) => { }}
                            />
                        <TextField
                            id={i + '-value'}
                            index={i}
                            initialValue={value} 
                            rows={rows}
                            cols={cols}
                            onchange={(d, i) => { this._SetChartData(d, i) }}/>
                        <FontAwesomeIcon className='remove-row-icon' icon={faTimesCircle}/>
                    </div>);
                })
            }
            <div className='data-input-container'>
                <FontAwesomeIcon className='add-row-icon' icon={faPlus} />
            </div>
            </div>
        ); 
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

export { BarChartInputFields };