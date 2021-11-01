// Cullen, Riley
// ChartHandler.js
// November 5, 2020

import { ABarChart, BasicBarChart, StackedBarChart } from '../Charts/BarChart';
import { BuildBarChartDecoratorList, BuildIconBarChartDecoratorList, 
    BuildLineChartDecoratorList, BuildPieChartDecoratorList, 
    BuildWaffleChartDecoratorList } from '../Charts/DecoratorBuilder';
import { ALineChart } from '../Charts/LineChart/ALineChart';
import { APieChart } from '../Charts/PieChart/APieChart';
import { AWaffleChart } from '../Charts/WaffleChart/AWaffleChart';
import { LineChart } from '../Charts/LineChart/index';
import { DonutChart, PieChart } from '../Charts/PieChart';
import { GenerateIconDataArray, WaffleChart } from '../Charts/WaffleChart';
import { AIconBar } from '../Charts/IconBarChart/AIconBar';
import { IconBarChart } from '../Charts/IconBarChart';

class ChartHandler 
{
    /**
     * @summary     A concrete class that handles the addition of various charts to
     *              an infographic.
     * @description A concrete class that abstracts handling of different charts,
     *              decorators, and groups.
     */
    constructor()
    {
        this._handler = [];
        this._curr = -1;
    }

    /**
     * @summary     Adds a chart to the handler.
     * @description See summary. Also sets up other metadata sections of the handler
     *              like binding the chart to a group as well as assigning it a unique
     *              id and chart type for identification.
     * 
     * @param {Chart}       chart The chart we are adding to the handler.
     * @param {Konva.Group} group The group associated with the chart we added.
     * @param {string}      type  The type of chart we are adding.
     */
    AddChart({chart, group, type})
    {
        this._curr++;
        this._handler[this._curr] = {
            'chart': chart,
            'decorators': [],
            'decoratorSize': -1,
            'group': group,
        };
        group.setAttr('id', this._curr);
        group.setAttr('name', 'Selectable Chart ' + type);
    }

    /**
     * @summary     Adds a decorator to the chart specified by id.
     * @description See summary. 
     * 
     * @param {Chart Decorator} decorator The decorator we want to add.
     * @param {int}             id        The id of the chart we want to add the decorator to.
     */
    AddDecorator({decorator, id})
    {
        this._handler[id].decorators[++this._handler[id].decoratorSize] = decorator;
    }

    /**
     * @summary Returns the index of the most recently added chart.
     */
    GetCurrChartID() { return this._curr; }

    /**
     * @summary Returns the index of the most recent decorator for the current chart.
     */
    GetCurrDecSize() { return this._handler[this._curr].decoratorSize; }

    /**
     * @summary Returns the chart specified at index id.
     * 
     * @param {int} id The index of the chart we want to get.
     */
    GetChart(id) { return this._handler[id].chart; }

    /**
     * @summary Gets the decorator specified at chartID and decoratorID and returns it.
     * 
     * @param {int} chartID     The chart of the decorator we want to return.
     * @param {int} decoratorID The decorator we want to return.
     */
    GetDecorator({chartID, decoratorID}) { return this._handler[chartID].decorators[decoratorID]; }

    /**
     * @summary Returns the group of the current handler entry.
     */
    GetCurrentGroup() { return this.GetGroup(this._curr); }

    /**
     * @summary Returns the group of the element at id.
     * 
     * @param {int} id The index of the handler element we want to access. 
     * 
     * @returns A Konva.Group object. 
     */
    GetGroup(id) { return this._handler[id].group; }

    /**
     * @summary Returns the entire handler element at id to the caller.
     * 
     * @param {int} id The index of the handler element we want to access.
     * 
     * @returns A JSON object consisting of the handler at index id. 
     */
    GetHandlerElem(id) { return this._handler[id]; }

    /**
     * @summary Get the type of chart at index id.
     * @param {int} id 
     * @returns A string denoting the type of chart that resides at index id.
     */
    GetType(id) { return this._handler[id].type; }

    /**
     * @summary Get the decorators assoociated with the chart at id.
     * @param {int} id 
     * @returns An array of chart decorators.
     */
    GetDecorators(id) { return this._handler[id].decorators; }

    GetSettingsArray(id)
    {
        return this._handler[id].chart.GetChartSettings();
    }

    GetDecoratorSettingsArray(id)
    {
        let decoratorSettings = {};
        this._handler[id].decorators.forEach((d) => {
            let obj = d.GetDecoratorSettings();
            Object.keys(obj)
                .forEach(key => decoratorSettings[key] = obj[key])
        });
        return decoratorSettings;
    }

    /**
     * @summary     Removes the handler element at index id.
     * @description Calls chart's Remove function then removes the handler element
     *              from the handler.
     * 
     * @param {int} id The index of the handler element that will be removed.
     */
    RemoveHandlerElem(id) 
    {
        this._handler[id].chart.Remove();
        this._handler.splice(id, 1);
        this._curr--;
        this._UpdateHandlerId(); 
    }

    UpdateChartDecorators(id, dSettings)
    {
        let elem = this._handler[id],
            name = elem.group.getAttr('name');
        
        if (name === 'Selectable Chart Bar' || name === 'Selectable Chart Stacked') {
            elem.decorators = BuildBarChartDecoratorList(elem.chart, dSettings);
        } else if (name === 'Selectable Chart Pie' || name === 'Selectable Chart Donut') {
            elem.decorators = BuildPieChartDecoratorList(elem.chart, dSettings);
        } else if (name === 'Selectable Chart Waffle') {
            elem.decorators = BuildWaffleChartDecoratorList(elem.chart, dSettings);
        } else if (name === 'Selectable Chart Icon') {
            elem.decorators = BuildIconBarChartDecoratorList(elem.chart, dSettings);
        } else if (name === 'Selectable Chart Line') {
            elem.decorators = BuildLineChartDecoratorList(elem.chart, dSettings);
        }
        elem.decoratorSize = elem.decorators.length - 1;
        // elem.decorators[elem.decoratorSize].CreateChart();
    }

    UpdateLayering(id, action)
    {
        let group = this._handler[id].group;
        switch(action) {
            case 'move-to-back':
                group.moveToBottom();
                break;
            case 'move-to-front':
                group.moveToTop();
                break;
            case 'bring-forward':
                group.moveUp();
                break;
            case 'send-backward':
                group.moveDown();
                break;
            default:
                break;
        }
    }

    ReplaceChart(id, type)
    {
        let elem = this._handler[id], attrs = {};
        //elem.group.destroyChildren();
        switch(type) {
            case 'Bar':
                if (elem.chart instanceof ABarChart) {
                    attrs = elem.chart.GetAttrs();
                } else {
                    attrs = this._ConvertChartAttributes(elem.chart, type);
                    attrs['group'] = elem.group;
                }
                elem.chart = new BasicBarChart(attrs);
                break;
            case 'Stacked':
                if (elem.chart instanceof StackedBarChart) {
                    attrs = elem.chart.GetAttrs();
                } else {
                    attrs = this._ConvertChartAttributes(elem.chart, type);
                    attrs['group'] = elem.group;
                }
                elem.chart = new StackedBarChart(attrs);
                break;
            case 'Line':
                if (elem.chart instanceof ALineChart) {
                    attrs = elem.chart.GetAttrs();
                } else {
                    attrs = this._ConvertChartAttributes(elem.chart, type);
                    attrs['group'] = elem.group;
                }
                elem.chart = new LineChart(attrs);
                break;
            case 'Pie':
                if (elem.chart instanceof APieChart) {
                    attrs = elem.chart.GetAttrs();
                } else {
                    attrs = this._ConvertChartAttributes(elem.chart, type);
                    attrs['group'] = elem.group;
                }
                elem.chart = new PieChart(attrs);
                break;
            case 'Donut':
                if (elem.chart instanceof DonutChart) {
                    attrs = elem.chart.GetAttrs();
                } else {
                    attrs = this._ConvertChartAttributes(elem.chart, type);
                    attrs['group'] = elem.group;
                }
                elem.chart = new DonutChart(attrs);
                break;
            case 'Waffle':
                if (elem.chart instanceof AWaffleChart) {
                    attrs = elem.chart.GetAttrs();
                } else {
                    attrs = this._ConvertChartAttributes(elem.chart, type);
                    attrs['group'] = elem.group;
                }
                elem.chart = new WaffleChart(attrs);
                break;
            case 'Icon':
                if (elem.chart instanceof AIconBar) {
                    attrs = elem.chart.GetAttrs();
                } else {
                    attrs = this._ConvertChartAttributes(elem.chart, type);
                    attrs['group'] = elem.group;
                }
                elem.chart = new IconBarChart(attrs);
                break;
            default: 
                return;
        }
        elem.decorators = [];
        elem.decoratorSize = -1;
        elem.group.setAttr('name', 'Selectable Chart ' + type);
        console.log(this._handler)
    }

    /**
     * @summary     Updates the id assigned to the different chart elements in 
     *              the handler.
     */
    _UpdateHandlerId()
    {
        this._handler.forEach((d, i) => {
            d.group.setAttr('id', i);
        });
    }

    _ConvertChartAttributes(currentChart, desiredType)
    {
        let commonAttrs = this._GetCommonAttributes(currentChart),
            data = this._ConvertData(currentChart, desiredType);
        if (desiredType === 'Bar' || desiredType === 'Stacked') {
            return {
                data: data,
                width: commonAttrs.width,
                height: commonAttrs.height,
                padding: (commonAttrs.hasOwnProperty('padding')) ? commonAttrs.padding : 0.4,
            };
        } else if (desiredType === 'Line') {
            return {
                data: data,
                chartWidth: commonAttrs.width,
                chartHeight: commonAttrs.height,
            }
        } else if (desiredType === 'Pie') {
            return {
                data: data,
                radius: (commonAttrs.width < commonAttrs.height) ? commonAttrs.width : commonAttrs.height,
            }
        } else if (desiredType === 'Donut') {
            return {
                data: data,
                radius: (commonAttrs.width < commonAttrs.height) ? commonAttrs.width : commonAttrs.height,
                innerRadius: (commonAttrs.width < commonAttrs.height) ? commonAttrs.width - 10 : commonAttrs.height - 10,
            }
        } else if (desiredType === 'Waffle') {
            return {
                numerator: data.numerator,
                denominator: data.denominator,
                presetA: GenerateIconDataArray({
                    icon: '\uf004',
                    color: '#999999',
                    offset: commonAttrs.height / 4 + 10,
                    font: '"Font Awesome 5 Free"',
                }),
                presetB: GenerateIconDataArray({
                    icon: '\uf004',
                    color: '#000000',
                    offset: commonAttrs.height / 4 + 10,
                    font: '"Font Awesome 5 Free"',
                }),
                fontSize: commonAttrs.height / 4,
                isDynamicResize: false,
            }
        } else if (desiredType === 'Icon') {
            return {
                data: data,
                width: commonAttrs.width,
                height: commonAttrs.height,
                padding: (commonAttrs.hasOwnProperty('padding')) ? commonAttrs.padding : 0.4,
            }
        }
    }

    _GetCommonAttributes(chart)
    {
        let attrs = chart.GetAttrs();
        if (chart instanceof ABarChart) {
            return {
                width: attrs.width,
                height: attrs.height,
                padding: attrs.padding,
                rotateBy: attrs.rotateBy,
            };
        } else if (chart instanceof ALineChart) {
            return {
                width: attrs.chartWidth,
                height: attrs.chartHeight,
            }
        } else if (chart instanceof APieChart) {
            return {
                width: attrs.radius,
                height: attrs.radius,
            }
        } else if (chart instanceof AWaffleChart) {
            return {
                width: 50,
                height: 100,
            }
        }
    }

    _ConvertData(chart, desiredType)
    {
        let data = chart.GetData(),
            colors = ['#000000', '#999999'],
            newData = [],
            nameCounter = 0;

        // Convert chart data into a common format 
        // Note that GetData in AWaffleChart returns a JSON object while all other
        // chart classes return an array. 
        if (data instanceof Array) {
            data.forEach(d => {
                let category = 'category' + nameCounter,
                    subcategory = 'subcat' + nameCounter,
                    value = 10,
                    color = '#999999';

                if (chart instanceof ABarChart) {
                    if (chart instanceof StackedBarChart) {
                        category = d.category;
                        subcategory = d.subcategory;
                        value = d.value;
                        color = d.color;
                    } else {
                        category = d.category;
                        value = d.value;
                        color = d.color;
                    }
                } else if (chart instanceof ALineChart) {
                    category = d.category;
                    value = d.value;
                } 

                newData.push({
                    category: category,
                    subcategory: subcategory,
                    value: value,
                    color: color,
                });
            });
        } else {
            newData[0] = {
                category: 'category1',
                subcategory: 'subcat1',
                value: data.numerator,
                color: '#999999',
            }
            newData[1] = {
                category: 'category2',
                subcategory: 'subcat2',
                value: data.denominator,
                color: '#999999',
            }
        } 

        // Convert from common format to desired data format.
        switch (desiredType) {
            case 'Stacked':
            case 'Bar': 
                return newData;
            case 'Line':
                return newData.map(d => {
                    return {
                        category: d.category,
                        value: d.value,
                    };
                });
            case 'Waffle':
                return {
                    numerator: (data.length >= 1) ? data[0].value : 2,
                    denominator: (data.length >= 2) ? data[1].value : 4,
                };
            case 'Donut':
            case 'Pie':
                return newData.map((d, i) => {
                    return {
                        category: d.category,
                        value: d.value,
                        color: (i === 0) ? d.color : '#999999',
                    }
                });
            case 'Icon':
                return newData.map(d => {
                    return {
                        category: d.category,
                        value: d.value,
                        color: d.color,
                    };
                });
        }
    } 
}

export { ChartHandler }; 