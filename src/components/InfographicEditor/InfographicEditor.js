// Cullen, Riley
// InfographicEditor.js
// June 28, 2021

import React from 'react';
import {CanvasContainer} from './CanvasContainer';
import { QuillEditor, WaffleEditor, Remover, BarEditor } from './Editors/index';
import { Toolbar } from './Toolbar/Toolbar';

import '../../css/React/InfographicEditor.css';

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
            toolbarContent: 'insert',
            chartData: 0,
            isRemoving: false,
        };
        this._infogTextElem = 0;
        this._editorTextElem = 0;
        this._infogDimensions = {
            width: 582,
            height: 582,
        };
    }

    render()
    {
        var currentEditor = this._SelectEditor(),
            width = this._infogDimensions.width;
        return (
            <div className='editor-container'>
                <CanvasContainer 
                    infographic={this.props.currentInfographic}
                    editorHandler={(editor) => { this._SetCurrentEditor(editor); }}
                    textHandler={(textElem) => { this._SetInfogTextElem(textElem); }}
                    chartDataHandler={(data) => { this._SetChartData(data); }}
                    dimensionHandler={(dims) => { this._SetInfogDimensions(dims); }}
                    textElem={this._editorTextElem}
                    chartData={this.state.chartData}
                    isRemoving={this.state.isRemoving}
                    style={{flex: 1}}
                />
                <Toolbar 
                    currentEditor={this.state.currentEditor}
                    toolbarContent={this.state.toolbarContent}
                    setToolbarContent={(content) => { this._SetToolbarContent(content); }}
                    displayHome={() => { this.props.displayHome(); }}
                    canvasToggle={(setting) => { this._CanvasToggle(setting); }} />
                <div className='editor'
                    style={{marginLeft: 30, position: 'fixed', left: width + 55 + 'px', top: 70 + 'px'}}
                >
                    {currentEditor}
                </div>
            </div>
        );
    }

    componentDidUpdate()
    { 
        if (this.state.isRemoving) this.setState({isRemoving: false});
    }

    /**
     * @summary     Updates the current editor.
     * @param {string} editor The new editor.
     */
    _SetCurrentEditor(editor)
    {
        this._RemoveUnderline(this.state.toolbarContent);
        this.setState({
            currentEditor: editor,
            toolbarContent: (editor === 'none') ? 'insert' : editor,
        });

        this._infogTextElem = 0;
        this._editorTextElem = 0;
    }

    /**
     * @summary     Updates the current text element.
     * @param {JSON} textElem The new text element.
     */
    _SetInfogTextElem(textElem) 
    {
        this._infogTextElem = textElem;
    }

    /**
     * @summary     Updates the current text element.
     * @param {JSON} textElem The new text element.
     */
    _SetEditorTextElem(textElem)
    {
        this._editorTextElem = textElem;
    }

    /**
     * @summary Updates _infogDimensions.
     * @param {JSON} dimensions JSON object containing a width and height attribute.
     */
    _SetInfogDimensions(dimensions) 
    {
        this._infogDimensions = {
            width: dimensions.width,
            height: dimensions.height,
        };
    }

    /**
     * @summary Updates chartData.
     * @param {misc} chartData Layout of data depends on which chart we are dealing with.
     */
    _SetChartData(chartData)
    {
        this.setState({
            chartData: chartData,
        });
    }

    /**
     * @summary Selects the current editor being displayed.
     * @returns A react component
     */
    _SelectEditor()
    {
        if (this.state.currentEditor === 'text-editor') {
            return <QuillEditor 
                textElem={this._infogTextElem}
                setTextElem={(textElem) => { this._SetEditorTextElem(textElem); }}
            />;
        } else if (this.state.currentEditor === 'waffle-editor') {
            return <WaffleEditor 
                chartData={this.state.chartData}
                setChartData={(data) => { this._SetChartData(data); }}/>
        } else if (this.state.currentEditor === 'bar-editor') {
            return <BarEditor 
                chartData={this.state.chartData}
                setChartData={(data) => { this._SetChartData(data); }}/>;
        } else if (this.state.currentEditor === 'stacked-bar-editor') {
            return <div></div>;
        } else if (this.state.currentEditor === 'pie-editor') {
            return <div></div>;
        } else if (this.state.currentEditor === 'image-editor') {
            return <div></div>;
        } else if (this.state.currentEditor === 'icon-editor') {
            return <div></div>;
        } else if (this.state.currentEditor === 'header-editor') {
            return <div></div>;
        }
        return false;
    }

    _CanvasToggle(setting)
    {
        if (setting === 'remove') {
            this._ToggleRemove();
        }
    }

    _ToggleRemove()
    {
        this.setState({
            isRemoving: true,
        }); 
    }

    /**
     * @summary     Sets up the toolbar's contents.
     * @description A private function that removes the underline from the currently
     *              selected option in the upper toolbar and adds an underline 
     *              to the newly selected item. This function also updates the 
     *              state of the toolbarContent variable.
     * 
     * @param {string} content 
     * @returns 
     */
    _SetToolbarContent(content)
    {
        if (content === this.state.toolbarContent) return;    

        this._RemoveUnderline(this.state.toolbarContent);

        this.setState({
            toolbarContent: content,
        });
    }

    _RemoveUnderline(name)
    {
        // Remove underline 
        let selectedElem = document.getElementById('toolbar-' + name);
        selectedElem.classList.remove('selected');
    }
}

export {InfographicEditor};