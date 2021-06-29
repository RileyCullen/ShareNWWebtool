import React from 'react';

class BarElement extends React.Component
{
    render()
    {
        return (
            <button className='tablinks'
                onClick={() => {this.props.setInfographic(this.props.infogName)}}>
                {this.props.displayText}
            </button>
        );
    }
}

export { BarElement };