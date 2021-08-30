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
            name = (this.state.isOpen) ? 'dropdown-content open' : 'dropdown-content',
            rotation = (this.state.isOpen) ? '90deg' : '0deg',
            width = (this.props.checkbox.displayCheckbox) ? '475px' : '525px';
        return (
            <div className='dropdown-menu'>
                <div className='dropdown-toggle-container'>
                    <div className='dropdown-toggle'
                        style={{
                            width: width,
                        }}
                        onClick={() => { this._ToggleOpen(); }}>
                        <FontAwesomeIcon 
                            className='dropdown-icon' 
                            icon={faAngleRight}
                            style={{transform: 'rotate(' + rotation + ')'}}/>
                        <p className='dropdown-name'>{this.props.name}</p>
                    </div>
                    {checkBox}
                </div>
                <div className={name}>
                    {
                        this.props.content.map((d) => {
                            return d;
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
                        onClick={(d) => { this._ToggleCheckBox(d); }} />
                </div>
            );
        }
        return false;
    }

    _ToggleCheckBox(d)
    {
        this.setState({
            isChecked: !this.state.isChecked,
        });
        this.props.checkbox.checkboxHandler(d);
    }
}

export { Menu };