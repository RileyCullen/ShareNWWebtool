import { CategoryLabelDecorator, ChartDescriptorDecorator, DataValueDecorator, RemainderDecorator, XAxisDecorator, YAxisDecorator } from "./BarChart";

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
                    maxPerRow: dSettings.chartDescriptor.labelSettings.maxPerRows,
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

export { BuildBarChartDecoratorList };