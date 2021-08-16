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
                            <p style={{position: 'relative', left: '32%'}}>Category</p>
                        );
                        let value = (<p style={{position: 'relative', left: '27%'}}>Value</p>);
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
                                    initialValue={d.date}
                                    rows={1}
                                    cols={20}
                                    onchange={(d, i) => { }}
                                />
                                <TextField 
                                    key={i + '-data'}
                                    id={i + '-data'}
                                    index={i}
                                    initialValue={d.value}
                                    rows={1}
                                    cols={10}
                                    onchange={(d, i) => { }}
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
}

export { LineChartInputFields };