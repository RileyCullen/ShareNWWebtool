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
        this._chartTr = new Konva.Transformer({
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
        this._stage.add(this._main);

        this._main.add(this._chartTr);

        this._AddStageBorder();
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

    _AddGraphSelection()
    {
        var selection = this._stage.find('.Chart');
        selection.each((chart) => {
            // desc: Function handles the selection of the two waffle charts
            chart.on('dblclick', () => {
                this._chartTr.nodes([chart]);
                this._chartTr.moveToTop();
                this._main.batchDraw();
                //document.getElementById('selectorDisplay').innerHTML = waffleChartSelector;


                setTimeout(() => {
                    this._stage.on('click', HandleOutsideClick);
                });

                var HandleOutsideClick = (e) => {
                    if (e.target !== chart) {
                        console.log('outside click')
                        this._chartTr.nodes([]);
                        this._main.batchDraw();
                        this._stage.off('click', HandleOutsideClick);
                    }
                };
            });
        });
    }
}