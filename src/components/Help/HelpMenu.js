import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { HelpElement } from './HelpElement';

import '../../css/React/Help/HelpMenu.css';

function HelpMenu(props)
{
    return (
        <div id="help-menu">
            <div id="help-content-holder">
                <div id="help-header">
                    <h1 className="help-menu-text title">Help Menu</h1>
                    <button id="help-menu-exit" onClick={props.onClick}>
                        <FontAwesomeIcon id="help-menu-exit-icon"
                            className='help-menu-text' 
                            icon={faTimesCircle}/>
                    </button>
                </div>
                <div id="help-main">
                    <HelpElement title="Opening templates">
                        <p>
                            To open a template, select the "Use Template" button
                            underneath the infographic's title.
                        </p>
                    </HelpElement>
                </div>
            </div>
        </div>
    );
}

export { HelpMenu };