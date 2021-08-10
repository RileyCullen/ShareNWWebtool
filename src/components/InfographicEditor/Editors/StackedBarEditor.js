import React from 'react';
import { TabContainer } from './Components/index';

import '../../../css/React/Editors/ChartEditor.css';

class StackedBarEditor extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            currentTab: 0 // 0 - Settings and 1 - Design Options
        };
    }

    render()
    {
        return (
            <div className='chart-editor'>
                <TabContainer
                    currentTab={this.state.currentTab} 
                    onClick={(state) => { this._SetCurrentTab(state); }}/>
            </div>
        )
    }

    _SetCurrentTab(state)
    {
        this.setState({
            currentTab: state,
        });
    }
}

export { StackedBarEditor };