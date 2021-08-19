import React from 'react';

class Slider extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.value,
            id: this.props.id,
        }

        this._handleChange = this._HandleChange.bind(this);
    }

    render()
    {
        return (
            <div>
                <input 
                    type='range'
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    value={this.state.value}
                    onChange={(event) => { this._handleChange(event); }}
                    style={{width: this.props.width}}
                >
                </input>
            </div>
        );
    }

    static getDerivedStateFromProps(props, state)
    {
        if (props.id !== state.id) {
            return {
                value: props.value,
                id: props.id
            };
        }
        return null;
    }

    _HandleChange(event)
    {
        this.setState({
            value: event.target.value,
        });
        this.props.onChange(this.state.value);
    }
}

export { Slider };