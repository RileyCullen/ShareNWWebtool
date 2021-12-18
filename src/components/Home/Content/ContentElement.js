import React from 'react';
import '../../../css/React/ContentElement.css'

class ContentElement extends React.Component
{
    render()
    {
        let index = this.props.index,
            previewHandler = (this.props.toggleButtons) ? () => { this._TogglePopup(index); }
                : false,
            useHandler = (this.props.toggleButtons) ? () => { this.props.displayEditor(index); }
                : false;
        return (
            <div className='content-element'>
                <div className='content-image'>
                    <img className='content-translate' src={this.props.image} alt='An infographic about HIV'/>
                    <input 
                        id='preview-button'
                        type='button' 
                        value='Preview'
                        onClick={previewHandler}>    
                    </input>
                </div>
                <hr className='content-divider content-shift-up' />
                <div className='content-options content-shift-up'>
                    <div className='content-name'>
                        <p>{this.props.elementName}</p>
                    </div>
                    <div className='content-buttons'>
                        <input 
                            id='use-template-button'
                            className='use-template'
                            type='button' 
                            value='Use Template' 
                            onClick={useHandler}>    
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