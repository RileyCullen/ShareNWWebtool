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

        /** Pass in layer, clear layer before drawing  */

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
            resizeEnabled: true,
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

    _AddTextSelection()
    {
        var selection = this._stage.find('.EditableText');
        selection.each(textNode => {
            textNode.on('dblclick', () => {
                var HandleOutsideClick = (e) => {
                    if (e.target !== textNode) {
                        textNode.text(textarea.value);
                        RemoveTextArea();
                        this._main.batchDraw();
                        this._stage.off('click', HandleOutsideClick);
                    }
                };

                var RemoveTextArea = () => {
                    textarea.parentNode.removeChild(textarea);
                    window.removeEventListener('click', HandleOutsideClick);
                    textNode.show();
                    this._tr.show();
                    this._tr.forceUpdate();
                    this._main.draw();
                };

                var SetTextAreaWidth = (newWidth) => {
                    if (!newWidth) {
                        // set width for placeholder
                        newWidth = textNode.placeholder.length * textNode.fontSize();
                    }
                    // some extra fixes on different browsers
                    var isSafari = /^((?!chrome|android).)*safari/i.test(
                        navigator.userAgent
                    );
                    var isFirefox =
                        navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                    if (isSafari || isFirefox) {
                        newWidth = Math.ceil(newWidth);
                    }

                    var isEdge =
                        document.documentMode || /Edge/.test(navigator.userAgent);
                    if (isEdge) {
                        newWidth += 1;
                    }
                    textarea.style.width = newWidth + 'px';
                };

                textNode.hide();
                this._tr.hide();
                this._main.draw();

                var textPosition = textNode.absolutePosition();

                // then lets find position of stage container on the page:
                var stageBox = this._stage.container().getBoundingClientRect();

                // so position of textarea will be the sum of positions above:
                var areaPosition = {
                    x: stageBox.left + textPosition.x,
                    y: stageBox.top + textPosition.y,
                };

                // create textarea and style it
                var textarea = document.createElement('textarea');
                document.body.appendChild(textarea);

                // css that tries to put the textarea where it is on the canvas
                textarea.value = textNode.text();
                textarea.style.position = 'absolute';
                textarea.style.top = areaPosition.y + 'px';
                textarea.style.left = areaPosition.x + 'px';
                textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
                textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
                textarea.style.fontSize = textNode.fontSize() + 'px';
                textarea.style.borderStyle = 'solid';
                textarea.style.padding = '0px';
                textarea.style.margin = '0px';
                textarea.style.overflow = 'hidden';
                textarea.style.background = 'none';
                textarea.style.outline = 'none';
                textarea.style.resize = 'both';
                textarea.style.lineHeight = textNode.lineHeight();
                textarea.style.fontFamily = textNode.fontFamily();
                textarea.style.transformOrigin = 'left top';
                textarea.style.textAlign = textNode.align();
                textarea.style.color = textNode.fill();
                var rotation = textNode.rotation();
                var transform = '';
                if (rotation) {
                    transform += 'rotateZ(' + rotation + 'deg)';
                }

                var px = 0;
                // also we need to slightly move textarea on firefox
                // because it jumps a bit
                var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                if (isFirefox) {
                    px += 2 + Math.round(textNode.fontSize() / 20);
                }
                transform += 'translateY(-' + px + 'px)';

                textarea.style.transform = transform;

                // reset height
                textarea.style.height = 'auto';
                // after browsers resized it we can set actual value
                textarea.style.height = textarea.scrollHeight + 3 + 'px';

                textarea.focus();

                textarea.addEventListener('keydown', function (e) {
                    // hide on enter
                    // but don't hide on shift + enter
                    if (e.keyCode === 13 && !e.shiftKey) {
                        textNode.text(textarea.value);
                        RemoveTextArea();
                    }
                    // on esc do not set value back to node
                    if (e.keyCode === 27) {
                        RemoveTextArea();
                    }
                });

                textarea.addEventListener('keydown', function (e) {
                    var scale = textNode.getAbsoluteScale().x;
                    //SetTextAreaWidth(textNode.width() * scale);
                    textarea.style.height = 'auto';
                    textarea.style.height = textarea.scrollHeight + textNode.fontSize() + 'px';
                });

                setTimeout(() => {
                    this._stage.on('click', HandleOutsideClick);
                });

            });
        });
    }

    _AddGraphSelection()
    {
        var selection = this._stage.find('.Chart');
        selection.each((chart) => {
            // desc: Function handles the selection of the two waffle charts
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