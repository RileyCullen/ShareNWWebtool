import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ICON_LIST from '../../../IconList';

import '../../../../../css/React/Editors/IconLibrary.css';

/**
 * 
 * @param {Object} props closeLibrary: function, 
 */
const IconLibrary = (props) => {
    return (
        <div className='icon-library-container'>
            <div className='icon-library-header'>
                <button className='icon-library-close' onClick={props.closeLibrary}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </button>
            </div>
            <div className='icon-library'>
                {
                    ICON_LIST.map(d => {
                        return (
                            <button className='icon-library-button'>
                                <FontAwesomeIcon className='tmp' icon={d} />
                            </button>
                        );
                    })
                }
            </div>
        </div>
    );
};

export { IconLibrary };