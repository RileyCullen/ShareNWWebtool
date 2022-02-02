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

    componentDidUpdate(prevProps)
    {
        if (prevProps.initialValue !== this.props.initialValue) {
            this.setState({ value: this.props.initialValue});
        }
    }

    /**
     * @summary     Event handler that is called when textarea content is change.
     * @description This function updates this component's state and then passes 
     *              the component's id and value to the caller component.
     * @param {Event} event The textarea event.
     */
    _HandleChange(event)
    {
        let regex = event.target.value.match("\n+| +");
        if (regex && regex.length >= 1) return;
        this.setState({
            value: event.target.value
        });
        this.props.onChange(event.target.value, this.props.index);
    }
}

export { TextField };