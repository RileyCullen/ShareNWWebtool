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
                    <button
                        onClick={() => { this._DecrementValue(); }}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <TextField 
                        id={this.state.value + '-pie-text-field'}
                        initialValue={this.state.value}
                        rows={this.props.rows}
                        cols={this.props.cols}
                        style={{resize: 'none'}}
                        onChange={(d, i) => { this._HandleChange(d); }}
                    />
                    <button
                        onClick={() => { this._IncrementValue(); }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className='pie-slider'>
                    <Slider 
                        id={this.state.value + '-pie-slider'}
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        value={this.state.value}
                        onChange={(d) => { this._HandleChange(d); }}
                        width={'220px'}
                    />
                </div>
            </div>
        );
    }

    _HandleChange(value)
    {
        if (value > 100) value = 100;
        else if (value < 0) value = 0;
        this.setState({
            value: value,
        });
        this.props.setChartData(value);
    }

    _IncrementValue()
    {
        this._HandleChange(this.state.value + 1);
    }

    _DecrementValue()
    {
        this._HandleChange(this.state.value - 1);
    }
}

export { PieChartInputFields };