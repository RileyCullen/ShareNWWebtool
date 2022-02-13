import React from 'react';

class Checkbox extends React.Component
{
    static defaultProps = {
        isDisabled: false,
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isSelected: this.props.initialValue,
            isDisabled: this.props.isDisabled,
        }
        this.handleChange = this._HandleChange.bind(this);
    }

    render()
    {
        let size = '25px';
        return (
            <div className='input-container'>
                <input type='checkbox'
                    style={{
                        width: size,
                        height: size
                    }}
                    onChange={() => { this._HandleChange(); }}
                    checked={this.state.isSelected}
                    disabled={this.state.isDisabled}></input>
            </div>
        );
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.initialValue !== this.props.initialValue) {
            this.setState({
                isSelected: this.props.initialValue,
            });
        } 

        if (prevProps.isDisabled !== this.props.isDisabled) {
            this.setState({
                isDisabled: this.props.isDisabled,
            });
        }
    }

    _HandleChange()
    {
        this.setState({
            isSelected: !this.state.isSelected,
        });
        this.props.onClick(!this.state.isSelected);
    }
}

export { Checkbox };