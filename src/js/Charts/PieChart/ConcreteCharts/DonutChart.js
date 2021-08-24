import { APieChart } from '../APieChart';
import { PieChart, DonutDecorator } from '../index';

class DonutChart extends APieChart
{
    constructor({data, group, radius = 100, innerRadius = 25, innerColor='#fff'})
    {
        super(data, group, radius);
        this._innerRadius = innerRadius;
        this._innerColor = innerColor;
    }

    CreateChart()
    {
        let chart = new PieChart({
            data: this._data, 
            group: this._group, 
            radius: this._radius
        }),
        decorator = new DonutDecorator({
            chart: chart,
            innerRadius: this._innerRadius,
            color: this._innerColor
        });
        decorator.CreateChart();
    }

    UpdateChartSettings(settings)
    {
        super.UpdateChartSettings(settings);
        this._innerRadius = settings.size.innerRadius;
    }

    GetChartSettings()
    {
        return {
            size: { chartRadius: this._radius, innerRadius: this._innerRadius},
            color: { innerColor: this._innerColor }
        }
    }
}

export { DonutChart };