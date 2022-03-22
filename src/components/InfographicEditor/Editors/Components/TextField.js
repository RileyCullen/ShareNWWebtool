import React from 'react';

import '../../../../css/React/Editors/FirefoxDefault.css';

class TextField extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.initialValue,
            id: this.props.id,
            isDisabled: this.props.isDisabled
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
                disabled={this.state.isDisabled}
            />
        </div>);
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.initialValue !== this.props.initialValue) {
            this.setState({ value: this.props.initialValue});
        }
        if (prevProps.isDisabled !== this.props.isDisabled) {
            this.setState({isDisabled: this.props.isDisabled });
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
        let value = event.target.value;

        // Prevents multiple lines from being inputted
        let regex = value.match("\n+");
        if (regex && regex.length >= 1) return;

        // Prevents multiple whitespace characters
        if (value.trim().length === 0 && value !== '') return;

        this.setState({
            value: value
        });
        this.props.onChange(value, this.props.index);
    }
}

TextField.defaultProps = {
    isDisabled: false,
}

export { TextField };