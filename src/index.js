// Cullen, Riley
// index.js
// June 28, 2021

import React from 'react';
import Konva from 'konva';
import ReactDOM from 'react-dom';
import { Home } from './components/Home/Home';
import { NotificationContainer, NotificationManager } from './components/Notfications';
import Washington from './Media/States/washingtonstate.png';

import './css/React/NavigationBar.css';

/**
 * The "head" react class for our application. 
 */
class App extends React.Component
{
    render()
    {
        return (
            <>
                <NotificationContainer />
                <Home />
            </>
        );
    }

    componentDidMount()
    {
        // Add Image of Washington state to image library (done here because we
        // only want it to occur once)
        sessionStorage.clear();
        sessionStorage.setItem("Washington_State", Washington)
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
Konva.showWarnings = false;