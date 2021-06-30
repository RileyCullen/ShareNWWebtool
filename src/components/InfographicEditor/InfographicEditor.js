// Cullen, Riley
// InfographicEditor.js
// June 28, 2021

import React from 'react';
import {CanvasContainer} from './CanvasContainer';

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
            previousEditor: 'none',
        };
    }

    render()
    {
        var currentEditor = this.state.currentEditor;
 
        return (
            <div className='infographiceditor'>
                <div className='editor'>
                    {currentEditor}
                </div>
                <CanvasContainer 
                    infographic={this.props.currentInfographic}
                    editorHandler={(editor) => { this._SetCurrentEditor(editor); }}
                />
            </div>
        );
    }

    _SetCurrentEditor(editor)
    {
        this.setState({
            previousEditor: this.state.currentEditor,
            currentEditor: editor,
        });
    }
}

export {InfographicEditor};