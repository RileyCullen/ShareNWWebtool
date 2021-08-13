import React from 'react';

import { TextField } from './TextField';

class LabeledTextField extends React.Component
{
    render()
    {
        return (
            <div style={{display: 'flex'}}>
                <label>{this.props.label}</label>
                <TextField 
                    id={this.props.index}
                    index={this.props.index}
                    initialValue={this.props.initialValue}
                    rows={this.props.rows}
                    cols={this.props.cols}
                    onchange={(d, i) => { this.props.onchange(d, i); }}/>
            </div>
        );
    }
}

export { LabeledTextField };