import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import "../../css/React/Help/HelpButton.css";

function HelpButton(props)
{
    return (
        <div id="help-button-container"
            style={{right: props.pos.right, top: props.pos.top}}>
            <button id="help-button" 
                onClick={() => { props.onClick(); }}>    
                <FontAwesomeIcon id="help-button-icon" icon={faQuestionCircle} />
            </button>
        </div>
    );
}

export { HelpButton };