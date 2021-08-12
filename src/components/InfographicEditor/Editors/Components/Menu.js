import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Checkbox } from './index';

import '../../../../css/React/Editors/Menu.css';

class Menu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
            isChecked: this.props.checkbox.isChecked,
        }
    }

    render()
    {
        let checkBox = this._DisplayCheckbox(),
            name = (this.state.isOpen) ? 'dropdown-content open' : 'dropdown-content';
        return (
            <div className='dropdown-menu'>
                <div className='dropdown-toggle'
                    onClick={() => { this._ToggleOpen(); }}>
                    <FontAwesomeIcon className='dropdown-icon' icon={faAngleRight}/>
                    <p className='dropdown-name'>{this.props.name}</p>
                    {checkBox}
                </div>
                <div className={name}>
                    {
                        this.props.content.map((d) => {
                            return d.contentElement;
                        })
                    }
                </div>
                <hr className='menu-element-divider' />
            </div>
        );
    }

    _ToggleOpen()
    {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    _DisplayCheckbox()
    {
        if (this.props.checkbox.displayCheckbox) {
            return (
                <div className='check-box-container'>
                    <Checkbox 
                        initialValue={this.state.isChecked}
                        onClick={() => { this._ToggleCheckBox(); }} />
                </div>
            );
        }
        return false;
    }

    _ToggleCheckBox()
    {
        this.setState({
            isChecked: !this.state.isChecked,
        });
        this.props.checkbox.checkboxHandler();
    }
}

export { Menu };