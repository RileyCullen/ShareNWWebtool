// Cullen, Riley
// AInfographic.js
// October 26, 2020 

import Konva from 'konva';
import html2canvas from 'html2canvas';
import { ChartHandler, GraphicsHandler, TextHandler } from '../Handlers/index';
import { AutoLayerCommand, BackgroundSettingsCommand, ChartDataCommand, ChartDecoratorCommand, 
    ChartSettingsCommand, 
    CommandManager, GraphicSettingsCommand, InsertHeaderCommand, InsertIconCommand, InsertImageCommand, InsertTextCommand, 
    LayerCommand, PositionCommand, RemoveChartCommand, RemoveGraphicCommand, 
    RemoveTextCommand, 
    ReplaceChartCommand, 
    ReplaceGraphicCommand, 
    TextContentCommand} from '../Commands/index'
import { InsertChartCommand } from '../Commands/EditorCommands/InsertChartCommand';
import QuillStateManager from '../../components/Helpers/QuillStateManager';
import { NotificationManager } from '../../components/Notfications/index';

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
     * @source Download code taken from https://konvajs.org/docs/data_and_serialization/High-Quality-Export.html
     * 
     * @param {double} height The height of the canvas element
     * @param {double} width  The width of the canvas element
     */
    constructor(height, width, editorHandler, textCallback, chartCallback, 
        graphicCallback, backgroundCallback)
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

        this._commandManager = new CommandManager();

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
        this._bkg = new Konva.Rect({
            x: 0,
            y: 0,
            width: this._stage.width(),
            height: this._stage.height(),
            fill: '#ffffff',
            stroke: 'black',
        });
        this._main.add(this._bkg);
        this._elementHolder = new Konva.Group();
        this._main.add(this._elementHolder);
        // this._UIAdder = new UIAdder(this._chartWidth, this._chartHeight);

        this._editorHandler = editorHandler;
        this._textCallback = textCallback;
        this._chartCallback = chartCallback;
        this._graphicCallback = graphicCallback;
        this._backgroundCallback = backgroundCallback;

        this._selectedTextIndex = -1;
        this._selectedChartIndex = -1;
        this._selectedGraphicIndex = -1;

        this._colorScheme = {
            primary: '#999',
            secondary: '#000',
        }

        this._stage.add(this._main);

        this._main.add(this._tr);
    }

    GetBackgroundSettings()
    {
        return this._bkg.getAttrs();
    }

    /**
     * !!!! UPDATE METHODS !!!! 
     */

    ClearSelection()
    {
        this._tr.nodes([]);
        this._selectedChartIndex = -1;
        this._selectedGraphicIndex = -1;
        this._selectedTextIndex = -1;
    }

    Download()
    {
        // function from https://stackoverflow.com/a/15832662/512042
        function downloadURI(uri, name) {
            var link = document.createElement('a');
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            link.remove();
        }
        var dataURL = this._stage.toDataURL({pixelRatio: 5})
        downloadURI(dataURL, 'Infographic.png');
    }

    UpdateLayering(layerAction)
    {
        let index = -1, handler = null;
        if (this._selectedChartIndex !== -1) {
            index = this._selectedChartIndex;
            handler = this._chartHandler;
        } else if (this._selectedGraphicIndex !== -1) {
            index = this._selectedGraphicIndex;
            handler = this._graphicsHandler;
        } else if (this._selectedTextIndex !== -1) {
            index = this._selectedTextIndex;
            handler = this._textHandler;
        }
        if (index !== -1) {
            let layerCommand = new LayerCommand({
                handler: handler,
                id: index,
                layerAction: layerAction
            });
            this._commandManager.Execute(layerCommand);
        }
    }

    UpdateBackground(settings)
    {
        if (settings === 0) return;
        this._commandManager.Execute(new BackgroundSettingsCommand({
            background: this._bkg,
            settings: settings,
        }));
    }

    /**
     * @summary Replace element
     * @param {*} param0 
     */
    UpdateElement({type, element})
    {
        if (this._selectedGraphicIndex !== -1) {
            this._commandManager.Execute(new ReplaceGraphicCommand({
                id: this._selectedGraphicIndex,
                handler: this._graphicsHandler,
                transformer: this._tr,
                main: this._main,
                element: element,
                colorScheme: this._colorScheme,
                infogWidth: this._chartWidth,
                infogHeight: this._chartHeight,
            }));
            this._graphicCallback(
                this._graphicsHandler.GetSettings(this._selectedGraphicIndex)
            );
        } else if (this._selectedChartIndex !== -1) {
            // Replace chart using ReplaceChartCommand object
            this._commandManager.Execute(new ReplaceChartCommand({
                targetType: element,
                id: this._selectedChartIndex,
                handler: this._chartHandler,
                transformer: this._tr,
                main: this._main,
                colorScheme: this._colorScheme,
            }));

            // Add event-listeners to new Konva.Group
            let group = this._chartHandler.GetGroup(this._selectedChartIndex);
            this._AddListeners(group, 'chart');
            this._ChartHelper(group);            

            // Get data, chart settings, and decorator settings and send it to
            // InfographicEditor so the UI components can be updated.
            let data = this._chartHandler.GetHandlerElem(this._selectedChartIndex)
                    .chart.GetData(),
                cSettings = this._chartHandler.GetSettingsArray(this._selectedChartIndex),
                dSettings = this._chartHandler.GetDecoratorSettingsArray(this._selectedChartIndex);
            this._chartCallback(data, cSettings, dSettings);
        }
        this._main.batchDraw();
    }

    InsertElement({type, element})
    {
        let group = new Konva.Group({
            x: this._chartWidth / 2,
            y: this._chartHeight / 2,
        }),
            insertCommand = null;
        this._elementHolder.add(group);
        if (type === 'chart') {
            insertCommand = new InsertChartCommand({
                chartType: element,
                group: group,
                colorScheme: this._colorScheme,
                handler: this._chartHandler,
                transformer: this._tr,
                main: this._main
            });
            this._commandManager.Execute(insertCommand);
            this._AddListeners(group, 'chart');
            this._ChartHelper(group);
        
        } else if (type === 'icon') {
            insertCommand = new InsertIconCommand({
                element: element,
                colorScheme: this._colorScheme,
                group: group,
                handler: this._graphicsHandler,
                transformer: this._tr,
                main: this._main
            });
            this._commandManager.Execute(insertCommand);

            this._AddListeners(group, 'graphic');
            this._GraphicHelper(group);
        } else if (type === 'text') {
            insertCommand = new InsertTextCommand({
                group: group,
                element: element,
                fontFamily: this._quillMap('museo', 900),
                handler: this._textHandler,
                transformer: this._tr,
                main: this._main
            });
            this._commandManager.Execute(insertCommand);

            // Render the text 
            let helperElem = document.createElement('div'),
                div = this._textHandler.GetTextElem(this._textHandler.GetCurrID());
            helperElem.style.position = 'absolute';
            document.getElementById('renderHelper').appendChild(helperElem);
            helperElem.appendChild(div);
            this._HTMLToCanvas('.EditableText', this._textHandler.GetCurrID());
            div.remove();
            helperElem.remove();

            let helper = this._textHandler.GetImage(this._textHandler.GetCurrID());
            this._AddListeners(helper, 'text');
            this._TextHelper(helper);
        } else if (type === 'bkg-elem') {
            group.x(0)
            group.y(0)
            insertCommand = new InsertHeaderCommand({
                element: element,
                colorScheme: this._colorScheme,
                group: group,
                handler: this._graphicsHandler,
                transformer: this._tr,
                main: this._main,
                infographicWidth: this._chartWidth,
                infographicHeight: this._chartHeight,
            });
            this._commandManager.Execute(insertCommand);
            this._AddListeners(group, 'graphic');
            this._GraphicHelper(group);
        }
        else if (type === 'image'){
            var imageHelper = new Konva.Image();
            group.add(imageHelper);
            insertCommand = new InsertImageCommand({
                image: element,
                imageHelper: imageHelper,
                group: group,
                handler: this._graphicsHandler,
                transformer: this._tr,
                main: this._main,
            });
            this._commandManager.Execute(insertCommand);
            this._AddListeners(group, 'graphic');
            this._GraphicHelper(group);
        }
        this._main.batchDraw();
    }

    /**
     * @summary     Updates current handler element.
     * @description Updates the text handler element located at _selectedTextIndex
     *              with data from the parameterized textElem variable.
     * 
     * @param {JSON} textElem A JSON object containing the updated textElem information.
     */
    UpdateTextHandler({domText, image, spanCSS})
    {        
        this._commandManager.Execute(new TextContentCommand({
            domText: domText,
            image: image,
            spanCSS: spanCSS,
            handler: this._textHandler,
            id: this._selectedTextIndex,
        }));

        this._main.batchDraw();
    }

    Remove()
    {
        // TODO remove entries from handler
        if (this._selectedChartIndex !== -1) {
            let chartObj = new RemoveChartCommand({
                id: this._selectedChartIndex,
                handler: this._chartHandler,
                transformer: this._tr,
                main: this._main,
            });
            this._commandManager.Execute(chartObj);
            this._selectedChartIndex = -1;
        } else if (this._selectedTextIndex !== -1) {
            let textObj = new RemoveTextCommand({
                id: this._selectedTextIndex,
                handler: this._textHandler,
                transformer: this._tr,
                main: this._main,
            });
            this._commandManager.Execute(textObj);
            this._selectedTextIndex = -1;
        } else if (this._selectedGraphicIndex !== -1) {
            let graphicsObj = new RemoveGraphicCommand({
                id: this._selectedGraphicIndex,
                handler: this._graphicsHandler,
                transformer: this._tr,
                main: this._main
            });
            this._commandManager.Execute(graphicsObj);
            this._selectedGraphicIndex = -1;
        }
    }

    UpdateChartDecorators(settings)
    {
        if (settings === 0 || this._selectedChartIndex === -1) return;
        let updateObj = new ChartDecoratorCommand({
            decoratorSettings: settings,
            handler: this._chartHandler,
            id: this._selectedChartIndex,
        });
        this._commandManager.Execute(updateObj);
        this._AddDataLabelSelection();
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

        let currData = this._chartHandler.GetChart(this._selectedChartIndex).GetData(),
            type = this._chartHandler.GetGroup(this._selectedChartIndex).getAttr('name');

        // Basically, UpdateChartData is called multiple times because it is 
        // called each time CanvasContainer is rendered. Is this the best design
        // decision? Maybe not, but to avoid adding too many commands to the
        // command manager, we need this following check.
        if (currData === chartData) return; 

        // Same reason as above but case specific to waffle chart type.
        if (type === 'Selectable Chart Waffle' && 
            (currData.numerator === chartData.numerator && 
            currData.denominator === chartData.denominator)) return;

        let updateCommand = new ChartDataCommand({
            data: chartData,
            handler: this._chartHandler,
            id: this._selectedChartIndex,
        });

        this._commandManager.Execute(updateCommand);
    }

    UpdateChartSettings(settings)
    {
        if (settings === 0 || this._selectedChartIndex === -1) return;
        let updateObj = new ChartSettingsCommand({
            settings: settings,
            handler: this._chartHandler,
            id: this._selectedChartIndex,
        });
        this._commandManager.Execute(updateObj);
        this._UpdateEditorUI(updateObj);
    }

    UpdateGraphicSettings(settings)
    {
        if (settings === 0 || this._selectedGraphicIndex === -1) return;
        this._commandManager.Execute(new GraphicSettingsCommand({
            settings: settings,
            handler: this._graphicsHandler,
            id: this._selectedGraphicIndex,
        }));
        this._tr.forceUpdate();
        this._main.batchDraw();
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
     * @description Updates the editor UI to reflect the chart type specified by
     *              group.
     * @param {Konva.Group} group 
     */
    _UpdateChartEditorUI(group)
    {
        if (group.getAttr('name') === 'Selectable Chart Waffle') {
            this._editorHandler('waffle-editor');
        } else if (group.getAttr('name') === 'Selectable Chart Pie') {
            this._editorHandler('pie-editor');
        } else if (group.getAttr('name') === 'Selectable Chart Bar') {
            this._editorHandler('bar-editor')
        } else if (group.getAttr('name') === 'Selectable Chart Stacked') {
            this._editorHandler('stacked-bar-editor');
        } else if (group.getAttr('name') === 'Selectable Chart Line') {
            this._editorHandler('line-editor');
        } else if (group.getAttr('name') === 'Selectable Chart Icon') {
            this._editorHandler('icon-bar-editor');
        } else if (group.getAttr('name') === 'Selectable Chart Donut') {
            this._editorHandler('donut-editor');
        }
    }

    /**
     * @summary     Undo the most recent action.
     * @description Wrapper function that calls _commandManager's Undo method.
     */
    Undo()
    {
        let undoObj = this._commandManager.Undo();
        // Essentially, there is an edge case in undoing/redoing where if we 
        // remove an element, undo, select the element, then redo, it will 
        // cause a runtime error since the editor has not been reset.
        this._ResetEditor(undoObj)
        this._UpdateEditorUI(undoObj);
    }

    /**
     * @summary     Redo the most recent action.
     * @description Wrapper function that calls _commandManager's Redo method.
     */
    Redo()
    {
        let redoObj = this._commandManager.Redo();
        this._ResetEditor(redoObj);
        this._UpdateEditorUI(redoObj);
    }

    /**
     * !!!! INTERACIVITY AND TEXT RENDERING CODE BELOW !!!!
     */

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
        this._AddDataLabelSelection();
        this._MoveToMain();
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
        html2canvas(element, {
            logging: false,
            backgroundColor: null,
            scrollY: -(window.scrollY),
        }).then((image) => {
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
            /**
             * Adds ability to select and edit graphs.
             */
            this._AddListeners(chart, 'chart');
        });
    }

     /**
     * @summary     Adds user defined event listeners to elem.
     * @param {Konva.Group} elem 
     */
    _AddListeners(elem, type)
    {
        elem.on('dblclick', () => {
            if (type === 'text') this._TextHelper(elem);
            else if (type === 'chart') this._ChartHelper(elem);
            else if (type === 'graphic') this._GraphicHelper(elem);
        });

        elem.on('dragstart', () => {
            this._LogStartingPosition(elem);
        });

        elem.on('dragend', () => {
            this._LogEndingPosition(elem);
        });
    }
 
    _ChartHelper(chart)
    {
        this._selectedChartIndex = parseInt(chart.getAttr('id'));
        this._tr.nodes([chart]);
        this._tr.moveToTop();
        this._main.batchDraw();
        chart.setAttr('draggable', true);

        let selectedChart = this._chartHandler.GetHandlerElem(this._selectedChartIndex).chart,
            dSettings = this._chartHandler.GetDecoratorSettingsArray(this._selectedChartIndex);
        this._chartCallback(selectedChart.GetData(), selectedChart.GetChartSettings(), dSettings);

        this._UpdateChartEditorUI(chart);

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
            let top = this._FindTopContainer(textElem),
                absPos = textElem.getAbsolutePosition();
            textElem.moveTo(top);
            textElem.absolutePosition({
                x: absPos.x,
                y: absPos.y
            });

            this._AddListeners(textElem, 'text');
        });
    }

    _TextHelper(textElem)
    {
        textElem.setAttr('draggable', true);

        this._tr.nodes([textElem]);
        this._tr.moveToTop();
        this._main.batchDraw();
        
        this._selectedTextIndex = textElem.getAttr('id');

        this._textCallback(this._textHandler.GetHandlerElem(this._selectedTextIndex));
        this._editorHandler('text-editor');

        setTimeout(() => {
            this._stage.on('click', HandleOutsideClick);
        });

        var HandleOutsideClick = (e) => {
            let start = new Date();
            let displayNotif = true;
            let Unselect = () => { 
                let curr = new Date();
                let diff = curr.getTime() - start.getTime();
                if (diff > 1000 && displayNotif) {
                    NotificationManager.Info({
                        title: "Loading Issues",
                        message: "Florence is having trouble with rendering the text, please wait.",
                        timeout: 3000,
                    });
                    displayNotif = false;
                }

                if (e.target !== textElem && !QuillStateManager.IsUpdating()) {
                    this._selectedTextIndex = -1;
                    this._editorHandler('none');
                    this._tr.nodes([]);
                    textElem.setAttr('draggable', false);
                    this._main.batchDraw();
                    this._stage.off('click', HandleOutsideClick);
                }
            };
            setTimeout(Unselect, 100);
        };
    }

    _AddGraphicSelection()
    {
        var selection = this._stage.find((node) => {
            return node.hasName('Graphic');
        });

        selection.forEach((group) => {
            this._AddListeners(group, 'graphic');
        });
    }

    _GraphicHelper(group)
    {
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
    }

    /**
     * @summary Adds selection capabilities to the data labels on charts (if 
     *          they exist).
     */
    _AddDataLabelSelection()
    {
        let selection = this._stage.find((node) => {
            return node.hasName('Selectable') && node.hasName('Decorator');
        }); 

        selection.forEach((group) => {
            group.off('dblclick');
            group.on('dblclick', () => {
                this._DecoratorHelper(group);
            });
        });
    }

    _DecoratorHelper(group)
    {
        let parent = group.getParent();
        parent.off('dblclick');
        parent.off('dragstart');
        parent.off('dragend');

        this._tr.nodes([group]);
        this._tr.moveToTop();
        this._main.batchDraw();
        group.setAttr('draggable', true);

        setTimeout(() => {
            this._stage.on('click', HandleOutsideClick);
        });

        var HandleOutsideClick = (e) => {
            if (e.target !== group) {
                parent.on('dblclick', () => { this._ChartHelper(parent) });
                parent.on('dragstart', () => { this._LogStartingPosition(parent) });
                parent.on('dragend', () => { 
                    this._LogEndingPosition(parent);
                });

                this._tr.nodes([]);
                group.setAttr('draggable', false);
                this._main.batchDraw();
                this._stage.off('click', HandleOutsideClick);
            }
        }; 
    }

    /**
     * @description Moves all of the infographic elements into the main group. 
     *              This allows us to perform layering functions.
     */
    _MoveToMain()
    {
        let selection = this._stage.find(node => {
            let isChart = (node.hasName('Selectable') && node.hasName('Chart'));
            let isGraphic = node.hasName('Graphic');
            let isText = (node.hasName('Selectable') && node.hasName('EditableText'));
            return isChart || isGraphic || isText;
        });
        selection.forEach(group => {
            let absPos = group.absolutePosition();
            group.moveTo(this._elementHolder);
            group.absolutePosition(absPos);
        });
    }

    /**
     * @summary Resets element indexes to -1 and removes selected editor.
     * @param {ACommand} obj 
     */
    _ResetEditor(obj)
    {
        let isRemoveObj = (obj instanceof RemoveChartCommand || obj instanceof 
            RemoveGraphicCommand || obj instanceof RemoveTextCommand);
        let isInsertObj = (obj instanceof InsertChartCommand || obj instanceof 
            InsertTextCommand || obj instanceof InsertIconCommand || obj
            instanceof InsertHeaderCommand);
        if (isRemoveObj || isInsertObj) {
            this._selectedTextIndex = this._selectedGraphicIndex = this._selectedChartIndex = -1;
            this._editorHandler('none')
        }
    }

    /**
     * @summary Updates the editor UI.
     * @param {ACommand} obj 
     */
    _UpdateEditorUI(obj)
    {
        let chartExpr = (obj instanceof ChartDataCommand || 
            obj instanceof ChartDecoratorCommand || 
            obj instanceof ChartSettingsCommand || 
            obj instanceof ReplaceChartCommand); 
        if (chartExpr && this._selectedChartIndex !== -1) {
            let chart = this._chartHandler.GetChart(this._selectedChartIndex),
                dSettings = this._chartHandler.GetDecoratorSettingsArray(this._selectedChartIndex);
            if (obj instanceof ReplaceChartCommand) {
                let group = this._chartHandler.GetGroup(this._selectedChartIndex);
                this._UpdateChartEditorUI(group);
            }
            this._chartCallback(chart.GetData(), chart.GetChartSettings(), dSettings);
        }

        if (obj instanceof GraphicSettingsCommand && this._selectedGraphicIndex !== -1) {
            this._graphicCallback(
                this._graphicsHandler.GetSettings(this._selectedGraphicIndex)
            );
        }

        if (obj instanceof TextContentCommand && this._selectedTextIndex !== -1) {
            this._textCallback(this._textHandler.GetHandlerElem(this._selectedTextIndex));
        }

        if (obj instanceof BackgroundSettingsCommand) {
            this._backgroundCallback(this._bkg.getAttrs());
        }
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

    _CreateSwitchableContainer(attrs = {}, id = '')
    {
        attrs.name = 'Switchable Container ' + id;
        return new Konva.Group(attrs);
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

    _FindTopContainer(elem)
    {
        let parent = elem.getParent();
        while (parent.getDepth() > 2 && !parent.hasName('Switchable')) {
            parent = parent.getParent();
        }
        return parent;
    }

    /**
     * @summary     Creates a PositionCommand object to save the position of a 
     *              given object.
     * @description Creates a PositionCommand object that holds the target 
     *              object's current position. This object is then added to
     *              the command manager.
     * @param {*} konvaElement 
     */
    _LogStartingPosition(konvaElement)
    {
        let absPos = konvaElement.absolutePosition();
        
        let currPosition = new PositionCommand({
            element: konvaElement,
            x: absPos.x,
            y: absPos.y,
        });
        this._commandManager.Add(currPosition);
    }

    /**
     * @summary     Pops the top object in CommandManager and (assuming the 
     *              object is a PositionCommand object) sets the current 
     *              coordinates.
     * @assumptions This assumes that the top object in CommandManager is a 
     *              PositionCommand object. It is recommended that this be used
     *              in conjunction with _LogStartingPosition. 
     * @param {*} konvaElement 
     */
    _LogEndingPosition(konvaElement)
    {
        let absPos = konvaElement.absolutePosition();
        let currPosition = this._commandManager.RemoveFromUndoStack();
        currPosition.SetCurrentCoordinates({
            x: absPos.x,
            y: absPos.y,
        });
        this._commandManager.Add(currPosition);
    }
}

export { AInfographic };