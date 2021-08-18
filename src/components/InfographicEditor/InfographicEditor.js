// Cullen, Riley
// InfographicEditor.js
// June 28, 2021

import React from 'react';
import {CanvasContainer} from './CanvasContainer';
import { QuillEditor, WaffleEditor, BarEditor, IconBarEditor, 
    PieEditor, LineEditor, BackgroundElementEditor, ImageEditor, IconEditor, 
    Chart, Icon, BackgroundElement, Image, Background }
    from './Editors/index';
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
            cSettings: 0,
            dSettings: 0,
            graphicSettings: 0,
            isRemoving: false,
        };
        this._infogTextElem = 0;
        this._editorTextElem = 0;
        this._infogDimensions = {
            width: 582,
            height: 582,
        };
        this._clearSelection = false;
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
                        canvasToggle={(setting) => { this._CanvasToggle(setting); }} 
                        editorHandler={(editor) => { this._SetCurrentEditor(editor); }}/>
                </div>
                <div className='lower-container'>
                    <CanvasContainer 
                        infographic={this.props.currentInfographic}
                        editorHandler={(editor) => { this._SetCurrentEditor(editor); }}
                        textHandler={(textElem) => { this._SetInfogTextElem(textElem); }}
                        chartHandler={(data, cSettings, dSettings) => { this._ChartHandler(data, cSettings, dSettings); }}
                        graphicHandler={(settings) => { this._GraphicHandler(settings); }}
                        dimensionHandler={(dims) => { this._SetInfogDimensions(dims); }}
                        textElem={this._editorTextElem}
                        chartData={this.state.chartData}
                        isRemoving={this.state.isRemoving}
                        clearSelection={this._clearSelection}
                        style={{flex: 1}}
                    />
                </div>
                <div className='editor'>
                    <div className='editor-vertical-divider'></div>
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
        this._clearSelection = false;
    }

    /**
     * @summary     Updates the current editor.
     * @param {string} editor The new editor.
     */
    _SetCurrentEditor(editor)
    {
        let expr = editor === 'insert-chart' || editor === 'insert-icon'
            || editor === 'insert-text' || editor === 'insert-image' 
            || editor === 'insert-background-elem' || editor === 'edit-background';
        this._RemoveUnderline(this.state.toolbarContent);
        this.setState({
            currentEditor: editor,
            toolbarContent: this._GetToolbarContent(expr, editor),
        });

        if (expr) this._clearSelection = true;

        this._infogTextElem = 0;
        this._editorTextElem = 0;
    }

    _GetToolbarContent(expr, editor)
    {
        if (expr || editor === 'none') {
            return 'insert';
        }
        return editor;
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

    _GraphicHandler(settings)
    {
        this.setState({
            graphicSettings: settings,
        });
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

    _ChartHandler(data, cSettings, dSettings)
    {
        this.setState({
            chartData: data,
            cSettings: cSettings,
            dSettings: dSettings,
        });
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

    _SetChartSettings(settings)
    {
        
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
                cSettings={this.state.cSettings}
                dSettings={this.state.dSettings}
                setChartData={(data) => { this._SetChartData(data); }}/>
        } else if (this.state.currentEditor === 'bar-editor' || 
            this.state.currentEditor === 'stacked-bar-editor') {
            return <BarEditor
                type={this.state.currentEditor}
                chartData={this.state.chartData}
                cSettings={this.state.cSettings}
                dSettings={this.state.dSettings}
                setChartData={(data) => { this._SetChartData(data); }}/>;
        } else if (this.state.currentEditor === 'pie-editor' || 
            this.state.currentEditor === 'donut-editor') {
            return <PieEditor 
                type={this.state.currentEditor}
                chartData={this.state.chartData}
                cSettings={this.state.cSettings}
                dSettings={this.state.dSettings}/>;
        } else if (this.state.currentEditor === 'image-editor') {
            return <ImageEditor 
                settings={this.state.graphicSettings}/>;
        } else if (this.state.currentEditor === 'icon-editor') {
            return <IconEditor 
                settings={this.state.graphicSettings}/>;
        } else if (this.state.currentEditor === 'header-editor') {
            return <BackgroundElementEditor 
                settings={this.state.graphicSettings}/>;
        } else if (this.state.currentEditor === 'line-editor') {
            return <LineEditor 
                chartData={this.state.chartData}
                cSettings={this.state.cSettings}
                dSettings={this.state.dSettings}/>;
        } else if (this.state.currentEditor === 'icon-bar-editor') {
            return <IconBarEditor 
                chartData={this.state.chartData}
                cSettings={this.state.cSettings}
                dSettings={this.state.dSettings}
                setChartData={(data) => { this._SetChartData(data); }}/>;
        } else if (this.state.currentEditor === 'insert-chart') {
            return (<Chart />);
        } else if (this.state.currentEditor === 'insert-icon') {
            return (<Icon />);
        } else if (this.state.currentEditor === 'insert-background-elem') {
            return (<BackgroundElement />);
        } else if (this.state.currentEditor === 'insert-image') {
            return (<Image />);
        } else if (this.state.currentEditor === 'edit-background') {
            return (<Background />);
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