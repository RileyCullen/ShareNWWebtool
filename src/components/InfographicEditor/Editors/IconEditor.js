import React from 'react';
import { LabeledTextField, LabeledSlider, LabeledColorPicker, Menu } from './Components/index';

import '../../../css/React/Editors/Tabless.css'

class IconEditor extends React.Component 
{
    render()
    {
        if (this.props.settings === 0) return false;
        return (
            <div className='tabless-container'>
                <div className='tabless-editor'>
                    <Menu 
                        name='Size Settings'
                        isOpen={false}
                        content={this._GetSizeSettings()}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                    <Menu 
                        name='Display Settings'
                        isOpen={false}
                        content={this._GetDisplaySettings()}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                </div>
            </div>
        )
    }

    _SetGraphicSettings(key, value)
    {
        let settings = this.props.settings;
        settings[key] = value;
        this.props.setGraphicSettings(settings);
    }

    _GetSizeSettings()
    {
        return [
            <div className='center'>
                <LabeledTextField 
                    key={'icon-size'}
                    label='Size:'
                    index={'font-size'}
                    initialValue={this.props.settings.fontSize}
                    rows={1}
                    cols={5}
                    onChange={(d, i) => { 
                        if (d === '') return;
                        this._SetGraphicSettings('fontSize', parseFloat(d));
                    }}
                />
            </div>
        ];
    }

    _GetDisplaySettings()
    {
        return [   
            <div className='center'>
                <LabeledSlider 
                    key={'icon-opacity'}
                    label='Opacity:'
                    value={this.props.settings.opacity}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={(event) => { 
                        this._SetGraphicSettings('opacity', event);
                    }}
                    width='150px'
                />
                <LabeledColorPicker 
                    key={'icon-color'}
                    label='Color:'
                    color={this.props.settings.fill}
                    onChange={(value) => {
                        this._SetGraphicSettings('fill', value)
                    }}
                />
            </div>
        ];
    }
}

export { IconEditor };