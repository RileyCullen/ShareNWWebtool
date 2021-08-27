import { CategoryLabelDecorator, ChartDescriptorDecorator, DataValueDecorator, RemainderDecorator, XAxisDecorator, YAxisDecorator } from "./BarChart";
import { IconCategoryDecorator } from "./IconBarChart/Decorators/IconCategoryDecorator";
import { IconDataValueDecorator } from "./IconBarChart/Decorators/IconDataValueDecorator";
import { LineDataValueDecorator } from "./LineChart/Decorators/LineDataValueDecorator";
import { LineXAxisDecorator } from "./LineChart/Decorators/LineXAxisDecorator";
import { LineYAxisDecorator } from "./LineChart/Decorators/LineYAxisDecorator";
import { ChartOutlineDecorator, FirstStatisticDecorator } from "./PieChart";
import { StatisticDecorator } from "./WaffleChart/Decorators/StatisticDecorator";

function BuildBarChartDecoratorList(chart, dSettings)
{
    let decoratorList = [], size = 0, prevChart = chart;
    Object.keys(dSettings).forEach(key => {
        switch(key) {
            case 'remainder':
                decoratorList[size] = new RemainderDecorator({
                    chart: prevChart,
                    barColor: dSettings.remainder.color.barColor,
                });
                break;
            case 'categoryLabel':
                decoratorList[size] = new CategoryLabelDecorator({
                    chart: prevChart,
                    isWithinBars: dSettings.categoryLabel.location.isWithinBars,
                    isTop: dSettings.categoryLabel.location.isTop,
                    font: dSettings.categoryLabel.font,
                });
                break;
            case 'chartDescriptor':
                decoratorList[size] = new ChartDescriptorDecorator({
                    chart: prevChart,
                    isTop: dSettings.chartDescriptor.location.isTop,
                    maxPerRow: dSettings.chartDescriptor.labelSettings.maxPerRow,
                    font: dSettings.chartDescriptor.font,
                });
                break;
            case 'dataValue':
                decoratorList[size] = new DataValueDecorator({
                    chart: prevChart,
                    displayPercentage: dSettings.dataValue.display.isPercentage,
                    displayCategory: dSettings.dataValue.display.isCategory,
                    isMiddle: dSettings.dataValue.location.isMiddle,
                    font: dSettings.dataValue.font
                });
                break;
            case 'xAxis':
                decoratorList[size] = new XAxisDecorator({
                    chart: prevChart,
                    lineColor: dSettings.xAxis.color.lineColor,
                    lineStrokeWidth: dSettings.xAxis.size.lineStrokeWidth,
                    tickStrokeWidth: dSettings.xAxis.size.tickStrokeWidth,
                    font: dSettings.xAxis.font
                });
                break;
            case 'yAxis':
                decoratorList[size] = new YAxisDecorator({
                    chart: prevChart,
                    lineColor: dSettings.yAxis.color.lineColor,
                    lineStrokeWidth: dSettings.yAxis.size.lineStrokeWidth,
                    tickStrokeWidth: dSettings.yAxis.size.tickStrokeWidth,
                    font: dSettings.yAxis.font
                });
                break;
            default:
                break;
        }
        prevChart = decoratorList[size];
        size++;
    });
    return decoratorList;
}

function BuildWaffleChartDecoratorList(chart, dSettings)
{
    let decoratorList = [], size = 0, prevChart = chart;
    Object.keys(dSettings).forEach(key => {
        switch(key) {
            case 'statistic':
                decoratorList[size] = new StatisticDecorator({
                    chart: prevChart,
                    middleText: dSettings.statistic.display.middleText,
                    font: dSettings.statistic.font,
                });
                break;
            default:
                break;
        }
        prevChart = decoratorList[size];
        size++;
    });
    return decoratorList;
}

function BuildPieChartDecoratorList(chart, dSettings)
{
    let decoratorList = [], size = 0, prevChart = chart;
    Object.keys(dSettings).forEach(key => {
        switch(key) {
            case 'chartOutline':
                decoratorList[size] = new ChartOutlineDecorator({
                    chart: prevChart,
                    radius: dSettings.chartOutline.size.radius,
                    outlineWidth: dSettings.chartOutline.size.outlineWidth,
                    outlineColor: dSettings.chartOutline.color.outlineColor,
                });
                break;
            case 'statistic':
                decoratorList[size] = new FirstStatisticDecorator({
                    chart: prevChart,
                    font: dSettings.statistic.font,
                });
                break;
            default:
                break;
        }
        prevChart = decoratorList[size];
        size++;
    });
    return decoratorList;
}

function BuildLineChartDecoratorList(chart, dSettings)
{
    let decoratorList = [], size = 0, prevChart = chart;
    Object.keys(dSettings).forEach(key => {
        switch(key) {
            case 'yAxis':
                decoratorList[size] = new LineYAxisDecorator({
                    chart: prevChart,
                    axisLabel: dSettings.yAxis.axis.label,
                    lineColor: dSettings.yAxis.axis.color,
                    lineStrokeWidth: dSettings.yAxis.axis.lineStrokeWidth,
                    tickStrokeWidth: dSettings.yAxis.axis.tickStrokeWidth,
                    tickCount: dSettings.yAxis.axis.tickCount,
                    includeZero: dSettings.yAxis.axis.includeZero,
                    font: dSettings.yAxis.font,
                });
                break;
            case 'xAxis':
                decoratorList[size] = new LineXAxisDecorator({
                    chart: prevChart,
                    axisLabel: dSettings.xAxis.axis.label,
                    lineColor: dSettings.xAxis.axis.color,
                    lineStrokeWidth: dSettings.xAxis.axis.axisStrokeWidth,
                    tickStrokeWidth: dSettings.xAxis.axis.axisTickWidth,
                    font: dSettings.xAxis.font
                });
                break;
            case 'dataValue':
                decoratorList[size] = new LineDataValueDecorator({
                    chart: prevChart,
                    location: dSettings.dataValue.location.location,
                    font: dSettings.dataValue.font
                });
                break;
            default:
                break;
        }
        prevChart = decoratorList[size];
        size++;
    });
    return decoratorList;
}

function BuildIconBarChartDecoratorList(chart, dSettings)
{
    let decoratorList = [], size = 0, prevChart = chart;
    Object.keys(dSettings).forEach(key => {
        switch(key) {
            case 'category':
                decoratorList[size] = new IconCategoryDecorator({
                    chart: prevChart,
                    isWithinBars: dSettings.category.location.isWithinBars,
                    isTop: dSettings.category.location.isTop,
                    font: dSettings.category.font,
                });
                break;
            case 'dataValue':
                decoratorList[size] = new IconDataValueDecorator({
                    chart: prevChart,
                    isPercentage: dSettings.dataValue.display.percentage,
                    isCategory: dSettings.dataValue.display.category,
                    isMiddle: dSettings.dataValue.display.isMiddle,
                    backgroundStroke: dSettings.dataValue.backgroundColor.stroke,
                    backgroundFill: dSettings.dataValue.backgroundColor.fill,
                    font: dSettings.dataValue.font,
                });
                break;
            default:
                break;
        }
        prevChart = decoratorList[size];
        size++;
    });
    return decoratorList;
}

export { BuildBarChartDecoratorList, BuildIconBarChartDecoratorList, 
    BuildLineChartDecoratorList, BuildWaffleChartDecoratorList, BuildPieChartDecoratorList };