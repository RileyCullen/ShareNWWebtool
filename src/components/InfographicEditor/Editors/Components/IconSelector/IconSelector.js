import { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { IconButton } from './IconButton';
import { IconLibrary } from './IconLibrary';

/**
 * @param {Object} props icon: string, iconColor: string, changeIcon: function,
 */
const IconSelector = (props) => {
    const [displayIcons, setDisplayIcons] = useState(false);
    
    const ref = useRef(null);

    const OpenIconLibrary = () => {
        setDisplayIcons(true);
    }

    const CloseIconLibrary = () => {
        setDisplayIcons(false);
    }

    const SetContent = () => {
        if (displayIcons) {
            let rect = ref.current.getBoundingClientRect()
            return (
                <IconLibrary closeLibrary={CloseIconLibrary}
                    changeIcon={props.changeIcon}
                    top={rect.top}
                    left={rect.left}/>
            );
        } else return (
            <CSSTransition>
                <IconButton 
                    icon={props.icon} 
                    iconColor={props.iconColor}
                    onClick={OpenIconLibrary}/>
            </CSSTransition>
        );
    }

    return (
        <div ref={ref} className='icon-selector-container'>
            <TransitionGroup>
                {SetContent()}
            </TransitionGroup>
        </div>
    );
}

export { IconSelector };