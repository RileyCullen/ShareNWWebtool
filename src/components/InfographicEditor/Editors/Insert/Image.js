import React from 'react';

import '../../../../css/React/Editors/Insert/Insert.css';
import '../../../../css/React/Editors/Insert/Image.css';

class Image extends React.Component 
{
    render()
    {
        return (
            <div className='editor-insert-container'>
                <div id='upper-image-upload-container'>
                    <input id="upload-image-input" type="file" accept="image/png, image/jpeg, image/jpg" onChange={(event) => {
                        if (document.getElementById("upload-image-input").value){
                            //URL.createObjectURL(event.target.files[0])
                            var filename = event.target.files[0].name;
                            this.props.toggleInsert('image',filename);
                            console.log(filename);
                        }
                    }}></input>
                </div>
                <div id='image-placeholder' className='editor-placeholder-text'>Click upload to add an image to the library!</div>
            </div>
        );
    }
}

export { Image };