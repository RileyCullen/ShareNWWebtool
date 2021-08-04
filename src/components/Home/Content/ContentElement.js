import React from 'react';
import '../../../css/React/ContentElement.css'

class ContentElement extends React.Component
{
    render()
    {
        return ( 
            <div className='content-element'>
                <div className='content-image'>
                    <img src={this.props.image} alt='An infographic about HIV'/>
                </div>
                <div className='content-options'>
                    <div className='content-name'>
                        <p>{this.props.elementName}</p>
                    </div>
                    <div className='content-buttons'></div>
                </div>
            </div>
        );
    }
}

export { ContentElement };