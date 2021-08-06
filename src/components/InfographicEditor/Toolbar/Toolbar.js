import React from 'react';
import { ToolbarOptions } from './ToolbarOptions';
import { ToolbarContent } from './ToolbarContent';

import '../../../css/React/EditorToolbar.css';

class Toolbar extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
             toolbarContent: 'insert',
        }
    }

    render()
    {
        return (
            <div className='editor-toolbar'>
                <ToolbarOptions 
                    displayHome={() => { this.props.displayHome(); }}
                    setToolbarContent={(content) =>  { this._SetToolbarContent(content); }}/>
                <ToolbarContent 
                    display={this.state.toolbarContent}/>
                <hr className='toolbar-divider'/>
            </div>
        );
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

        // Remove underline 
        let selectedElem = document.getElementById('toolbar-' + this.state.toolbarContent);
        selectedElem.classList.remove('selected');

        // Add underline
        let newElem = document.getElementById('toolbar-' + content);
        newElem.classList.add('selected');

        this.setState({
            toolbarContent: content,
        });
    }
}

export { Toolbar };