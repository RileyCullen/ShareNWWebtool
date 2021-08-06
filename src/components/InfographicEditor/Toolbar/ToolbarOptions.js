import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

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
                </div>
            </div>
        );
    }
}

export { ToolbarOptions };