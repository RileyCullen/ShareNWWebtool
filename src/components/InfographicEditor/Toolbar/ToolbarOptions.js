import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDownload, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';

import '../../../css/React/EditorToolbar.css';

class ToolbarOptions extends React.Component 
{
    render()
    {
        return (
            <div className='toolbar-options'>
                <div className='toolbar-options-left'>
                    <div className='button-container'>
                        <button 
                            id='home'
                            className='toolbar-button'
                            onClick={() => { this.props.displayHome(); }}>
                            <FontAwesomeIcon className='toolbar-icon' icon={faHome} />
                        </button>
                        <button 
                            id='undo'
                            className='toolbar-button'>
                            <FontAwesomeIcon 
                                id='undo-redo-icon'
                                className='toolbar-icon' 
                                icon={faUndo}/>
                        </button>
                        <button 
                            id='redo'
                            className='toolbar-button'>
                            <FontAwesomeIcon 
                                id='undo-redo-icon'
                                className='toolbar-icon' 
                                icon={faRedo}/>
                        </button> 
                    </div>
                    <div className='vertical-divider'></div>
                    <button
                        id='toolbar-insert'
                        className='toolbar-text selected'
                        style={{left: '35px'}}
                        onClick={() => { this.props.setToolbarContent('insert'); }}>
                        Insert
                    </button>
                    <button
                        id='toolbar-edit'
                        className='toolbar-text'
                        style={{left: '60px'}}
                        onClick={() => { this.props.setToolbarContent('edit'); }}>
                        Edit
                    </button>
                </div>
                <div className='toolbar-options-right'>
                    <div 
                        id='toolbar-download'
                        className='toolbar-text'
                        onClick={() => { this.props.toggleDownload(); }}>
                        <FontAwesomeIcon 
                            className='toolbar-download-icon'
                            icon={faDownload} />
                        <div id='toolbar-download-text'>Download</div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate()
    {
        // Add underline
        if (this.props.toolbarContent === 'none' || (this.props.toolbarContent !== 'insert'
            && this.props.toolbarContent !== 'edit')) return;
        let newElem = document.getElementById('toolbar-' + this.props.toolbarContent);
        newElem.classList.add('selected');
    }
}

export { ToolbarOptions };