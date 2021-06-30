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
        this._infogTextElem = 'none';
        this._editorTextElem = 'none';
    }

    render()
    {
        var currentEditor = this._SelectEditor();
        return (
            <div className='infographiceditor'
                style={{display: 'flex'}}>
                <CanvasContainer 
                    infographic={this.props.currentInfographic}
                    editorHandler={(editor) => { this._SetCurrentEditor(editor); }}
                    textHandler={(textElem) => { this._SetInfogTextElem(textElem); }}
                    textElem={this._editorTextElem}
                    style={{flex: 1}}
                />
                <div className='editor'
                    style={{marginLeft: 30}}
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
    }

    _SetInfogTextElem(textElem) 
    {
        this._infogTextElem = textElem;
    }

    _SetEditorTextElem(textElem)
    {
        this._editorTextElem = textElem;
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