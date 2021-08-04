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
                        <input type='button' value='Preview'></input>
                    </div>
                </div>
            </div>
        );
    }
}

export { ContentElement };