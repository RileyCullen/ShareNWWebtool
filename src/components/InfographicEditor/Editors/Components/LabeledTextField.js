import React from 'react';

import { TextField } from './TextField';
import { Color } from './Colors'; 

import '../../../../css/React/Editors/LabeledTextField.css';

class LabeledTextField extends React.Component
{
    render()
    {
        let labelColor = (this.props.isDisabled) ? Color.DisabledText : Color.EnabledText;
        return (
            <div className='labeled-text-field-container'>
                <label style={{color: labelColor}}>{this.props.label}</label>
                <div className='labeled-text-field'>
                    <TextField 
                        id={this.props.index}
                        index={this.props.initialValue}
                        initialValue={this.props.initialValue}
                        rows={this.props.rows}
                        cols={this.props.cols}
                        onChange={(d, i) => { this.props.onChange(d, i); }}
                        isDisabled={this.props.isDisabled}/>
                </div>
            </div>
        );
    }
}

LabeledTextField.defaultProps = {
    isDisabled: false,
}

export { LabeledTextField };