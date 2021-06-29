// Cullen, Riley
// CanvasContainer.js
// June 28, 2021

import React from 'react';

/**
 * Container class that holds the canvas (and related rendering functions) used 
 * to draw the infographics to the screen.
 */
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