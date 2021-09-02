import React from 'react';

import '../../../../css/React/Editors/Insert/Insert.css';
import '../../../../css/React/Editors/Insert/BackgroundElement.css';


class BackgroundElement extends React.Component
{
    render()
    {
        return (
            <div className='editor-insert-container'>
                <div className='editor-bkg-elem-container'>
                    {
                        this._CreateEntries()
                    }
                </div>
            </div>
        );
    }

    _CreateEntries()
    {
        let svgList = [
            // Ribbon Header
            <svg width="333" height="32" viewBox="0 0 333 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="8" width="17.7939" height="24" rx="5" fill="#5F9400"/>
                <rect x="315.207" y="8" width="17.7939" height="24" rx="5" fill="#5F9400"/>
                <rect x="9.32031" width="313.511" height="26" rx="5" fill="#94BD31"/>
            </svg>,

            // Rectange Header
            <svg width="147" height="93" viewBox="0 0 147 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="147" height="93" fill="#5F9400"/>
            </svg>,

            // Tooltip Header
            <svg width="166" height="93" viewBox="0 0 166 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.1942 57.3452L30.528 84.3985L0.273156 76.8724L21.1942 57.3452Z" fill="#5F9400"/>
                <rect x="19" width="147" height="93" fill="#5F9400"/>
            </svg>
        ],
        nameList = ['Ribbon Header', 'Rectangle Header', 'Message Bubble'],
        codeList = ['ribbon-header', 'rectangle-header', 'message-bubble'];

        return svgList.map((d, i) => {
            return (
                <div className='editor-bkg-elem'
                    onClick={() => { this.props.toggleInsert('bkg-elem', codeList[i])}}>
                    <div className='editor-bkg-elem-svg-container'>
                        <div className='editor-bkg-elem-svg'> {d} </div>
                    </div>
                    <div>
                        <div className='editor-bkg-elem-name'>
                            <p>{nameList[i]}</p>
                        </div>
                    </div>
                </div>
            );
        });
    }
}

export { BackgroundElement };