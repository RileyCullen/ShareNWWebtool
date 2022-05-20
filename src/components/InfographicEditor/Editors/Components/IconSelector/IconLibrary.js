import { useRef } from 'react';
import useOutsideClick from '../../../../Hooks/HandleOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ICON_LIST from '../../../IconList';

import '../../../../../css/React/Editors/IconLibrary.css';

/**
 * 
 * @param {Object} props closeLibrary: function, changeIcon: function
 */
const IconLibrary = (props) => {
    const ref = useRef(null);
    
    useOutsideClick(ref, props.closeLibrary);

    return (
        <div ref={ref} className='icon-library-container'>
            <div className='icon-library-header'>
                <button className='icon-library-close' onClick={props.closeLibrary}>
                    <FontAwesomeIcon className='close-icon' icon={faTimesCircle} />
                </button>
            </div>
            <div className='icon-library'>
                {
                    ICON_LIST.map(d => {
                        const changeIcon = () => {
                            const iconCode = String.fromCharCode(
                                parseInt(d.icon[3], 16));
                            props.closeLibrary();
                            props.changeIcon(iconCode);
                        }

                        return (
                            <button className='icon-library-button'
                                onClick={changeIcon}>
                                <FontAwesomeIcon className='icon-library-icon' icon={d} />
                            </button>
                        );
                    })
                }
            </div>
        </div>
    );
};

export { IconLibrary };