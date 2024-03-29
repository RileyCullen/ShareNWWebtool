import React from 'react';
import { Menu, LabeledTextField, LabeledSlider, LabeledColorPicker, LabeledNumericTextField } from './Components/index';

import '../../../css/React/Editors/Tabless.css';

class ImageEditor extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            opacity: this.props.settings.opacity,
            contrast: this.props.settings.contrast,
            brightness: this.props.settings.brightness,
            blur: this.props.settings.blurRadius,
        }
    }

    render()
    {
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

    componentDidUpdate(prevProps) 
    {
        if (prevProps.settings.opacity !== this.props.settings.opacity) {
            this.setState({
                opacity: this.props.settings.opacity,
            });
        } 
        
        if (prevProps.settings.contrast !== this.props.settings.contrast) {
            this.setState({
                contrast: this.props.settings.contrast,
            });
        }

        if (prevProps.settings.brightness !== this.props.settings.brightness) {
            this.setState({
                brightness: this.props.settings.brightness,
            });
        }

        if (prevProps.settings.blurRadius !== this.props.settings.blurRadius) {
            this.setState({
                blur: this.props.settings.blurRadius,
            });
        }
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
                <LabeledNumericTextField 
                    key={'image-width'}
                    label='Width:'
                    index={'width'}
                    initialValue={this.props.settings.width}
                    rows={1}
                    cols={5}
                    onlyPositive={true}
                    onChange={(d, i) => { 
                        this._SetGraphicSettings('width', parseFloat(d));
                    }}
                />
                <LabeledNumericTextField 
                    key={'image-height-' + this.props.settings.height}
                    label='Height:'
                    index={'height'}
                    initialValue={this.props.settings.height}
                    rows={1}
                    cols={5}
                    onlyPositive={true}
                    onChange={(d, i) => {
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
                {this._CreateSlider({
                    label: 'Opacity:',
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: this.state.opacity,
                    width: '150px',
                    onChange: (event) => {
                        let value = event.target.value;
                        this.setState({opacity: value});
                        this._SetGraphicSettings('opacity', parseFloat(value));
                    },
                })}
                <LabeledColorPicker 
                    key={'image-stroke-color'}
                    label='Stroke Color:'
                    color={this.props.settings.stroke}
                    onChange={(value) => { 
                        this._SetGraphicSettings('stroke', value);
                    }}
                />
                <LabeledNumericTextField 
                    key={'image-stroke-width'}
                    label='Stroke Width:'
                    index={'stroke'}
                    initialValue={this.props.settings.strokeWidth}
                    rows={1}
                    cols={5}
                    onlyPositive={true}
                    onChange={(d, i) => { 
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
                {this._CreateSlider({
                    label: 'Contrast:',
                    min: -100,
                    max: 100,
                    step: 1,
                    value: this.state.contrast,
                    width: '150px',
                    onChange: (event) => {
                        let value = event.target.value;
                        this.setState({contrast: value});
                        this._SetGraphicSettings('contrast', parseFloat(value));
                    },
                    templateColumns: '50px auto'
                })}
                {this._CreateSlider({
                    label: 'Brightness:',
                    min: -1,
                    max: 1,
                    step: 0.1,
                    value: this.state.brightness,
                    width: '150px',
                    onChange: (event) => {
                        let value = event.target.value;
                        this.setState({brightness: value});
                        this._SetGraphicSettings('brightness', parseFloat(value));
                    },
                    templateColumns: '50px auto'
                })}
                {this._CreateSlider({
                    label: 'Blur:',
                    min: 0,
                    max: 40,
                    step: 1,
                    value: this.state.blur,
                    width: '150px',
                    onChange: (event) => {
                        let value = event.target.value;
                        this.setState({blur: value});
                        this._SetGraphicSettings('blurRadius', parseFloat(value));
                    },
                    templateColumns: '50px auto'
                })}
            </div>
        ];
    }

    _CreateSlider({label, min, max, step, value, width, onChange, templateColumns = 'auto auto'})
    {
        return (
            <div className='image-editor-slider' style={{
                display: 'grid',
                gridTemplateColumns: templateColumns,
                gridColumnGap: '40px',
                alignItems: 'center'
            }}>
                <label>{label}</label>
                <input type='range'
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    style={{width: width}}
                    onChange={(event) => { onChange(event); }}
                >
                </input>
            </div>
        );
    }
}

export { ImageEditor };