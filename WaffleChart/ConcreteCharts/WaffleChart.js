class WaffleChart extends AWaffleChart
{
    constructor(numerator, denominator, group, presetA, presetB, fontSize, isDynamicResize = true)
    {
        super(numerator, denominator, group, presetA, presetB, fontSize, isDynamicResize);
        this._startingX = 0;
        this._startingY = 0;
    }

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
        this._Draw(custom, false, container)
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
    //      The y position we want the first icon to occup
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
    _Draw(custom, hidden) { // <---- new arguments

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