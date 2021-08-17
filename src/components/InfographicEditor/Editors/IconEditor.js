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

    _GetSizeSettings()
    {
        return [
            <div>
                <LabeledTextField 
                    key={'icon-size-' + this.props.settings.fontSize}
                    label='Size:'
                    index={'font-size'}
                    initialValue={this.props.settings.fontSize}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
            </div>
        ];
    }

    _GetDisplaySettings()
    {
        return [   
            <div>
                <LabeledSlider 
                    key={'icon-opacity-' + this.props.settings.opacity}
                    label='Opacity:'
                    value={this.props.settings.opacity}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={(event) => { }}
                    width='150px'
                />
                <LabeledColorPicker 
                    key={'icon-color-' + this.props.settings.fill}
                    label='Color:'
                    color={this.props.settings.fill}
                    onChange={(value) => { }}
                />
            </div>
        ];
    }
}

export { IconEditor };