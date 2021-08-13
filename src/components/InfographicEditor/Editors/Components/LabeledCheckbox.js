import React from 'react';

import { Checkbox } from './Checkbox';

import '../../../../css/React/Editors/LabeledCheckbox.css';

class LabeledCheckbox extends React.Component 
{
    render()
    {
        return (
            <div className='labeled-checkbox-container'>
                <label>{this.props.label}</label>
                <div className='labeled-checkbox'>
                    <Checkbox 
                        initialValue={this.props.initialValue}
                        onClick={() => { this.props.onClick(); }}/>
                </div>
            </div>
        );
    }
}

export { LabeledCheckbox };