import { AInfographic } from './AInfographic';
import { RibbonHeader } from '../Headers/index';
import { LineChart, LineXAxisDecorator, LineYAxisDecorator, LineDataValueDecorator } from '../Charts/LineChart/index';
import { IconBarChart, CategoryLabelDecorator, DataValueDecorator } from '../Charts/BarChart';
import California from '../../Media/States/california.svg';
import Florida from '../../Media/States/florida.svg';
import Texas from '../../Media/States/texas.svg';
import Konva from 'konva';

class DiabetesTemplateOne extends AInfographic
{
    constructor({editorHandler, textHandler, dataHandler})
    {
        super(900, 635, editorHandler, textHandler, dataHandler);
    }

    CreateInfographic()
    {
        this._CreateHeader();
        this._CreateTitle();
        this._CreateContent();
        this._FinalizeInfog();
    }

    Draw()  
    {
        this._main.draw();
    }

    _CreateHeader()
    {
        var header = new Konva.Group({
            x: 0,
            y: 0
        });
        var ribbonGroup = new Konva.Group({
            x: 0,
            y: 15
        })

        this._main.add(header);
        header.add(ribbonGroup);

        // Creating Ribbon
        var ribbonWidth = 550, ribbonHeight = 35;
        var ribbon = new RibbonHeader({
            colorOne: '#94bd31', 
            colorTwo: '#5f9400', 
            group: ribbonGroup, 
            hWidth: ribbonWidth,
            hHeight: ribbonHeight, 
            iWidth: this._chartWidth,
            iHeight: this._chartHeight
        });
        ribbon.CreateHeader();

        // Creating Ribbon Text
        var montserrat200 = this._quillMap('Montserrat', 200);
        var ribbonFontFamily = '"Montserrat", sans-serif';
        var ribbonTextDiv = document.createElement('div');
        ribbonTextDiv.style.color = 'white';
        var ribbonText = '<p><span style="font-family: Montserrat, sans-serif; font-size: 20px; ">' +
            'AN EVERYDAY HEALTH INFOGRAM</span></p>';
        ribbonTextDiv.innerHTML = ribbonText;
        this._textHandler.AddTextElem(ribbonTextDiv, ribbonGroup, 
            (this._chartWidth / 2) - 170 , 
            (ribbonHeight / 2) - this._GetTextWidth('M', 20, ribbonFontFamily) / 2 - 2);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: montserrat200,
            fontSize: '20px',
            textColor: ribbonTextDiv.style.color,
            lineHeight: '1.0',
            align: 'center'
        });
    }

    _CreateTitle()
    {
        var group = new Konva.Group({
            x: 0,
            y: 50,
        });
        this._main.add(group);

        // Creating Title text
        var roboto400 = this._quillMap('Roboto', 400);
        var titleWidth = this._GetTextWidth('THE RISING PRICE');
        var titleTextDiv = document.createElement('div');
        titleTextDiv.style.color = 'black';

        var titleText = '' + 
            '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 60px; line-height: 1.0;">THE RISING PRICE</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 82px; line-height: 1.0;">OF DIABETES</span></p>';
        titleTextDiv.innerHTML = titleText;
        this._textHandler.AddTextElem(titleTextDiv, group, this._CenterXAbout(titleWidth, 115),
            30);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: roboto400,
            fontSize: '60px',
            textColor: 'black',
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: roboto400,
            fontSize: '82px',
            textColor: 'black',
            lineHeight: '1.0',
        });

        // Creating Sub title text
        var openSans = this._quillMap('Open Sans');
        var subTitleFontSize = 20;
        var subTitleWidth = this._GetTextWidth('Diabetes costs in the United States climbed',
            subTitleFontSize, '"Open Sans", sans-serif');
        
        var subTitleDiv = document.createElement('div');
        var subTitleText = '' + 
            '<p style="text-align: center; margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 20px; line-height: 1.5;">Diabetes costs in the United States climbed</span></p>' + 
            '<p style="text-align: center; margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 20px; line-height: 1.5;">to $245 billion last year.</span></p>';
        subTitleDiv.innerHTML = subTitleText;
        this._textHandler.AddTextElem(subTitleDiv, group, this._CenterXAbout(subTitleWidth, (this._chartWidth / 2)),
            185);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize: subTitleFontSize + 'px',
            textColor: 'black',
            lineHeight: '1.5',
            align: 'center'
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize: subTitleFontSize + 'px',
            textColor: 'black',
            lineHeight: '1.5',
            align: 'center',
        })

    }

    _CreateContent()
    {
        var textColor = '#455f06';
        this._CreateSectionOne({
            textColor: textColor
        });
        this._CreateSectionTwo({
            textColor: textColor
        });
        this._CreateSectionThree({
            textColor: textColor
        });
    }

    _CreateSectionOne({textColor})
    {
        // Set up 
        var width = 280, height = 290;
        var sectionOne = new Konva.Group({
            x: 30,
            y: 320
        });
        this._main.add(sectionOne);

        // Creating background region
        this._CreateBackgroundRect({
            width: width,
            height: height,
            group: sectionOne,
        });

        // Adding text
        var openSans = this._quillMap('Open Sans');
        var textFontSize = 18;
        var sectionTitleDiv = document.createElement('div');
        sectionTitleDiv.style.color = textColor;
        var text = 
            '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 18px; line-height: 1.5">What the U.S. pays for</span></p>' +
            '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 18px; line-height: 1.5">diagnosed diabetes.</span></p>'
        sectionTitleDiv.innerHTML = text;
        this._textHandler.AddTextElem(sectionTitleDiv, sectionOne, 45, 15, 0);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });

        // Creating Line Chart
        var chartWidth = 120, chartHeight = 150;
        var chartGroup = new Konva.Group({
            x: (width - chartWidth) * (1/2),
            y: height / 2 - 30
        });
        sectionOne.add(chartGroup);
        var data = [
            {
                date: '2007',
                value: 174
            },
            {
                date: '2012',
                value: 245
            }
        ]

        var font = {
            fontSize: 15,
            fontFamily: 'Open Sans, sans-serif',
            textColor: textColor
        }

        var chart = new LineChart({
            data: data,
            group: chartGroup,
            chartWidth: chartWidth,
            chartHeight: chartHeight,
            lineWidth: 4,
            pointRadius: 8,
            lineColor: textColor,
            pointColor: textColor,
            internalOffsetX: 16,
            internalOffsetY: 13,
        });
        var xAxisDecorator = new LineXAxisDecorator({
            chart: chart,
            lineColor: textColor,
            lineStrokeWidth: 6,
            tickStrokeWidth: 0,
            font: font,
        });
        var yAxisDecorator = new LineYAxisDecorator({
            chart: xAxisDecorator,
            axisLabel: '$ in Billions',
            lineColor: textColor,
            lineStrokeWidth: 6,
            tickStrokeWidth: 0,
            font: font,
        });
        var dataValueDecorator = new LineDataValueDecorator({
            chart: yAxisDecorator,
            font: {
                fontSize: 30,
                fontFamily: font.fontFamily,
                fontColor: 'white',
            }
        })

        dataValueDecorator.CreateChart();

        this._chartHandler.AddChart(chart, chartGroup, 'Line')
        this._chartHandler.AddDecorator(xAxisDecorator, this._chartHandler.GetCurrChartID());
        this._chartHandler.AddDecorator(yAxisDecorator, this._chartHandler.GetCurrChartID());
        this._chartHandler.AddDecorator(dataValueDecorator, this._chartHandler.GetCurrChartID());
    }

    _CreateSectionTwo({textColor})
    {
        var sectionTwo = new Konva.Group({
            x: this._chartWidth / 2 + 10,
            y: 320
        });
        this._main.add(sectionTwo);
        this._CreateBackgroundRect({
            width: 280,
            height: 290,
            group: sectionTwo,
        });

        // Adding text
        var openSans = this._quillMap('Open Sans');
        var textFontSize = 18;
        var sectionTitleDiv = document.createElement('div');
        sectionTitleDiv.style.color = textColor;
        var text = 
            '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 18px; line-height: 1.5">Medical costs for people</span></p>' +
            '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 18px; line-height: 1.5">with diabetes are 2.3</span></p>' + 
            '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 18px; line-height: 1.5">times higher</span></p>'
        sectionTitleDiv.innerHTML = text;
        this._textHandler.AddTextElem(sectionTitleDiv, sectionTwo, 40, 190, 0);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });

        // Adding Icon Bar Chart
        var barChartGroup = new Konva.Group({
            x: 30,
            y: -10
        });
        sectionTwo.add(barChartGroup);
        var data = [
            {
                category: 'non-diabetic',
                value: 1,
                color: textColor,
            },
            {
                category: 'diabetic',
                value: 2.3,
                color: textColor,
            }
        ];
        var icon = '\uf48e', iconSize = 115; 
        var barChart = new IconBarChart({
            data: data, 
            group: barChartGroup,
            width: 200,
            height: 300,
            padding: 115,
            icon: icon,
            remainderColor: 'white',
            iconSize: iconSize,
        });

        var font = {
            fontSize: 18,
            fontFamily: "'Open Sans', sans-serif",
            textColor: textColor,
        };
        var labels = new CategoryLabelDecorator({
            chart: barChart, 
            isWithinBars: false, 
            isTop: true, 
            font: font,
            icon: icon,
            iconSize: iconSize,
        });
        var dataValues = new DataValueDecorator({
            chart: labels, 
            isPercentage: false, 
            isCategory: false, 
            isMiddle: false, 
            font: font,
            icon: icon,
            iconSize: iconSize
        });

        dataValues.CreateChart();

        this._chartHandler.AddChart(barChart, barChartGroup, 'Bar');
        this._chartHandler.AddDecorator(labels, this._chartHandler.GetCurrChartID());
        this._chartHandler.AddDecorator(dataValues, this._chartHandler.GetCurrChartID());
    }

    _CreateSectionThree({textColor})
    {
        var sectionThree = new Konva.Group({
            x: 30, 
            y: 635
        });
        this._main.add(sectionThree);
        this._CreateBackgroundRect({
            width: 575,
            height: 245,
            group: sectionThree,
        });

        // Adding text
        var openSans = this._quillMap('Open Sans');
        var textFontSize = 18;
        var sectionTitleDiv = document.createElement('div');
        sectionTitleDiv.style.color = textColor;
        var text = 
            '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 18px; line-height: 1.5">California spent the most on diabetes in 2012.</span></p>' +
            '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 18px; line-height: 1.5">Florida came in second at $18.9 million, followed by Texas.</span></p>';
        sectionTitleDiv.innerHTML = text;
        this._textHandler.AddTextElem(sectionTitleDiv, sectionThree, 50, 175, 0);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });

        // Adding states
        var startingX = 55;

        var oneDiv = document.createElement('div');
        oneDiv.style.color = 'white';
        var oneText = '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 22px; line-height: 1.5">1.</span></p>'
        oneDiv.innerHTML = oneText;
        this._textHandler.AddTextElem(oneDiv, sectionThree, 25, 15, 0);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize:  22 + 'px',
            textColor: 'white',
            lineHeight: 1.5,
            align: 'center', 
        });

        var statisticDiv = document.createElement('div');
        statisticDiv.style.color = 'white';
        var statisticText = '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 18px; line-height: 1.5">$27.6 Billion</span></p>'
        statisticDiv.innerHTML = statisticText;
        this._textHandler.AddTextElem(statisticDiv, sectionThree, 70, 140, 0);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize:  18 + 'px',
            textColor: 'white',
            lineHeight: 1.5,
            align: 'center', 
        });

        this._DrawSVG({
            source: California,
            layer: sectionThree,
            width: 100,
            height: 120,
            x: startingX,
            y: 15,
        });

        var twoDiv = document.createElement('div');
        twoDiv.style.color = 'white';
        var twoText = '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 22px; line-height: 1.5">2.</span></p>'
        twoDiv.innerHTML = twoText;
        this._textHandler.AddTextElem(twoDiv, sectionThree, startingX + 125, 15, 0);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize:  22 + 'px',
            textColor: 'white',
            lineHeight: 1.5,
            align: 'center', 
        });

        this._DrawSVG({
            source: Florida,
            layer: sectionThree,
            width: 140,
            height: 140,
            x: startingX + 150,
            y: 15, 
        })

        var threeDiv = document.createElement('div');
        threeDiv.style.color = 'white';
        var threeText = '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 22px; line-height: 1.5">3.</span></p>'
        threeDiv.innerHTML = threeText;
        this._textHandler.AddTextElem(threeDiv, sectionThree, startingX + 335, 15, 0);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(), {
            fontFamily: openSans,
            fontSize:  22 + 'px',
            textColor: 'white',
            lineHeight: 1.5,
            align: 'center', 
        });


        this._DrawSVG({
            source: Texas,
            layer: sectionThree,
            width: 140,
            height: 140,
            x: startingX + 340,
            y: 15, 
        })
    }

    _CreateBackgroundRect({width, height, group})
    {
        var rect = new Konva.Rect({
            cornerRadius: 10, 
            x: 0, 
            y: 0,
            width: width,
            height: height,
            fill: '#94bd31',
        });
        group.add(rect);
    }
}

export { DiabetesTemplateOne };