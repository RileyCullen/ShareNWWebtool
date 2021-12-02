import React from 'react';
import { Menu, LabeledTextField, LabeledSlider, LabeledColorPicker } from './Components/index';
import '../../../css/React/Editors/Tabless.css';

class ImageEditor extends React.Component
{
    render()
    {
        console.log(this.props.settings)
        if (this.props.settings === 0) return false;
        return (
            <div className='tabless-container'>
                <div className='tabless-editor'>
                    <Menu 
                        name='Size Settings'
                        isOpen={false}
                        content={this._GetSizeContent()}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                    <Menu 
                        name='Display Settings'
                        isOpen={false}
                        content={this._GetDisplayContent()}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                    <Menu 
                        name='Image Corrections'
                        isOpen={false}
                        content={this._GetCorrectionsContent()}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                </div>
            </div>
        );
    }

    _SetGraphicSettings(key, value)
    {
        let settings = this.props.settings;
        settings[key] = value;
        this.props.setGraphicSettings(settings);
    }

    _GetSizeContent()
    {
        return [
            <div className='center'>
                <LabeledTextField 
                    key={'image-width'}
                    label='Width:'
                    index={'width'}
                    initialValue={this.props.settings.width}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => {
                        if (d === '') return; 
                        this._SetGraphicSettings('width', parseFloat(d));
                    }}
                />
                <LabeledTextField 
                    key={'image-height-' + this.props.settings.height}
                    label='Height:'
                    index={'height'}
                    initialValue={this.props.settings.height}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => {
                        if (d === '') return;
                        this._SetGraphicSettings('height', parseFloat(d));    
                    }}
                />
            </div>
        ];
    }

    _GetDisplayContent()
    {
        return [
            <div className='center'>
                <LabeledSlider
                    key={'image-opacity'} 
                    label='Opacity:'
                    value={parseFloat(this.props.settings.opacity)}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={(event) => { 
                        this._SetGraphicSettings('opacity', event);
                    }}
                    width='150px'
                />
                <LabeledColorPicker 
                    key={'image-stroke-color'}
                    label='Stroke Color:'
                    color={this.props.settings.stroke}
                    onChange={(value) => { 
                        this._SetGraphicSettings('stroke', value);
                    }}
                />
                <LabeledTextField 
                    key={'image-stroke-width'}
                    label='Stroke Width:'
                    index={'stroke'}
                    initialValue={this.props.settings.strokeWidth}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { 
                        if (d === '') return;
                        this._SetGraphicSettings('strokeWidth', parseFloat(d));
                    }}
                />
            </div>
        ];
    }
    _GetCorrectionsContent()
    {
        return [
            <div className='center'>
                <LabeledSlider 
                    key={'image-contrast'}
                    label='Contrast:'
                    value={this.props.settings.contrast}
                    min={-100}
                    max={100}
                    step={1}
                    onChange={(event) => { 
                        this._SetGraphicSettings('contrast', parseFloat(event));
                    }}
                    width='150px' 
                />
                <LabeledSlider 
                    key={'image-brightness'}
                    label='Brightness:'
                    value={this.props.settings.brightness}
                    min={-1}
                    max={1}
                    step={0.1}
                    onChange={(event) => { 
                        this._SetGraphicSettings('brightness', parseFloat(event));
                    }}
                    width='150px' 
                />
                <LabeledSlider 
                    key={'image-blur'}
                    label='Blur:'
                    value={this.props.settings.blurRadius}
                    min={0}
                    max={40}
                    step={1}
                    onChange={(event) => { 
                        this._SetGraphicSettings('blurRadius', parseFloat(event));
                    }}
                    width='150px' 
                />
            </div>
        ];
    }
}

export { ImageEditor };