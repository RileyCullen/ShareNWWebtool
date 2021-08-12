import React from 'react';

class ColorPicker extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.color
        }
        this._handleChange = this._HandleChange.bind(this);
    }

    render()
    {
        return (
            <div className='color-picker'>
                <input type='color' value={this.state.value} onChange={this._handleChange}></input>
            </div>
        );
    }

    _HandleChange(event)
    {
        this.setState({
            value: event.target.value,
        });
        this.props.onChange(event.target.value);
    }
}

export { ColorPicker };