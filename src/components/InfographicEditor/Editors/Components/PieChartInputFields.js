import React from 'react';
import { TextField, Slider } from './index';

import '../../../../css/React/Editors/PieChartInputFields.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

class PieChartInputFields extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: props.value,
        }
    }

    render()
    {
        return (
            <div className='pie-chart-input-container'>
                <div className='pie-chart-textfield-container'>
                    <button>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <TextField 
                        initialValue={this.state.value}
                        rows={this.props.rows}
                        cols={this.props.cols}
                        style={{resize: 'none'}}
                        onChange={(d, i) => { }}
                    />
                    <button>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className='pie-slider'>
                    <Slider 
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        value={this.state.value}
                        onChange={(d) => { }}
                        width={'220px'}
                    />
                </div>
            </div>
        );
    }
}

export { PieChartInputFields };