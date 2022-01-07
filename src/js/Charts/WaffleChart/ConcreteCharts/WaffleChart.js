// Cullen, Riley
// December 23, 2020
// WaffleChart.js

import { AWaffleChart, GenerateIconDataArray } from "../index";
import * as d3 from 'd3';
import Konva from 'konva';

class WaffleChart extends AWaffleChart
{
    /**
     * @summary     Concrete class that creates a waffle chart in Konva.js.
     * @description Concrete class that uses FontAwesome and Konva.js to display 
     *              icons on the canvas.
     * 
     * @requires FontAwesome
     * @requires D3.js
     * @requires Konva.js
     * @requires AWaffleChart.js
     *
     * @see AWaffleChart.js for constructor variable documentation. 
     */
    constructor({numerator, denominator, group, presetA, presetB, fontSize, 
        isDynamicResize = true, maxIconsPerRow = 10,})
    {
        super(numerator, denominator, group, presetA, presetB, fontSize, 
            isDynamicResize, maxIconsPerRow);
        this._startingX = 0;
        this._startingY = 0;
    }

    /**
     * @summary     Creates waffle chart in the canvas.
     * @description Creates a virtual DOM container, binds data to the container,
     *              then draws the waffle chart on the canvas.
     */
    CreateChart()
    {
        var virtualCanvas = document.createElement('custom');
        var custom = d3.select(virtualCanvas);

        this._RemoveWaffleChart(custom);

        if (this._isDynamicResize) {
            this._fontSize = this._DetermineFontSize();
        }
        var data = this._GenerateWaffleDataArr();

        this._BindData(custom, data);
        this._Draw(custom, false)
    }

    /**
     * @summary     Returns the unicode icon and color for both presets to the 
     *              caller.
     * @description Returns a JSON array with two elements. The first element 
     *              corresponds to presetA and the second corresponds to presetB.
     *              Within each element, the icon's unicode representation and 
     *              color are returned.
     */
    GetIconData()
    {
        return [
            {
                'icon': this._presetA.icon,
                'color': this._presetA.color
            },
            {
                'icon': this._presetB.icon,
                'color': this._presetB.color
            }
        ];
    }

    /**
     * @summmary    Updates icon in waffle chart based on iconNum.
     * @description Updates presetA if iconNum is equal to 0 and presetB if 
     *              iconNum is equal to 1.
     * 
     * @param {JSON}   param0   A JSON object that encloses two variables.
     * @param {int}    iconNum  The icon index that will be updated.
     * @param {string} iconCode The unicode for a particular icon.
     */
    UpdateIcon({iconNum = -1, iconCode = -1})
    {
        if (iconCode === null || iconCode === '') return;

        iconCode = String.fromCharCode(parseInt(iconCode,16));

        if (iconNum === 0) {
            this._presetA = GenerateIconDataArray({
                icon: iconCode,
                color: this._presetA.color,
                offset: this._presetA.offset,
                font: this._presetA.font,
            });
        } else if (iconNum === 1) {
            this._presetB = GenerateIconDataArray({
                icon: iconCode,
                color: this._presetB.color,
                offset: this._presetB.offset,
                font: this._presetB.font,
            });
        } 
    }

    /**
     * @summary     Binds data to the parameterized custom DOM element.
     * @description Uses D3.js to bind the parameterized data array to custom 
     *              DOM elements located in memory.
     * 
     * @param {D3 selection} custom The DOM container located in memory that we 
     *                              want to bind data to.
     * @param {JSON Array} data     The data array we want to use to bind our data.
     */
    _BindData(custom, data)
    {
        var prevOffset = 0, initialOffset = 0;

        custom.selectAll('custom.rect')
            .remove();
        custom.selectAll('custom.rect')
            .data(data)
            .enter()
            .append("custom")
            .attr("class", "rect")
            .attr("x", (d, i) => {
                var tmp = this._startingX + ((i % this._maxIconsPerRow) * prevOffset), 
                    multiplier = 0;

                if (i === 0) initialOffset = d.offset;

                if (initialOffset !== d.offset && i > this._numerator) {
                    if (i > (this._numerator)) {
                        multiplier = this._numerator;
                    } else { 
                        multiplier = (i - 1);
                    }
                    tmp -= multiplier * (d.offset - initialOffset);
                }

                prevOffset = d.offset;
                return tmp;
            })
            .attr("y", (d, i) => {
                let offset = (d.offset > d.fontSize) ? d.offset : 1.25 * d.fontSize;
                return this._startingY + (Math.floor(i / this._maxIconsPerRow) * offset)
            })
            .attr('iconType', d => { return d.iconType; })
            .attr('fontSize', d => { return d.fontSize; })
            .attr('font', d => { return d.fontFamily; })
            .attr("width", 0)
            .attr("height", 0)
            .attr('fillStyle', d => { return d.color; })
            .attr('fillStyleHidden', d => { return d.color; });
    }

    /**
     * @summary     Draws waffle chart.
     * @description Uses FontAwesome and Konva.js to draw the icons in a waffle 
     *              chart to the canvas.
     * 
     * @param {D3 selection} custom The D3 selection with our bound data.
     * @param {boolean} hidden
     */
    _Draw(custom, hidden) {

        var elements = custom.selectAll('custom.rect');
        var tmp = new Konva.Group();
        elements.each(function(d,i) { 
            var node = d3.select(this);
            tmp.add(new Konva.Text({
                fontFamily: node.attr('font'),
                fontStyle: '900',
                text: node.attr('iconType'),
                x: node.attr('x'),
                y: node.attr('y'),
                fill: hidden ? node.attr('fillStyleHidden') : node.attr('fillStyle'),
                fontSize: node.attr('fontSize'),
            }));        
        });
        this._group.add(tmp);
    }
}

export { WaffleChart };