import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faIcons, faFont, faImage, faStop, faPalette, faFileImage, 
    faTrash, faList} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import '../../../css/React/EditorToolbar.css';
import ribbon from '../../../Media/ribbon.png';

class ToolbarContent extends React.Component 
{
    render()
    {
        let display = this._SelectIcons();
        return (
            <div className='toolbar-content'>
               {display}
            </div>
        );
    }

    /**
     * @summary     Determines the contents of the lower toolbar.
     * @description A private function that determines which set of icons are 
     *              displayed in the lower toolbar.
     * 
     * @returns     A <div> containing each option's respective icons.
     */
    _SelectIcons()
    {
        if (this.props.display === 'insert') {
            return this._CreateInsertIcons();
        } else if (this.props.display === 'edit') {
            return this._CreateEditIcons();
        } else if (this.props.display === 'bar-editor' || this.props.display === 'waffle-editor'
            || this.props.display === 'pie-editor' || this.props.display === 'stacked-bar-editor' 
            || this.props.display === 'line-editor' || this.props.display === 'donut-editor') {
            return this._CreateChartIcons();
        } else if (this.props.display === 'text-editor') {
            return this._CreateTextIcons();
        } else if (this.props.display === 'header-editor') {
            return this._CreateHeaderIcons();
        } else if (this.props.display === 'image-editor') {
            return this._CreateImageIcons();
        } else if (this.props.display === 'icon-editor') {
            return this._CreateIconIcons();
        } else if (this.props.display === 'icon-bar-editor') {
            return this._CreateIconBarIcons();
        }
    }

    _CreateInsertIcons()
    {
        return (
            <div className='insert-container'>
                <div className='insert-chart-container'>
                    <button className='insert-button'
                            onClick={() => { this.props.editorHandler('insert-chart'); }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faChartBar}/>
                        <p className='insert-text'>Chart</p>
                    </button>
                </div>
                <div className='insert-icon-container'>
                    <button className='insert-button'
                            onClick={() => { this.props.editorHandler('insert-icon'); }}>
                        <FontAwesomeIcon
                            className='insert-icon'
                            icon={faIcons}/>
                        <p className='insert-text'>Icon</p>
                    </button>
                </div>
                <div className='insert-text-container'>
                    <button className='insert-button'
                            onClick={() => { this.props.editorHandler('insert-text'); }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faFont} />
                        <p className='insert-text'>Text</p>
                    </button>
                </div>
                <div className='insert-image-container'>
                    <button className='insert-button'
                            onClick={() => { this.props.editorHandler('insert-image'); }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faFileImage}/>
                        <p className='insert-text'>Image</p>
                    </button>
                </div>
                <div className='insert-bkg-container'>
                    <button id='insert-bkg-button' className='insert-button'
                            onClick={() => { this.props.editorHandler('insert-background-elem'); }}>
                        <img src={ribbon} style={{width: 70, height: 14}}/>
                        <p className='insert-text'>Background Element</p>
                    </button>
                </div>
            </div>
        ); 
    }

    _CreateEditIcons()
    {
        return (
            <div className='edit-container'>
                <div className='edit-color-scheme'>
                    <button id='edit-color-button' className='insert-button'>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faPalette}/>
                        <p className='insert-text'>Color Scheme</p>
                    </button>
                </div>
                <div className='edit-background'>
                    <button 
                        id='edit-background-button' 
                        className='insert-button'
                        onClick={() => { this.props.editorHandler('edit-background')}}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faImage}/>
                        <p className='insert-text'>Background</p>
                    </button>
                </div>
            </div>
        ); 
    }

    _CreateChartIcons()
    {
        return (
            <div className='chart-container'>
                {this._CreateCanvasSettings()}
                {this._CreateEditorWindowSettings()}
            </div>
        );
    }

    _CreateCanvasSettings()
    {
        return (
            <div className='canvas-settings'>
                <button 
                    id='bring-forward-button' 
                    className='insert-button'
                    onClick={() => { this.props.canvasToggle('bring-forward'); }}>
                    <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7.5" y="8.5" width="18" height="21" fill="#979797" stroke="black"/>
                        <rect x="0.5" y="0.5" width="18" height="21" fill="white" stroke="black"/>
                    </svg>
                    <p id='bring-forward-text' className='insert-text'>Bring Forward</p>
                </button>

                <button 
                    id='send-back-button' 
                    className='insert-button'
                    onClick={() => { this.props.canvasToggle('send-backward')}}>
                    <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7.5" y="8.5" width="18" height="21" fill="white" stroke="black"/>
                        <rect x="0.5" y="0.5" width="18" height="21" fill="#979797" stroke="black"/>
                    </svg>
                    <p id='send-back-text' className='insert-text'>Send Backward</p>
                </button> 

                <button 
                    id='move-front-button' 
                    className='insert-button'
                    onClick={() => { this.props.canvasToggle('move-to-front'); }}>
                    <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="9.5" width="18" height="20" fill="#CBCBCB" stroke="black"/>
                        <rect x="10.5" y="5.5" width="18" height="21" fill="#979797" stroke="black"/>
                        <path d="M3.5 0.5H21.5V21.5H3.5V0.5Z" fill="white" stroke="black"/>
                    </svg>
                    <p id='move-front-text' className='insert-text'>Move to <br />Front</p>
                </button> 
                
                <button 
                    id='move-bottom-button' 
                    className='insert-button'
                    onClick={() => { this.props.canvasToggle('move-to-back'); }}>
                    <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="9.5" width="18" height="20" fill="white" stroke="black"/>
                        <rect x="10.5" y="5.5" width="18" height="21" fill="#979797" stroke="black"/>
                        <path d="M3.5 0.5H21.5V21.5H3.5V0.5Z" fill="#CBCBCB" stroke="black"/>
                    </svg>
                    <p id='move-bottom-text' className='insert-text'>Move to <br />Back</p>
                </button>

                <button 
                    id='remove-button' 
                    className='insert-button'
                    onClick={() => { this.props.canvasToggle('remove'); }}>
                    <FontAwesomeIcon 
                        className='insert-icon'
                        icon={faTrash}/>
                    <p className='insert-text'>Remove</p>
                </button>
            </div>
        );
    }

    _CreateEditorWindowSettings()
    {
        return (
            <div className='editor-settings'>
                <button 
                    id='editor-button' 
                    className='insert-button selected-editor'
                    onClick={() => { }}>
                    <FontAwesomeIcon 
                        className='insert-icon'
                        icon={faList}/>
                    <p id='editor-button-text' className='insert-text'>Editor</p>
                </button>
                <button 
                    id='replace-chart-button' 
                    className='insert-button'
                    onClick={() => { }}>
                    <FontAwesomeIcon 
                        className='insert-icon'
                        icon={faChartBar}/>
                    <p id='replace-chart-text' className='insert-text'>Replace Chart</p>
                </button>
            </div>
        );
    }

    _CreateTextIcons() 
    {
        return (
            <div className='chart-container'>
                {this._CreateCanvasSettings()}
            </div>
        )
    }

    _CreateHeaderIcons()
    {
        return (
            <div className='chart-container'>
                {this._CreateCanvasSettings()}
                <div className='editor-settings'>
                    <button 
                        id='editor-button' 
                        className='insert-button selected-editor'
                        onClick={() => { }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faList}/>
                        <p id='editor-button-text' className='insert-text'>Editor</p>
                    </button>
                    <button 
                        id='replace-header-button' 
                        className='insert-button'
                        onClick={() => { }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faStop}/>
                        <p id='replace-chart-text' className='insert-text'>Replace Banner</p>
                    </button>
                </div>
            </div>
        );
    }

    _CreateImageIcons()
    {
        return (
            <div className='chart-container'>
                {this._CreateCanvasSettings()}
                <div className='editor-settings'>
                    <button 
                        id='editor-button' 
                        className='insert-button selected-editor'
                        onClick={() => { }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faList}/>
                        <p id='editor-button-text' className='insert-text'>Editor</p>
                    </button>
                    <button 
                        id='replace-image-button' 
                        className='insert-button'
                        onClick={() => { }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faFileImage}/>
                        <p id='replace-image-text' className='insert-text'>Replace Header</p>
                    </button>
                </div>
            </div>
        );
    }

    _CreateIconIcons()
    {
        return (
            <div className='chart-container'>
                {this._CreateCanvasSettings()}
                <div className='editor-settings'>
                    <button 
                        id='editor-button' 
                        className='insert-button selected-editor'
                        onClick={() => { }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faList}/>
                        <p id='editor-button-text' className='insert-text'>Editor</p>
                    </button>
                    <button 
                        id='replace-icon-button' 
                        className='insert-button'
                        onClick={() => { }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faIcons}/>
                        <p id='replace-icon-text' className='insert-text'>Replace Header</p>
                    </button>
                </div>
            </div>
        );
    }

    _CreateIconBarIcons()
    {
        return (
            <div className='chart-container'>
                {this._CreateCanvasSettings()}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '60px 60px 60px',
                        gridColumnGap: '20px',
                        float: 'right',
                        marginRight: '80px'}}>
                    <button 
                        id='editor-button' 
                        className='insert-button selected-editor'
                        onClick={() => { }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faList}/>
                        <p id='editor-button-text' className='insert-text'>Editor</p>
                    </button>
                    <button 
                        id='replace-chart-button' 
                        className='insert-button'
                        onClick={() => { }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faChartBar}/>
                        <p id='replace-chart-text' className='insert-text'>Replace Chart</p>
                    </button>
                    <button 
                        id='replace-chart-icon-button' 
                        className='insert-button'
                        onClick={() => { }}>
                        <FontAwesomeIcon 
                            className='insert-icon'
                            icon={faIcons}/>
                        <p id='replace-chart-icon-text' className='insert-text'>Replace Icons</p>
                    </button>
                </div>
            </div>
        );
    }
}

export { ToolbarContent };