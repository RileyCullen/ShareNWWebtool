import React from 'react';
import { ToolbarOptions } from './ToolbarOptions';
import { ToolbarContent } from './ToolbarContent';

import '../../../css/React/EditorToolbar.css';

class Toolbar extends React.Component 
{
    render()
    {
        return (
            <div className='editor-toolbar'>
                <ToolbarOptions 
                    currentEditor={this.props.toolbarOptions}
                    toolbarContent={this.props.toolbarContent}
                    displayHome={() => { this.props.displayHome(); }}
                    setToolbarContent={(content) =>  { this.props.setToolbarContent(content); }}
                    toggleDownload={() => { this.props.downloadToggle(); }}/>
                <ToolbarContent 
                    currentEditor={this.props.currentEditor}
                    display={this.props.toolbarContent}
                    canvasToggle={(setting) => { this.props.canvasToggle(setting); }}
                    editorHandler={(editor) => { this.props.editorHandler(editor); }}/>
                <hr className='toolbar-divider'/>
            </div>
        );
    }
}

export { Toolbar };