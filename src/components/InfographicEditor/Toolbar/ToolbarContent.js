import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faIcons, faFont, faImage, faStop } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import '../../../css/React/EditorToolbar.css';

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

    _SelectIcons()
    {
        if (this.props.display === 'insert') {
            return (
                <div className='insert-container'>
                    <div className='insert-chart-container'>
                        <button className='insert-button'>
                            <FontAwesomeIcon 
                                className='insert-icon'
                                icon={faChartBar}/>
                            <p className='insert-text'>Chart</p>
                        </button>
                    </div>
                    <div className='insert-icon-container'>
                        <button className='insert-button'>
                            <FontAwesomeIcon
                                className='insert-icon'
                                icon={faIcons}/>
                            <p className='insert-text'>Icon</p>
                        </button>
                    </div>
                    <div className='insert-text-container'>
                        <button className='insert-button'>
                            <FontAwesomeIcon 
                                className='insert-icon'
                                icon={faFont} />
                            <p className='insert-text'>Text</p>
                        </button>
                    </div>
                    <div className='insert-image-container'>
                        <button className='insert-button'>
                            <FontAwesomeIcon 
                                className='insert-icon'
                                icon={faImage}/>
                            <p className='insert-text'>Image</p>
                        </button>
                    </div>
                    <div className='insert-bkg-container'>
                        <button id='insert-bkg-button' className='insert-button'>
                            <FontAwesomeIcon 
                                className='insert-icon'
                                icon={faStop}/>
                            <p className='insert-text'>Background Element</p>
                        </button>
                    </div>
                </div>
            );
        } else if (this.props.display === 'edit') {
            return (
                <div className='edit-container'>

                </div>
            );
        }
    }
}

export { ToolbarContent };