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
            } else if (this.props.insertType !== 'none') {
                if (this.props.insertType === 'text') this._infogObj.ClearSelection();
                this._infogObj.InsertElement({
                    type: this.props.insertType,
                    element: this.props.insertElement,
                });
            } else if (this.props.updateType !== 'none') {
                this._infogObj.UpdateElement({
                    type: this.props.updateType,
                    element: this.props.updateElement,
                });
                
                switch(this.props.updateElement) {
                    case 'Bar':
                        this.props.editorHandler('bar-editor');
                        break;
                    case 'Icon': 
                        this.props.editorHandler('icon-bar-editor');
                        break;
                    case 'Line':
                        this.props.editorHandler('line-editor');
                        break;
                    case 'Stacked':
                        this.props.editorHandler('stacked-bar-editor');
                        break;
                    case 'Waffle':
                        this.props.editorHandler('waffle-editor');
                        break;
                    case 'Donut':
                        this.props.editorHandler('donut-editor')
                        break;
                    case 'Pie':
                        this.props.editorHandler('pie-editor');
                        break;
                    default:
                        if (this.props.updateType === 'icon') {
                            this.props.editorHandler('icon-editor');
                        } else if (this.props.updateType === 'image') {
                            this.props.editorHandler('image-editor');
                        }
                        break;
                }
            } else if (this.props.layerAction !== 'none') {
                this._infogObj.UpdateLayering(this.props.layerAction);
            } else if (this.props.isDownloading) { 
                this._infogObj.Download();
            } else if (this.props.isUpdatingBackground) {
                this._infogObj.UpdateBackground(this.props.backgroundSettings);
            } else if (this.props.undo){
                this._infogObj.Undo();
            } else if (this.props.redo){
                this._infogObj.Redo();
            } else if (this.props.isUpdatingChartData) {
                this._infogObj.UpdateChartData(this.props.chartData);
            } else if (this.props.isUpdatingChartDecorators) {
                this._infogObj.UpdateChartDecorators(this.props.dSettings);  
            } else if (this.props.isUpdatingChartSettings) {
                this._infogObj.UpdateChartSettings(this.props.cSettings);
            } else if (this.props.isUpdatingGraphicSettings) {
                this._infogObj.UpdateGraphicSettings(this.props.graphicSettings);
            } else if (this.props.isUpdatingTextElem) {
                this._infogObj.UpdateTextHandler({
                    domText: this.props.domText,
                    image: this.props.textImage,
                    spanCSS: this.props.spanCSS,
                });
            }

            if (this.props.clearSelection === true && this.props.insertType !== 'text') {
                this._infogObj.ClearSelection();
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
                graphicHandler: (settings) => { this.props.graphicHandler(settings); },
                backgroundHandler: (settings) => { this.props.backgroundHandler(settings) },
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
            this.props.backgroundHandler(this._infogObj.GetBackgroundSettings());
        });
    }
}

export { CanvasContainer };