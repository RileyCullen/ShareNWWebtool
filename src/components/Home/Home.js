import React from 'react';
import { Toolbar } from './Toolbar/Toolbar';
import { Content } from './Content/Content';

import HIVInfog from '../../Media/InfographicThumbnails/HIVInfog.png';
import ObesityInfog from '../../Media/InfographicThumbnails/ObesityInfog.png';
import LGBTInfog from '../../Media/InfographicThumbnails/LGBTInfog.png';
import DiabetesInfog from '../../Media/InfographicThumbnails/DiabetesInfog.png';

class Home extends React.Component 
{
    constructor(props)
    {
        super(props);
        this._infogContent = [
            {
                name: 'HIV Infographic',
                url: HIVInfog,
            },
            {
                name: 'Obesity Infographic',
                url: ObesityInfog,
            },
            {
                name: 'Violence Infographic',
                url: LGBTInfog,
            },
            {
                name: 'Diabetes Infographic',
                url: DiabetesInfog,
            },
        ];
        this.state = {
            currentQuery: this._infogContent,
        }
    }

    render()
    {
        return (
            <div className='home'>
                <Content 
                    currentQuery={this.state.currentQuery}/> 
                <Toolbar />
            </div>
        );
    }
}

export { Home };