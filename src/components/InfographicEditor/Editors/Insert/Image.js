import React from 'react';

import '../../../../css/React/Editors/Insert/Insert.css';
import '../../../../css/React/Editors/Insert/Image.css';
//import Konva from 'konva';
//import { Canvas } from 'canvas';

class Image extends React.Component 
{
    render()
    {
        return (
            <div className='editor-insert-container'>
                <div id='upper-image-upload-container'>
                    <input id="upload-image-input" type="file" accept="image/png, image/jpeg, image/jpg" onChange={(event) => {
                        if (document.getElementById("upload-image-input").value){
                            this.props.toggleInsert('image', URL.createObjectURL(event.target.files[0]));

                            //var image = document.createElement("img");
                            //var image = new Konva.Image();
                            //image.src = URL.createObjectURL(event.target.files[0]);
                            //document.getElementsByClassName("konvajs-content")[0].appendChild(image);
                            //document.getElementById("image-placeholder").innerHTML = "";
                            //document.getElementById("image-placeholder").appendChild(image);

                            //InsertElement('image', image.src);

                            //document.querySelector(".konvajs-content canvas").getContext("2d").drawImage(image, 0, 0, 150, 150);
                            //document.getElementsById("canvas").getContext("2d").drawImage(image,0,0);

                            //this.InsertElement('image',image.src);
                            //this.props.toggleInsert('image', image.src);
                        }
                    }}></input>
                </div>
                <div id='image-placeholder' className='editor-placeholder-text'>Click upload to add an image to the library!</div>
            </div>
        );
    }
}

export { Image };