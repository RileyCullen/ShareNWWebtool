import React from 'react';

import '../../../../css/React/Editors/Insert/Insert.css';
import '../../../../css/React/Editors/Insert/Image.css'

class Image extends React.Component 
{
    render()
    {
        return (
            <div className='editor-insert-container'>
                <div id='upper-image-upload-container'>
                    <button id='upload-image-button'>
                        Upload
                    </button>
                </div>
                <div>
                    <p id='image-placeholder' className='editor-placeholder-text'>Click upload to add an image to the library!</p>
                </div>
            </div>
        );
    }
}

export { Image };