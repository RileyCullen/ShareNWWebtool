import React from 'react';

import '../../../../css/React/Editors/Insert/Insert.css';
import '../../../../css/React/Editors/Insert/Image.css';

class Image extends React.Component 
{
    constructor(props){
        super(props);
        this.state = {
            library: [],
        };
    }

    LibraryElement(key){
        const entry = <div>
            <img src={sessionStorage.getItem(key)}></img>
            <button onClick={() => {sessionStorage.removeItem(key); this._MakeLibrary();}}>Remove</button>
            </div>
        return entry;
    }

    _MakeLibrary(){
        var newLibrary = [];
        for (var i = 0; i < sessionStorage.length; i++)
            newLibrary.push(<this.LibraryElement key={sessionStorage.key(i)} />);
        this.setState({library: newLibrary});
    }

    render()
    {
        //sessionStorage.clear();
        var uploadMessage;
        if (this.state.library.length === 0)
            uploadMessage = <div id='image-placeholder' className='editor-placeholder-text'>Click upload to add an image to the library!</div>;
        else
            uploadMessage = <div id='image-library'>{this.state.library.map((d) => {return d})}</div>;
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
                                sessionStorage.setItem(inputValue, filename);
                                this._MakeLibrary();
                            }
                        }
                    }}></input>
                </div>
                {uploadMessage}
            </div>
        );
    }
}

export { Image };