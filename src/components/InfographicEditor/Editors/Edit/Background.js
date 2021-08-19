import React from 'react';

import { LabeledColorPicker, Menu } from '../Components/index';

import '../../../../css/React/Editors/Insert/Insert.css';
import '../../../../css/React/Editors/Edit/Background.css';

class Background extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            radioboxValue: 'Fill'
        }
    }

    render()
    {
        return (
            <div className='editor-insert-container'>
                <div style={{
                    position: 'relative',
                    left: '5px',
                    top: '5px'
                }}>
                <Menu 
                    key='background-fill'
                    name='Fill'
                    isOpen={true}
                    checkbox={{displayCheckbox: false}}
                    content={[
                        <div className='edit-background-fill'>
                            <div className='edit-background-radio-container'>
                                <input className='edit-background-input' type='radio' value='Fill' checked={true}/>
                                <label className='edit-background-label'>Fill</label>
                            </div>
                            <div className='edit-background-radio-container'>
                                <input className='edit-background-input' type='radio' value='Gradient' checked={false}/>
                                <label className='edit-background-label'>Gradient</label>
                            </div>
                            <div className='edit-background-content'>
                                {
                                    this._GetContent()
                                }
                            </div>
                        </div>
                    ]}
                />
                </div>
            </div>
        );
    }

    _GetContent()
    {
        if (this.state.radioboxValue === 'Fill') {
            return (
                <div style={{
                    margin: '60px 0px 60px 60px',
                }}>
                    <LabeledColorPicker 
                        label='Fill:'
                        color='#ffffff'
                        onChange={(value) => { }}
                    />
                </div>
            );
        }
    }
}

export { Background };