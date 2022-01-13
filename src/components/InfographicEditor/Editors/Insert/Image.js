import React from 'react';

import '../../../../css/React/Editors/Insert/Insert.css';
import '../../../../css/React/Editors/Insert/Image.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

class Image extends React.Component 
{
    constructor(props){
        super(props);
        this.state = {
            library: [],
        };
        this._handleChange = this._HandleChange.bind(this);
    }

    LibraryElement(key){
        /*var url = URL.createObjectURL(new Blob([key]));
        console.log(url);
        sessionStorage.removeItem(key);
        sessionStorage.setItem(key, url);*/
        const entry = <div className="image-entry">
            <img src={sessionStorage.getItem(key)}></img>
            <button id="insert-image" onClick={() => {this.props.toggleInsert('image', sessionStorage.getItem(key));}}>Insert</button>
            <button id="remove-image" onClick={() => {sessionStorage.removeItem(key); this._MakeLibrary();}}>Remove</button>
            </div>
        return entry;
    }

    _MakeLibrary(){
        var newLibrary = [];
        for (var i = 0; i < sessionStorage.length; i++)
            newLibrary.push(this.LibraryElement(sessionStorage.key(i)));
        this.setState({library: newLibrary});
    }

    render()
    {
        var uploadMessage;
        if (this.state.library.length === 0)
            uploadMessage = <div id='image-placeholder' className='editor-placeholder-text'>Click upload to add an image to the library!</div>;
        else
            uploadMessage = <div id='image-library'>{this.state.library.map((d) => {return d})}</div>;
        return (
            <div className='editor-insert-container'>
                <div id='upper-image-upload-container'>
                    <label 
                        id='upload-image-label'
                        for='upload-image-input'>
                        <FontAwesomeIcon 
                            id='upload-image-icon'
                            color='#fff'
                            icon={faFileUpload}
                        />
                        Upload Image
                    </label>
                    <input id="upload-image-input" 
                        type="file" 
                        accept="image/png, image/jpeg, image/jpg" 
                        onChange={this._handleChange}></input>
                </div>
                {uploadMessage}
            </div>
        );
    }
    
    componentDidMount()
    {
        if (this.state.library.length === 0) this._MakeLibrary();
    }

    _HandleChange(event)
    {
        var inputValue = document.getElementById("upload-image-input").value;
        if (inputValue){
            var objURL = URL.createObjectURL(event.target.files[0]);
            this.props.toggleInsert('image', objURL);
            var insert = true;
            for (var i=0; i<sessionStorage.length; i++){
                if (sessionStorage.key(i)===inputValue){
                    insert = false;
                    i = sessionStorage.length;
                }
            }
            if (insert){
                sessionStorage.setItem(inputValue, objURL);
                this._MakeLibrary();
            }
        }
    }
}

export { Image };