import React from 'react';

import '../../../../css/React/Editors/Tab.css';

class Tab extends React.Component 
{
    render()
    {
        let name = 'editor-tab'; 

        if (this.props.isSelected) {
            name += ' selected-tab';
        }

        return (
            <div 
                className={name}
                onClick={this.props.onClick}>
                <p>{this.props.tabName}</p>
            </div>
        );
    }
}

export { Tab };