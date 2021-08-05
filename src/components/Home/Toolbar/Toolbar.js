import React from 'react';
import { SearchBar } from './SearchBar';
import '../../../css/React/Toolbar.css';

class Toolbar extends React.Component
{
    render()
    {
        return (
            <div id='toolbar-home' className='toolbar-home'>
                <SearchBar />
            </div>
        );
    }
}

export { Toolbar };