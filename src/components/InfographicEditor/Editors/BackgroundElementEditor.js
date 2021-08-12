import React from 'react';
import { Menu } from './Components/index';

import '../../../css/React/Editors/Tabless.css';

class BackgroundElementEditor extends React.Component
{
    render()
    {
        return (
            <div className='tabless-container'>
                <div className='tabless-editor'>
                    <Menu 
                        name='Size Settings'
                        isOpen={false}
                        content={[]}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                    <Menu 
                        name='Display Settings'
                        isOpen={false}
                        content={[]}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                </div>
            </div>
        );
    }
}

export { BackgroundElementEditor };