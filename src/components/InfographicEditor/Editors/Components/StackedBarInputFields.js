import React from 'react';

import { ColorPicker, TextField } from './index';

class StackedBarInputFields extends React.Component
{
    render()
    {
        console.log(this.props.chartData)
        let data = this._ReformatData(), 
            categories = Array.from(new Set(this.props.chartData.map(d => d.category)));
        return (
            <div>
                {
                    data.map((d, i) => {
                        return (
                        <div>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'auto auto auto',
                                    gridColumnGap: '10px'
                                }}
                            >
                                <ColorPicker 
                                    color={d.data[0].color}
                                    onChange={(color) => { }}
                                />
                                <TextField 
                                    id={i + '-subcategory'}
                                    index={i}
                                    initialValue={d.subcategory}
                                    rows={1}
                                    cols={10}
                                    onchange={(d, i) => { }}
                                />
                                <div>
                                    {
                                        d.data.map((d, i) => {
                                            return d.value;
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )})
                }
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