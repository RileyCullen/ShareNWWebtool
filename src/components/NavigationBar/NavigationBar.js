import React from 'react';
import { BarElement } from './BarElement';
import '../../css/React/NavigationBar.css';

class NavigationBar extends React.Component
{
    constructor(props)
    {
        super(props);
        this._infographicList = [
            'HIVTemplateOne', 
            'ObesityTemplateOne',
            'ViolenceTemplateOne',
            'DiabetesTemplateOne'
        ];
        this._infographicLabelList = [
            'HIV Infographic',
            'Obesity Infographic',
            'LGBT Infographic',
            'Diabetes Infographic',
        ]
    }

    render()
    {
        return (
            <div className='tab'>
                {
                    this._infographicLabelList.map((d, i) => {
                        var name = this._infographicList[i];
                        return <BarElement 
                                    displayText={d} 
                                    infogName={name}
                                    setInfographic={(infog) => { this.props.setInfographic(infog)} }
                                />
                    })
                }
            </div>
        );
    }
}

export { NavigationBar };