import React from 'react';
import { LabeledTextField, Menu, LabeledColorPicker } from './Components/index';

import '../../../css/React/Editors/Tabless.css';

class BackgroundElementEditor extends React.Component
{
    render()
    {
        if (this.props.settings === 0) return false;
        return (
            <div className='tabless-container'>
                <div className='tabless-editor'>
                    <Menu 
                        name='Position'
                        isOpen={false}
                        content={this._GetPositionContent()}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
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

    _GetPositionContent()
    {
        return [
            <div>
                <LabeledTextField 
                    label='X:'
                    index={'x'}
                    initialValue={this.props.settings.position.x}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
                <LabeledTextField 
                    label='Y:'
                    index={'y'}
                    initialValue={this.props.settings.position.y}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                /> 
            </div>
        ];
    }

    _GetSizeContent()
    {
        return [
            <div>
                <LabeledTextField 
                    label='Width:'
                    index={'width'}
                    initialValue={this.props.settings.size.width}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                />
                <LabeledTextField 
                    label='Height:'
                    index={'height'}
                    initialValue={this.props.settings.size.height}
                    rows={1}
                    cols={5}
                    onchange={(d, i) => { }}
                /> 
            </div>
        ];
    }

    _GetDisplayContent()
    {
        let display = this.props.settings.display;
        return [
            <div>
                {
                    Object.keys(display).map(key => {
                        let tmp = display[key];
                        switch(tmp.type) {
                            case 'color-picker':
                                return (
                                    <LabeledColorPicker 
                                        label={tmp.name}
                                        color={tmp.value}
                                        onChange={(value) => { }}
                                    />
                                );
                            case 'text-field':
                                return (
                                    <LabeledTextField 
                                        label={tmp.name}
                                        index={tmp.type}
                                        initialValue={tmp.value}
                                        rows={1}
                                        cols={5}
                                        onchange={(d, i) => { }}
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