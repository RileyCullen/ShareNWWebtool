import React from 'react';

class Checkbox extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isSelected: this.props.initialValue,
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
                    checked={this.state.isSelected}></input>
            </div>
        );
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