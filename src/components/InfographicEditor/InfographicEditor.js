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
            textElem: 'none',
        };
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
                    textHandler={(textElem) => { this._SetTextElem(textElem); }}
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

    _SetTextElem(textElem) 
    {
        this.setState({
            textElem: textElem,
        });
    }

    _SelectEditor()
    {
        if (this.state.currentEditor === 'text-editor') {
            return <QuillEditor textElem={this.state.textElem}/>;
        }
        return false;
    }
}

export {InfographicEditor};