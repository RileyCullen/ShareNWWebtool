// Cullen, Riley
// index.js
// June 28, 2021

import React from 'react';
import Konva from 'konva';
import ReactDOM from 'react-dom';
import { Home } from './components/Home/Home';

import './css/React/NavigationBar.css';

/**
 * The "head" react class for our application. 
 */
class App extends React.Component
{
    render()
    {
        return (
            <Home />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
Konva.showWarnings = false;