import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { IconButton } from './IconButton';
import { IconLibrary } from './IconLibrary';

/**
 * @param {Object} props icon: string, iconColor: string, changeIcon: function,
 */
const IconSelector = (props) => {
    const [displayIcons, setDisplayIcons] = useState(false);
    
    const OpenIconLibrary = () => {
        setDisplayIcons(true);
    }

    const CloseIconLibrary = () => {
        setDisplayIcons(false);
    }

    const SetContent = () => {
        if (displayIcons) return (
                <IconLibrary closeLibrary={CloseIconLibrary}
                    changeIcon={props.changeIcon}/>
            );
        else return (
            <CSSTransition>
                <IconButton 
                    icon={props.icon} 
                    iconColor={props.iconColor}
                    onClick={OpenIconLibrary}/>
            </CSSTransition>
        );
    }

    return (
        <div className='icon-selector-container'>
            <TransitionGroup>
                {SetContent()}
            </TransitionGroup>
        </div>
    );
}

export { IconSelector };