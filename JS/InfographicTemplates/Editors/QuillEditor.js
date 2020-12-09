// Cullen, Riley
// QuillEditor.js
// December 3, 2020

// Sources
// 1. Quill color related code taken from https://stackoverflow.com/questions/42068335/quill-js-color-textbox
// 2. Quill font size code adapted from https://stackoverflow.com/questions/38623716/how-to-add-custom-font-sizes-to-quilljs-editor

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
        this._main = main;
        this._timeout = null;
        this._tr = tr;

    }

    /**
     * @summary     Adds Quill.js editor container to the DOM.
     * @description Creates a <div> element with id "editor-container" and adds
     *              it to the DOM.
     */
    CreateEditorUI()
    {
        var container = document.createElement('div');
        container.id = 'editor-container';
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
            '400-canada', '500-canada', '600-canada', '700-canada', '900-canada'];

        this._RegisterFontFamilies(fontList);
        this._RegisterFontSizes(sizeList);

        var quill = new Quill('#editor-container', {
            modules: {
                toolbar: [
                  [{'font': fontList}],
                  [{'size': sizeList}],
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
              placeholder: 'Compose an epic...',
              theme: 'snow',
        });
        this._AddQuillListeners(quill);
    }

    _RegisterFontFamilies(fontList)
    {
        let Font = Quill.import('formats/font');
        Font.whitelist = fontList;
        Quill.register(Font, true);
    }

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
    _AddQuillListeners(quill)
    {
        this._AddFontColorListener(quill);
        this._AddTextListener(quill);
        this._AddFontSizeListener(quill);
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
        });
    }

    /**
     * @summary     Allows for the input of custom font sizes.
     * @description Adds an event listener that allows for the addition of a custom
     *              font size.
     * 
     * @param {Quill} quill The quill editor we want to add the event listener to.
     */
    _AddFontSizeListener(quill)
    {
        var Size = Quill.import('attributors/style/size'); 
        quill.getModule('toolbar').addHandler('size', (value) => {
            if (value == 'custom-size') {
                value = prompt('Enter font size');
                value += 'px';
                Size.whitelist = [value];
                Quill.register(Size, true);
            }
            quill.format('size', value);
            this._RegisterFontSizes();
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

        html2canvas(document.querySelector('#ql-helper'), {
            backgroundColor: null,
        }).then((image) => {
            this._textElem.image(image);
            this._tr.forceUpdate();
            this._main.batchDraw();
        });

        console.log(helper);

        helper.remove();
    }
}