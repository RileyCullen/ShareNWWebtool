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
                    <HelpElement title="Selecting infographic elements">
                        <p>
                            To select an infographic element, hover over the 
                            target element and double click.
                        </p>
                    </HelpElement>
                    <HelpElement title="Updating selected element's settings">
                        <div>
                            <span>To update a element's settings,</span>
                            <ol>
                                <li>
                                    Select an infographic element by double
                                    clicking the desired element. This will 
                                    bring up an editor menu where the settings
                                    are grouped by topic within drop down
                                    menus 
                                </li>
                                <li>
                                    Open the desired drop down menu by clicking
                                    on it
                                </li>
                                <li>
                                    Find the desired setting and input a new 
                                    value.
                                </li>
                            </ol>
                        </div>
                    </HelpElement>
                    <HelpElement title="Adding, updating, and removing chart decorations">
                        <div>
                            <p>
                                Chart decorations are extra design elements that
                                you can add to a chart element, such as an 
                                x-axis, y-axis, or adding data labels.
                            </p>
                            <h2>Adding chart decorations</h2>
                            <ol>
                                <li>Click on the design options tab. Similar
                                    to the settings tab, chart decorations are
                                    grouped into drop down menus by topic.
                                </li>
                                <li>Find the desired decoration and check the 
                                    box to the left of the decorator title to 
                                    add it.
                                </li>
                            </ol>
                            <h2>Updating chart decorations</h2>
                            <ol>
                                <li>Click on the design options tab</li>
                                <li>Find the desired decoration</li>
                                <li>Click on it to open the drop down menu, 
                                    which contains the settings for that 
                                    decoration.
                                </li>
                            </ol>
                            <h2>Removing chart decorations</h2>
                            <ol>
                                <li>Click on the design options tab</li>
                                <li>Find the desired decorator</li>
                                <li>Uncheck the box located to the right.</li>
                            </ol>
                        </div>
                    </HelpElement>
                </div>
            </div>
        </div>
    );
}

export { HelpMenu };