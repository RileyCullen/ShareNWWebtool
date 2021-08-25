import React from 'react';

import { TextField, ColorPicker } from './index';

import '../../../../css/React/Editors/BarChartInputFields.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class BarChartInputFields extends React.Component 
{
    render()
    {
        let barData = this.props.chartData, rows = 1, cols = 15;
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
                            id='bar-data-color-picker' 
                            color={d.color}
                            onChange={(color) => {
                                let index = i;
                                this._SetChartData(color, index, 'color')
                            }
                        }/>
                        <TextField 
                            id={i + '-category'}
                            index={i}
                            initialValue={category}
                            rows={rows}
                            cols={cols}
                            onChange={(d, i) => { this._SetChartData(d, i, 'category')}}
                            />
                        <TextField
                            id={i + '-value'}
                            index={i}
                            initialValue={value} 
                            rows={rows}
                            cols={cols}
                            onChange={(d, i) => { this._SetChartData(d, i, 'value') }}/>
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

    _SetChartData(d, i, type)
    {
        if (d === '') return;
        var data = this.props.chartData.map(d => { return {
            category: d.category,
            value: d.value,
            color: d.color,
        }});

        if (type === 'value') data[i].value = parseFloat(d);
        else if (type === 'category') data[i].category = d;
        else if (type === 'color') data[i].color = d;
        this.props.setChartData(data);
    }
}

export { BarChartInputFields };