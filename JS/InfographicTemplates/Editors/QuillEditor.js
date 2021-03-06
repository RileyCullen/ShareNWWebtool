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
        this._primaryColor = textElem.textInfo.color;
        this._font = textElem.textInfo.initialFont;
        this._size = textElem.textInfo.initialSize;
        this._main = main;
        this._timeout = null;
        this._tr = tr;

        console.log(this._primaryColor);
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

        var quill = new Quill('#editor-container', {
            modules: {
                toolbar: [
                  [{'font': fontList}],
                  [{'size': sizeList}],
                  [{'lineheight': lineHeightList}],
                  ['italic', 'underline'],
                  ['image', 'code-block'],
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
              //placeholder: 'Compose an epic...',
              theme: 'snow',
        });

        console.log(quill)

        this._AddQuillListeners(quill, sizeList);
        this._InitEditor(quill, sizeList);
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
    _InitEditor(quill, sizeList)
    {
        // Checking if the text's font size is registered or not. If not, we 
        // register it then format the editor.
        if (!sizeList.find(elem => elem == this._size)) {
            sizeList.push(this._size);
            this._RegisterFontSizes(sizeList);
        }
    
        var quillContentList = [];
        var contentListSize = 0, elemCount = 0
        var cssList = this._textElem.spanCSS;

        cssList.forEach(d => {
            if (!sizeList.find(elem => elem == d.fontSize)) {
                sizeList.push(d.fontSize);
                this._RegisterFontSizes(sizeList);
            }
        });

        console.log(cssList)
        console.log(cssList[elemCount].fontSize)

        this._textElem.textElem.childNodes.forEach((d, i) => {
            d.childNodes.forEach((elem) => {
                console.log(elem);
                quillContentList[contentListSize] = {
                    insert: elem.innerHTML, 
                    attributes: {
                        color: cssList[elemCount].textColor, 
                        size: cssList[elemCount].fontSize,
                        font: cssList[elemCount].fontFamily,
                        lineheight: cssList[elemCount].lineHeight
                    } 
                };
                elemCount++;
                contentListSize++;
            });
            quillContentList[contentListSize++] = {
                insert: "\n",
            }
            quill.format('size', '10px');
        });

        console.log(quillContentList)
        quill.setContents(quillContentList);
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
        let Font = Quill.import('formats/font');
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
    _AddQuillListeners(quill, sizelist)
    {
        this._AddFontColorListener(quill);
        this._AddTextListener(quill);
        this._AddFontSizeListener(quill, sizelist);
        this._AddFontListener(quill);
    }

    /**
     * @summary     Allows for the input of custom font colors.
     * @description Adds an event listener that allows for the addition of custom 
     *              font colors.
     * 
     * @param {Quill} quill The quill edtior we want to add the event listener
     *                      to.
     */
    _AddFontColorListener(quill)
    {
        quill.getModule('toolbar').addHandler('color', (value) => {
            if (value == 'custom-color') {
                value = prompt('Enter Hex/RGB/RGBA');
            }
            quill.format('color', value);
            this._textElem.textInfo.color = quill.root.firstChild.firstChild.style.color;
            /**
             * Note: we need the code above instead of this._textElem.textInfo.color
             * = value because we only want to update the color if the first line 
             * changes. 
             * 
             * Since the root is the container for all of the text, we want to access
             * its first child, and then since the paragraph nodes hold span nodes 
             * which are what contain the actual text and styling, we want to get 
             * root's first child's first child. 
             */
        });
    }

    /**
     * @summary     Allows for the input of custom font sizes.
     * @description Adds an event listener that allows for the addition of a custom
     *              font size.
     * 
     * @param {Quill} quill The quill editor we want to add the event listener to.
     */
    _AddFontSizeListener(quill, sizeList)
    {
        quill.getModule('toolbar').addHandler('size', (value) => {
            if (value == 'custom-size') {
                value = prompt('Enter font size');
                value += 'px';
                sizeList.push(value);
            }
            this._RegisterFontSizes(sizeList);
            quill.format('size', value);
            this._textElem.textInfo.initialSize = quill.root.firstChild.firstChild.style.fontSize;
        });
    }

    _UpdateDataLabel()
    {
        var element = document.querySelector('.ql-size > .ql-picker-label');
        console.log(element);
    }


    /**
     * @summary     Overrides default handler for changing quill fonts.
     * @description Manually overwrites default handler to provide the ability to
     *              update the textInfo element located in _textElem. Besides this,
     *              the behavior between this and the default handler is essentially
     *              the same.
     * 
     * @param {Quill} quill The quill editor we want to add the event listener to.
     */
    _AddFontListener(quill)
    {
        quill.getModule('toolbar').addHandler('font', value => {
            quill.format('font', value);
            this._textElem.textInfo.initialFont = value;
        });
    }

    /**
     * @summary     Adds an event listener that is called when text is changed
     *              to the parameterized quill object.
     * @description Call's the quill object's on method with option 'text-change'
     *              and adds an event listener to it.
     * 
     * @param {Quill} quill The quill editor we want to add the event listener
     *                      to.
     */
    _AddTextListener(quill)
    {
        quill.on('text-change', () => { this._UpdateTextListener(); });
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
     * 
     * @param {int} index The index of the text element we want to convert.
     */
    _HTMLToCanvas()
    {
        var qlEditor = document.querySelector('.ql-editor').cloneNode(true);

        var helper = document.createElement('div');
        helper.style.visibility = 'false';
        helper.style.position = 'absolute';
        helper.id = 'ql-helper';
        helper.appendChild(qlEditor);
        document.getElementById('body').appendChild(helper);

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
}