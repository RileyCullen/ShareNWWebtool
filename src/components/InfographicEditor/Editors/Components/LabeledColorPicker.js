import React from 'react';

import { ColorPicker } from './ColorPicker';
import { Color } from './Colors';

import '../../../../css/React/Editors/LabeledColorPicker.css';

class LabeledColorPicker extends React.Component 
{
    static defaultProps = {
        isDisabled: true,
    }

    render() 
    {
        let color = (this.props.isDisabled) ? Color.DisabledText : Color.EnabledText;
        return (
            <div className='labeled-color-picker-container'>
                <label style={{color: color}}>{this.props.label}</label>
                <div className='labeled-color-picker'>
                    <ColorPicker 
                        id={this.props.color}
                        color={this.props.color}
                        onChange={(value) => { this.props.onChange(value); }}
                        isDisabled={this.props.isDisabled}
                    />
                </div>
            </div>
        );
    }
}

export { LabeledColorPicker };