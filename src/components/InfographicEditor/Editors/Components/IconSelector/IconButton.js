import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../../css/React/Editors/IconButton.css'

/**
 * 
 * @param {Object} props icon: string, iconColor: string, onClick: function, 
 */
const IconButton = (props) => {
    return (
        <button className='icon-button' onClick={props.onClick}>
            {
                <span 
                    className="font-awesome icon"
                    style={{color: props.iconColor}}>
                    {props.icon}
                </span>}
        </button>
    )
};

export { IconButton };