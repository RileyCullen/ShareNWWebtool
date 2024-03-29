import React from 'react';
import { TextField } from './index';

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
                    <input 
                        type='range'
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        value={this.state.value}
                        onChange={(event) => { this._HandleChange(event.target.value); }}
                        style={{width: '220px'}}
                    ></input>
                </div>
            </div>
        );
    }

    componentDidUpdate()
    {
        // Basically, we need the following block for updating the UI when
        // undo/redo is called for updating chart data.
        if (this.props.value !== this.state.value) {
            this.setState({ value: this.props.value, });
        }
    }

    _HandleChange(value)
    {
        if (value > 100) value = 100;
        else if (value < 0) value = 0;
        else if (value === '') value = this.state.value;
        this.setState({
            value: value,
        });
        this.props.setChartData(value);
    }

    _IncrementValue()
    {
        this._HandleChange(parseFloat(this.state.value) + 1);
    }

    _DecrementValue()
    {
        this._HandleChange(this.state.value - 1);
    }
}

export { PieChartInputFields };