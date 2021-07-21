// Cullen, Riley
// ObesityTemplateOne.js
// October 26, 2020

import { AInfographic } from "./AInfographic";
import Konva from 'konva';
import { RectangleHeader, RibbonHeader } from '../Headers/index';
import { GenerateWafflePreset, WaffleChart, StatisticDecorator } from '../Charts/WaffleChart/index';
import { PieChart, DonutDecorator, ChartOutlineDecorator,FirstStatisticDecorator } from '../Charts/PieChart/index';

class ObesityTemplateOne extends AInfographic
{
    constructor({editorHandler, textHandler, chartHandler})
    {
        super(1181, 564, editorHandler, textHandler, chartHandler);
    }

    CreateInfographic()
    {
        // HEADER
        var header = new Konva.Group({
            x: 0,
            y: 0,
        });
        this._main.add(header);

        var ribbonGroup = new Konva.Group({
            y: 10,
        });
        header.add(ribbonGroup);

        var ribbonHeight = 35, ribbonWidth = 500, helperGroup = new Konva.Group();
        ribbonGroup.add(helperGroup);
        var ribbon = new RibbonHeader({
            colorOne: '#94bd31', 
            colorTwo: '#5f9400', 
            group: helperGroup, 
            hWidth: ribbonWidth,
            hHeight: ribbonHeight, 
            iWidth: this._chartWidth,
            iHeight: this._chartHeight
        });
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: ribbon,
            group: helperGroup
        });

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
            y: (ribbonHeight / 2) - this._GetTextWidth('M', 20, ribbonFontFamily) / 2
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: montserrat200,
            fontSize: '20px',
            textColor: ribbonTextDiv.style.color,
            lineHeight: '1.0',
            align: 'center'
        });

        // Creating title text
        var titleFont = '"Roboto", sans-serif', titleFontSize = 75;
        var roboto400 = this._quillMap('Roboto', 400);
        var titleWidth = this._GetTextWidth('CHILDHOOD', titleFontSize, titleFont)
        var titleTextDiv = document.createElement('div');
        titleTextDiv.style.color = 'black';
        var titleText = '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 75px; line-height: 1.0;">CHILDHOOD</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 75px; line-height: 1.0;">OBESITY BY</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 60px; line-height: 1.0;">THE NUMBERS</span></p>';
        titleTextDiv.innerHTML = titleText;
        this._textHandler.AddTextElem({
            textElem: titleTextDiv, 
            group: header, 
            x: this._CenterXAbout(titleWidth, (this._chartWidth / 2) + 5),
            y: 60
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '75px',
            textColor: 'black',
            lineHeight: '1.0',
            align: 'center'
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '75px',
            textColor: 'black',
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '60px',
            textColor: 'black',
            lineHeight: '1.0',
        });

        var openSans = this._quillMap('Open Sans');
        var descTextHelper = 'Many U.S. kids are overweight or obese, and most don\'t exercise',
            descFontSize = 15,
            descFontFamily = '"Open Sans", sans-serif',
            descWidth = this._GetTextWidth(descTextHelper, descFontSize, descFontFamily);
        var descTextDiv = document.createElement('div');
        var descText = '<p><span style="font-family: Open Sans, sans-serif; font-size: 15px">' + 
            'Many U.S. kids are overweight or obese and most don\'t exercise</span></p>';
        descTextDiv.innerHTML = descText;
        this._textHandler.AddTextElem({
            textElem: descTextDiv, 
            group: header, 
            x: this._CenterXAbout(descWidth, (this._chartWidth / 2)),
            y: 275
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: openSans,
            fontSize: '15px',
            textColor: 'black',
            lineHeight: '1.0',
            align: 'center'
        });

        // CONTENT
        var content = new Konva.Group({
            x: 0,
            y: 320,
        });
        this._main.add(content);

        var rectWidth = 450, rectHeight = 190, rectCornerRadius = 10, rectOffset = 15,
            rectX = this._CenterXAbout(rectWidth, this._chartWidth / 2);

        // Creating section backgrounds
        var sectionArr = [], sectionColorArr = ['#e33c29', '#2e8acb', '#aea59e', '#94bd31'];
        var textGroupArr = [];
        var statisticFontSize = 47.5;

        for (let i = 0; i < 4; i++) {
            sectionArr[i] = (i === 0) ? new Konva.Group() : new Konva.Group({
                y: sectionArr[i - 1].getAttr('y') + rectHeight + rectOffset
            });
            content.add(sectionArr[i]);
            let backgroundGroup = new Konva.Group();
            let rectangle = new RectangleHeader({
                x: rectX,
                y: 0,
                fill: sectionColorArr[i],
                width: rectWidth,
                height: rectHeight,
                cornerRadius: rectCornerRadius,
                group: backgroundGroup,
            });
            this._graphicsHandler.AddGraphic({
                type: 'header',
                graphic: rectangle,
                group: backgroundGroup
            });
            sectionArr[i].add(backgroundGroup);

            textGroupArr[i] = new Konva.Group({
                x: rectX + 225,
                y: 35,
            });
            sectionArr[i].add(textGroupArr[i]);
            sectionArr[i].moveToBottom();
        }

        // Section 1 content
        var CHILD = '\uf1ae', CHILD_OFFSET = 40, ICON_FONT = (true) ? '"Font Awesome 5 Free"' : "FontAwesome";
        var whiteChildPreset = GenerateWafflePreset(CHILD, 'white', CHILD_OFFSET, ICON_FONT),
            redChildPreset = GenerateWafflePreset(CHILD, '#9a2418', CHILD_OFFSET, ICON_FONT);
        var sectionOneWaffleContainer = new Konva.Group({
            x: 75, 
            y: 55,
            width: 180,
            height: 100,
        });
        sectionArr[0].add(sectionOneWaffleContainer);
        sectionOneWaffleContainer.moveToTop();

        var waffleOneNum = 1, waffleOneDenom = 3;
        var waffleOne = new WaffleChart({
            numerator: waffleOneNum, 
            denominator: waffleOneDenom, 
            group: sectionOneWaffleContainer,
            presetA: whiteChildPreset, 
            presetB: redChildPreset, 
            fontSize: 50
        });
        var waffleOneStat = new StatisticDecorator({
            chart: waffleOne, 
            middleText: 'in', 
            group: textGroupArr[0], 
            font: {
                'fontSize': statisticFontSize,
                'fontFamily': titleFont,
                'fontStyle': 400,
                'textColor': 'white',
            }
        });

        this._chartHandler.AddChart({
            chart: waffleOne, 
            group: sectionOneWaffleContainer, 
            type: 'Waffle'
        });
        this._chartHandler.AddDecorator({
            decorator: waffleOneStat, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.GetDecorator({
            chartID: this._chartHandler.GetCurrChartID(), 
            decoratorID: this._chartHandler.GetCurrDecSize()
        })
        .CreateChart();

        var sectionOneTextDiv = document.createElement('div');
        sectionOneTextDiv.style.color = '#9a2418';
        var sectionOneText = '' +
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 18.5px; font-weight: bold; line-height: 1.5;">children and teens age</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 18.5px; font-weight: bold; line-height: 1.5;">2 to 19 are considered</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 18.5px; font-weight: bold; line-height: 1.5;">overweight or obese</span></p>';
        sectionOneTextDiv.innerHTML = sectionOneText;
        this._textHandler.AddTextElem({
            textElem: sectionOneTextDiv, 
            group: textGroupArr[0], 
            x: 0, 
            y: this._GetTextWidth('M', 50, titleFont) + 5
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: '18.5px',
            textColor: sectionOneTextDiv.style.color,
            lineHeight: '1.5',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: '18.5px',
            textColor: sectionOneTextDiv.style.color,
            lineHeight: '1.5',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: '18.5px',
            textColor: sectionOneTextDiv.style.color,
            lineHeight: '1.5',
        });

        // Section 2 Content
        var RUNNER = '\uf70c';
        var whiteRunnerPreset = GenerateWafflePreset(RUNNER, 'white', 0, ICON_FONT),
            blueRunnerPreset = GenerateWafflePreset(RUNNER, '#11578a', 0, ICON_FONT);

        var sectionTwoWaffleContainer = new Konva.Group({
            x: 77,
            y: 60,
            width: 180,
            height: 100,
        });
        sectionArr[1].add(sectionTwoWaffleContainer);

        var waffleTwoNum = 2, waffleTwoDenom = 3;
        var waffleTwo = new WaffleChart({
            numerator: waffleTwoNum, 
            denominator: waffleTwoDenom, 
            group: sectionTwoWaffleContainer,
            presetA: whiteRunnerPreset, 
            presetB: blueRunnerPreset, 
            fontSize: 50
        });
        var waffleTwoStat = new StatisticDecorator({
            chart: waffleTwo, 
            middleText: 'out of', 
            group: textGroupArr[1], 
            font: {
                'fontSize': statisticFontSize,
                'fontFamily': titleFont,
                'fontStyle': 400,
                'textColor': 'white',
            }
        });

        this._chartHandler.AddChart({
            chart: waffleTwo, 
            group: sectionTwoWaffleContainer, 
            type: 'Waffle'
        });
        this._chartHandler.AddDecorator({
            decorator: waffleTwoStat, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.GetDecorator({
            chartID: this._chartHandler.GetCurrChartID(), 
            decoratorID: this._chartHandler.GetCurrDecSize()
        })
        .CreateChart();

        textGroupArr[1].setAttr('y', textGroupArr[1].getAttr('y') + 10);
        
        var sectionTwoTextDiv = document.createElement('div');
        sectionTwoTextDiv.style.color = '#11578a';
        var sectionTwoText = '' +
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 18.5px; font-weight: bold; line-height: 1.5;">don\'t get any daily</span></p>' + 
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 18.5px; font-weight: bold; line-height: 1.5;">physical activity</span></p>';
        sectionTwoTextDiv.innerHTML = sectionTwoText;
        this._textHandler.AddTextElem({
            textElem: sectionTwoTextDiv, 
            group: textGroupArr[1], 
            x: 0, 
            y: this._GetTextWidth('M', 50, titleFont) + 5
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: '18.5px',
            textColor: sectionTwoTextDiv.style.color,
            lineHeight: '1.5',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: '18.5px',
            textColor: sectionTwoTextDiv.style.color,
            lineHeight: '1.5',
        });

        // Section 3 content
        var pieChartData = [];
        pieChartData[0] = {
            'category':  'A',
            'value': 96,
            'color': 'white'
        };
        pieChartData[1] = {
            'category': 'B',
            'value': 4,
            'color': sectionColorArr[2],
        };

        var pieChartGroup = new Konva.Group({
            x: 160,
            y: rectHeight / 2,
        });
        sectionArr[2].add(pieChartGroup);

        textGroupArr[2].setAttr('y', textGroupArr[2].getAttr('y') + 5);

        var pieChart = new PieChart({
            data: pieChartData, 
            group: pieChartGroup, 
            radius: 70
        });
        var donutDecorator = new DonutDecorator({
            chart: pieChart, 
            innerRadius: 40, 
            color: sectionColorArr[2]
        });
        var outerOutline = new ChartOutlineDecorator({
            chart: donutDecorator, 
            radius: pieChart.GetRadius(), 
            outlineWidth: 5, 
            outlineColor: '#7b706a'
        });
        var innerOutline = new ChartOutlineDecorator({
            chart: outerOutline, 
            radius: donutDecorator.GetRadius(), 
            outlineWidth: 3, 
            outlineColor: '#7b706a'
        });
        var majorStatistic = new FirstStatisticDecorator({
            chart: innerOutline, 
            font: {
                'fontSize': statisticFontSize,
                'fontFamily': titleFont, 
                'textColor': 'white',
            }, 
            x: 5, 
            y: 0, 
            group: textGroupArr[2]
        });

        this._chartHandler.AddChart({
            chart: pieChart, 
            group: pieChartGroup, 
            type: 'Pie'
        });
        this._chartHandler.AddDecorator({
            decorator: donutDecorator, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: outerOutline, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: innerOutline, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: majorStatistic, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.GetDecorator({
            chartID: this._chartHandler.GetCurrChartID(), 
            decoratorID: this._chartHandler.GetCurrDecSize()
        })
        .CreateChart();

        var sectionThreeTextDiv = document.createElement('div');
        sectionThreeTextDiv.style.color = '#7b706a';
        var sectionThreeText = '' + 
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 18.5px; font-weight: bold; line-height: 1.5;">of elementary schools</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 18.5px; font-weight: bold; line-height: 1.5;">offer no physical</span></p>' + 
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 18.5px; font-weight: bold; line-height: 1.5;">education classes</span></p>';
        sectionThreeTextDiv.innerHTML = sectionThreeText;
        this._textHandler.AddTextElem({
            textElem: sectionThreeTextDiv, 
            group: textGroupArr[2], 
            x: 0, 
            y: this._GetTextWidth('M', 50, titleFont) + 5
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: '18.5px',
            textColor: sectionThreeTextDiv.style.color,
            lineHeight: '1.5',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: '18.5px',
            textColor: sectionThreeTextDiv.style.color,
            lineHeight: '1.5',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: '18.5px',
            textColor: sectionThreeTextDiv.style.color,
            lineHeight: '1.5',
        });

        // Section 4 content
        var TV = '\uf26c', iconGroup = new Konva.Group();
        var tvHelper = new Konva.Text({
            text: TV,
            fontFamily: ICON_FONT,
            fontStyle: '900',
            x: 95,
            y: 40,
            fill: 'white',
            fontSize: 110,
        });
        this._graphicsHandler.AddGraphic({
            type: 'icon',
            graphic: tvHelper,
            group: iconGroup,
        });
        sectionArr[3].add(iconGroup);

        textGroupArr[3].setAttr('y', textGroupArr[3].getAttr('y') + 10);

        var sectionThreeStatistic = '7 hours';
        textGroupArr[3].add(new Konva.Text({
            text: sectionThreeStatistic,
            fill: 'white',
            fontFamily: titleFont,
            fontSize: statisticFontSize,
        }));

        var sectionFourTextDiv = document.createElement('div');
        sectionFourTextDiv.style.color = '#5f9400';
        var sectionFourText = '' + 
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 16px; font-weight: bold; line-height: 1.5;">is the amount of time kids</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 16px; font-weight: bold; line-height: 1.5;">spend in front of TV or</span></p>' + 
            '<p style="margin: 0px;"><span style="font-family: Open Sans, sans-serif; font-size: 16px; font-weight: bold; line-height: 1.5;">computer screens daily</span></p>';
        sectionFourTextDiv.innerHTML = sectionFourText;
        this._textHandler.AddTextElem({
            textElem: sectionFourTextDiv, 
            group: textGroupArr[3], 
            x: 0, 
            y: this._GetTextWidth('M', 50, titleFont) + 5
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: openSans,
            fontSize: '16px',
            textColor: sectionFourTextDiv.style.color,
            lineHeight: '1.5',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: openSans,
            fontSize: '16px',
            textColor: sectionFourTextDiv.style.color,
            lineHeight: '1.5',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: openSans,
            fontSize: '16px',
            textColor: sectionFourTextDiv.style.color,
            lineHeight: '1.5',
        });

        // Footer
        var footer = new Konva.Group({
            x: 0,
            y: this._chartHeight - 30,
        });
        this._main.add(footer);

        var sourceTextHelper =  'Source: CDC',
            sourceTextWidth = this._GetTextWidth(sourceTextHelper, 10, ribbonFontFamily);
        var sourceTextDiv = document.createElement('div');
        sourceTextDiv.style.color = 'gray';
        var sourceText = '<p><span style="font-family: Montserrat, sans-serif; font-size: 10px;">Source: CDC</span></p>';
        sourceTextDiv.innerHTML = sourceText;
        this._textHandler.AddTextElem({
            textElem: sourceTextDiv, 
            group: footer, 
            x: this._CenterXAbout(sourceTextWidth, this._chartWidth / 2), 
            y: -10
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: montserrat200,
            fontSize: '10px',
            textColor: sourceTextDiv.style.color,
            lineHeight: '1.0',
            align: 'center'
        });

        this._FinalizeInfog();
    }

    Draw()
    {   
        this._main.draw();
    }
}

export { ObesityTemplateOne };