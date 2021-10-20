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
                    <input id="upload-image-input" type="file" accept="image/png, image/jpeg" onChange={function() {
                        if (document.getElementById("upload-image-input").value){
                            var fileinput = document.getElementById("upload-image-input").files[0].name;
                            var image = document.createElement("img");
                            image.src = fileinput;
                            document.getElementsByClassName("konvajs-content")[0].appendChild(image);
                        }
                    }}></input>
                </div>
                <div>
                    <div id='image-placeholder' className='editor-placeholder-text'>Click upload to add an image to the library!</div>
                </div>
            </div>
        );
    }
}

export { Image };