import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import '../../css/React/Help/HelpElement.css';

function HelpElement(props)
{
    const [displayContent, setDisplay] = useState(false);

    function toggleContent() {
        if (!displayContent) setDisplay(true);
    }

    function removeContent() {
        setDisplay(false);
    }

    let content = <h1 className='help-menu-text'>{props.title}</h1>;

    if (displayContent) {
        content = (
            <>
                <div className='help-element-header'>
                    <h1 className='help-menu-text'>{props.title}</h1>
                    <button className='help-element-exit'
                        onClick={removeContent.bind(this)}>
                        <FontAwesomeIcon className='help-element-exit-icon' 
                            icon={faTimesCircle} />
                    </button>
                </div>
                <div className='help-element-children-container'>
                    {props.children}
                </div>
            </>
        );
    }

    let style = (displayContent) ? "" : " helper-card"

    return (
        <div className={"help-element" + style} onClick={toggleContent.bind(this)}>
            {content}
        </div>
    );
}

export { HelpElement };