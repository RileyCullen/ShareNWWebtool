import React from 'react';
import { LabeledTextField, Menu, LabeledColorPicker, LabeledNumericTextField } from './Components/index';

import '../../../css/React/Editors/Tabless.css';

class BackgroundElementEditor extends React.Component
{
    render()
    {
        if (this.props.settings === 0) return false;
        console.log(this.props.settings)
        return (
            <div className='tabless-container'>
                <div className='tabless-editor'>
                    <Menu 
                        name='Size'
                        isOpen={false}
                        content={this._GetSizeContent()}
                        checkbox={{
                            displayCheckbox: false,
                        }}
                    />
                    <Menu 
                        name='Display'
                        isOpen={false}
                        content={this._GetDisplayContent()}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                </div>
            </div>
        );
    }

    _SetSizeSettings(category, key, value)
    {
        let settings = this.props.settings;
        settings[category][key] = value;
        this.props.setGraphicSettings(settings);
    }

    _GetSizeContent()
    {
        return [
            <div className='center'>
                <LabeledNumericTextField 
                    label='Width:'
                    index={'width'}
                    initialValue={this.props.settings.size.width}
                    rows={1}
                    cols={5}
                    onlyPositive={true}
                    onChange={(d, i) => { 
                        if (d < 0) return;
                        this._SetSizeSettings('size', 'width', d); 
                    }}
                />
                <LabeledNumericTextField 
                    label='Height:'
                    index={'height'}
                    initialValue={this.props.settings.size.height}
                    rows={1}
                    cols={5}
                    onlyPositive={true}
                    onChange={(d, i) => { 
                        if (d < 0) return;
                        this._SetSizeSettings('size', 'height', d); 
                    }}
                /> 
            </div>
        ];
    }

    _SetDisplaySettings(key, value)
    {
        let settings = this.props.settings;
        settings.display[key].value = value;
        this.props.setGraphicSettings(settings);
    }

    _GetDisplayContent()
    {
        let display = this.props.settings.display;
        return [
            <div className='center'>
                {
                    Object.keys(display).map(key => {
                        let tmp = display[key];
                        switch(tmp.type) {
                            case 'color-picker':
                                return (
                                    <LabeledColorPicker 
                                        label={tmp.name}
                                        color={tmp.value}
                                        onChange={(value) => { this._SetDisplaySettings(key, value); }}
                                    />
                                );
                            case 'text-field':
                                return (
                                    <LabeledNumericTextField 
                                        label={tmp.name}
                                        index={tmp.type}
                                        initialValue={tmp.value}
                                        rows={1}
                                        cols={5}
                                        onlyPositive={true}
                                        onChange={(d, i) => { 
                                            this._SetDisplaySettings(key, parseFloat(d)); 
                                        }}
                                    />
                                );
                            default: 
                                return false;
                        }
                    })
                }
            </div>
        ];
    }
}

export { BackgroundElementEditor };