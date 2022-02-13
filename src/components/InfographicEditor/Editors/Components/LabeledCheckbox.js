import React from 'react';

import { Checkbox } from './Checkbox';
import { Color } from './Colors';

import '../../../../css/React/Editors/LabeledCheckbox.css';

class LabeledCheckbox extends React.Component 
{
    static defaultProps = {
        isDisabled: false,
    }

    render()
    {
        let color = (this.props.isDisabled) ? Color.DisabledText : Color.EnabledText;
        return (
            <div className='labeled-checkbox-container'>
                <label style={{color: color}}>{this.props.label}</label>
                <div className='labeled-checkbox'>
                    <Checkbox 
                        initialValue={this.props.initialValue}
                        onClick={(value) => { this.props.onClick(value); }}
                        isDisabled={this.props.isDisabled}/>
                </div>
            </div>
        );
    }
}

export { LabeledCheckbox };