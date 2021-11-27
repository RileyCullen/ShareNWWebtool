import React from 'react';
import Lodash from 'lodash';
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
                        selected={this.state.currentFont.fontFamily}
                        onChange={(value) => { 
                            this._HandleChange('fontFamily', value);
                        }}
                    />
                </div>
                <p>Font Size:</p>
                <div className='element-right'>  
                    <TextField 
                        id='font-size'
                        index={0}
                        initialValue={this.state.currentFont.fontSize}
                        rows={1}
                        cols={5}
                        onChange={(d, i) => { 
                            this._HandleChange('fontSize', d);
                        }}
                    />
                </div>
                <p>Text Color:</p>
                <div className='element-right'>
                    <ColorPicker 
                        color={this.state.currentFont.textColor}
                        onChange={(value) => { 
                            this._HandleChange('textColor', value);
                        }}    
                    />
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps)
    {
        if (!Lodash.isEqual(prevProps.initialFont, this.props.initialFont)) {
            this.setState({ currentFont: this.props.initialFont });
        }
    }

    _HandleChange(key, value)
    {
        if (key === 'fontSize' && (isNaN(value) || value === '')) return;
        let newFont = this.state.currentFont;
        newFont[key] = value;
        this.setState({
            currentFont: newFont,
        });

        if (key === 'fontFamily') this.props.updateFontFamily(value);
        else if (key === 'fontSize') this.props.updateFontSize(value);
        else if (key === 'textColor') this.props.updateTextColor(value);
    }
}

export { FontSelector };