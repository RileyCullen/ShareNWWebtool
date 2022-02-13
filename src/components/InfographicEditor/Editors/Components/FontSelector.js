import React from 'react';
import Lodash from 'lodash';
import { DropdownList, NumericTextField, ColorPicker } from './index';

import '../../../../css/React/Editors/FontSelector.css';
import { Color } from './Colors';

class FontSelector extends React.Component 
{
    static defaultProps = {
        isDisabled: false, 
    }
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
        let color = (this.props.isDisabled) ? Color.DisabledText : Color.EnabledText;
        return (
            <div className='font-selector-container'>
                <p style={{color: color}}>Font Family:</p>
                <div className='element-right'>
                    <DropdownList 
                        options={this._fontList} 
                        selected={this.state.currentFont.fontFamily}
                        onChange={(value) => { 
                            this._HandleChange('fontFamily', value);
                        }}
                        isDisabled={this.props.isDisabled}
                    />
                </div>
                <p style={{color: color}}>Font Size:</p>
                <div className='element-right'>  
                    <NumericTextField 
                        id='font-size'
                        index={0}
                        initialValue={this.state.currentFont.fontSize}
                        rows={1}
                        cols={5}
                        onlyPositive={true}
                        onChange={(d, i) => { 
                            this._HandleChange('fontSize', d);
                        }}
                        isDisabled={this.props.isDisabled}
                    />
                </div>
                <p style={{color: color}}>Text Color:</p>
                <div className='element-right'>
                    <ColorPicker 
                        color={this.state.currentFont.textColor}
                        onChange={(value) => { 
                            this._HandleChange('textColor', value);
                        }}    
                        isDisabled={this.props.isDisabled}
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