import React from 'react';
import ReactDOM from 'react-dom';
import {InfographicEditor} from './Components/InfographicEditor/InfographicEditor';

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