// Cullen, Riley
// InfographicEditor.js
// June 28, 2021

import React from 'react';
import {CanvasContainer} from './CanvasContainer';

/**
 * Container for all of the react components related to editing infographics.
 */
class InfographicEditor extends React.Component
{
    render()
    {
        return (
            <CanvasContainer infographic={this.props.currentInfographic}/>
        );
    }
}

export {InfographicEditor};