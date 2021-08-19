import React from 'react';

class TextField extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.initialValue,
            id: this.props.id
        };
        this._handleChange = this._HandleChange.bind(this);
    }

    render()
    {
        return (<div 
            className='input-container'
            >
            <textarea 
                rows={this.props.rows} 
                cols={this.props.cols} 
                style={{resize: 'none', textAlign: 'center'}}
                onChange={this._handleChange}
                value={this.state.value}
            />
        </div>);
    }

    static getDerivedStateFromProps(props, state)
    {
        if (props.id !== state.id) {
            return {
                value: props.initialValue,
                id: props.id
            };
        }
        return null;
    }

    /**
     * @summary     Event handler that is called when textarea content is change.
     * @description This function updates this component's state and then passes 
     *              the component's id and value to the caller component.
     * @param {Event} event The textarea event.
     */
    _HandleChange(event)
    {
        this.setState({
            value: event.target.value
        });
        this.props.onChange(event.target.value, this.props.index);
    }
}

export { TextField };