import { useState } from "react";
import { HelpButton } from './HelpButton';
import { HelpMenu } from './HelpMenu';

import { TransitionGroup, CSSTransition } from "react-transition-group";

import '../../css/React/Help/HelpContainer.css';
import '../../css/React/Help/HelpMenu.css';

function HelpContainer(props)
{
    const [displayMenu, setDisplayMenu] = useState(false);

    function ToggleMenu() {
        setDisplayMenu(true);
    }

    function ToggleButton() {
        setDisplayMenu(false);
    }

    let content = (
        <CSSTransition
            key="help-button-transition"
            timeout={400}
            classNames="help-button-transition"
        >
            <HelpButton onClick={ToggleMenu.bind(this)}
                pos={props.pos}
            />
        </CSSTransition>);
    if (displayMenu) {
        content = (
                <CSSTransition
                    key="help-menu-transition"
                    timeout={400}
                    classNames="help-menu-transition">
                    <HelpMenu onClick={ToggleButton.bind(this)}/>
                </CSSTransition>
        );
    }

    return (
        <div id="help-container">
            <TransitionGroup>
                {content}
            </TransitionGroup>
        </div>
    );
}

export { HelpContainer };