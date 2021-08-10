// Cullen, Riley
// InfographicEditor.js
// June 28, 2021

import React from 'react';
import {CanvasContainer} from './CanvasContainer';
import { QuillEditor, WaffleEditor, BarEditor, IconBarEditor, 
    PieEditor, StackedBarEditor, LineEditor} from './Editors/index';
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
        let currentEditor = this._SelectEditor(),
            editorWindowHeight = (this.state.currentEditor === 'none') ? 
                '100%' : '150px',
            editorWindowBkgColor = (this.state.currentEditor === 'none') ? 
                'white' : '#ECECEC';

        let editorWindowContent = this._GetEditorWindowContent();
        
        return (
            <div className='editor-container'>
                <div className='upper-container'>
                    <Toolbar 
                        currentEditor={this.state.currentEditor}
                        toolbarContent={this.state.toolbarContent}
                        setToolbarContent={(content) => { this._SetToolbarContent(content); }}
                        displayHome={() => { this.props.displayHome(); }}
                        canvasToggle={(setting) => { this._CanvasToggle(setting); }} />
                </div>
                <div className='lower-container'>
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
                </div>
                <div className='editor'>
                    <div className='editor-vertical-divider'></div>
                    <div className='editor-close-button'>
                        <svg width="32" height="58" viewBox="0 0 32 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="50.9091" fill="#C4C4C4"/>
                            <path d="M23.125 25.7461C23.6523 25.2188 23.6523 24.3398 23.125 23.7539L15.1562 15.7852C14.5703 15.2578 13.6914 15.2578 13.1641 15.7852L11.8164 17.1328C11.2891 17.7188 11.2891 18.5977 11.8164 19.125L17.5 24.8086L11.8164 30.4336C11.2891 30.9609 11.2891 31.8398 11.8164 32.4258L13.1641 33.7148C13.6914 34.3008 14.5703 34.3008 15.1562 33.7148L23.125 25.7461Z" fill="black"/>
                        </svg>
                    </div>
                    <div className='editor-menu'
                        style={{
                            height: editorWindowHeight, 
                            backgroundColor: editorWindowBkgColor}}>
                        {editorWindowContent}
                    </div>
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
            return <StackedBarEditor />;
        } else if (this.state.currentEditor === 'pie-editor') {
            return <PieEditor />;
        } else if (this.state.currentEditor === 'image-editor') {
            return <div></div>;
        } else if (this.state.currentEditor === 'icon-editor') {
            return <div></div>;
        } else if (this.state.currentEditor === 'header-editor') {
            return <div></div>;
        } else if (this.state.currentEditor === 'line-editor') {
            return <LineEditor />;
        } else if (this.state.currentEditor === 'icon-bar-editor') {
            return <IconBarEditor />;
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

    _GetEditorWindowContent()
    {
        if (this.state.currentEditor === 'none') {
            return (
                <p className='editor-placeholder-text'>Double click on an element to begin editing!</p>
            );
        } else {
            return (
                <p>{this.state.currentEditor}</p>
            );
        }
    }
}

export {InfographicEditor};