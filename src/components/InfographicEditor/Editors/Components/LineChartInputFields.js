import React from 'react'
import { TextField } from './index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import '../../../../css/React/Editors/BarChartInputFields.css'

class LineChartInputFields extends React.Component
{
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
                                    onChange={(d, i) => { this._SetChartData(d, i, 'date')}}
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
                                <FontAwesomeIcon className='remove-row-icon' icon={faTimesCircle}/>
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
                date: d.date,
                value: d.value
            };
        });

        if (type === 'value') data[i].value = parseFloat(d);
        else if (type === 'date') data[i].date = d;

        this.props.setChartData(data);
    }
}

export { LineChartInputFields };