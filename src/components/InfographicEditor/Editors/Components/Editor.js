import React from 'react';

import { TabContainer } from './TabContainer';

import '../../../../css/React/Editors/ChartEditor.css';

class Editor extends React.Component
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
                <div id='editor-content-scrollable' className='editor-content'>
                    <div className='editor-menu-container'>
                        {this._DisplayContent()}
                    </div>
                </div>
            </div>
        )
    }

    _SetCurrentTab(state)
    {
        this.setState({
            currentTab: state,
        });
    }

    _DisplayContent()
    {
        if (this.state.currentTab === 0) {
            return this.props.content.chartSettings.map(d => {
                return d;
            });
        }
        return this.props.content.designOptions.map(d => {
            return d;
        })
    }
}

export { Editor };