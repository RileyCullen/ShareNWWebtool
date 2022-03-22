import React from 'react';

import '../../../../css/React/Editors/FirefoxDefault.css';

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
        }
        this._handleChange = this._HandleChange.bind(this);
    }

    render()
    {
        return (
            <div className='color-picker'>
                <input type='color' value={this.state.value} 
                    onChange={this._handleChange}
                    disabled={this.props.isDisabled}></input>
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
            };
        }
        return null;
    }
}

export { ColorPicker };