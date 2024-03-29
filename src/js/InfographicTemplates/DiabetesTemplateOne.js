import { AInfographic } from './AInfographic';
import { RibbonHeader, RectangleHeader } from '../Headers/index';
import { LineChart, LineXAxisDecorator, LineYAxisDecorator, LineDataValueDecorator } from '../Charts/LineChart/index';
import { IconBarChart, IconCategoryDecorator, IconDataValueDecorator } from '../Charts/IconBarChart';
import California from '../../Media/States/california.svg';
import Florida from '../../Media/States/florida.svg';
import Texas from '../../Media/States/texas.svg';
import Konva from 'konva';

class DiabetesTemplateOne extends AInfographic
{
    constructor({editorHandler, textHandler, chartHandler, graphicHandler, backgroundHandler})
    {
        super(900, 635, editorHandler, textHandler, chartHandler, graphicHandler, backgroundHandler);
        this._colorScheme = {
            primary: '#455f06',
            secondary: '#ffffff',
        }
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
        var header = this._CreateSwitchableContainer({
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
        var ribbonWidth = 550, ribbonHeight = 35, helper = new Konva.Group();
        ribbonGroup.add(helper);
        var ribbon = new RibbonHeader({
            colorOne: '#94bd31', 
            colorTwo: '#5f9400', 
            group: helper, 
            hWidth: ribbonWidth,
            hHeight: ribbonHeight, 
            iWidth: this._chartWidth,
            iHeight: this._chartHeight
        });
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: ribbon,
            group: helper,
        });

        // Creating Ribbon Text
        var montserrat200 = this._quillMap('Montserrat', 200);
        var ribbonFontFamily = '"Montserrat", sans-serif';
        var ribbonTextDiv = document.createElement('div');
        ribbonTextDiv.style.color = 'white';
        var ribbonText = '<p><span style="font-family: Montserrat, sans-serif; font-size: 20px; ">' +
            'AN EVERYDAY HEALTH INFOGRAM</span></p>';
        ribbonTextDiv.innerHTML = ribbonText;
        this._textHandler.AddTextElem({
            textElem: ribbonTextDiv, 
            group: ribbonGroup, 
            x: (this._chartWidth / 2) - 170 , 
            y: (ribbonHeight / 2) - this._GetTextWidth('M', 20, ribbonFontFamily) / 2 - 2
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: montserrat200,
            fontSize: '20px',
            textColor: ribbonTextDiv.style.color,
            lineHeight: '1.0',
            align: 'center'
        });
    }

    _CreateTitle()
    {
        var group = this._CreateSwitchableContainer({
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
        this._textHandler.AddTextElem({
            textElem: titleTextDiv, 
            group: group, 
            x: this._CenterXAbout(titleWidth, 115),
            y: 30
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '60px',
            textColor: 'black',
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
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
        this._textHandler.AddTextElem({
            textElem: subTitleDiv, 
            group: group, 
            x: this._CenterXAbout(subTitleWidth, (this._chartWidth / 2)),
            y: 185
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: subTitleFontSize + 'px',
            textColor: 'black',
            lineHeight: '1.5',
            align: 'center'
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
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
        var sectionOne = this._CreateSwitchableContainer({
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
        this._textHandler.AddTextElem({
            textElem: sectionTitleDiv, 
            group: sectionOne, 
            x: 45, 
            y: 15, 
            rotateby: 0
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
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
                category: '2007',
                value: 174
            },
            {
                category: '2012',
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
            backgroundColor: '#94bd31',
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
                textColor: '#fff',
            }
        })

        dataValueDecorator.CreateChart();

        this._chartHandler.AddChart({
            chart: chart, 
            group: chartGroup, 
            type: 'Line'
        });
        this._chartHandler.AddDecorator({
            decorator: xAxisDecorator, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: yAxisDecorator, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: dataValueDecorator, 
            id: this._chartHandler.GetCurrChartID()
        });
    }

    _CreateSectionTwo({textColor})
    {
        var sectionTwo = this._CreateSwitchableContainer({
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
        this._textHandler.AddTextElem({
            textElem: sectionTitleDiv, 
            group: sectionTwo, 
            x: 40, 
            y: 190, 
            rotateby: 0
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
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
        var labels = new IconCategoryDecorator({
            chart: barChart, 
            isWithinBars: false, 
            isTop: true, 
            font: font,
        });
        var dataValues = new IconDataValueDecorator({
            chart: labels, 
            isPercentage: false, 
            isCategory: false, 
            isMiddle: false, 
            font: font,
        });

        dataValues.CreateChart();

        this._chartHandler.AddChart({
            chart: barChart, 
            group: barChartGroup, 
            type: 'Icon'
        });
        this._chartHandler.AddDecorator({
            decorator: labels, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: dataValues, 
            id: this._chartHandler.GetCurrChartID()
        });
    }

    _CreateSectionThree({textColor})
    {
        var sectionThree = this._CreateSwitchableContainer({
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
        this._textHandler.AddTextElem({
            textElem: sectionTitleDiv, 
            group: sectionThree, 
            x: 50, 
            y: 175
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: textFontSize + 'px',
            textColor: textColor,
            lineHeight: 1.5,
            align: 'center', 
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
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
        this._textHandler.AddTextElem({
            textElem: oneDiv, 
            group: sectionThree, 
            x: 25, 
            y: 15
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
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
        this._textHandler.AddTextElem({
            textElem: statisticDiv, 
            group: sectionThree, 
            x: 70, 
            y: 140
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize:  18 + 'px',
            textColor: 'white',
            lineHeight: 1.5,
            align: 'center', 
        });

        this._CreateImage({ 
            src: California,
            group: sectionThree,
            width: 100,
            height: 120,
            x: startingX,
            y: 15,  
        });

        var twoDiv = document.createElement('div');
        twoDiv.style.color = 'white';
        var twoText = '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 22px; line-height: 1.5">2.</span></p>'
        twoDiv.innerHTML = twoText;
        this._textHandler.AddTextElem({
            textElem: twoDiv, 
            group: sectionThree, 
            x: startingX + 125, 
            y: 15
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize:  22 + 'px',
            textColor: 'white',
            lineHeight: 1.5,
            align: 'center', 
        });

        this._CreateImage({ 
            src: Florida,
            group: sectionThree,
            width: 140,
            height: 140,
            x: startingX + 150,
            y: 15,  
        });

        var threeDiv = document.createElement('div');
        threeDiv.style.color = 'white';
        var threeText = '<p style="margin: 0px; text-align: center;"><span style="font-family: Open Sans, sans-serif; font-size: 22px; line-height: 1.5">3.</span></p>'
        threeDiv.innerHTML = threeText;
        this._textHandler.AddTextElem({
            textElem: threeDiv, 
            group: sectionThree, 
            x: startingX + 335, 
            y: 15
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize:  22 + 'px',
            textColor: 'white',
            lineHeight: 1.5,
            align: 'center', 
        });

        this._CreateImage({ 
            src: Texas,
            group: sectionThree,
            width: 140,
            height: 140,
            x: startingX + 340,
            y: 15,  
        });
    }

    _CreateBackgroundRect({width, height, group})
    {
        var helperGroup = new Konva.Group();
        var rect = new RectangleHeader({
            cornerRadius: 10, 
            x: 0, 
            y: 0,
            width: width,
            height: height,
            fill: '#94bd31',
            group: helperGroup
        });
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: rect,
            group: helperGroup,
        });
        group.add(helperGroup);
    }
}

export { DiabetesTemplateOne };