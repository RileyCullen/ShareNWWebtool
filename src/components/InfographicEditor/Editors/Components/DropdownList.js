import React from 'react';

class DropdownList extends React.Component
{
    static defaultProps = {
        isDisabled: false,
    }

    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.selected,
            isDisabled: this.props.isDisabled,
        }
        this._handleChange = this._HandleChange.bind(this);
    }

    render()
    {
        return (
            <div>
                <select value={this.state.value} onChange={this._handleChange}
                    disabled={this.state.isDisabled}>
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
            this.setState({ value: this.props.selected });
        }

        if (prevProps.isDisabled !== this.props.isDisabled) {
            this.setState({ isDisabled: this.props.isDisabled });
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