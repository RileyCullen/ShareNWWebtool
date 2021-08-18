import React from 'react';

import { TextField } from './TextField';

import '../../../../css/React/Editors/LabeledTextField.css';

class LabeledTextField extends React.Component
{
    render()
    {
        return (
            <div className='labeled-text-field-container'>
                <label>{this.props.label}</label>
                <div className='labeled-text-field'>
                    <TextField 
                        id={this.props.index}
                        index={this.props.index}
                        initialValue={this.props.initialValue}
                        rows={this.props.rows}
                        cols={this.props.cols}
                        onChange={(d, i) => { this.props.onChange(d, i); }}/>
                </div>
            </div>
        );
    }
}

export { LabeledTextField };