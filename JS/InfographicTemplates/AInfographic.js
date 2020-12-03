// Cullen, Riley
// AInfographic.js
// October 26, 2020

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
     * 
     * @param {double} height The height of the canvas element
     * @param {double} width  The width of the canvas element
     */
    constructor(height, width)
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
        this._tr = new Konva.Transformer({
            nodes: [],
            resizeEnabled: false,
            rotateEnabled: false,
        });

        this._chartHeight = height;
        this._chartWidth = width;
        this._stage = new Konva.Stage({
            container: 'container',
            width: this._chartWidth,
            height: this._chartHeight,
        });
        this._main = new Konva.Layer();
        this._UIAdder = new UIAdder(this._chartWidth);

        this._stage.add(this._main);

        this._main.add(this._tr);

        this._AddStageBorder();
    }

    Remove()
    {
        if (this._UIAdder.GetState()) this._UIAdder.RemoveCurrentEditor();
    }

    _AddStageBorder()
    {
        /**
         * @summary     Adds a black border around the edges of the canvas element.
         */
        this._main.add(new Konva.Rect({
            x: 0,
            y: 0,
            width: this._stage.width(),
            height: this._stage.height(),
            fill: 'white',
            stroke: 'black',
        }));
    }

    _GetTextWidth(text, fontSize, fontFamily)
    {
        /**
         * @summary     Returns the width of a text element given the text's font.
         * @description Using canvas' measureText function, _GetTextWidth returns the
         *              width in pixels of a given piece of text.
         * 
         * @param {string} text       The text we want to determine the width of.
         * @param {double} fontSize   The font size of the text we want to find the width of.
         * @param {string} fontFamily The font family of the text we want to analyze.
         */
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        ctx.font = fontSize + 'px ' + fontFamily;
        var helper = ctx.measureText(text).width;
        canvas.remove();

        return helper;
    }

    _CenterXAbout(width, center)
    {
        /**
         * @param {double} width  The width of the element we are centering.
         * @param {double} center The x-coordinate we want to center about.
         */
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
        document.getElementById('body').appendChild(helperElem);

        for (var i = 0; i < this._textHandler.GetSize(); i++) {
            helperElem.appendChild(this._textHandler.GetTextElem(i));
            this._HTMLToCanvas(i);
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
    _HTMLToCanvas(index)
    {
        html2canvas(document.querySelector('.EditableText'), {
            backgroundColor: null,
        }).then((image) => {
            this._textHandler.GetImage(index).image(image);
            this._main.batchDraw();
        });
    }

    /**
     * @summary     Adds the capability to select and edit text.
     * @description Iterates through all of the elements in the text handler and
     *              adds an event listener that triggers when the text element
     *              is double clicked.
     */
    _AddTextSelection()
    {
        var selection = this._stage.find('.EditableText');
        selection.each((textElem) => {
            textElem.on('dblclick', () => {
                this._tr.nodes([textElem]);
                this._tr.moveToTop();
                this._main.batchDraw();

                this._UIAdder.CreateTextEditor();

                setTimeout(() => {
                    this._stage.on('click', HandleOutsideClick);
                });

                var HandleOutsideClick = (e) => {
                    if (e.target !== textElem) {
                        this._UIAdder.RemoveCurrentEditor();
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
     * @summary     Adds the capability to select and edit graphs.
     * @description Iterates through all of the elements in the graph handler and
     *              adds an event listener when they are double clicked on.
     */
    _AddGraphSelection()
    {
        var selection = this._stage.find('.Chart');
        selection.each((chart) => {
            chart.on('dblclick', () => {
                var index = parseInt(chart.getAttr('id'));
                this._tr.nodes([chart]);
                this._tr.moveToTop();
                this._main.batchDraw();
                chart.setAttr('draggable', true);

                if (chart.getAttr('name') === 'Chart Waffle') {
                    this._UIAdder.CreateWaffleEditor(this._chartHandler.GetHandlerElem(index), this._main, this._tr);
                } else if (chart.getAttr('name') === 'Chart Pie') {
                    this._UIAdder.CreatePieEditor(this._chartHandler.GetHandlerElem(index), this._main, this._tr);
                } else if (chart.getAttr('name') === 'Chart Bar') {
                    this._UIAdder.CreateBarEditor(this._chartHandler.GetHandlerElem(index), this._main, this._tr);
                } else if (chart.getAttr('name') === 'Chart Stacked') {
                    this._UIAdder.CreateStackedBarEditor(this._chartHandler.GetHandlerElem(index), this._main, this._tr);
                }

                setTimeout(() => {
                    this._stage.on('click', HandleOutsideClick);
                });

                var HandleOutsideClick = (e) => {
                    if (e.target !== chart) {
                        this._UIAdder.RemoveCurrentEditor();
                        this._tr.nodes([]);
                        chart.setAttr('draggable', false);
                        this._main.batchDraw();
                        this._stage.off('click', HandleOutsideClick);
                    }
                };
            });
        });
    }
}