// Cullen, Riley
// AInfographic.js
// October 26, 2020 

import Konva from 'konva';
import html2canvas from 'html2canvas';
import { ChartHandler, GraphicsHandler, TextHandler } from '../Handlers/index';

class AInfographic 
{
    /**
     * @summary     An abstract class the provide structure and common functionality
     *              to the Infographic type.
     * @description See summary.
     * 
     * @requires D3.js
     * @requires Konva.js
     * 
     * @source _AddTextSelection() uses code from https://konvajs.org/docs/sandbox/Editable_Text.html
     * @source Selecting mutliple elements demo uses code from https://konvajs.org/docs/select_and_transform/Basic_demo.html#page-title
     * @source _DrawSVG code taken from https://konvajs.org/docs/sandbox/SVG_On_Canvas.html
     * 
     * @param {double} height The height of the canvas element
     * @param {double} width  The width of the canvas element
     */
    constructor(height, width, editorHandler, textCallback, chartCallback, graphicCallback)
    {
        if (AInfographic === this.constructor) {
            throw new TypeError('Abstract class "AInfographic" cannot be instantiated');
        }

        if (this.CreateInfographic === undefined) {
            throw new TypeError('Types extending "AInfographic" must implement CreateInfographic()');
        }

        if (this.Draw === undefined) {
            throw new TypeError('Types extending "AInfographic" must implement Draw()');
        }

        this._chartHandler = new ChartHandler();
        this._textHandler = new TextHandler();
        this._graphicsHandler = new GraphicsHandler();

        this._tr = new Konva.Transformer({
            nodes: [],
            resizeEnabled: false,
            rotateEnabled: false,
        });

        this._chartHeight = height;
        this._chartWidth = width;
        this._stage = new Konva.Stage({
            container: 'canvas-container',
            width: this._chartWidth,
            height: this._chartHeight,
        });

        /*this._selectionRectangle = new Konva.Rect({
            fill: 'rgba(0, 0, 255, 0.5)',
            visible: false,
        });
        this._hasSelected = false;
        this._isSelecting = false;
        this._oldNodes = [];
        this._mouseX1 = 0, this._mouseX2 = 0, this._mouseY1 = 0, this._mouseY2 = 0;*/

        this._main = new Konva.Layer();
        // this._UIAdder = new UIAdder(this._chartWidth, this._chartHeight);

        this._editorHandler = editorHandler;
        this._textCallback = textCallback;
        this._chartCallback = chartCallback;
        this._graphicCallback = graphicCallback;

        this._selectedTextIndex = -1;
        this._selectedTextHelper = -1;
        this._selectedChartIndex = -1;
        this._selectedGraphicIndex = -1;

        this._stage.add(this._main);

        this._main.add(this._tr);

        this._AddStageBorder();
    }

    /**
     * @summary     Returns chart's dimensions to caller.
     * @description Returns the chart's width and height in the form of a JSON
     *              object to the caller.
     * @returns A JSON object containing the chart's width and height.
     */
    GetDimensions()
    {
        return {
            width: this._chartWidth,
            height: this._chartHeight,
        };
    }

    /**
     * @summary     Manages memory for infographic type.
     * @description A function that is responsible for freeing memory that would 
     *              otherwise cause memory leaks. 
     */
    Clean()
    {
        // Remove chart/text listeners
        this._RemoveTextListeners();
        this._RemoveChartListeners();
        this._RemoveGraphicListeners();

        // Remove all the elements from this._stage
        this._stage.destroy();
        this._stage = 0;
    }

    ClearSelection()
    {
        this._tr.nodes([]);
        this._selectedChartIndex = -1;
        this._selectedGraphicIndex = -1;
        this._selectedTextIndex = this._selectedTextHelper = -1;
    }

    /**
     * @summary Removes the event listeners from each text node.
     */
    _RemoveTextListeners()
    {
        var selection = this._stage.find((node) => {
            return node.hasName('Selectable') && node.hasName('EditableText');
        });
        selection.forEach(textElem => { textElem.off('dblclick'); })
    }

    /**
     * @summary Removes the event listeners from each chart node.
     */
    _RemoveChartListeners()
    {
        var selection = this._stage.find((node) => {
            return node.hasName('Selectable') && node.hasName('Chart');
        });
        selection.forEach(chartElem => { chartElem.off('dblclick'); })
    }

    _RemoveGraphicListeners()
    {
        var selection = this._stage.find((node) => {
            return node.hasName('Graphic');
        });
        selection.forEach(group => { group.off('dblclick'); });
    }

    _CreateImage({x, y, width, height, src, group})
    {
        let image = new Image(), imageHelper = new Konva.Image(),
            imageGroup = new Konva.Group();

        image.onload = () => {
            imageHelper.setAttrs({
                x: x, 
                y: y,
                height: height,
                width: width,
                image: image,
                opacity: 1,
                stroke: 'black',
                strokeWidth: 0
            });
            imageHelper.cache();
            imageHelper.filters([
                Konva.Filters.Contrast,
                Konva.Filters.Brighten,
                Konva.Filters.Blur,
            ]);

            imageHelper.brightness(0);
            imageHelper.blurRadius(0);
            imageHelper.contrast(0);

            this._main.batchDraw();
            image.onload = null;
        };

        image.src = src;
        imageGroup.add(imageHelper);
        group.add(imageGroup);
        this._graphicsHandler.AddGraphic({
            type: 'image',
            graphic: imageHelper,
            group: imageGroup,
        });
    }

    /**
     * @summary     A function that takes in a font and a font weight and maps it
     *              to the proper quill code.
     * 
     * @param {string} font   The font associated with a quill code.
     * @param {int}    weight The weight associated with a quill code. 
     */
    _quillMap(font, weight = 0)
    {
        if (font === 'museo' && weight === 900) return '900-museo';
        else if (font === 'canada-type-gibson') {
            switch (weight) {
                case 100: return '100-canada';
                case 200: return '200-canada';
                case 400: return '400-canada';
                case 500: return '500-canada';
                case 600: return '600-canada';
                case 700: return '700-canada';
                case 900: return '900-canada';
                default: return '100-canada';
            }
        } else if (font === 'Montserrat') return '200-Montserrat';
        else if (font === 'Open Sans') return 'Open-Sans';
        else if (font === 'Roboto') {
            switch(weight) {
                case 100: return '100-Roboto';
                case 300: return '300-Roboto';
                case 400: return '400-Roboto';
                case 500: return '500-Roboto';
                case 700: return '700-Roboto';
                case 900: return '900-Roboto';
                default: return '100-Roboto';
            }
        }
    }

    /**
     * @summary     Adds a black border around the edges of the canvas element.
     */
    _AddStageBorder()
    {
        var bkg = new Konva.Rect({
            x: 0,
            y: 0,
            width: this._stage.width(),
            height: this._stage.height(),
            fill: 'white',
            stroke: 'black',
        });
        this._main.add(bkg);
        bkg.moveToBottom();
    }

    /**
     * @summary     Returns the width of a text element given the text's font.
     * @description Using canvas' measureText function, _GetTextWidth returns the
     *              width in pixels of a given piece of text.
     * 
     * @param {string} text       The text we want to determine the width of.
     * @param {double} fontSize   The font size of the text we want to find the width of.
     * @param {string} fontFamily The font family of the text we want to analyze.
     */
    _GetTextWidth(text, fontSize, fontFamily)
    {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        ctx.font = fontSize + 'px ' + fontFamily;
        var helper = ctx.measureText(text).width;
        canvas.remove();

        return helper;
    }
    /**
     * @param {double} width  The width of the element we are centering.
     * @param {double} center The x-coordinate we want to center about.
     */
    _CenterXAbout(width, center)
    {
        return center - (width / 2);
    }

    /**
     * @summary     Calls additional functions to complete the infographic.
     * @description Renders all of the text elements and adds the capability to 
     *              edit graphs and text elements.
     */
    _FinalizeInfog()
    {
        this._RenderText();
        this._AddGraphSelection();
        this._AddTextSelection();
        this._AddGraphicSelection();
        // this._AddMultipleElementSelector();
    }

    /**
     * @summary     Renders all of the text elements.
     * @description Iterates through all of the elements in textHandler and converts
     *              them from DOM elements to Konva.Image elements.
     */
    _RenderText()
    {
        var helperElem = document.createElement('div');
        helperElem.style.position = 'absolute';
        document.getElementById('renderHelper').appendChild(helperElem);

        for (var i = 0; i < this._textHandler.GetSize(); i++) {
            helperElem.appendChild(this._textHandler.GetTextElem(i));
            this._HTMLToCanvas('.EditableText', i);
            this._textHandler.GetTextElem(i).remove();
        }
        helperElem.remove();
    }

    /**
     * @summary     Converts DOM elements on the page to Konva.Image elements
     * @description Uses the html2canvas module to convert DOM elements located 
     *              within the body into Konva.Image elements.
     * 
     * @param {int} index The index of the text element we want to convert.
     */
    _HTMLToCanvas(query, index)
    {
        var element = document.querySelector(query);
        // var comp = window.getComputedStyle(element, null);
        html2canvas(element, {
            logging: false,
            backgroundColor: null,
            scrollY: -(window.scrollY),
            // width: comp.width.replace('px', ''),
        }).then((image) => {
            // console.log('image width: ' + image.width)
            this._textHandler.GetImage(index).image(image);
            this._main.batchDraw();
        }).catch(() => {
            var helperElem = document.createElement('div');
            helperElem.style.position = 'absolute';
            document.getElementById('renderHelper').appendChild(helperElem);

            helperElem.appendChild(this._textHandler.GetTextElem(index));
            this._HTMLToCanvas('.EditableText', index);
            this._textHandler.GetTextElem(index).remove();
            helperElem.remove();
        });
        /*console.log('width: ' + comp.width);
        console.log('height: ' + comp.height);
        console.log('x: ' + comp.x);
        console.log('y: ' + comp.y)*/
    }

    /**
     * @summary     Adds the capability to select and edit text.
     * @description Iterates through all of the elements in the text handler and
     *              adds an event listener that triggers when the text element
     *              is double clicked.
     */
    _AddTextSelection()
    {
        var selection = this._stage.find((node) => {
            return node.hasName('Selectable') && node.hasName('EditableText');
        });

        selection.forEach((textElem) => {
            textElem.on('dblclick', () => {
                console.log(textElem)
                textElem.setAttr('draggable', true);

                this._tr.nodes([textElem]);
                this._tr.moveToTop();
                this._main.batchDraw();

                this._selectedTextIndex = textElem.getAttr('id');
                this._selectedTextHelper = this._selectedTextIndex;
  
                this._textCallback(this._textHandler.GetHandlerElem(this._selectedTextIndex))
                this._editorHandler('text-editor');

                setTimeout(() => {
                    this._stage.on('click', HandleOutsideClick);
                });

                var HandleOutsideClick = (e) => {
                    if (e.target !== textElem) {
                        this._selectedTextIndex = -1;
                        this._editorHandler('none');
                        this._tr.nodes([]);
                        textElem.setAttr('draggable', false);
                        this._main.batchDraw();
                        this._stage.off('click', HandleOutsideClick);
                    }
                };
            });
        });
    }

    /**
     * @summary     Updates current handler element.
     * @description Updates the text handler element located at _selectedTextIndex
     *              with data from the parameterized textElem variable.
     * 
     * @param {JSON} textElem A JSON object containing the updated textElem information.
     */
    UpdateTextHandler(textElem)
    {
        if (textElem.image === undefined || textElem.textElem === undefined || 
            textElem.group === undefined || textElem.spanCSS === undefined || 
            textElem === 0) {
            return;
        } 
        console.log('index: ' + this._selectedTextHelper);
        this._textHandler.UpdateTextElem({
            index: this._selectedTextHelper,
            textElem: textElem.textElem,
            group: textElem.group,
            image: textElem.image,
            spanCSS: textElem.spanCSS,
        });
        console.log(this._textHandler);
        this._selectedTextHelper = -1;
    }

    Remove()
    {
        // TODO remove entries from handler
        if (this._selectedChartIndex !== -1) {
            this._tr.nodes([]);
            this._main.batchDraw();
            this._chartHandler.RemoveHandlerElem(this._selectedChartIndex);
            this._selectedChartIndex = -1;
        } else if (this._selectedTextIndex !== -1) {
            this._tr.nodes([]);
            this._main.batchDraw();
            this._textHandler.RemoveHandlerElem(this._selectedTextIndex);
            this._selectedChartIndex = -1;
        } else if (this._selectedGraphicIndex !== -1) {
            this._tr.nodes([]);
            this._main.batchDraw();
            this._graphicsHandler.RemoveHandlerElem(this._selectedGraphicIndex);
            this._selectedGraphicIndex = -1;
        }
    }

    /**
     * @summary     Updates the selected chart.
     * @description Updates the chart (and its associated data) at index 
     *              _selectedChartIndex.
     * @param {misc} chartData The structure of this variable depends on the 
     *                         type of chart we are dealing with.
     */
    UpdateChartData(chartData)
    {
        if (chartData === 0 || this._selectedChartIndex === -1) return;
        var elem = this._chartHandler.GetHandlerElem(this._selectedChartIndex),
            name = elem.group.getAttr('name');
        if (name === 'Selectable Chart Waffle') {
            // We assume that the data will be formatted as follows
            // data = {
            //    numerator: {num}, denominator: {num}
            // }
            if (chartData.numerator === 0 || chartData.denominator === 0) return;
            var numerator = chartData.numerator, denominator = chartData.denominator;
            elem.chart.UpdateData(parseInt(numerator), parseInt(denominator));
        } else if (name === 'Selectable Chart Bar') {
            // We assume that the data will be formated as follows
            // data = [
            //    { category: {string}, value: {float}, color: {string}}, ...   
            // ]
            elem.chart.UpdateData(chartData);
        } else if (name === 'Selectable Chart Icon') {
            // We assume that the data will be formatted like the bar chart 
            elem.chart.UpdateData(chartData);
        }

        this._UpdateDecorators(elem);
    }

    /**
     * @summary     Updates decorators.
     * @description Iterates though all the decorators in handlerElem and updates
     *              them.
     * 
     * @param {JSON} handlerElem 
     */
    _UpdateDecorators(handlerElem)
    {
        var prev = handlerElem.chart;
        for (var i = 0; i <= handlerElem.decoratorSize; i++) {
            handlerElem.decorators[i].UpdateDecorator(prev);
            prev = handlerElem.decorators[i];
        }
        prev.CreateChart();
        this._tr.forceUpdate();
        this._main.batchDraw();
    }

    /**
     * @summary     Adds the capability to select and edit graphs.
     * @description Iterates through all of the elements in the graph handler and
     *              adds an event listener when they are double clicked on.
     */
    _AddGraphSelection()
    {
        var selection = this._stage.find((node) => {
            return node.hasName('Selectable') && node.hasName('Chart');
        });
        selection.forEach((chart) => {
            chart.on('dblclick', () => {
                this._selectedChartIndex = parseInt(chart.getAttr('id'));
                this._tr.nodes([chart]);
                this._tr.moveToTop();
                this._main.batchDraw();
                chart.setAttr('draggable', true);

                let selectedChart = this._chartHandler.GetHandlerElem(this._selectedChartIndex).chart,
                    dSettings = this._chartHandler.GetDecoratorSettingsArray(this._selectedChartIndex);
                this._chartCallback(selectedChart.GetData(), selectedChart.GetChartSettings(), dSettings);

                if (chart.getAttr('name') === 'Selectable Chart Waffle') {
                    this._editorHandler('waffle-editor');
                } else if (chart.getAttr('name') === 'Selectable Chart Pie') {
                    this._editorHandler('pie-editor');
                } else if (chart.getAttr('name') === 'Selectable Chart Bar') {
                    this._editorHandler('bar-editor')
                } else if (chart.getAttr('name') === 'Selectable Chart Stacked') {
                    this._editorHandler('stacked-bar-editor');
                } else if (chart.getAttr('name') === 'Selectable Chart Line') {
                    this._editorHandler('line-editor');
                } else if (chart.getAttr('name') === 'Selectable Chart Icon') {
                    this._editorHandler('icon-bar-editor');
                } else if (chart.getAttr('name') === 'Selectable Chart Donut') {
                    this._editorHandler('donut-editor');
                }

                setTimeout(() => {
                    this._stage.on('click', HandleOutsideClick);
                });

                var HandleOutsideClick = (e) => {
                    if (e.target !== chart) {
                        this._selectedChartIndex = -1;
                        this._editorHandler('none');
                        this._tr.nodes([]);
                        chart.setAttr('draggable', false);
                        this._main.batchDraw();
                        this._stage.off('click', HandleOutsideClick);
                    }
                };
            });
        });
    }

    _AddGraphicSelection()
    {
        var selection = this._stage.find((node) => {
            return node.hasName('Graphic');
        });

        selection.forEach((group) => {
            group.on('dblclick', () => {
                this._selectedGraphicIndex = group.getAttr('id');
                let type = this._graphicsHandler.GetType(this._selectedGraphicIndex);
                this._tr.nodes([group]);
                this._tr.moveToTop();
                this._main.batchDraw();
                group.setAttr('draggable', true);

                this._editorHandler(type + '-editor');

                this._graphicCallback(
                    this._graphicsHandler.GetSettings(this._selectedGraphicIndex)
                );

                setTimeout(() => {
                    this._stage.on('click', HandleOutsideClick);
                });

                var HandleOutsideClick = (e) => {
                    if (e.target !== group) {
                        this._selectedGraphicIndex = -1;
                        this._tr.nodes([]);
                        group.setAttr('draggable', false);
                        this._main.batchDraw();
                        this._editorHandler('none');
                        this._stage.off('click', HandleOutsideClick);
                    }
                };
            });
        });
    }

    _AddMultipleElementSelector()
    {
        this._main.add(this._selectionRectangle);
        this._MultipleSelectorStart();
        this._MultipleSelectorMove();
        this._MultipleSelectorEnd();
        this._MultipleSelectorDeselect();
    }

    _MultipleSelectorStart()
    {
        this._stage.on('mousedown touchstart', e => {
            //if (e.target !== this._stage) return;
            this._isSelecting = true;

            this._mouseX1 = this._stage.getPointerPosition().x;
            this._mouseX2 = this._mouseX1;
            this._mouseY1 = this._stage.getPointerPosition().y;
            this._mouseY2 = this._mouseY1;

            this._selectionRectangle.visible(true);
            this._selectionRectangle.width(0);
            this._selectionRectangle.height(0);
            this._main.batchDraw();
        });
    }

    _MultipleSelectorMove()
    {
        this._stage.on('mousemove touchmove', () => {
            if (!this._selectionRectangle.visible()) return;

            this._mouseX2 = this._stage.getPointerPosition().x;
            this._mouseY2 = this._stage.getPointerPosition().y;

            this._selectionRectangle.setAttrs({
                x: Math.min(this._mouseX1, this._mouseX2),
                y: Math.min(this._mouseY1, this._mouseY2),
                width: Math.abs(this._mouseX2 - this._mouseX1),
                height: Math.abs(this._mouseY2 - this._mouseY1),
            });

            this._main.batchDraw();
        });
    }

    _MultipleSelectorEnd()
    {
        this._stage.on('mouseup touchend', () => {
            if (!this._selectionRectangle.visible()) return;
            // selection code 
            var elems = this._stage.find('.Selectable').toArray();
            var box = this._selectionRectangle.getClientRect();
            /*var selected = elems.filter((element) => {
                if (Konva.Util.haveIntersection(box, element.getClientRect())) {
                    alert('h')
                    return element;
                }
                var x = element.getClientRect().x,
                    y = element.getClientRect().y;
                if (x >= box.x &&
                    x <= box.x + box.width &&
                    y >= box.y &&
                    y <= box.y + box.height)
                {
                    element.setAttr('draggable', true);
                    this._oldNodes.push(element);
                    return element;
                }
            });*/

            var selected = elems.filter((elem) =>
                Konva.Util.haveIntersection(box, elem.getClientRect())
            );
            console.log(selected)

            this._tr.nodes(selected);
            this._tr.moveToTop();
            this._main.batchDraw();

            setTimeout(() => {
                this._selectionRectangle.visible(false);
                this._main.batchDraw();
                this._hasSelected = true;
                this._isSelecting = false;
            });
        });
    }

    _MultipleSelectorDeselect()
    {
        this._stage.on('click tap', e => {
            if (this._selectionRectangle.visible()) return;
            if (this._hasSelected) {
                this._oldNodes.forEach(node => {
                    node.setAttr('draggable', false);
                });
                
                this._tr.nodes([]);
                this._main.batchDraw();
                this._hasSelected = false;
                return;
            }
        });
    }
}

export { AInfographic };