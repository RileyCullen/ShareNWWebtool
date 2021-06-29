import React from 'react';

class CanvasContainer extends React.Component
{
    render()
    {
        return (
            <div id='canvas-container'>
            </div>
        );
    }

    componentDidMount()
    {
        // Once <div> is loaded, run Konva.js scripts
    }
}

export {CanvasContainer};