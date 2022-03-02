import { faPlusSquare, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import '../../../../css/React/Editors/StackedBarInputFields.css';

import { ColorPicker, TextField, NumericTextField } from './index';
import { CategoryGenerator } from '../../../Helpers/CategoryGenerator';
import Lodash from 'lodash';

class StackedBarInputFields extends React.Component
{
    constructor(props)
    {
        super(props);
        this._generateCategory = CategoryGenerator();
    }

    render()
    {
        let data = this._ReformatData(), 
            categories = Array.from(new Set(this.props.chartData.map(d => d.category))),
            cols = 10;
        return (
            <div style={{
                overflow: 'auto'
            }}>
                <div className='stacked-bar-grid-four'>
                    <p style={{
                        position: 'relative',
                        width: 'max-content',
                        left: '3px'
                    }}>Color</p>
                    <p style={{
                        position: 'relative',
                        left: (categories.length > 2) ? '35px' : '19px',
                        width: 'max-content',
                    }}>Subcategory</p>
                    <div className='stacked-bar-grid-auto' style={{
                        width: 'max-content',
                        position: 'relative',
                        left: (categories.length > 2) ? '62px' : '28px',
                    }}>
                        {
                            categories.map((d, i)=> {
                                return (
                                    <div style={{position: 'relative', top: '-10px',}}>
                                        <FontAwesomeIcon id='remove-column-icon' className='remove-row-icon' icon={faTimes} 
                                            onClick={() => {  
                                                this._RemoveCategory(d);
                                            }}/>
                                        <TextField 
                                            key={this.props.chartData.length + '-category'}
                                            id={d + '-category'}
                                            index={i}
                                            initialValue={d}
                                            rows={1}
                                            cols={cols}
                                            onChange={(value, index) => { 
                                                this._SetCategory(categories, value, index);
                                            }}
                                        />
                                    </div>
                                );       
                            })
                        }
                    </div>
                    <FontAwesomeIcon style={{
                        fontSize: '20px',
                        position: 'relative',
                        left: (categories.length > 2) ? '66px' : '14px',
                        top: '18px'
                    }}icon={faPlusSquare} 
                    onClick={() => { this._AddCategory(); }}/>
                </div>
                {
                    data.map((d, i) => {
                        return (
                        <div>
                            <div className='stacked-bar-grid-four extra-margin'>
                                <ColorPicker
                                    key={d.subcategory + '-' + i + '-color'}
                                    id={d.data[0].color + '-stacked-bar-color-picker'}
                                    color={d.data[0].color}
                                    onChange={(color) => { 
                                        this._SetColor(data, color, i);
                                    }}
                                />
                                <TextField 
                                    key={i}
                                    id={d.subcategory + '-subcategory'}
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
                                            categories.forEach((e, j) => {
                                                if (e === d.category) {
                                                    content = <NumericTextField 
                                                    key={d.subcategory + '-' + j + '-category'}
                                                    id={d.value + '-category'}
                                                    index={d.originalIndex}
                                                    initialValue={d.value}
                                                    rows={1}
                                                    cols={cols}
                                                    onlyPositive={true}
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
                                <FontAwesomeIcon className='remove-row-icon' icon={faTimesCircle} 
                                    onClick={() => { this._RemoveSubcategory(d.subcategory); }}/>
                            </div>
                        </div>
                    )})
                }
                <div className='add-row-container'>
                    <button onClick={() => { this._AddSubcategory(); }}>Add a Row</button>
                </div>
            </div>
        )
    }

    _RemoveCategory(category)   
    {
        let data = Lodash.cloneDeep(this.props.chartData);
        Lodash.remove(data, n => {
            return (n.category === category);
        });
        this.props.setChartData(data);
    }

    _AddCategory()
    {
        let data = Lodash.cloneDeep(this.props.chartData),
            subcategories = Array.from(new Set(this.props.chartData.map(d => d.subcategory))),
            categoryLabel = this._generateCategory(),
            colors = {};
        
        subcategories.forEach(d => {
            data.forEach(e => {
                if (e.subcategory === d) {
                    colors[d] = e.color;
                }
            });
        });

        subcategories.forEach(d => {
            data.push({
                category: categoryLabel,
                subcategory: d,
                value: 10,
                color: colors[d],
            });
        });
        this.props.setChartData(data);
    }

    _RemoveSubcategory(subcategory)
    {
        let data = Lodash.cloneDeep(this.props.chartData);
        Lodash.remove(data, (n) => {
                return (n.subcategory === subcategory);
        });
        this.props.setChartData(data);
    }

    _AddSubcategory()
    {
        let data = Lodash.cloneDeep(this.props.chartData),
            categories = Array.from(new Set(this.props.chartData.map(d => d.category))),
            categoryLabel = this._generateCategory();
        categories.forEach(d => {
            data.push({
                category: d,
                subcategory: categoryLabel,
                value: 10,
                color: '#000000',
            })
        });
        this.props.setChartData(data);
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