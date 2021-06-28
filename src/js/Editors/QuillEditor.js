// Cullen, Riley
// QuillEditor.js
// December 3, 2020

// Sources
// 1. Quill color related code taken from https://stackoverflow.com/questions/42068335/quill-js-color-textbox
// 2. Quill font size code adapted from https://stackoverflow.com/questions/38623716/how-to-add-custom-font-sizes-to-quilljs-editor
// 3. Quill line height code (_InitLineHeight) taken from https://github.com/quilljs/quill/issues/197

class QuillEditor
{
    /**
     * @summary     Wrapper class that adds the Quill.js editor to the DOM.
     * @description A concrete wrapper class that uses the Quill.js editor to add
     *              rich text editing capabilities to the infographic.
     * 
     * @requires Quill.js
     * 
     * @param {Konva.Image}       textElem The text image we want to edit.
     * @param {Konva.Layer}       main     The group associated with the text 
     *                                     element. Can also be the main layer
     *                                     of the infog. 
     * @param {Konva.Transformer} tr       The transformer associated with the
     *                                     given infographic.
     */
    constructor(textElem, main, tr)
    {
        this._textElem = textElem;
        this._textImage = textElem.image;
        this._main = main;
        this._timeout = null;
        this._tr = tr;

        this._quill = 0;

        this._font = 0;
        this._fontArr = [];
        this._fontSize = -1;
        this._fontIndex = 0;
    }

    /**
     * @summary     Adds Quill.js editor container to the DOM.
     * @description Creates a <div> element with id "editor-container" and adds
     *              it to the DOM.
     */
    CreateEditorUI()
    {
        var container = document.createElement('div');
        container.id = 'QuillEditor';

        var editor = document.createElement('div');
        editor.id = 'editor-container';
        container.appendChild(editor);

        return container;
    }

    /**
     * @summary     Turns the editor-container <div> into a Quill.js editor.
     * @description Sets up the Quill.js editor in the <div> element with id 
     *              "editor-container".
     */
    CreateQuillObject()
    {
        var sizeList = ['10px', '11px', '12px', '13px', '14px', '15px', '16px', 
            '17px', '18px', '20px', 'custom-size'];
        var fontList = ['900-museo', '100-canada', '200-canada', 
            '400-canada', '500-canada', '600-canada', '700-canada', '900-canada',
            '200-Montserrat', 'Open-Sans', '100-Roboto', '300-Roboto', '400-Roboto',
            '500-Roboto', '700-Roboto', '900-Roboto'];
        var lineHeightList = ['1.0', '1.2', '1.5', '1.75', '2.0'];

        this._RegisterFontFamilies(fontList);
        this._RegisterFontSizes(sizeList);
        this._InitLineHeights(lineHeightList);

        this._quill = new Quill('#editor-container', {
            modules: {
                toolbar: [
                  [{'font': fontList}],
                  [{'size': sizeList}],
                  [{'lineheight': lineHeightList}],
                  [{'align': []}],
                  [{'color': ["#000000", "#e60000", "#ff9900", "#ffff00", 
                    "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", 
                    "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", 
                    "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", 
                    "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", 
                    "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", 
                    "#5c0000", "#663d00", "#666600", "#003700", "#002966", 
                    "#3d1466", 'custom-color']}]
                ],
              },
              placeholder: 'Compose an epic...',
              theme: 'snow',
        });

        this._InitEditor(sizeList);
        this._AddQuillListeners(sizeList);
    }

    _InitLineHeights(lineHeightList)
    {
        var Parchment = Quill.import('parchment');
        var lineHeightConfig = {
            scope: Parchment.Scope.INLINE,
            whilelist: lineHeightList
        };
        var lineHeightClass = new Parchment.Attributor.Class('lineheight', 'ql-line-height', lineHeightConfig);
        var lineHeightStyle = new Parchment.Attributor.Style('lineheight', 'line-height', lineHeightConfig);

        Parchment.register(lineHeightClass);
        Parchment.register(lineHeightStyle);
        Quill.register(lineHeightList, true);
    }

    /**
     * @summary     Updates editor so that text color, size, and font are the 
     *              same as that on the infographic.
     * @description Given the selected elements attributes (size, color, and font),
     *              this function will update the Quill editor so that when the
     *              user starts typing, the text in the text editor will have 
     *              the given attributes from above.
     * 
     * @param {QuillEditor} quill The quill editor.
     * @param {Array} sizeList The array of default font sizes.
     */
    _InitEditor(sizeList)
    {    
        var cssList = this._textElem.spanCSS;

        /**
         * Registers font sizes if they are not already registered.
         */
        cssList.forEach(d => {
            if (!sizeList.find(elem => elem == d.fontSize)) {
                sizeList.push(d.fontSize);
                this._RegisterFontSizes(sizeList);
            }
        });

        var contents = this._SpanCSSToDelta();
        
        // Sets content to the contents delta.
        this._quill.setContents(contents);
        this._DetermineInitialFont(contents);

        /**
         * "Fixes" the quill editor contents. For some reason (and I am not 
         * entirely sure why), the quill editor will simplify the delta and remove 
         * important attribute data (like the font). 
         * 
         * We fix this issue by simply reformatting the undefined fonts to the
         * value of this._font.
         */
        this._UpdateQuillFont(true);

        var alignment = (cssList.length != 0) ? cssList[0].align : 'left';
        this._AlignText(alignment);
    }

    /**
     * @summary     Converts spanCSS data in a text handler element to a Quill
     *              Delta.
     * @description Iterates through all of the elements in spanCSS (which itself 
     *              is a JSON Array) and converts it to a Delta that will be used
     *              to populate the contents of the Quill text editor.
     * @returns     The Delta version of spanCSS.
     */
    _SpanCSSToDelta()
    {
        var elemCount = 0
        var cssList = this._textElem.spanCSS;
        var Delta = Quill.import('delta');
        var contents = new Delta();

        this._textElem.textElem.childNodes.forEach((d, i) => {
            d.childNodes.forEach((elem) => {
                contents.insert(elem.innerHTML, {
                    font: cssList[elemCount].fontFamily,
                    color: cssList[elemCount].textColor, 
                    size: cssList[elemCount].fontSize,
                    lineheight: cssList[elemCount].lineHeight,
                });
                elemCount++;
            });
            contents.insert('\n');
        });
        return contents;
    }

    /**
     * @summary     Determines the initial value of this._font.
     * @description Determines the initial value of this._font greedily by finding
     *              the first possible instance.
     * 
     * @param {Delta} contents The contents delta created using spanCSS from the
     *                         textHandler.
     */
    _DetermineInitialFont(contents)
    {
        this._quill.getContents().ops.forEach((d, i) => {
            if (d.insert !== '\n'){
                if (d.attributes !== undefined && (d.attributes.font === undefined 
                    || d.attributes.font === null)) {
                    this._font = contents.ops[i].attributes.font;
                    this._fontArr[++this._fontSize] = contents.ops[i].attributes.font;
                }
            }
        });
    }

    /**
     * @summary     Aligns all of the lines in the quill editor.
     * 
     * @param {string} align The type of alignment for each line.
     */
    _AlignText(align)
    {
        var contents = this._quill.getContents();
        var contentLength = 0;

        contents.ops.forEach((d) => {
            contentLength += d.insert.length;
        });

        this._quill.formatLine(0, contentLength, 'align', align)
    }

    /**
     * @summary     Registers various font families with Quill.
     * @description Creates a Font object, whitelists the fonts, and registers
     *              them with Quill.
     * 
     * @param {Array} fontList An array of strings that represent the data value 
     *                         associated with the fonts.
     */
    _RegisterFontFamilies(fontList)
    {
        var Font = Quill.import('formats/font');
        Font.whitelist = fontList;
        Quill.register(Font, true);
    }

    /**
     * @summary     Registers the various font sizes with Quill.
     * @description Creates a Size object, whitelists the sizes, and registers 
     *              them with Quill.
     * 
     * @param {Array} sizeList An array of size strings.
     */
    _RegisterFontSizes(sizeList)
    {
        var Size = Quill.import('attributors/style/size');
        Size.whitelist = sizeList;
        Quill.register(Size, true);
    }

    /**
     * @summary     Adds event listeners to the quill object.
     * @description Adds the event listeners responsible for text change, font color,
     *              and font size.
     * 
     * @param {Quill} quill The quill object we want to add event listeners to.
     */
    _AddQuillListeners(sizelist)
    {
        this._AddTextListener();
        this._AddFontListener();
        this._AddFontColorListener();
        this._AddFontSizeListener(sizelist);
    }

    /**
     * @summary     Custom event listener that is triggered when the font option
     *              on Quill toolbar is selected.
     * @description Custom event listener that essentially performs the same 
     *              action as the default event listener for fonts with the 
     *              exception that it updated this._font for usage later in the
     *              program.
     */
    _AddFontListener()
    {
        this._quill.getModule('toolbar').addHandler('font', (value) => {
            this._font = this._quill.getFormat(this._quill.getSelection()).font;
            this._quill.format('font', value);
        });
    }

    /**
     * @summary     Allows for the input of custom font colors.
     * @description Adds an event listener that allows for the addition of custom 
     *              font colors.
     */
    _AddFontColorListener()
    {
        this._quill.getModule('toolbar').addHandler('color', (value) => {
            if (value == 'custom-color') {
                value = prompt('Enter Hex/RGB/RGBA');
            }
            this._font = this._quill.getFormat(this._quill.getSelection()).font;
            this._quill.format('color', value);
        });
    }

    /**
     * @summary     Allows for the input of custom font sizes.
     * @description Adds an event listener that allows for the addition of a custom
     *              font size.
     */
    _AddFontSizeListener(sizeList)
    {
        this._quill.getModule('toolbar').addHandler('size', (value) => {
            if (value == 'custom-size') {
                value = prompt('Enter font size');
                value += 'px';
                sizeList.push(value);
            }
            this._RegisterFontSizes(sizeList);
            this._font = this._quill.getFormat(this._quill.getSelection()).font;
            this._quill.format('size', value);
        });
    }

    /**
     * @summary     Adds an event listener that is called when text is changed
     *              to the parameterized quill object.
     * @description Call's the quill object's on method with option 'text-change'
     *              and adds an event listener to it.
     */
    _AddTextListener()
    {
        this._quill.on('text-change', () => { 
            this._UpdateQuillFont();
            this._UpdateTextListener(); 
        });
    }

    /**
     * @summary     Updates null or undefined elements with current value of their 
     *              repsective instance variables.
     * 
     * @description Updates null or undefined attributes in the Delta object associated
     *              with the quill editor's contents. In some cases, these variables
     *              can go undefined when they should have explicit values. This 
     *              function re-adds those values so they are explicitly given.
     * 
     * @param {bool} useFontArray A boolean that determines if this function
     *                            should use the fontArr instance variable or 
     *                            the font instance variable.
     */
    _UpdateQuillFont(useFontArray = false)
    {
        this._quill.getContents().ops.forEach((d, i) => {
            if (d.attributes !== undefined && (d.attributes.font === undefined 
                || d.attributes.font === null)) {
                var bounds = this._FindSelectionBounds(i);
                this._ReformatQuillFont(bounds.lowerBound, bounds.upperBound, useFontArray);
            }
        });
    }

    /**
     * @summary     This function finds the selection bounds of the null or 
     *              undefined delta element so that it can be formated properly.W
     * @description This function assumes that opsIndex is in the quill content's 
     *              delta.
     * 
     * @param {int} opsIndex Index of the ops we want to convert to quill selection
     *                       bounds.
     */
    _FindSelectionBounds(opsIndex)
    {   
        var count = 0, lowerBound = 0, upperBound = 0;
        this._quill.getContents().ops.forEach((d, i) => {
            var prevCount = count;
            count += d.insert.length;
            if (i === opsIndex) {
                lowerBound = prevCount;
                upperBound = count;
            }
        });
        return { lowerBound, upperBound };
    }

    /**
     * @summary     Reformats the font in the quill editor at index lower with 
     *              length of (upper - lower).
     * 
     * @param {int}     lower        The starting index of the text we need to reformat.
     * @param {int}     upper        The ending index of the text we need to reformat.
     * @param {boolean} useFontArray Determines whether quill reformats based on 
     *                               _font or _fontArr 
     */
    _ReformatQuillFont(lower, upper, useFontArray) 
    {
        var font = 0;
        if (useFontArray) font = this._fontArr[this._fontIndex++];
        else font = this._font;
        
        this._quill.formatText(lower, upper - lower, {
            font: font,
        });
    }

    /**
     * @summary     Updates the selected text element.
     * @description An event listener that is called whenever the text within
     *              "editor-container" changes.
     */
    _UpdateTextListener()
    {
        if (this._timeout) return;
        this._timeout = setTimeout(() => {
            this._timeout = null;
            this._HTMLToCanvas();
        }, 100);
    }

    /**
     * @summary     Converts DOM elements on the page to Konva.Image elements
     * @description Uses the html2canvas module to convert DOM elements located 
     *              within the body into Konva.Image elements.
     */
    _HTMLToCanvas()
    {

        /** 
         * Error check to ensure that Konva.js doesn't try to write an empty 
         * image to the canvas. If this occurs, the program will break so we 
         * need this error check here.
         */
        if (this._IsEditorEmpty()) {
            this._quill.format('font', '900-museo');
            return;
        }

        // Gets the text in the quill editor 
        var qlEditor = document.querySelector('.ql-editor').cloneNode(true);
        qlEditor.style.padding = 0 + 'px';

        // Creates a helper <div> to render text. This is necessary because with
        // out it, text would not render properly. 
        var helper = document.createElement('div');
        helper.style.visibility = 'false';
        helper.style.position = 'absolute';
        helper.id = 'ql-helper';
        helper.appendChild(qlEditor);
        document.getElementById('body').appendChild(helper);
    
        // Update textElem in textHandler element
        this._textElem.textElem = qlEditor;
        this._DeltaToSpanCSS();

        // Calling html2canvas and converting the quill editor contents into
        // a Konva.Image.
        html2canvas(helper, {
            backgroundColor: null,
            scrollY: -(window.scrollY),
        }).then((image) => {
            this._textImage.image(image);
            this._tr.forceUpdate();
            this._main.batchDraw();
        });
        helper.remove();
    }

    /**
     * @summary     Converts the Quill Delta into a spanCSS element.
     * @description Iterates through the contents of the Quill editor, which is
     *              in the form of a delta, and converts each element into an 
     *              object of spanCSS.
     */
    _DeltaToSpanCSS()
    {
        var attributeCount = 0;
        var cssList = [];
        this._quill.getContents().ops.forEach((d, i) => {
            if (d.attributes && d.insert !== '\n') {
                var elem = {
                    fontFamily: (d.attributes) ? d.attributes.font : '900-museo',
                    fontSize: (d.attributes) ? d.attributes.size : '10px',
                    textColor: (d.attributes) ? d.attributes.color : 'black',
                    lineHeight: (d.attributes) ? d.attributes.lineheight : '1.0',
                    align: (d.attributes) ? this._quill.getFormat().align : 'left'
                };
                cssList[attributeCount] = elem;
                attributeCount++;
            }
        });
        this._textElem.spanCSS = cssList; 
    }

    /**
     * @summary Determines if quill editor is empty.
     * @returns True if empty and false if not empty.
     */
    _IsEditorEmpty()
    {
        return (this._quill.getContents().ops[0].insert == '\n')
    }
}