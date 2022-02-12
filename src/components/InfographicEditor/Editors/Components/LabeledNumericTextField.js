import React from 'react';

import { NumericTextField } from './NumericTextField';

class LabeledNumericTextField extends React.Component
{
    render()
    {
        return (
            <div className='labeled-text-field-container'>
                <label>{this.props.label}</label>
                <div className='labeled-text-field'>
                    <NumericTextField 
                        id={this.props.id}
                        index={this.props.index}
                        initialValue={this.props.initialValue}
                        rows={this.props.rows}
                        cols={this.props.cols}
                        onlyPositive={this.props.onlyPositive}
                        onChange={(d, i) => { this.props.onChange(d, i); }}
                        isDisabled={this.props.isDisabled}/>
                </div>
            </div>
        );
    }
}

LabeledNumericTextField.defaultProps = {
    isDisabled: false,
}

export { LabeledNumericTextField };