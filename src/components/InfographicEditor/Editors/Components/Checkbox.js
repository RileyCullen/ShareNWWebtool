import React from 'react';

class Checkbox extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isSelected: false,
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
                    }}></input>
            </div>
        );
    }

    _HandleChange()
    {
        this.setState({
            isSelected: !this.state.isSelected,
        });
        this.props.onClick();
    }
}

export { Checkbox };