import React from 'react';

class TextField extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.initialValue,
        };
        this._handleChange = this._HandleChange.bind(this);
    }

    render()
    {
        console.log('value: ' + this.state.value)
        return (<div 
            className='input-container'
            style={{
                display: 'flex', 
                alignItems: 'center',
                paddingBottom: 20,
                paddingTop: 20,
            }}
            >
            <label style={{paddingRight: this.props.labelPaddingRight}}>{this.props.labelName}</label>
            <textarea 
                rows={this.props.rows} 
                cols={this.props.cols} 
                style={{resize: 'none'}}
                onChange={this._handleChange}
                value={this.state.value}
            />
        </div>);
    }

    _HandleChange(event)
    {
        this.setState({
            value: event.target.value
        });
        this.props.onchange(event.target.value, this.props.id);
    }
}

export { TextField };