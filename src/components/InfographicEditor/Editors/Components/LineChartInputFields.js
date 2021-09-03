import React from 'react'
import { TextField } from './index';
import { CategoryGenerator } from '../../../Helpers/CategoryGenerator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Lodash from 'lodash';

import '../../../../css/React/Editors/BarChartInputFields.css'

class LineChartInputFields extends React.Component
{
    constructor(props)
    {
        super(props);
        this._generateCategory = CategoryGenerator();
    }

    render()
    {
        return (
            <div>
                {
                    this.props.chartData.map((d, i) => {
                        let category = (
                            <p style={{position: 'relative', left: '26%'}}>Category</p>
                        );
                        let value = (<p style={{position: 'relative', left: '22%'}}>Value</p>);
                        return (
                            <div 
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'auto auto auto',
                                    gridColumnGap: '20px',
                                    alignContent: 'center'
                                }}
                            >
                                { (i === 0) && category}
                                { (i === 0) && value}
                                { (i === 0) && <div></div>}
                                 <TextField 
                                    key={i + '-category'}
                                    id={i + '-category'}
                                    index={i}
                                    initialValue={d.category}
                                    rows={1}
                                    cols={20}
                                    onChange={(d, i) => { this._SetChartData(d, i, 'category')}}
                                />
                                <TextField 
                                    key={i + '-data'}
                                    id={i + '-data'}
                                    index={i}
                                    initialValue={d.value}
                                    rows={1}
                                    cols={10}
                                    onChange={(d, i) => { this._SetChartData(d, i, 'value')}}
                                />
                                <FontAwesomeIcon className='remove-row-icon' icon={faTimesCircle}
                                    onClick={() => { this._RemoveEntry(i); }}/>
                            </div>
                        );
                    })
                }
                <div className='data-input-container'>
                    <FontAwesomeIcon 
                        className='add-row-icon' 
                        icon={faPlus} 
                        style={{
                            position: 'relative',
                            left: '61.5px'
                        }}
                        onClick={() => { this._AddEntry(); }}
                    />
                </div>
            </div>
        );
    }  
    
    _SetChartData(d, i, type) 
    {
        if (d === '') return;
        let data = this.props.chartData.map(d => {
            return {
                category: d.category,
                value: d.value
            };
        });

        if (type === 'value') data[i].value = parseFloat(d);
        else if (type === 'category') data[i].category = d;

        this.props.setChartData(data);
    }

    _RemoveEntry(i)
    {
        let data = Lodash.cloneDeep(this.props.chartData);
        data.splice(i, 1);
        this.props.setChartData(data);
    }

    _AddEntry()
    {
        let data = Lodash.cloneDeep(this.props.chartData);
        data.push({
            category: this._generateCategory(),
            value: 10,
        });
        this.props.setChartData(data);
    }
}

export { LineChartInputFields };