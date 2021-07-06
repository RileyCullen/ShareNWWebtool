// Cullen, Riley
// InfographicEditor.js
// June 28, 2021

import React from 'react';
import {CanvasContainer} from './CanvasContainer';
import { QuillEditor } from './Editors/index';

/**
 * Container for all of the react components related to editing infographics.
 */
class InfographicEditor extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentEditor: 'none',
        };
        this._infogTextElem = 0;
        this._editorTextElem = 0;
        this._infogDimensions = {
            width: -1,
            height: -1,
        };
    }

    render()
    {
        var currentEditor = this._SelectEditor(),
            width = this._infogDimensions.width;
        return (
            <div className='infographiceditor'
                style={{display: 'flex'}}>
                <CanvasContainer 
                    infographic={this.props.currentInfographic}
                    editorHandler={(editor) => { this._SetCurrentEditor(editor); }}
                    textHandler={(textElem) => { this._SetInfogTextElem(textElem); }}
                    dimensionHandler={(dims) => { this._SetInfogDimensions(dims); }}
                    textElem={this._editorTextElem}
                    style={{flex: 1}}
                />
                <div className='editor'
                    style={{marginLeft: 30, position: 'fixed', left: width + 55 + 'px', top: 70 + 'px'}}
                >
                    {currentEditor}
                </div>
            </div>
        );
    }

    _SetCurrentEditor(editor)
    {
        this.setState({
            currentEditor: editor,
        });
        this._infogTextElem = 0;
        this._editorTextElem = 0;
    }

    _SetInfogTextElem(textElem) 
    {
        this._infogTextElem = textElem;
    }

    _SetEditorTextElem(textElem)
    {
        this._editorTextElem = textElem;
    }

    _SetInfogDimensions(dimensions) 
    {
        this._infogDimensions = {
            width: dimensions.width,
            height: dimensions.height,
        };
    }

    _SelectEditor()
    {
        if (this.state.currentEditor === 'text-editor') {
            return <QuillEditor 
                textElem={this._infogTextElem}
                setTextElem={(textElem) => { this._SetEditorTextElem(textElem); }}
            />;
        }
        return false;
    }
}

export {InfographicEditor};