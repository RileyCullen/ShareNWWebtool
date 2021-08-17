import { faPlusSquare, faTimesCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import '../../../../css/React/Editors/StackedBarInputFields.css';

import { ColorPicker, TextField } from './index';

class StackedBarInputFields extends React.Component
{
    render()
    {
        console.log(this.props.chartData)
        let data = this._ReformatData(), 
            categories = Array.from(new Set(this.props.chartData.map(d => d.category))),
            cols = 10;
        return (
            <div>
                <div className='stacked-bar-grid-four'>
                    <p>Color</p>
                    <p style={{
                        position: 'relative',
                        left: '15px'
                    }}>Subcategory</p>
                    <div className='stacked-bar-grid-auto' style={{
                        width: 'max-content',
                        position: 'relative',
                        left: '25px'
                    }}>
                        {
                            categories.map((d, i)=> {
                                return (
                                    <TextField 
                                        id={i + '-category'}
                                        index={i}
                                        initialValue={d}
                                        rows={1}
                                        cols={cols}
                                        onchange={(d, i) => { }}
                                    />
                                );       
                            })
                        }
                    </div>
                    <FontAwesomeIcon style={{
                        fontSize: '20px',
                        position: 'relative',
                        left: '10px',
                        top: '2px'
                    }}icon={faPlusSquare} />
                </div>
                {
                    data.map((d, i) => {
                        return (
                        <div>
                            <div className='stacked-bar-grid-four extra-margin'>
                                <ColorPicker 
                                    color={d.data[0].color}
                                    onChange={(color) => { }}
                                />
                                <TextField 
                                    id={i + '-subcategory'}
                                    index={i}
                                    initialValue={d.subcategory}
                                    rows={1}
                                    cols={cols + 5}
                                    onchange={(d, i) => { }}
                                />
                                <div className='stacked-bar-grid-auto'>
                                    {
                                        d.data.map((d, i) => {
                                            let content = false;
                                            categories.map((e, j) => {
                                                if (e === d.category) {
                                                    content = <TextField 
                                                    id={j + '-category'}
                                                    index={j}
                                                    initialValue={d.value}
                                                    rows={1}
                                                    cols={cols}
                                                    onchange={(d, i) => { }}
                                                    />
                                                }
                                            });
                                            return content;
                                        })
                                    }
                                </div>
                                <FontAwesomeIcon className='remove-row-icon' icon={faTimesCircle} />
                            </div>
                        </div>
                    )})
                }
                <div className='add-row-container'>
                    <button>Add a Row</button>
                </div>
            </div>
        )
    }

    _ReformatData()
    {
        let subcategories = new Set(this.props.chartData.map(d => d.subcategory)),
            helper = [];
        
        for (let item of subcategories) {
            helper.splice(helper.length, 0, { subcategory: item, data: []})
        }

        helper.forEach((d) => {
            this.props.chartData.forEach(e => {
                let subcategory = d.subcategory;
                if (subcategory === e.subcategory) {
                    d.data.splice(d.data.length, 0, {
                        category: e.category, 
                        value: e.value,
                        color: e.color,
                    });
                }
            });
        });

        return helper;
    }
}

export { StackedBarInputFields };