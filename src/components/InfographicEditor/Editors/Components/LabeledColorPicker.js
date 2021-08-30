import React from 'react';

import { ColorPicker } from './ColorPicker';

import '../../../../css/React/Editors/LabeledColorPicker.css';

class LabeledColorPicker extends React.Component 
{
    render() 
    {
        return (
            <div className='labeled-color-picker-container'>
                <label>{this.props.label}</label>
                <div className='labeled-color-picker'>
                    <ColorPicker 
                        id={this.props.color}
                        color={this.props.color}
                        onChange={(value) => { this.props.onChange(value); }}
                    />
                </div>
            </div>
        );
    }
}

export { LabeledColorPicker };