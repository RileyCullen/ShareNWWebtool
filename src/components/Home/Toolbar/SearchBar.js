import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../../css/React/Toolbar.css';
import '../../../css/React/Searchbar.css';

class SearchBar extends React.Component
{
    constructor(props)
    {
        super(props);
        this._initialValue = 'Search';
        this.state = {
            value: this._initialValue
        };
        this._handleChange = this._HandleChange.bind(this);
    }

    render()
    {
        console.log('value: ' + this.state.value.length);
        var value = (this.state.value === 'Search' || this.state.value.length === 0) ? '' : this.state.value;

        return (
            <form className='searchform'>
                <input 
                    type='text' 
                    id='infog-search' 
                    className='searchbar'
                    value={value}
                    placeholder={this._initialValue}
                    onChange={this._handleChange}>
                </input>

                <button className='search-button'>
                    <FontAwesomeIcon 
                    className='search-icon'
                    icon={faSearch}/>
                </button>
            </form>
        );
    }

    _HandleChange(event)
    {
        this.setState({
            value: event.target.value,
        });
    }
}

export { SearchBar };