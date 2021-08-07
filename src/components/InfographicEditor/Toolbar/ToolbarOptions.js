import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDownload } from '@fortawesome/free-solid-svg-icons';

import '../../../css/React/EditorToolbar.css';

class ToolbarOptions extends React.Component 
{
    render()
    {
        let editorOption = this._CreateEditorOption();
        return (
            <div className='toolbar-options'>
                <div className='toolbar-options-left'>
                    <div className='button-container'>
                        <button 
                            className='toolbar-home-button'
                            onClick={() => { this.props.displayHome(); }}>
                            <FontAwesomeIcon className='toolbar-home-icon' icon={faHome} />
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
                    {editorOption}
                </div>
                <div className='toolbar-options-right'>
                    <div 
                        id='toolbar-download'
                        className='toolbar-text'>
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
        if (this.props.toolbarContent === 'none') return;
        let newElem = document.getElementById('toolbar-' + this.props.toolbarContent);
        newElem.classList.add('selected');
    }

    _CreateEditorOption()
    {
        switch(this.props.currentEditor) {
            case 'text-editor':
                return (
                    <button
                        id='toolbar-text-editor'
                        className='toolbar-text'
                        style={{left: '80px'}}
                        onClick={() => { this.props.setToolbarContent('text-editor'); }}>
                        Text Editor
                    </button>
                );
            case 'bar-editor':
                return (
                    <button
                        id='toolbar-bar-editor'
                        className='toolbar-text'
                        style={{left: '80px'}}
                        onClick={() => { this.props.setToolbarContent('bar-editor')}}>
                        Bar Editor 
                    </button>
                );
            case 'waffle-editor':
                return (
                    <button
                        id='toolbar-waffle-editor'
                        className='toolbar-text'
                        style={{left: '80px'}}
                        onClick={() => { this.props.setToolbarContent('waffle-editor')}}>
                        Waffle Editor
                    </button>
                );
            case 'pie-editor':
                return (
                    <button
                        id='toolbar-pie-editor'
                        className='toolbar-text'
                        style={{left: '80px'}}
                        onClick={() => { this.props.setToolbarContent('pie-editor')}}>
                        Pie Editor
                    </button>
                );
            case 'stacked-bar-editor':
                return (
                    <button
                        id='toolbar-stacked-bar-editor'
                        className='toolbar-text'
                        style={{left: '80px'}}
                        onClick={() => { this.props.setToolbarContent('stacked-bar-editor')}}>
                        Stacked Bar Editor
                    </button>
                ); 
            case 'header-editor':
                return (
                    <button
                        id='toolbar-header-editor'
                        className='toolbar-text'
                        style={{left: '80px'}}
                        onClick={() => { this.props.setToolbarContent('header-editor')}}>
                        Graphics Editor
                    </button>
                );
            case 'image-editor':
                return (
                    <button
                        id='toolbar-image-editor'
                        className='toolbar-text'
                        style={{left: '80px'}}
                        onClick={() => { this.props.setToolbarContent('image-editor')}}>
                        Image Editor
                    </button>
                );
            case 'icon-editor':
                return (
                    <button
                        id='toolbar-icon-editor'
                        className='toolbar-text'
                        style={{left: '80px'}}
                        onClick={() => { this.props.setToolbarContent('icon-editor')}}>
                        Icon Editor
                    </button>
                );
            default: 
                return false;
        }
    }
}

export { ToolbarOptions };