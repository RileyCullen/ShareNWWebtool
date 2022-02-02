import React from 'react';

import { TextField, ColorPicker, NumericTextField } from './index';
import { CategoryGenerator } from '../../../Helpers/CategoryGenerator';

import '../../../../css/React/Editors/BarChartInputFields.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Lodash from 'lodash';

class BarChartInputFields extends React.Component 
{
    constructor(props)
    {
        super(props);
        this._generateCategory = CategoryGenerator();
    }

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
                            key={d.value + '-' + i + 'color'}
                            id={d.color + '-bar-data-color-picker'} 
                            color={d.color}
                            onChange={(color) => {
                                let index = i;
                                this._SetChartData(color, index, 'color')
                            }
                        }/>
                        <TextField 
                            id={d.category + '-' + i + '-category'}
                            index={i}
                            initialValue={category}
                            rows={rows}
                            cols={cols}
                            onChange={(d, i) => { this._SetChartData(d, i, 'category')}}
                            />
                        <NumericTextField
                            id={d.value + '-' + i + '-value'}
                            index={i}
                            initialValue={value} 
                            rows={rows}
                            cols={cols}
                            onlyPositive={false}
                            onChange={(d, i) => { this._SetChartData(d, i, 'value') }}/>
                        <FontAwesomeIcon className='remove-row-icon' icon={faTimesCircle}
                            onClick={() => { this._RemoveEntry(i); }}/>
                    </div>);
                })
            }
            <div className='data-input-container'>
                <FontAwesomeIcon className='add-row-icon' icon={faPlus} 
                    onClick={() => { this._AddEntry(); }}/>
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

    _RemoveEntry(i)
    {
        let data = Lodash.cloneDeep(this.props.chartData);
        data.splice(i, 1);
        console.log(data);
        this.props.setChartData(data);
    }

    _AddEntry()
    {
        let data = Lodash.cloneDeep(this.props.chartData);
        data.push({
            category: this._generateCategory(),
            value: 10,
            color: 'black',
        });
        this.props.setChartData(data);
    }
}

export { BarChartInputFields };