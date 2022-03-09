import React, { useEffect, useState }from 'react';
import html2canvas from 'html2canvas';
import { useQuill } from 'react-quilljs';
import Delta from 'quill-delta';
import 'quill/dist/quill.snow.css';
import '../../../css/Quill/FontList.css';
import '../../../css/Quill/FontSize.css';
import '../../../css/Quill/LineHeight.css';
import '../../../css/Quill/Toolbar.css';

import '../../../css/React/Editors/QuillEditor.css';

function QuillEditor(props)
{
    var sizeList = ['10px', '11px', '12px', '13px', '14px', '15px', '16px', 
            '17px', '18px', '20px', 'custom-size'];
    var fontList = ['900-museo', '100-canada', '200-canada', 
        '400-canada', '500-canada', '600-canada', '700-canada', '900-canada',
        '200-Montserrat', 'Open-Sans', '100-Roboto', '300-Roboto', '400-Roboto',
        '500-Roboto', '700-Roboto', '900-Roboto'];
    var lineHeightList = ['1.0', '1.2', '1.5', '1.75', '2.0'];

    const theme = 'snow';

    const modules= {
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
    };

    const placeholder = 'Compose an epic...';

    const formats = ['font', 'size', 'lineheight', 'align', 'color'];

    const { quill, quillRef, Quill } = useQuill({ theme, modules, formats, placeholder });
    const [ sizeArr, setSizeArr ] = useState(sizeList);

    var font = {font: 0}, fontArr = [];

    // function component version of componentDidUpdate... this function is called
    // whenever props.textElem, Quill, or quill change.
    useEffect(() => {
        if (Quill && quill) {
            let elem = document.querySelector('.ql-container'),
                spanCSS = props.textElem.spanCSS;
            
            // Update background color of QuillEditor when text is white
            for (let i = 0; i < spanCSS.length; i++) {
                if (spanCSS[i].textColor === '#ffffff' || spanCSS[i].textColor === 'white') {
                    elem.style.backgroundColor = '#000';
                    break;
                }
            }

            // Set up font, font sizes, and line heights so Quill recognizes them
            // and can use them
            // RegisterFontSizes(Quill, sizeList);
            RegisterFontFamilies(Quill, fontList)
            InitLineHeights(Quill, lineHeightList);

            RemoveQuillListeners(quill);

            // Insert the selected text into QuillEditor
            InitEditor({
                textElem: props.textElem,
                quillObj: quill,
                quillClass: Quill,
                sizeList: sizeList,
                font: font,
                fontList: fontArr,
            });

            // This adds, among other things, the events that handles updating
            // text when the QuillEditor changes
            AddQuillListeners({
                quill: quill,
                sizeList: sizeList,
                font: font,
                quillClass: Quill,
                fontArr: fontArr,
                textElem: props.textElem,
                setTextElem: (text, image, css) => { props.setTextElem(text, image, css); }
            });

            // This function runs when there are selection changes being made
            // in the QuillEditor (i.e. when text is highlighted or the cursor
            // is moved, etc)
            quill.on('selection-change', () => {
            
                /**
                 * The following (93-96) exists because of the following scenario.
                 * Essentially, for multi-line text, if we select all of the quill 
                 * contents and press any letter (say 'k' for example), then the quill
                 * editor will lose focus and any text that is entered after this will
                 * not be formatted, which will cause us errors when re-selecting the
                 * text. So, we must manually reformat the text here.
                 */
                if (IsEditorEmpty(quill)) {
                    quill.format('font', '900-museo');
                    return;
                }
    
                let selection = quill.getSelection();
                
                if (selection === null) {
                    RemoveColorFromSize();
                    return;
                }
    
                let format = quill.getFormat(selection),
                    size = format.size;
                
                if (!sizeArr.find(elem => elem === size)) {
                    UpdateSizeUI(size);
                }
            });
    
            quill.setSelection(0, 0);
            let size = quill.getFormat(quill.getSelection()).size;
            if (!sizeArr.find(elem => elem === size)) {
                UpdateSizeUI(size);
            }
        }

        return () => { }
    }, [props.textElem, Quill, quill]);

    return (
        <div className='text-editor-container'>
            <div className='text-editor'>
                <div ref={quillRef}></div>
            </div>
        </div>
    )
}

function UpdateSizeUI(value)
{
    let elem = document.querySelector('.ql-snow .ql-picker.ql-size .ql-picker-label');
    if (elem === null) return;
    elem.setAttribute('data-value', value);
    elem.classList.add('ql-active');
}

function RemoveColorFromSize()
{
    let elem = document.querySelector('.ql-snow .ql-picker.ql-size .ql-picker-label');
    if (elem === null) return;
    elem.classList.remove('ql-active')
}

function InitLineHeights(Quill, lineHeightList)
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
 * @summary     Registers various font families with Quill.
 * @description Creates a Font object, whitelists the fonts, and registers
 *              them with Quill.
 * 
 * @param {Array} fontList An array of strings that represent the data value 
 *                         associated with the fonts.
 */
function RegisterFontFamilies(Quill, fontList)
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
function RegisterFontSizes(Quill, sizeList)
{
    var Size = Quill.import('attributors/style/size');
    Size.whitelist = sizeList;
    Quill.register(Size, true);
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
function InitEditor({textElem, quillObj, quillClass, sizeList, font, fontList})
{    
    if (textElem === 0) return;
    var cssList = textElem.spanCSS;

    /**
     * Registers font sizes if they are not already registered.
     */
    cssList.forEach(d => {
        if (!sizeList.find(elem => elem === d.fontSize)) {
            sizeList.push(d.fontSize);
        }
    });
    RegisterFontSizes(quillClass, sizeList);

    // Converts the spanCSS element in textElem to a Delta (the Quill way of
    // describing elements)
    var contents = SpanCSSToDelta(textElem, quillClass);
    
    // Sets content to the contents delta.
    quillObj.setContents(contents);
    DetermineInitialFont(quillObj, contents, font, fontList);

    /**
     * "Fixes" the quill editor contents. For some reason (and I am not 
     * entirely sure why), the quill editor will simplify the delta and remove 
     * important attribute data (like the font). 
     * 
     * We fix this issue by simply reformatting the undefined fonts to the
     * value of font.
     */
    UpdateQuillFont(quillObj, true, font.font, fontList);

    var alignment = (cssList.length !== 0) ? cssList[0].align : 'left';
    AlignText(quillObj, alignment);
}

/**
 * @summary     Converts spanCSS data in a text handler element to a Quill
 *              Delta.
 * @description Iterates through all of the elements in spanCSS (which itself 
 *              is a JSON Array) and converts it to a Delta that will be used
 *              to populate the contents of the Quill text editor.
 * @returns     The Delta version of spanCSS.
 */
function SpanCSSToDelta(textElem, Quill)
{
    var elemCount = 0
    var cssList = textElem.spanCSS;
    var contents = new Delta();

    textElem.textElem.childNodes.forEach((d, i) => {
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
function DetermineInitialFont(quillObj, contents, font, fontArr)
{
    quillObj.getContents().ops.forEach((d, i) => {
        if (d.insert !== '\n'){
            if (d.attributes !== undefined && (d.attributes.font === undefined 
                || d.attributes.font === null)) {
                font.font = contents.ops[i].attributes.font;
                fontArr[fontArr.length] = contents.ops[i].attributes.font;
            }
        }
    });
}

/**
 * @summary     Aligns all of the lines in the quill editor.
 * 
 * @param {string} align The type of alignment for each line.
 */
function AlignText(quillObj, align)
{
    var contents = quillObj.getContents();
    var contentLength = 0;

    contents.ops.forEach((d) => {
        contentLength += d.insert.length;
    });
    quillObj.formatLine(0, contentLength, 'align', align)
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
function UpdateQuillFont(quillObj, useFontArray = false, font, fontArr)
{
    var errorCount = 0;
    quillObj.getContents().ops.forEach((d, i) => {
        if (d.attributes !== undefined && (d.attributes.font === undefined 
            || d.attributes.font === null)) {
            var bounds = FindSelectionBounds(quillObj, i);
            ReformatQuillFont(quillObj, bounds.lowerBound, bounds.upperBound, 
                useFontArray, font, fontArr, errorCount);
            errorCount++;
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
function FindSelectionBounds(quill, opsIndex)
{   
    var count = 0, lowerBound = 0, upperBound = 0;
    quill.getContents().ops.forEach((d, i) => {
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
function ReformatQuillFont(quill, lower, upper, useFontArray, _font, fontArr, index) 
{
    var font = 0;
    if (useFontArray) font = fontArr[index];
    else font = _font;
    quill.formatText(lower, upper - lower, {
        font: font,
    });
}

/**
 * @summary     Adds event listeners to the quill object.
 * @description Adds the event listeners responsible for text change, font color,
 *              and font size.
 * 
 * @param {Quill} quill The quill object we want to add event listeners to.
 */
function AddQuillListeners({quill, sizelist, font, quillClass, fontArr, textElem, setTextElem})
{
    AddTextListener(quill, font, fontArr, textElem, (text, image, css) => {setTextElem(text, image, css);});
    AddFontListener(quill, font);
    AddFontColorListener(quill, font);
    AddFontSizeListener(quill, font, sizelist, quillClass);
}

function RemoveQuillListeners(quill)
{
    quill.off('text-change');
}

/**
 * @summary     Custom event listener that is triggered when the font option
 *              on Quill toolbar is selected.
 * @description Custom event listener that essentially performs the same 
 *              action as the default event listener for fonts with the 
 *              exception that it updated this._font for usage later in the
 *              program.
 */
function AddFontListener(quill, font)
{
    quill.getModule('toolbar').addHandler('font', (value) => {
        font.font = quill.getFormat(quill.getSelection()).font;
        quill.format('font', value);
    });
}

/**
 * @summary     Allows for the input of custom font colors.
 * @description Adds an event listener that allows for the addition of custom 
 *              font colors.
 */
function AddFontColorListener(quill, font)
{
    quill.getModule('toolbar').addHandler('color', (value) => {
        if (value === 'custom-color') {
            value = prompt('Enter Hex/RGB/RGBA');
        }
        font.font = quill.getFormat(quill.getSelection()).font;
        quill.format('color', value);
    });
}

/**
 * @summary     Allows for the input of custom font sizes.
 * @description Adds an event listener that allows for the addition of a custom
 *              font size.
 */
function AddFontSizeListener(quill, font, sizeList, quillClass)
{
    quill.getModule('toolbar').addHandler('size', (value) => {
        let list = ['10px', '11px', '12px', '13px', '14px', '15px', '16px', 
            '17px', '18px', '20px', 'custom-size'];

        if (value === 'custom-size') {
            value = prompt('Enter font size');
            value += 'px';
            list.push(value);

            quill.getContents().ops.forEach(d => {
                if (d.attributes !== undefined) {
                    if (!list.find(elem => elem === d.attributes.size)) {
                        list.push(d.attributes.size);
                    }
                }
            });

            RegisterFontSizes(quillClass, list);
        }
        font.font = quill.getFormat(quill.getSelection()).font;
        quill.format('size', value);
        UpdateSizeUI(value);
    });
}

/**
 * @summary     Adds an event listener that is called when text is changed
 *              to the parameterized quill object.
 * @description Call's the quill object's on method with option 'text-change'
 *              and adds an event listener to it.
 */
function AddTextListener(quill, font, fontArr, textElem, setTextElem)
{
    var timeout = {timeout: null};
    quill.on('text-change', () => { 
        UpdateQuillFont(quill, false, font.font, fontArr);
        UpdateTextListener(quill, timeout, textElem, (text, image, css) => (setTextElem(text, image, css))); 
    });
}


/**
 * @summary     Updates the selected text element.
 * @description An event listener that is called whenever the text within
 *              "editor-container" changes.
 */
function UpdateTextListener(quill, timeout, textElem, setTextElem)
{
    if (timeout.timeout) return;
    timeout.timeout = setTimeout(() => {
        timeout.timeout = null;
        HTMLToCanvas(quill, textElem, setTextElem);
    }, 100);
}

/**
 * @summary     Converts DOM elements in the Quill editor to Konva.Image elements
 * @description Uses the html2canvas module to convert DOM elements located 
 *              within the body into Konva.Image elements.
 */
function HTMLToCanvas(quill, textElem, setTextElem)
{
    /** 
     * Error check to ensure that Konva.js doesn't try to write an empty 
     * image to the canvas. If this occurs, the program will break so we 
     * need this error check here.
     */
    if (IsEditorEmpty(quill)) {
        quill.format('font', '900-museo');
        return;
    }

    /**
     * Error check to ensure that program does not try to convert Quill contents
     * when the editor is closed. This usually occurs after the component unmounts.
     * I'm not 100% sure why, but my thought process is that right before the Quill
     * editor gets removed, the contents are cleared which triggers this method.
     */
    if (document.querySelector('.ql-editor') === null) return;

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
    document.getElementById('renderHelper').appendChild(helper);

    // Update textElem in textHandler element
    textElem.textElem = qlEditor;
    DeltaToSpanCSS(quill, textElem);

    // Calling html2canvas and converting the quill editor contents into
    // a Konva.Image.
    html2canvas(helper, {
        backgroundColor: null,
        scrollY: -(window.scrollY),
    }).then((image) => {
        // Update the <canvas> with the new text image... NOTE that his occurs
        // as soon as the change is detected while the actual textElement (in
        // infographic) is not updated until the text editor is removed.
        
        setTextElem(qlEditor, image, textElem.spanCSS);
    });
    helper.remove();
}

/**
 * @summary     Converts the Quill Delta into a spanCSS element.
 * @description Iterates through the contents of the Quill editor, which is
 *              in the form of a delta, and converts each element into an 
 *              object of spanCSS.
 */
function DeltaToSpanCSS(quill, textElem)
{
    var attributeCount = 0;
    var cssList = [];
    quill.getContents().ops.forEach((d, i) => {
        let isAttrs = d.hasOwnProperty('attributes');
        if (d.insert !== '\n') {
            var elem = {
                fontFamily: (isAttrs) ? d.attributes.font : '900-museo',
                fontSize: (isAttrs) ? d.attributes.size : '10px',
                textColor: (isAttrs) ? d.attributes.color : 'black',
                lineHeight: (isAttrs) ? d.attributes.lineheight : '1.0',
                align: (isAttrs) ? quill.getFormat().align : 'left'
            };
            cssList[attributeCount] = elem;
            attributeCount++;
        }
    });
    textElem.spanCSS = cssList; 
}

/**
 * @summary Determines if quill editor is empty.
 * @returns True if empty and false if not empty.
 */
function IsEditorEmpty(quill)
{
    return (quill.getContents().ops.length === 1 
        && quill.getContents().ops[0].insert.match(/[\n]+/)); 
}

export { QuillEditor };