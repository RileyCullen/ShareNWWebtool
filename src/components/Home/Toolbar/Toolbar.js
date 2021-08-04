import React from 'react';
import { SearchBar } from './SearchBar';
import '../../../css/React/Toolbar.css';

class Toolbar extends React.Component
{
    render()
    {
        return (
            <div className='toolbar-home'>
                <SearchBar />
            </div>
        );
    }
}

export { Toolbar };