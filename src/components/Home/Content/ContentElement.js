import React from 'react';
import '../../../css/React/ContentElement.css'

class ContentElement extends React.Component
{
    render()
    {
        return ( 
            <div className='content-element'>
                <div className='content-image'>
                    <img className='content-translate' src={this.props.image} alt='An infographic about HIV'/>
                    <input type='button' value='Use Template'></input>
                </div>
                <hr className='content-divider content-shift-up' />
                <div className='content-options content-shift-up'>
                    <div className='content-name'>
                        <p>{this.props.elementName}</p>
                    </div>
                    <div className='content-buttons'>
                        <input 
                            className='use-template'
                            type='button' 
                            value='Preview' 
                            onClick={() => { this._TogglePopup(this.props.index) }}>    
                        </input>
                    </div>
                </div>
            </div>
        );
    }

    _TogglePopup(index)
    {
        if (this.props.showPopup) return;
        this.props.togglePopup(index);
    }
}

export { ContentElement };