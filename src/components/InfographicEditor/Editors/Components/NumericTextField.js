import React from 'react';

import { TextField } from './TextField';

class NumericTextField extends React.Component
{
    render() {
        return (
            <TextField 
                id={this.props.id}
                index={this.props.index}
                initialValue={this.props.initialValue}
                rows={this.props.rows}
                cols={this.props.cols}
                onChange={(d, i) => {
                    if (d === '' || isNaN(d) || (this.props.onlyPositive && d < 0)) return; 
                    this.props.onChange(d, i); 
                }}
            />
        )
    }
}

export { NumericTextField };