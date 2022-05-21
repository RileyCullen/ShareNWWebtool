import { useRef } from 'react';
import ReactDOM from 'react-dom';
import useOutsideClick from '../../../../Hooks/HandleOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ICON_LIST from '../../../IconList';

import '../../../../../css/React/Editors/IconLibrary.css';
import useScrollDetection from '../../../../Hooks/DetectScrolling';
import useResizeDetection from '../../../../Hooks/DetectResize';

/**
 * 
 * @param {Object} props closeLibrary: function, changeIcon: function, top, left
 */
const IconLibrary = (props) => {
    const ref = useRef(null);
    
    useOutsideClick(ref, props.closeLibrary);
    useScrollDetection(props.closeLibrary);
    useResizeDetection(props.closeLibrary);

    return ReactDOM.createPortal(
        <div ref={ref} className='icon-library-container' style={{top: props.top, left: props.left - 150}}>
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
    , document.getElementById('root'));
};

export { IconLibrary };