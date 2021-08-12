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
        return (<div 
            className='input-container'
            style={{
                display: 'flex', 
                alignItems: 'center',
                paddingBottom: 20,
                paddingTop: 20,
            }}
            >
            <textarea 
                rows={this.props.rows} 
                cols={this.props.cols} 
                style={{resize: 'none'}}
                onChange={this._handleChange}
                value={this.state.value}
            />
        </div>);
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
        this.props.onchange(event.target.value, this.props.id);
    }
}

export { TextField };