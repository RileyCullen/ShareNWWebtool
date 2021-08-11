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
            isOpen: false,
        }
    }

    render()
    {
        let checkBox = this._DisplayCheckBox(),
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

    _DisplayCheckBox()
    {
        if (this.props.isCheckBox) {
            return (
                <div className='check-box-container'>
                    <Checkbox />
                </div>
            );
        }
        return false;
    }
}

export { Menu };