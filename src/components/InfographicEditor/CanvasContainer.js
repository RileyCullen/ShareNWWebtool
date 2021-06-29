// Cullen, Riley
// CanvasContainer.js
// June 28, 2021

import React from 'react';
import { HIVTemplateOne, ObesityTemplateOne, ViolenceTemplateOne, 
    DiabetesTemplateOne } from '../../js/InfographicTemplates/index';

/**
 * Container class that holds the canvas (and related rendering functions) used 
 * to draw the infographics to the screen.
 */
class CanvasContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this._stage = 0;
        this._layer = 0;
    }

    render()
    {
        return (
            <div id='canvas-container'>
            </div>
        );
    }

    /**
     * @summary     Draws infographic to canvas using KonvaJS.
     * @description This function is responsible for drawing the selected 
     *              infographic to the cavnas and is called immediately after
     *              render().
     */
    componentDidMount()
    {
        this._DrawInfographic();
    }

    componentDidUpdate()
    {
        this._DrawInfographic();
    }

    _DrawInfographic()
    {
        var infogObj;
        document.fonts.ready.then(() => {
            // if (infogObj !== undefined) infogObj.Remove();

            switch(this.props.infographic) {
                case 'HIVTemplateOne': 
                    infogObj = new HIVTemplateOne();
                    break;
                case 'ObesityTemplateOne': 
                    infogObj = new ObesityTemplateOne();
                    break;
                case 'ViolenceTemplateOne': 
                    infogObj = new ViolenceTemplateOne();
                    break;
                case 'DiabetesTemplateOne':
                    infogObj = new DiabetesTemplateOne();
                    break;
            }
            infogObj.CreateInfographic();
            infogObj.Draw();
        });
    }
}

export { CanvasContainer };