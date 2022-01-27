import React from 'react';
import { LabeledTextField, LabeledSlider, LabeledColorPicker, Menu } from './Components/index';

import '../../../css/React/Editors/Tabless.css'

class IconEditor extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            opacity: this.props.settings.opacity,
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

    componentDidUpdate(prevProps)
    {
        if (prevProps.settings.opacity !== this.props.settings.opacity) {
            this.setState({opacity: this.props.settings.opacity});
        }
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
                <div id='icon-opacity-slider' style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    gridColumnGap: '40px',
                    alignItems: 'center'
                }}>
                    <label>Opacity:</label>
                    <input type='range'
                        min={0}
                        max={1}
                        step={0.1}
                        value={this.state.opacity}
                        style={{width: '150px'}}
                        onChange={(event) => { this._HandleSliderChange(event); }}
                    >
                    </input>
                </div>
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

    _HandleSliderChange(event)
    {
        this.setState({
            opacity: event.target.value,
        })
        this._SetGraphicSettings('opacity', event.target.value);
    }
}

export { IconEditor };