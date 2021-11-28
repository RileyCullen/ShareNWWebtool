import React from 'react';

import '../../../../css/React/Editors/Insert/Insert.css';
import '../../../../css/React/Editors/Insert/Image.css';

class Image extends React.Component 
{
    constructor(props){
        super(props);
        this._library = [];
    }

    render()
    {
        sessionStorage.clear();
        return (
            <div className='editor-insert-container'>
                <div id='upper-image-upload-container'>
                    <input id="upload-image-input" type="file" accept="image/png, image/jpeg, image/jpg" onChange={(event) => {
                        var inputValue = document.getElementById("upload-image-input").value;
                        if (inputValue){
                            var filename = URL.createObjectURL(event.target.files[0]);
                            this.props.toggleInsert('image',filename);
                            var insert = true;
                            for (var i=0; i<sessionStorage.length; i++){
                                if (sessionStorage.key(i)===inputValue){
                                    insert = false;
                                    i = sessionStorage.length;
                                }
                            }
                            if (insert){
                                console.log("Inserting image in library");
                                document.getElementById('image-placeholder').innerHTML = "";
                                sessionStorage.setItem(inputValue, filename);

                                function LibraryElement(props) {
                                    const entry = <div>
                                            <img src={sessionStorage.getItem(props.key)}></img>
                                            <button onClick={() => {sessionStorage.removeItem(props.key); MakeLibrary();}}>Remove</button>
                                        </div>
                                    return entry;
                                  }

                                function MakeLibrary() {
                                    this._library = [];
                                    for (var i = 0; i < sessionStorage.length; i++)
                                        this._library.push(<LibraryElement key={sessionStorage.key(i)} />);
                                }
                                
                                MakeLibrary();
                            }
                        }
                        //for (var i=0; i<sessionStorage.length; i++)
                            //console.log("In SESSION STORAGE: " + sessionStorage.getItem(sessionStorage.key(i)));
                    }}></input>
                </div>
                <div id='image-placeholder' className='editor-placeholder-text'>Click upload to add an image to the library!</div>
                <div id='image-library'>{this._library.map((d) => {return d})}</div>
            </div>
        );
    }
}

export { Image };