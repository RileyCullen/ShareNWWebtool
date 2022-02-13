import React from 'react';

import '../../../../css/React/Editors/LabeledElement.css';
import { DropdownList } from './DropdownList';
import { Color } from './Colors';

class LabeledDropdown extends React.Component
{
    static defaultProps = {
        isDisabled: false,
    }

    render()
    {
        let color = (this.props.isDisabled) ? Color.DisabledText : Color.EnabledText;
        return (
            <div className='labeled-container'>
                <label style={{color: color}}>{this.props.label}</label>
                <div className='labeled-element'>
                    <DropdownList 
                        options={this.props.options}
                        selected={this.props.selected}
                        onChange={(value) => { this.props.onChange(value); }}
                        isDisabled={this.props.isDisabled}
                    />
                </div>
            </div>
        );
    }
}

export { LabeledDropdown };