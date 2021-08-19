import { faPlusSquare, faTimesCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import '../../../../css/React/Editors/StackedBarInputFields.css';

import { ColorPicker, TextField } from './index';

class StackedBarInputFields extends React.Component
{
    render()
    {
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
                                        onChange={(value, index) => { 
                                            this._SetCategory(categories, value, index);
                                        }}
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
                                    onChange={(color) => { 
                                        let index = i;
                                        this._SetColor(data, color, i);
                                    }}
                                />
                                <TextField 
                                    id={i + '-subcategory'}
                                    index={i}
                                    initialValue={d.subcategory}
                                    rows={1}
                                    cols={cols + 5}
                                    onChange={(value, index) => { this._SetSubcategory(data, value, index); }}
                                />
                                <div className='stacked-bar-grid-auto'>
                                    {
                                        d.data.map((d, i) => {
                                            let content = false;
                                            categories.map((e, j) => {
                                                if (e === d.category) {
                                                    content = <TextField 
                                                    id={j + '-category'}
                                                    index={d.originalIndex}
                                                    initialValue={d.value}
                                                    rows={1}
                                                    cols={cols}
                                                    onChange={(d, i) => { 
                                                        this._SetChartData(
                                                            d, i, 'value'
                                                        )
                                                    }}
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
            this.props.chartData.forEach((e, i) => {
                let subcategory = d.subcategory;
                if (subcategory === e.subcategory) {
                    d.data.splice(d.data.length, 0, {
                        category: e.category, 
                        value: e.value,
                        color: e.color,
                        originalIndex: i
                    });
                }
            });
        });

        return helper;
    }

    _SetChartData(d, i, type)
    {
        if (d === '') return;
        let data = this._CreateDataCopy();

        if (type === 'value') data[i].value = parseFloat(d);

        this.props.setChartData(data);
    }

    _SetSubcategory(data, d, i)
    {
        let tmp = this._CreateDataCopy();
        data[i].data.forEach((content) => {
            tmp[content.originalIndex].subcategory = d;
        });
        this.props.setChartData(tmp);
    }

    _SetColor(data, d, i) 
    {
        let tmp = this._CreateDataCopy();
        data[i].data.forEach(content => {
            tmp[content.originalIndex].color = d;
        });
        this.props.setChartData(tmp);
    }

    _SetCategory(categories, d, i)
    {
        let tmp = this._CreateDataCopy();
        let final = tmp.map(elem => {
            if (elem.category === categories[i]) {
                return {
                    category: d,
                    subcategory: elem.subcategory,
                    value: elem.value,
                    color: elem.color,
                }
            }
            return elem;
        });
        this.props.setChartData(final);
    }

    _CreateDataCopy()
    {
        return this.props.chartData.map(d => {
            return {
                category: d.category,
                subcategory: d.subcategory,
                value: d.value,
                color: d.color
            }
        });
    }
}

export { StackedBarInputFields };