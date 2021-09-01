import React from 'react';

import '../../../../css/React/Editors/Insert/Insert.css';
import '../../../../css/React/Editors/Insert/Icon.css';
import { faAmbulance, faBrain, faCapsules, faFirstAid, faHeart, faHeartbeat, faHospital, faLungs, faLungsVirus, faMedkit, 
    faPills, faPrescription, faPrescriptionBottle, faStethoscope, faSyringe, faUserMd, faWheelchair } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Icon extends React.Component 
{
    render()
    {
        return (
            <div className='editor-insert-container'>
                <div className='editor-icon-container'>
                    {
                        this._CreateIconList()
                    }
                </div>
            </div>
        );
    }

    _CreateIconList()
    {
        /**
         * Note that accessing the 3rd index in fa{Name}'s icon attribute will
         * give the unicode, which is what the canvas uses to draw the icons 
         */
        let iconList = [faAmbulance, faHeart, faHeartbeat, faHospital, faMedkit,
            faPrescription, faPrescriptionBottle, faStethoscope, faUserMd, faWheelchair,
            faBrain, faCapsules, faFirstAid, faLungs, faLungsVirus, faPills, faSyringe,]
        return iconList.map((d, i) => {
            return (
                <button className='insert-fa-icon-button'
                    onClick={() => { this.props.toggleInsert('icon', d.icon[3])}}>
                    <FontAwesomeIcon className='insert-fa-icon' icon={d} />
                </button>
            );
        });
    }
}

export { Icon };