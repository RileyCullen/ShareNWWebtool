import { RemoveChartCommand } from '..';
import { BasicBarChart, StackedBarChart } from '../../Charts/BarChart';
import { IconBarChart } from '../../Charts/IconBarChart';
import { LineChart, LineXAxisDecorator, LineYAxisDecorator } from '../../Charts/LineChart';
import { DonutChart, PieChart } from '../../Charts/PieChart';
import { GenerateIconDataArray, WaffleChart } from '../../Charts/WaffleChart';
import { ACommand } from '../ACommand';

class InsertChartCommand extends ACommand
{
    constructor({chartType, group, colorScheme, handler, transformer, main, 
        chartAttrs = null, index = -1})
    {
        super();
        this._chartType = chartType;
        this._group = group;
        this._colorScheme = colorScheme;
        this._handler = handler;
        this._tr = transformer;
        this._main = main;
        this._chartAttrs = chartAttrs;

        this._chart = null;
        this._decoratorList = [];
        this._id = index;

        this._removeCommand = null;
    }

    /**
     * @summary     Inserts a chart into the infographic.
     * @description If the chart does NOT exist, create a new instance of the 
     *              chart and add it to the canvas. If it does exist, then 
     *              use RemoveChartCommand's Unexecute function.
     */
    Execute()
    {
        if (this._chart === null) {
            this._CreateNewChart();
            this._removeCommand = new RemoveChartCommand({
                id: this._id,
                handler: this._handler,
                transformer: this._tr,
                main: this._main,
            });
        } else {
            this._removeCommand.Unexecute();
        }
    }

    /**
     * @summary     Wrapper that calls _removeCommand's Execute method.
     * @description NOTE that this function assumes that _removeCommand is not 
     *              equal to null.
     */
    Unexecute()
    {
        this._removeCommand.Execute();
    }
   
    /**
     * @summary Private helper function that creates a new chart.
     */
    _CreateNewChart()
    {
        // Create a chart based on _chartType
        switch(this._chartType) {
            case 'Bar':
                this._CreateBasicBarChart();
                break;
            case 'Stacked':
                this._CreateStackedBarChart();
                break;
            case 'Icon':
                this._CreateIconBarChart();
                break;
            case 'Waffle':
                this._CreateWaffleChart();
                break;
            case 'Line':
                this._CreateLineChart();
                break;
            case 'Pie':
                this._CreatePieChart();
                break;
            case 'Donut':
                this._CreateDonutChart();
                break;
            default:
                break;
        }

        // If the chart was successfully created, complete the following:
        //      1. Add chart to handler
        //      2. Update this commmand's id 
        //      3. Add decorators to handler 
        //      4. Call chart's CreateChart method
        if (this._chart !== null) {
            if (this._id === -1) {
                this._handler.AddChart({
                    chart: this._chart,
                    group: this._group,
                    type: this._chartType,
                });
                this._id = this._handler.GetCurrChartID();
            } else {
                this._handler.AddChartAtIndex({
                    chart: this._chart,
                    group: this._group,
                    type: this._chartType,
                    index: this._id,
                });
            }
            this._decoratorList.forEach(d => {
                this._handler.AddDecorator({
                    decorator: d,
                    id: this._handler.GetCurrChartID(),
                });
            });
            if (this._decoratorList.length === 0) this._chart.CreateChart();
            else this._decoratorList[this._decoratorList.length - 1].CreateChart()
        }
    }

    // Below are helper functions that create individual charts

    _CreateBasicBarChart()
    {
        let attrs = (this._chartAttrs === null) ? {
            data: [
                {
                    category: 'A',
                    value: 10,
                    color: this._colorScheme.primary,
                },
                {
                    category: 'B',
                    value: 30,
                    color: this._colorScheme.primary
                }
            ],
            group: this._group,
            width: 100,
            height: 100,
            padding: 0.2,
        } : this._chartAttrs;
        this._chart = new BasicBarChart(attrs);
    }

    _CreateStackedBarChart()
    {
        let attrs = (this._chartAttrs === null) ? {
            data: [
                {
                    category: 'A',
                    subcategory: 'one',
                    value: 10,
                    color: this._colorScheme.primary,
                },
                {
                    category: 'A',
                    subcategory: 'two',
                    value: 20,
                    color: this._colorScheme.secondary,
                }
            ],
            group: this._group,
            width: 100,
            height: 100, 
            padding: 0.2,
        } : this._chartAttrs;
        this._chart = new StackedBarChart(attrs);
    }

    _CreateIconBarChart()
    {
        let attrs = (this._chartAttrs === null) ? {
            data: [
                {
                    category: 'A',
                    value: 15,
                    color: this._colorScheme.primary
                },
                {
                    category: 'B',
                    value: 30,
                    color: this._colorScheme.primary,
                }
            ],
            group: this._group,
            width: 100,
            height: 100,
            padding: 50,
            remainderColor: this._colorScheme.secondary
        }: this._chartAttrs;
        this._chart = new IconBarChart(attrs);
    }
    
    _CreateWaffleChart()
    {
        let attrs = (this._chartAttrs === null) ? {
            numerator: 1,
            denominator: 3,
            group: this._group,
            presetA: GenerateIconDataArray({
                icon: '\uf004',
                color: this._colorScheme.primary,
                offset: 85,
                font: '"Font Awesome 5 Free"'
            }),
            presetB: GenerateIconDataArray({
                icon: '\uf004',
                color: this._colorScheme.secondary,
                offset: 85,
                font: '"Font Awesome 5 Free"'
            }),
            fontSize: 80,
            isDynamicResize: false,
        } : this._chartAttrs;
        this._chart = new WaffleChart(attrs);
    }

    _CreateLineChart()
    {
        let tmpFont = {
            fontSize: 14, 
            fontFamily: 'Times New Roman, Times, serif', 
            textColor: 'black'
        };
        let attrs = (this._chartAttrs === null) ? {
            data: [
                {
                    category: 'A',
                    value: 10,
                },
                {
                    category: 'B',
                    value: 20,
                }
            ],
            group: this._group,
            chartWidth: 200,
            chartHeight: 200,
            lineWidth: 5,
            pointRadius: 6,
            lineColor: this._colorScheme.primary,
            pointColor: this._colorScheme.secondary,
        } : this._chartAttrs;
        this._chart = new LineChart(attrs);
        this._decoratorList[0] = new LineXAxisDecorator({
            chart: this._chart,
            lineStrokeWidth: 3,
            tickStrokeWidth: 1,
            font: tmpFont,
        });
        this._decoratorList[1] = new LineYAxisDecorator({
            chart: this._decoratorList[0],
            lineStrokeWidth: 3,
            tickStrokeWidth: 1,
            font: tmpFont,
        });
    }

    _CreatePieChart()
    {
        let attrs = {
            data: [
                {
                    category: 'A',
                    value: 10,
                    color: this._colorScheme.primary,
                },
                {
                    category: 'B',
                    value: 90,
                    color: this._colorScheme.secondary,
                }
            ],
            group: this._group,
            radius: 50,
        };
        this._chart = new PieChart(attrs);
    }

    _CreateDonutChart()
    {
        let attrs = {
            data: [
                {
                    category: 'A',
                    value: 20,
                    color: this._colorScheme.primary,
                },
                {
                    category: 'B',
                    value: 80,
                    color: this._colorScheme.secondary
                }
            ],
            group: this._group,
            radius: 50,
            innerRadius: 35,
        };
        this._chart = new DonutChart(attrs);
    }
}

export { InsertChartCommand };