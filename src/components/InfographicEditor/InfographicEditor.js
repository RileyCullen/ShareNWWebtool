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
            toolbarOptions: 'none',
            toolbarContent: 'insert',
            chartData: 0,
            cSettings: 0,
            dSettings: 0,
            graphicSettings: 0,
            isRemoving: false,
            isDownloading: false,
            layerAction: 'none',
            insertType: 'none',
            insertElement: 'none',
            updateType: 'none',
            updateElement: 'none',
            infogTextElem: 0,
            backgroundSettings: 0,
        };
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
            editorWindowHeight = this._DetermineEditorMenuHeight(),
            editorWindowBkgColor = (this.state.currentEditor === 'none') ? 
                'white' : '#ECECEC';

        let editorWindowContent = this._GetEditorWindowContent();
        return (
            <div className='editor-container'>
                <div className='upper-container'>
                    <Toolbar 
                        currentEditor={this.state.currentEditor}
                        toolbarContent={this.state.toolbarContent}
                        toolbarOptions={this.state.toolbarOptions}
                        setToolbarContent={(content) => { this._SetToolbarContent(content); }}
                        displayHome={() => { this.props.displayHome(); }}
                        canvasToggle={(setting) => { this._CanvasToggle(setting); }} 
                        editorHandler={(editor) => { this._SetCurrentEditor(editor); }}
                        downloadToggle={() => { this._ToggleDownload(); }}/>
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
                        cSettings={this.state.cSettings}
                        dSettings={this.state.dSettings}
                        graphicSettings={this.state.graphicSettings}
                        isRemoving={this.state.isRemoving}
                        isDownloading={this.state.isDownloading}
                        clearSelection={this._clearSelection}
                        layerAction={this.state.layerAction}
                        insertType={this.state.insertType}
                        insertElement={this.state.insertElement}
                        updateType={this.state.updateType}
                        updateElement={this.state.updateElement}
                        backgroundSettings={this.state.backgroundSettings}
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
        if (this.state.isDownloading) this.setState({isDownloading: false});
        if (this.state.layerAction !== 'none') this.setState({layerAction: 'none'});
        if (this.state.insertElement !== 'none') this.setState({insertElement: 'none'});
        if (this.state.insertType !== 'none') this.setState({insertType: 'none'});
        if (this.state.backgroundSettings !== 0) this.setState({backgroundSettings: 0});
        if (this.state.updateType !== 'none') this.setState({ updateType: 'none'});
        if (this.state.updateElement !== 'none') this.setState({updateElement: 'none'});
        this._clearSelection = false;
    }

    _DetermineEditorMenuHeight()
    {
        switch(this.state.currentEditor) {
            case 'none':
                return '100%';
            case 'insert-chart':
            case 'insert-icon':
            case 'insert-text':
            case 'insert-image':
            case 'insert-background-elem':
            case 'edit-background':
            case 'header-editor':
            case 'image-editor':
            case 'icon-editor':
            case 'text-editor':
                return '100px';
        }
        return '150px';
    }

    /**
     * @summary     Updates the current editor.
     * @param {string} editor The new editor.
     */
    _SetCurrentEditor(editor)
    {
        let expr = editor === 'insert-chart' || editor === 'insert-icon'
            || editor === 'insert-text' || editor === 'insert-image' 
            || editor === 'insert-background-elem';

        this._RemoveUnderline(this.state.toolbarContent);
        this.setState({
            currentEditor: editor,
            toolbarOptions: this._GetToolbarOptions(editor),
            toolbarContent: this._GetToolbarContent(expr, editor),
        });

        if (editor === 'none') {
            this.setState({
                graphicSettings: 0,
            });
        } else if (editor === 'insert-text') {
            this._ToggleInsert('text', 'Sample Text');
        }

        if (expr || editor === 'edit-background') this._clearSelection = true;

        this._editorTextElem = 0;
    }

    _GetToolbarOptions(editor)
    {
        if (editor.slice(0, 6) === 'update') return this.state.toolbarOptions
        return editor;
    }

    _GetToolbarContent(expr, editor)
    {
        if (expr || editor === 'none' || editor === 'insert') {
            return 'insert';
        }
        return 'edit';
    }

    /**
     * @summary     Updates the current text element.
     * @param {JSON} textElem The new text element.
     */
    _SetInfogTextElem(textElem) 
    {
        this.setState({
            infogTextElem: textElem,
        });
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

    _ToggleDownload()
    {
        this.setState({
            isDownloading: true,
        });
    }

    _ToggleInsert(type, element)
    {
        this.setState({
            insertType: type,
            insertElement: element,
        });
    }

    _ToggleUpdate(type, element)
    {   
        this.setState({
            updateType: type,
            updateElement: element,
        });
    }

    _ToggleBackgroundSettings(settings)
    {
        this.setState({
            backgroundSettings: settings,
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
        this.setState({
            cSettings: settings,
        });
    }

    _SetDecoratorSettings(settings)
    {
        this.setState({
            dSettings: settings,
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
                textElem={this.state.infogTextElem}
                setTextElem={(textElem) => { this._SetEditorTextElem(textElem); }}
            />;
        } else if (this.state.currentEditor === 'waffle-editor') {
            return <WaffleEditor 
                chartData={this.state.chartData}
                cSettings={this.state.cSettings}
                dSettings={this.state.dSettings}
                setChartData={(data) => { this._SetChartData(data); }}
                setChartSettings={(settings) => { this._SetChartSettings(settings); }}
                setDecoratorSettings={(settings) => { this._SetDecoratorSettings(settings); }}/>
        } else if (this.state.currentEditor === 'bar-editor' || 
            this.state.currentEditor === 'stacked-bar-editor') {
            return <BarEditor
                type={this.state.currentEditor}
                chartData={this.state.chartData}
                cSettings={this.state.cSettings}
                dSettings={this.state.dSettings}
                setChartData={(data) => { this._SetChartData(data); }}
                setChartSettings={(settings) => { this._SetChartSettings(settings); }}
                setDecoratorSettings={(settings) => { this._SetDecoratorSettings(settings); }}/>;
        } else if (this.state.currentEditor === 'pie-editor' || 
            this.state.currentEditor === 'donut-editor') {
            return <PieEditor 
                type={this.state.currentEditor}
                chartData={this.state.chartData}
                cSettings={this.state.cSettings}
                dSettings={this.state.dSettings}
                setChartData={(data) => { this._SetChartData(data); }}
                setChartSettings={(settings) => { this._SetChartSettings(settings); }}
                setDecoratorSettings={(settings) => { this._SetDecoratorSettings(settings); }}/>;
        } else if (this.state.currentEditor === 'image-editor') {
            return <ImageEditor 
                settings={this.state.graphicSettings}
                setGraphicSettings={(settings) => { this._GraphicHandler(settings); }}/>;
        } else if (this.state.currentEditor === 'icon-editor') {
            return <IconEditor 
                settings={this.state.graphicSettings}
                setGraphicSettings={(settings) => { this._GraphicHandler(settings); }}/>;
        } else if (this.state.currentEditor === 'header-editor') {
            return <BackgroundElementEditor 
                settings={this.state.graphicSettings}
                setGraphicSettings={(settings) => { this._GraphicHandler(settings); }}/>;
        } else if (this.state.currentEditor === 'line-editor') {
            return <LineEditor 
                chartData={this.state.chartData}
                cSettings={this.state.cSettings}
                dSettings={this.state.dSettings}
                setChartData={(data) => { this._SetChartData(data); }}
                setChartSettings={(settings) => { this._SetChartSettings(settings); }}
                setDecoratorSettings={(settings) => { this._SetDecoratorSettings(settings); }}/>;
        } else if (this.state.currentEditor === 'icon-bar-editor') {
            return <IconBarEditor 
                chartData={this.state.chartData}
                cSettings={this.state.cSettings}
                dSettings={this.state.dSettings}
                setChartData={(data) => { this._SetChartData(data); }}
                setChartSettings={(settings) => { this._SetChartSettings(settings); }}
                setDecoratorSettings={(settings) => { this._SetDecoratorSettings(settings); }}/>;
        } else if (this.state.currentEditor === 'insert-chart' || this.state.currentEditor === 'update-chart') {
            let handler = (this.state.currentEditor === 'insert-chart') ?
                (type, element) => { this._ToggleInsert(type, element); } :
                (type, element) => { this._ToggleUpdate(type, element); };
            return (<Chart 
                toggleInsert={(type, element) => { handler(type, element); }}/>);
        } else if (this.state.currentEditor === 'insert-icon' || this.state.currentEditor === 'update-icon') {
            let handler = (this.state.currentEditor === 'insert-icon') ? 
                (type, element) => { this._ToggleInsert(type, element); } : 
                (type, element) => { this._ToggleUpdate(type, element); };
            return (<Icon 
                toggleInsert={(type, element) => { handler(type, element); }}/>);
        } else if (this.state.currentEditor === 'insert-background-elem' || this.state.currentEditor === 'update-background-elem') {
            let handler = (this.state.currentEditor === 'insert-background-elem') ?
                (type, element) => { this._ToggleInsert(type, element); } :
                (type, element) => { this._ToggleUpdate(type, element); };
            return (<BackgroundElement 
                toggleInsert={(type, element) => { handler(type, element); }}/>);
        } else if (this.state.currentEditor === 'insert-image') {
            return (<Image 
                toggleInsert={(type, element) => {this._ToggleInsert(type, element);}}/>);
        } else if (this.state.currentEditor === 'edit-background') {
            return (<Background 
                toggleBackgroundSettings={(settings) => { this._ToggleBackgroundSettings(settings); }}/>);
        }
        return false;
    }

    _CanvasToggle(setting)
    {
        if (setting === 'remove') {
            this._ToggleRemove();
        } else {
            this._ToggleLayerAction(setting)
        }
    }

    _ToggleRemove()
    {
        this._clearSelection = true;
        this._SetCurrentEditor('none');
        this.setState({
            isRemoving: true,
        }); 
    }

    _ToggleLayerAction(layerAction)
    {
        this.setState({
            layerAction: layerAction
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
            let text = '';
            switch(this.state.currentEditor) {
                case 'insert-chart':
                    text = 'Chart Library';
                    break;
                case 'update-icon':
                case 'insert-icon':
                    text = 'Icon Library';
                    break;
                case 'insert-image':
                    text = 'Image Library';
                    break;
                case 'insert-background-elem':
                    text = 'Background Element Library';
                    break;
                case 'edit-background':
                    text = 'Background Editor';
                    break;
                case 'text-editor':
                    text = 'Text Editor';
                    break;
                case 'waffle-editor':
                    text = 'Waffle Chart Editor';
                    break;
                case 'pie-editor':
                    text = 'Pie Chart Editor';
                    break;
                case 'bar-editor':
                    text = 'Bar Chart Editor';
                    break;
                case 'stacked-bar-editor':
                    text = 'Stacked Bar Chart Editor';
                    break;
                case 'line-editor':
                    text = 'Line Chart Editor';
                    break;
                case 'icon-bar-editor':
                    text = 'Icon Bar Chart Editor';
                    break;
                case 'donut-editor':
                    text = 'Donut Chart Editor';
                    break;
                case 'image-editor':
                    text = 'Image Editor';
                    break;
                case 'icon-editor':
                    text = 'Icon Editor';
                    break;
                case 'header-editor':
                    text = 'Banner Editor';
                    break;
            }
            return (
                <h3 style={{
                    fontSize: '20px',
                    position: 'relative',
                    top: '-8px',
                }}>{text}</h3>
            );
        }
    }
}

export {InfographicEditor};