import React from 'react';
import { Tab } from './Tab';

import '../../../../css/React/Editors/ChartEditor.css';

class TabContainer extends React.Component 
{
    render()
    {
        return (
            <div className='tab-container'>
                <Tab 
                    tabName='Settings' 
                    isSelected={(this.props.currentTab === 0)}
                    onClick={() => { this._StateHandler(0) }}/>
                <Tab 
                    tabName='Design Options' 
                    isSelected={this.props.currentTab === 1}
                    onClick={() => { this._StateHandler(1) }}/>
            </div>
        );
    }

    _StateHandler(state)
    {
        this.props.onClick(state);
    }
}

export { TabContainer };