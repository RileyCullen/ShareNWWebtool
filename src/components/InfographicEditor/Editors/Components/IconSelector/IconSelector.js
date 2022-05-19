import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { IconLibrary } from './IconLibrary';

/**
 * @param {Object} props 
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
        if (displayIcons) return <IconLibrary closeLibrary={CloseIconLibrary}/>;
        else return (
            <CSSTransition>
                <button onClick={OpenIconLibrary}>Change Icon</button>
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