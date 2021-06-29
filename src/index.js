// Cullen, Riley
// index.js
// June 28, 2021

import React from 'react';
import ReactDOM from 'react-dom';
import {InfographicEditor} from './Components/InfographicEditor/InfographicEditor';

/**
 * The "head" react class for our application. 
 */
class App extends React.Component
{
    render()
    {
        return (
            <InfographicEditor />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));