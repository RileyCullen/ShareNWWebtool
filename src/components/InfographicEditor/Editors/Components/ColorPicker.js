import React from 'react';

class ColorPicker extends React.Component 
{
    static defaultProps = {
        isDisabled: false,
    }

    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.color,
            id: this.props.id,
            isDisabled: this.props.isDisabled,
        }
        this._handleChange = this._HandleChange.bind(this);
    }

    render()
    {
        return (
            <div className='color-picker'>
                <input type='color' value={this.state.value} 
                    onChange={this._handleChange}
                    disabled={this.state.isDisabled}></input>
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

    static getDerivedStateFromProps(props, state)
    {
        if (props.id !== state.id) {
            return {
                value: props.color,
                id: props.id,
                isDisabled: props.isDisabled
            };
        }
        return null;
    }
}

export { ColorPicker };