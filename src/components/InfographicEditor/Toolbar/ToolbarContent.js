import React from 'react';

class ToolbarContent extends React.Component 
{
    render()
    {
        return (
            <div className='toolbar-content'>
               {this.props.display}
            </div>
        );
    }
}

export { ToolbarContent };