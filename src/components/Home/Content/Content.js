import React from 'react';
import { ContentElement } from './ContentElement';
import '../../../css/React/Content.css';

class Content extends React.Component
{
    render()
    {
        return (
            <div>
                <div className='content'>
                    {
                        this.props.currentQuery.map((d) => {
                            return (
                            <div className='item'>
                                <ContentElement 
                                    elementName={d.name}
                                    image={d.url}/>
                            </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export { Content };