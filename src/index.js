// Cullen, Riley
// index.js
// June 28, 2021

import React from 'react';
import ReactDOM from 'react-dom';
import { InfographicEditor } from './components/InfographicEditor/InfographicEditor';
import { NavigationBar } from './components/NavigationBar/NavigationBar';

import './css/React/NavigationBar.css';

/**
 * The "head" react class for our application. 
 */
class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentInfographic: 'HIVTemplateOne'
        }
    }

    render()
    {
        var currentInfographic = this.state.currentInfographic;
        return (
            <div className='AppContainer'>
                <NavigationBar setInfographic={(infog) => { this._SetCurrentInfographic(infog); }}/>
                <div className='tabcontent'>
                    <InfographicEditor currentInfographic={currentInfographic}/>
                </div>
            </div>
        );
    }

    /**
     * @summary     Sets currentInfographic to a new infographic.
     * @description Calls setState and passes assigns infographic to 
     *              currentInfographic to initiate rendering process.
     * 
     * @param {String} infographic The name of the infographic we want to display.
     */
    _SetCurrentInfographic(infographic)
    {
        this.setState({
            currentInfographic: infographic,
        });
    }
}

ReactDOM.render(<App />, document.getElementById('root'));