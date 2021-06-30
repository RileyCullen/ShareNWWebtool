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
        this._infog = 0;
        this._previousInfographic = '';
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
        this._previousInfographic = this.props.infographic;
        this._DrawInfographic();
    }

    componentDidUpdate()
    {
        /**
         * TODO current expr does redraw infographic when user clicks on same button
         * again.
         */
        var expr = (this.props.infographic !== this._previousInfographic);
        if (expr) {
            this._DrawInfographic();
        } else {
            // update
        }
        this._previousInfographic = this.props.infographic;
    }

    _DrawInfographic()
    {
        document.fonts.ready.then(() => {
            // if (infogObj !== undefined) infogObj.Remove();

            switch(this.props.infographic) {
                case 'HIVTemplateOne': 
                    this._infogObj = new HIVTemplateOne({
                        editorHandler: (editor) => { this.props.editorHandler(editor); },
                        textHandler: (textElem) => { this.props.textHandler(textElem); }
                    });
                    break;
                case 'ObesityTemplateOne': 
                    this._infogObj = new ObesityTemplateOne({
                        editorHandler: (editor) => { this.props.editorHandler(editor); },
                        textHandler: (textElem) => { this.props.textHandler(textElem); }
                    });
                    break;
                case 'ViolenceTemplateOne': 
                    this._infogObj = new ViolenceTemplateOne({
                        editorHandler: (editor) => { this.props.editorHandler(editor); },
                        textHandler: (textElem) => { this.props.textHandler(textElem); }
                    });
                    break;
                case 'DiabetesTemplateOne':
                    this._infogObj = new DiabetesTemplateOne({
                        editorHandler: (editor) => { this.props.editorHandler(editor); },
                        textHandler: (textElem) => { this.props.textHandler(textElem); }
                    });
                    break;
            }
            this._infogObj.CreateInfographic();
            this._infogObj.Draw();
        });
    }
}

export { CanvasContainer };