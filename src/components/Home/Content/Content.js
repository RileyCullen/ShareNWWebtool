import React from 'react';
import { ContentElement } from './ContentElement';

import '../../../css/React/Content.css';
import '../../../css/React/ContentElement.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Content extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            showPopup: false,
        }
        this._infogIndex = -1;
    }

    render()
    {
        let popup = this._CreatePopup();
        return (
            <div className='content-container'>
                {popup}
                <div className='content'>
                    {
                        this.props.currentQuery.map((d, i) => {
                            return (
                            <div className='item'>
                                <ContentElement 
                                    index={i}
                                    elementName={d.name}
                                    image={d.url}
                                    showPopup={this.state.showPopup}
                                    togglePopup={(index) => { this._TogglePopup(index); }}/>
                            </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    _TogglePopup(infogIndex = -1)
    {
        this.setState({
            showPopup: !this.state.showPopup,
        });

        this._infogIndex = infogIndex;
    }

    _CreatePopup()
    {
        if (this.state.showPopup) {
            return (
            <div className='preview'>
                <div className='preview-header'>
                    <p className='preview-title'>{this.props.currentQuery[this._infogIndex].name}</p>
                    <input 
                        id='popup-template-button'
                        className='use-template' 
                        type='button' 
                        value='Use Template'></input>
                    <button className='exit-button' onClick={() => { this._TogglePopup(); }}>
                        <FontAwesomeIcon 
                            className='exit-icon'
                            icon={faTimes}/>
                    </button>
                    <hr className='preview-divider'/>
                </div>
                <div className='preview-img-container'>
                    <img src={this.props.currentQuery[this._infogIndex].url} alt='h'></img>
                </div>
            </div>);
        }
        return false;
    }
}

export { Content };