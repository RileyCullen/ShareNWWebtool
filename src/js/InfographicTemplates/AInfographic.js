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
     * @source Selecting mutliple elements demo uses code from https://konvajs.org/docs/select_and_transform/Basic_demo.html#page-title
     * @source _DrawSVG code taken from https://konvajs.org/docs/sandbox/SVG_On_Canvas.html
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

        /*this._selectionRectangle = new Konva.Rect({
            fill: 'rgba(0, 0, 255, 0.5)',
            visible: false,
        });
        this._hasSelected = false;
        this._isSelecting = false;
        this._oldNodes = [];
        this._mouseX1 = 0, this._mouseX2 = 0, this._mouseY1 = 0, this._mouseY2 = 0;*/

        this._main = new Konva.Layer();
        this._UIAdder = new UIAdder(this._chartWidth, this._chartHeight);

        this._stage.add(this._main);

        this._main.add(this._tr);

        this._AddStageBorder();
    }
    /**
     * @summary     Removes the current editor from DOM.
     * @description A wrapper function that call's _UIAdder's RemoveCurrentEditor
     *              function, which removes the editor if it exists.
     */
    Remove()
    {
        if (this._UIAdder.GetState()) this._UIAdder.RemoveCurrentEditor();
    }

    /**
     * @summary     Draws SVG on the canvas.
     * @description A function that uses native canvas to draw an SVG and then
     *              add it using a Konva.JS image object. NOTE that canvas does
     *              not support displaying SVGs so this is the only work around 
     *              (not including using external libraries).
     * 
     * @param {string}      source The SVG we want to draw on the canvas.
     * @param {Konva.Layer} layer  The layer we want to add the SVG to.
     * @param {double}      width  Desired width of the SVG image.
     * @param {double}      height Desired height of the SVG image.
     */
    _DrawSVG({
        source, layer, width, height, x, y,
    })
    {
        Konva.Image.fromURL(source, (imageNode) => {
            layer.add(imageNode);
            imageNode.setAttrs({
                x: x,
                y: y,
                width: width,
                height: height,
            });
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
        if (font == 'museo' && weight == 900) return '900-museo';
        else if (font == 'canada-type-gibson') {
            switch (weight) {
                case 100: return '100-canada';
                case 200: return '200-canada';
                case 400: return '400-canada';
                case 500: return '500-canada';
                case 600: return '600-canada';
                case 700: return '700-canada';
                case 900: return '900-canada';
            }
        } else if (font == 'Montserrat') return '200-Montserrat';
        else if (font == 'Open Sans') return 'Open-Sans';
        else if (font == 'Roboto') {
            switch(weight) {
                case 100: return '100-Roboto';
                case 300: return '300-Roboto';
                case 400: return '400-Roboto';
                case 500: return '500-Roboto';
                case 700: return '700-Roboto';
                case 900: return '900-Roboto';
            }
        }
    }

    _AddStageBorder()
    {
        /**
         * @summary     Adds a black border around the edges of the canvas element.
         */
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
        document.getElementById('body').appendChild(helperElem);

        console.log('text widths: ')
        for (var i = 0; i < this._textHandler.GetSize(); i++) {
            console.log(i)
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
            backgroundColor: null,
            scrollY: -(window.scrollY),
            // width: comp.width.replace('px', ''),
        }).then((image) => {
            // console.log('image width: ' + image.width)
            this._textHandler.GetImage(index).image(image);
            this._main.batchDraw();
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

        selection.each((textElem) => {
            textElem.on('dblclick', () => {
                textElem.setAttr('draggable', true);

                this._tr.nodes([textElem]);
                this._tr.moveToTop();
                this._main.batchDraw();

                var index = textElem.getAttr('id');

                this._UIAdder.RemoveCurrentEditor();
                // this._UIAdder.CreateTextEditor(textElem, this._main, this._tr);
                this._UIAdder.CreateTextEditor(this._textHandler.GetHandlerElem(index),
                    this._main, this._tr);

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
        var selection = this._stage.find((node) => {
            return node.hasName('Selectable') && node.hasName('Chart');
        });
        selection.each((chart) => {
            chart.on('dblclick', () => {
                var index = parseInt(chart.getAttr('id'));
                this._tr.nodes([chart]);
                this._tr.moveToTop();
                this._main.batchDraw();
                chart.setAttr('draggable', true);

                if (chart.getAttr('name') === 'Selectable Chart Waffle') {
                    this._UIAdder.CreateWaffleEditor(this._chartHandler.GetHandlerElem(index), this._main, this._tr);
                } else if (chart.getAttr('name') === 'Selectable Chart Pie') {
                    this._UIAdder.CreatePieEditor(this._chartHandler.GetHandlerElem(index), this._main, this._tr);
                } else if (chart.getAttr('name') === 'Selectable Chart Bar') {
                    this._UIAdder.CreateBarEditor(this._chartHandler.GetHandlerElem(index), this._main, this._tr);
                } else if (chart.getAttr('name') === 'Selectable Chart Stacked') {
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
                        console.log('off');
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