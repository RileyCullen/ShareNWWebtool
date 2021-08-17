import React from 'react';
import { Menu, LabeledTextField, LabeledSlider, LabeledColorPicker, LabeledCheckbox } from './Components/index';

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

    _GetSizeContent()
    {
        return [
            <div>
                <LabeledTextField 
                    key={'image-width-' + this.props.settings.width}
                    label='Width:'
                    index={'width'}
                    initialValue={this.props.settings.width}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
                <LabeledTextField 
                    key={'image-height-' + this.props.settings.height}
                    label='Height:'
                    index={'height'}
                    initialValue={this.props.settings.height}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
            </div>
        ];
    }

    _GetDisplayContent()
    {
        return [
            <div>
                <LabeledSlider
                    key={'opacity-' + this.props.settings.opacity} 
                    label='Opacity:'
                    value={this.props.settings.opacity}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={(event) => { }}
                    width='150px'
                />
                <LabeledColorPicker 
                    key={'stroke-color-' + this.props.settings.stroke}
                    label='Stroke Color:'
                    color={this.props.settings.stroke}
                    onChange={(value) => { }}
                />
                <LabeledTextField 
                    key={'stroke-width-' + this.props.settings.strokeWidth}
                    label='Stroke Width:'
                    index={'stroke'}
                    initialValue={this.props.settings.strokeWidth}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
            </div>
        ];
    }
    _GetCorrectionsContent()
    {
        return [
            <div>
                <LabeledSlider 
                    key={'contrast-' + this.props.settings.contrast}
                    label='Contrast:'
                    value={this.props.settings.contrast}
                    min={-100}
                    max={100}
                    step={1}
                    onChange={(event) => { }}
                    width='150px' 
                />
                <LabeledSlider 
                    key={'brightness-' + this.props.settings.brightness}
                    label='Brightness:'
                    value={this.props.settings.brightness}
                    min={-1}
                    max={1}
                    step={0.1}
                    onChange={(event) => { }}
                    width='150px' 
                />
                <LabeledSlider 
                    key={'blur-' + this.props}
                    label='Blur:'
                    value={this.props.settings.blurRadius}
                    min={0}
                    max={40}
                    step={1}
                    onChange={(event) => { }}
                    width='150px' 
                />
            </div>
        ];
    }
}

export { ImageEditor };