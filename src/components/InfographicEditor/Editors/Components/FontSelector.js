import React from 'react';
import { DropdownList, TextField, ColorPicker } from './index';

import '../../../../css/React/Editors/FontSelector.css';

class FontSelector extends React.Component 
{
    constructor(props)
    {
        super(props);
        this._fontList = ['Times New Roman', 'museo', 'Montserrat', 'Roboto', 
            'Open Sans', 'canada-type-gibson'];

        this.state = {
            currentFont: this.props.initialFont,
        }
    }

    render()
    {
        return (
            <div className='font-selector-container'>
                <p>Font Family:</p>
                <div className='element-right'>
                    <DropdownList 
                        options={this._fontList} 
                        selected={this.state.currentFont}
                        onChange={(value) => { }}
                    />
                </div>
                <p>Font Size:</p>
                <div className='element-right'>  
                    <TextField 
                        id='font-size'
                        index={0}
                        initialValue={'1'}
                        rows={1}
                        cols={5}
                        onchange={(d, i) => { }}
                    />
                </div>
                <p>Text Color:</p>
                <div className='element-right'>
                    <ColorPicker 
                        color={'#fff'}
                        onChange={(value) => { }}    
                    />
                </div>
            </div>
        );
    }
}

export { FontSelector };