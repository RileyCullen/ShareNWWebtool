import '../../css/React/Help/HelpMenu.css';

function HelpMenu(props)
{
    return (
        <div id="help-menu">
            <div id="help-content-holder">
                <div id="help-header">
                    <button onClick={props.onClick}>
                        Style-less button :P
                    </button>
                </div>
                <div id="help-main"></div>
            </div>
        </div>
    );
}

export { HelpMenu };