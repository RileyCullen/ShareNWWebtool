import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import '../../../css/Quill/FontList.css';
import '../../../css/Quill/FontSize.css';
import '../../../css/Quill/LineHeight.css';
import '../../../css/Quill/Toolbar.css';

function QuillEditor()
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

    if (Quill) {
        RegisterFontSizes(Quill, sizeList);
        RegisterFontFamilies(Quill, fontList)
        InitLineHeights(Quill, lineHeightList);
    }
    return (
        <div className='text-editor' style={{width: 500, height: 300}}>
            <div ref={quillRef}></div>
        </div>
    )
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

export { QuillEditor };