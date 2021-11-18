import React from 'react';

import '../../../../css/React/Editors/Insert/Insert.css';
import '../../../../css/React/Editors/Insert/Image.css';

class Image extends React.Component 
{
    render()
    {
        //sessionStorage.clear();
        return (
            <div className='editor-insert-container'>
                <div id='upper-image-upload-container'>
                    <input id="upload-image-input" type="file" accept="image/png, image/jpeg, image/jpg" onChange={(event) => {
                        if (document.getElementById("upload-image-input").value){
                            var filename = URL.createObjectURL(event.target.files[0]);
                            this.props.toggleInsert('image',filename);
                            var insert = true;
                            for (var i=0; i<sessionStorage.length; i++){
                                if (sessionStorage.key(i)===document.getElementById("upload-image-input").value){
                                    insert = false;
                                    i = sessionStorage.length;
                                }
                            }
                            if (insert){
                                document.getElementById('image-placeholder').innerHTML("");
                                sessionStorage.setItem(document.getElementById("upload-image-input").value, filename);
                            }
                        }
                        for (var i=0; i<sessionStorage.length; i++)
                            console.log(sessionStorage.getItem(sessionStorage.key(i)));
                    }}></input>
                </div>
                <div id='image-placeholder' className='editor-placeholder-text'>Click upload to add an image to the library!</div>
            </div>
        );
    }
}

export { Image };