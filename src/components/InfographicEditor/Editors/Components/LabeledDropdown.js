import React from 'react';

import '../../../../css/React/Editors/LabeledElement.css';
import { DropdownList } from './DropdownList';

class LabeledDropdown extends React.Component
{
    render()
    {
        return (
            <div className='labeled-container'>
                <label>{this.props.label}</label>
                <div className='labeled-element'>
                    <DropdownList 
                        options={this.props.options}
                        selected={this.props.selected}
                        onChange={(value) => { this.props.onChange(value); }}
                    />
                </div>
            </div>
        );
    }
}

export { LabeledDropdown };