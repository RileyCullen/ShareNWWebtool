import React from 'react';
import '../../css/React/Home.css'
import { Toolbar } from './Toolbar/Toolbar';
import { Content } from './Content/Content';
import { InfographicEditor } from '../InfographicEditor/InfographicEditor';

import { HelpContainer } from '../Help/HelpContainer';

import HIVInfog from '../../Media/InfographicThumbnails/HIVInfog.png';
import ObesityInfog from '../../Media/InfographicThumbnails/ObesityInfog.png';
import LGBTInfog from '../../Media/InfographicThumbnails/LGBTInfog.png';
import DiabetesInfog from '../../Media/InfographicThumbnails/DiabetesInfog.png';
import ADHDInfog from '../../Media/InfographicThumbnails/ADHDTemplate.png';

class Home extends React.Component 
{
    constructor(props)
    {
        super(props);
        this._infogContent = [
            /**
             * name:       The name of the infographic that will be displayed to 
             *             the user (note, this can be changed with no impact on 
             *             the program).
             * editorCode: A name assigned to the infographic that is passed to
             *             the infographic editor. NOTE this attribute determines
             *             which infographic is rendered and should not be updated.
             *             If it is, make sure you update the _DrawInfographic
             *             method in CanvasContainer to reflect the changes.
             * url:        File path to the an image of the infographic.
             */
            {
                name: 'HIV Infographic',
                editorCode: 'HIVTemplateOne',
                url: HIVInfog,
            },
            {
                name: 'Obesity Infographic',
                editorCode: 'ObesityTemplateOne',
                url: ObesityInfog,
            },
            {
                name: 'Violence Infographic',
                editorCode: 'ViolenceTemplateOne',
                url: LGBTInfog,
            },
            {
                name: 'Diabetes Infographic',
                editorCode: 'DiabetesTemplateOne',
                url: DiabetesInfog,
            },
            {
                name: 'ADHD Infographic',
                editorCode: 'ADHDTemplateOne',
                url: ADHDInfog,
            },
        ];
        this.state = {
            currentQuery: this._infogContent,
            displayEditor: false,
            currentInfog: -1,
        }
    }

    render()
    {
        var content = this._GetContent();

        let helpPos = {
            right: "0px",
            top: "17px",
        }

        if (this.state.displayEditor) {
            helpPos = {
                right: "0px",
                top: "5px"
            }
        }

        return (
            <div className='home'>
                <HelpContainer pos={helpPos}/>
                {content}
            </div>
        );
    }

    _GetContent()
    {
        let currentQuery = this.state.currentQuery,
            index = this.state.currentInfog;

        if (!this.state.displayEditor) {
            return (
                <div className='infographic-selector'>
                    <Content 
                        currentQuery={currentQuery} 
                        displayEditor={(infog) => { this._DisplayEditor(infog); }}/>
                    <Toolbar />
                </div>
            );
        }

        let editorCode = currentQuery[index].editorCode;

        return (
            <InfographicEditor 
                currentInfographic={editorCode}
                displayHome={() => { this._DisplayHome(); }}/>
        );
    }

    _DisplayEditor(infog)
    {
        this.setState({
            displayEditor: true,
            currentInfog: infog,
        });
        document.getElementById('body').classList.add('no-scroll');
    }

    _DisplayHome()
    {
        this.setState({
            displayEditor: false,
            currentInfog: -1,
        });
        document.getElementById('body').classList.remove('no-scroll');
    }
}

export { Home };