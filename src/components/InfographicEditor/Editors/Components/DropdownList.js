import React from 'react';

class DropdownList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.selected,
        }
        this._handleChange = this._HandleChange.bind(this);
    }

    render()
    {
        return (
            <div>
                <select value={this.state.value} onChange={this._handleChange}>
                    {
                        this.props.options.map(d => {
                            return (<option value={d}>{d}</option>)
                        })
                    }
                </select>
            </div>
        );
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.selected !== this.props.selected) {
            this.setState({
                value: this.props.selected,
            })
        }
    }

    _HandleChange(event)
    {
        this.setState({
            value: event.target.value
        });
        this.props.onChange(event.target.value);
    }
}

export { DropdownList };