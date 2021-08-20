// Cullen, Riley
// CanvasContainer.js
// June 28, 2021

import React from 'react';
import { HIVTemplateOne, ObesityTemplateOne, ViolenceTemplateOne, 
    DiabetesTemplateOne } from '../../js/InfographicTemplates/index';
import '../../css/React/CanvasContainer.css';

/**
 * Container class that holds the canvas (and related rendering functions) used 
 * to draw the infographics to the screen.
 */
class CanvasContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this._infogObj = 0;
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
            this.props.editorHandler('none');
            this._DrawInfographic();
        } else {
            if (this.props.isRemoving) {
                this._infogObj.Remove();
            } else if (this.props.clearSelection) {
                this._infogObj.ClearSelection()
            } else {
                this._infogObj.UpdateTextHandler(this.props.textElem);
                this._infogObj.UpdateChartData(this.props.chartData);
                this._infogObj.UpdateChartSettings(this.props.cSettings);
            }
        }
        this._previousInfographic = this.props.infographic;
    }

    /**
     * @summary Draws the infographic on the canvas using Konva. 
     */
    _DrawInfographic()
    {
        document.fonts.ready.then(() => {

            if (this._infogObj) this._infogObj.Clean();
            
            var handlerObj = {
                editorHandler: (editor) => { this.props.editorHandler(editor); },
                textHandler: (textElem) => { this.props.textHandler(textElem); },
                chartHandler: (data, cSettings, dSettings) => { this.props.chartHandler(data, cSettings, dSettings); },
                graphicHandler: (settings) => { this.props.graphicHandler(settings); }
            };

            switch(this.props.infographic) {
                case 'HIVTemplateOne': 
                    this._infogObj = new HIVTemplateOne(handlerObj);
                    break;
                case 'ObesityTemplateOne': 
                    this._infogObj = new ObesityTemplateOne(handlerObj);
                    break;
                case 'ViolenceTemplateOne': 
                    this._infogObj = new ViolenceTemplateOne(handlerObj);
                    break;
                case 'DiabetesTemplateOne':
                    this._infogObj = new DiabetesTemplateOne(handlerObj);
                    break;
                default:
                    this._infogObj = new HIVTemplateOne(handlerObj);
                    break;
            }
            this._infogObj.CreateInfographic();
            this._infogObj.Draw();
            this.props.dimensionHandler(this._infogObj.GetDimensions());
        });
    }
}

export { CanvasContainer };