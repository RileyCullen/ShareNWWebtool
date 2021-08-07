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
                    currentEditor={this.props.currentEditor}
                    toolbarContent={this.props.toolbarContent}
                    displayHome={() => { this.props.displayHome(); }}
                    setToolbarContent={(content) =>  { this.props.setToolbarContent(content); }}/>
                <ToolbarContent 
                    display={this.props.toolbarContent}
                    canvasToggle={(setting) => { this.props.canvasToggle(setting); }}/>
                <hr className='toolbar-divider'/>
            </div>
        );
    }
}

export { Toolbar };