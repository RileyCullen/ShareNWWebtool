// Cullen, Riley
// waffleChart.js
// September 20, 2020
// MacOS

// desc: This class abstracts the creation of a waffle chart using D3.js and Konva.js.
// sources: 
//    1. Code is adapted from https://www.freecodecamp.org/news/d3-and-canvas-in-3-steps-8505c8b27444/
// dependencies:
//    1. D3.js
//    2. Konva.js

class WaffleChart
{
    /**
     * @param {int}    numerator    The number of presetA icons drawn to canvas
     * @param {int}    denominator  The number of total icons drawn to canvas
     * @param {string} fontSize     The size of icons drawn to canvas
     * @param {preset} presetA      The first set of icons we want to draw
     * @param {preset} presetB      The second set of icons we want to draw
    */
    constructor(numerator, denominator, fontSize, presetA, presetB) 
    {
        this._hasBound = false;
        this._startingX = 0;
        this._startingY = 0;
        this._id = 0;
        this.UpdateSettings(numerator, denominator, fontSize, presetA, presetB);
    }

    // Accessor functions
    GetFontSize() { return this._fontSize; }
    GetPresetA() { return this._presetA; }
    GetPresetB() { return this._presetB; }
    GetStartingX() { return this._startingX; }
    GetStartingY() { return this._startingY; }

    // desc: A combined mutator function that allows for the updating of waffle chart
    UpdateSettings(numerator, denominator, fontSize, presetA, presetB) 
    {
        this._numerator = Number(numerator);
        this._denominator = Number(denominator);
        this._fontSize = fontSize;
        this._presetA = presetA;
        this._presetB = presetB;
    }

    // desc: Private function that removes the original waffle chart from the 
    //       container and removes the custom DOM elements from memory
    //
    // parameters: 
    // -----------
    // custom : d3.select() object
    //      The custom DOM element that contains our binded data
    // container : Konva.Group
    //      The container that contains our waffle chart
    _RemoveWaffleChart(custom, container)
    {
        this._RemoveCustomElements(custom);
        this._RemoveCanvasElements(container);
    }

    // desc: Remove all of the custom DOM elements from memory
    // 
    // parameters:
    // -----------
    // custom : d3.select() object
    //      See _RemoveWaffleChart()
    _RemoveCustomElements(custom)
    {
        custom.selectAll('custom.rect')
            .remove();
    }

    // desc: Remove waffle chart from container (Note: main.batchDraw() still
    //       needs to be called in the main JS file)
    //
    // parameters:
    // -----------
    // container : Konva.Group
    //      See _RemoveWaffleChart()
    _RemoveCanvasElements(container)
    {
        container.destroyChildren();
    }

    // desc: This function generates the waffle chart data, binds the data to 
    //       custom DOM elements in memory, and draws the selected icons to the 
    //       canvas
    //
    // parameters:
    // -----------
    // startingX : int
    //      The x coordinate that we want to begin our waffle chart at (this is 
    //      relative to the Konva.Group (container) that we pass in)
    // startingY : int
    //      The y coordinate that we want to begin our waffle chart at (similar
    //      to the above, this is relative to the Konva.Group we pass in)
    // container : Konva.Group
    //      This is the container we want to add the waffle chart to
    GenerateChart(startingX, startingY, container) 
    {
        var virtualCanvas = document.createElement('custom');
        var custom = d3.select(virtualCanvas);

        this._startingX = startingX;
        this._startingY = startingY;

        this._RemoveWaffleChart(custom, container);

        this._fontSize = DetermineFontSize(this._numerator, this._denominator, 
            this._presetA, this._presetB, container.getAttr('width'));

        console.log("fontSize: " + this._fontSize);
        var data = this._GenerateWaffleDataArr();

        this._BindData(custom, data);
        this._Draw(custom, false, container);
    }

    // desc: This function returns an array of json objects that BindData uses to 
    //       create custom icon elements in memory
    //
    // parameters:
    // -----------
    // numerator : int 
    //      The number of presetA.icon's we will draw to the screen
    // denominator : int
    //      The number of total icons that will be drawn to the screen
    // fontSize : int
    //      The size of the icons being drawn to the screen
    // presetA : preset object
    //      The icons that will be drawn first
    // presetB : preset object
    //      The icons that will be drawn second
    //
    // return type:
    // ------------
    // This function returns an array of json objects hereafter called a WaffleDataArr
    _GenerateWaffleDataArr()
    {
        var tmp = []
        for(var i = 0; i < this._denominator; i++) {
            tmp[i] = {
                'iconType': (i < this._numerator) ? this._presetA.icon : this._presetB.icon,
                'color': (i < this._numerator) ? this._presetA.color : this._presetB.color,
                'offset': (i < this._numerator) ? this._presetA.offset : this._presetB.offset,
                'fontSize': this._fontSize,
                'id': (i < this._numerator) ? 0 : 1,
                'fontFamily': (i < this._numerator) ? this._presetA.font : this._presetB.font
            }
        }
        return tmp;
    }

    // desc: This function creates data.length number of custom dom elements in memory
    //
    // parameters:
    // -----------
    // custom : A d3 selection of the custom container 
    //      This allows us to bind data to the custom container
    // data : WaffleDataArr
    //      This contains the number of quantities of data we want to bind
    // startingX : int
    //      The x position we want the first icon to occupy
    // startingY : int 
    //      The y position we want the first icon to occupy
    _BindData(custom, data)
    {
        var prevOffset = 0, initialOffset = 0, helper = 0;

        custom.selectAll('custom.rect')
            .remove();
        var join = custom.selectAll('custom.rect')
            .data(data)
            .enter()
            .append("custom")
            .attr("class", "rect")
            .attr("x", (d, i) => {
                var tmp = this._startingX + ((i % 10) * prevOffset), 
                    multiplier = 0;

                if (i === 0) initialOffset = d.offset;

                if (initialOffset !== d.offset && i > this._numerator) {
                    if (i > (this._numerator + 1)) {
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
                return this._startingY + (Math.floor(i / 10) * d.offset)
            })
            .attr('iconType', d => { return d.iconType; })
            .attr('fontSize', d => { return d.fontSize; })
            .attr('font', d => { return d.fontFamily; })
            .attr("width", 0)
            .attr("height", 0)
            .attr('fillStyle', d => { return d.color; })
            .attr('fillStyleHidden', d => { return d.color; });
    }

    // desc: This function uses the virtual dom elements in custom to draw the specific
    //       icons to the screen
    // 
    // parameters:
    // -----------
    // custom : A d3 selection of the custom container
    //      Allows us to find the bounded data
    // hidden : boolean
    // container : Konva.Group
    //      The Konva.Group container we add the icons to.
    _Draw(custom, hidden, container) { // <---- new arguments

        var elements = custom.selectAll('custom.rect') // this is the same as the join variable, but used here to draw
        elements.each(function(d,i) { // for each virtual/custom element...
            var node = d3.select(this);
            container.add(new Konva.Text({
                fontFamily: node.attr('font'),
                fontStyle: '900',
                text: node.attr('iconType'),
                x: node.attr('x'),
                y: node.attr('y'),
                fill: hidden ? node.attr('fillStyleHidden') : node.attr('fillStyle'),
                fontSize: node.attr('fontSize'),
            }));        
        });
    }
}