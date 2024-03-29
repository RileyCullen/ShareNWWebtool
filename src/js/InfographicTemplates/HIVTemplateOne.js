import { AInfographic } from "./AInfographic";
import Konva from "konva";
import { PercentageBarChart, RemainderDecorator, DataValueDecorator } from '../Charts/BarChart/index';
import { ArrowHeader } from '../Headers/ArrowHeader';
import { WaffleChart, GenerateWafflePreset} from '../Charts/WaffleChart/index';
import CDCLogo from '../../Media/cdclogo.png';

class HIVTemplateOne extends AInfographic
{
    constructor({editorHandler, textHandler, chartHandler, graphicHandler, backgroundHandler})
    {
        super(582, 582, editorHandler, textHandler, chartHandler, graphicHandler, backgroundHandler);
        this._colorScheme = {
            primary: '#F9ab7c',
            secondary: '#ee5d25'
        }
    }

    CreateInfographic()
    {
        var header = this._CreateSwitchableContainer({
            x: 0,
            y: 0,
        }, 'header'),
        sectionOne = this._CreateSwitchableContainer({
            x: 90,
            y: 75,
        }, 'sectionOne'),
        sectionTwo = this._CreateSwitchableContainer({
            x: 90,
            y: 220,
        }, 'sectionTwo'),
        sectionThree = this._CreateSwitchableContainer({
            x: 90,
            y: 365,
        }, 'sectionThree'), 
        footer = this._CreateSwitchableContainer({
            x: 0, 
            y: 500,
        }, 'footer');
        this._main.add(header);
        this._main.add(sectionOne);
        this._main.add(sectionTwo);
        this._main.add(sectionThree);
        this._main.add(footer);

        var museo900 = this._quillMap('museo', 900);
        var canada100 = this._quillMap('canada-type-gibson', 100);
        var canada200 = this._quillMap('canada-type-gibson', 200);
        var canada400 = this._quillMap('canada-type-gibson', 400);
        var canada600 = this._quillMap('canada-type-gibson', 600);
        var canada700 = this._quillMap('canada-type-gibson', 700);

        /* HEADER */
        var titleDiv = document.createElement('div');
        var title = '<p><span style="font-size: 20px; font-family: museo, serif; font-style: 500; color: #3c4c59;">Women and HIV</span></p>';
        titleDiv.innerHTML = title;
        this._textHandler.AddTextElem({
            textElem: titleDiv,
            group: header, 
            x: (this._stage.width() / 2) - (this._GetTextWidth('Women and HIV', 20, "museo, serif") / 2), 
            y: 10, 
            rotateBy: 0
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: museo900,
            fontSize: '20px',
            textColor: '#3c4c59',
            lineHeight: '1.2',
            align: 'center',
        });

        var questionDiv = document.createElement('div');
        var question = '<p><span style="font-size: 36px; font-family: museo, serif; color: #3c4c59;">Did you know?</span></p>';
        questionDiv.innerHTML = question;
        this._textHandler.AddTextElem({
            textElem: questionDiv, 
            group: header, 
            x: (this._stage.width() / 2) - (this._GetTextWidth('Did you know?', 36, 'museo, serif') / 2), 
            y: 27
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: museo900,
            fontSize: '36px',
            textColor: '#3c4c59',
            lineHeight: '1.2',
            align: 'center',
        });
        
        const WOMAN = '\uf182', LIGHT_ORANGE = '#f9ab7d', ORANGE = '#ee5d26',
            DEFAULT_OFFSET = 30;
        let orangeBackgroundContainer = new Konva.Group();
        sectionOne.add(orangeBackgroundContainer);
        var orangeBackground = new ArrowHeader(0, 0, 400, 125, 
            orangeBackgroundContainer, ORANGE, 'white');
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: orangeBackground,
            group: orangeBackgroundContainer,
        });
        
        var textGroupOne = new Konva.Group({
            offsetX: -5,
            offsetY: 0,
        });
        sectionOne.add(textGroupOne);
       
        var textOneDiv = document.createElement('div');
        textOneDiv.style.color = '#f58928';
        var textOne = '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-size: 30px; font-weight: 700; line-height: 1.2;">ONE IN FOUR</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-size: 17px; font-weight: 400; line-height: 1.2;">PEOPLE LIVING WITH HIV</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-size: 30px; font-weight: 700; line-height: 1.2;">IS A WOMAN</span></p>';
        textOneDiv.innerHTML = textOne
        this._textHandler.AddTextElem({
            textElem: textOneDiv, 
            group: textGroupOne, 
            x: 152.5, 
            y: 17.5
        });
       
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: canada700,
            fontSize: '30px',
            textColor: '#f58928',
            lineHeight: '1.2',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: canada400,
            fontSize: '17px',
            textColor: '#f58928',
            lineHeight: '1.2',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: canada700,
            fontSize: '30px',
            textColor: '#f58928',
            lineHeight: '1.2',
        });

        var waffleOneGroup = new Konva.Group({
            name: 'WaffleChart',
            id: 0,
            offsetY: -30,
            offsetX: -23,
            width: 110,
            height: 100,
        });
        
        sectionOne.add(waffleOneGroup);
        
        var ICON_FONT = '"Font Awesome 5 Free"';
        console.log("Default offset: " + DEFAULT_OFFSET);
        var manPreset = GenerateWafflePreset(WOMAN, LIGHT_ORANGE, DEFAULT_OFFSET, ICON_FONT),
            orangeWomanPreset = GenerateWafflePreset(WOMAN, ORANGE, DEFAULT_OFFSET - 1, ICON_FONT);

        var waffleOne = new WaffleChart({
            numerator: 3, 
            denominator: 4, 
            group: waffleOneGroup, 
            presetA: manPreset, 
            presetB: orangeWomanPreset, 
            fontSize: 33
        });
        this._chartHandler.AddChart({
            chart: waffleOne, 
            group: waffleOneGroup, 
            type:'Waffle'
        });
        this._chartHandler.GetChart(this._chartHandler.GetCurrChartID()).CreateChart();
        
        let redBackgroundGroup = new Konva.Group();
        sectionTwo.add(redBackgroundGroup);
        var redBackground = new ArrowHeader(0, 0, 400, 125, redBackgroundGroup, 
            '#e71b32', 'white');
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: redBackground,
            group: redBackgroundGroup,
        });

        var textGroupTwo = new Konva.Group();
        sectionTwo.add(textGroupTwo);
        
        var textTwoDiv = document.createElement('div');
        textTwoDiv.style.color = '#e71b32';
        var textTwo = '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-weight: 600; font-size: 23px; line-height: 1.2">NOT ALL WOMEN</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-weight: 200; font-size: 32px; line-height: 1.2">ARE EQUALLY</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-weight: 600; font-size: 23px; line-height: 1.2">AFFECTED BY HIV</span></p>';
        textTwoDiv.innerHTML = textTwo; 
        this._textHandler.AddTextElem({
            textElem: textTwoDiv, 
            group: textGroupTwo, 
            x: 160, 
            y: 17.5
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: canada600,
            fontSize: '23px',
            textColor: textTwoDiv.style.color,
            lineHeight: '1.2',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: canada200,
            fontSize: '32px',
            textColor: textTwoDiv.style.color,
            lineHeight: '1.2',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: canada600,
            fontSize: '23px',
            textColor: textTwoDiv.style.color,
            lineHeight: '1.2',
        });
        
        var barChartGroup = new Konva.Group({
            offsetX: -147,
            offsetY: -17.5,
        });

        var barChartLabelDiv = document.createElement('div');
        barChartLabelDiv.style.color = '#e71b32';
        var labelText = '<p><span style="font-family: canada-type-gibson, sans-serif; font-size: 12px">'
            + 'New Infections</span></p>';
        barChartLabelDiv.innerHTML = labelText;
        this._textHandler.AddTextElem({
            textElem: barChartLabelDiv, 
            group: sectionTwo, 
            x: 30, 
            y: 24, 
            rotateby: 90
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: canada400,
            fontSize: '12px',
            textColor: barChartLabelDiv.style.color,
            lineHeight: '1.2',
        });

        sectionTwo.add(barChartGroup);
       
        var barChartData = [];
        barChartData[0] = {
            'category': 'black',
            'value': 64,
            'color': '#e71b32',
        };
        barChartData[1] = {
            'category': 'white',
            'value': 18,
            'color': '#e71b32',
        };
        barChartData[2] = {
            'category': 'hispanic',
            'value': 15,
            'color': '#e71b32',
        };

        var barChart = new PercentageBarChart({
            data: barChartData, 
            group: barChartGroup, 
            width: 90, 
            height: 115, 
            padding: 0.2, 
            rotateBy: 90}
        );
        var remainder = new RemainderDecorator({
            chart: barChart
        });
        var dataValue = new DataValueDecorator({
            chart: remainder, 
            displayPercentage: true, 
            displayCategory: true, 
            isMiddle: true, 
            font: {
                'fontSize': 12,
                'fontFamily': 'canada-type-gibson, sans-serif',
                'textColor': 'white',
            }
        });

        this._chartHandler.AddChart({
            chart: barChart, 
            group: barChartGroup, 
            type: 'Bar'
        });
        this._chartHandler.AddDecorator({
            decorator: remainder, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: dataValue, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.GetDecorator({
            chartID: this._chartHandler.GetCurrChartID(), 
            decoratorID: this._chartHandler.GetCurrDecSize()
        }).CreateChart();

        const LIGHT_BLUE = '#a0b8d2', BLUE = '#1670ac';
        let blueBackgroundGroup = new Konva.Group();
        sectionThree.add(blueBackgroundGroup);
        var blueBackground = new ArrowHeader(0, 0, 400, 125, blueBackgroundGroup
            , BLUE, 'white');
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: blueBackground,
            group: blueBackgroundGroup,
        });

        var helper = new Konva.Group();
        barChartGroup.add(helper);
        var textGroupThree = new Konva.Group();
        sectionThree.add(textGroupThree);
        
        var textThreeDiv = document.createElement('div');
        textThreeDiv.style.color = '#2f6b8d';
        var textThree = '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-weight: 600; font-size: 17px; line-height: 1.0">ONLY HALF OF WOMEN</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-weight: 400; font-size: 18.5px; line-height: 1.0">DIAGNOSED WITH HIV</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-weight: 100; font-size: 28.5px; line-height: 1.0">ARE RECEIVING</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-weight: 600; font-size: 28.5Px; line-height: 1.0">CARE FOR HIV</span<</p>';
        textThreeDiv.innerHTML = textThree;
        this._textHandler.AddTextElem({
            textElem: textThreeDiv, 
            group: textGroupThree, 
            x: 160, 
            y: 18
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: canada600,
            fontSize: '17px',
            textColor: textThreeDiv.style.color,
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: canada400,
            fontSize: '18.5px',
            textColor: textThreeDiv.style.color,
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: canada100,
            fontSize: '28.5px',
            textColor: textThreeDiv.style.color,
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({ 
            id: this._textHandler.GetCurrID(),
            fontFamily: canada600,
            fontSize: '28.5px',
            textColor: textThreeDiv.style.color,
            lineHeight: '1.0',
        });

        var lightBlueWomanPreset = GenerateWafflePreset(WOMAN, LIGHT_BLUE, DEFAULT_OFFSET, ICON_FONT),
            blueWomanPreset = GenerateWafflePreset(WOMAN, BLUE, DEFAULT_OFFSET, ICON_FONT);
        
        var waffleTwoGroup = new Konva.Group({
            name: 'WaffleChart',
            id: 1,
            offsetX: -20,
            offsetY: -30,
            width: 120,
            height: 120,
        });
        sectionThree.add(waffleTwoGroup);

        var waffleTwo = new WaffleChart({
            numerator: 2, 
            denominator: 4, 
            group: waffleTwoGroup, 
            presetA: lightBlueWomanPreset, 
            presetB: blueWomanPreset, 
            fontSize: 10
        });
        this._chartHandler.AddChart({
            chart: waffleTwo, 
            group: waffleTwoGroup, 
            type: 'Waffle'
        });
        this._chartHandler.GetChart(this._chartHandler.GetCurrChartID()).CreateChart();
        
        /* FOOTER */ 
        var bottomTextDiv = document.createElement('div');
        var bottomText = '<p><span style="font-size: 16px; font-family: museo, serif;">Get the facts. Get tested. Get treatment</span></p>';
        bottomTextDiv.innerHTML = bottomText;
        this._textHandler.AddTextElem({
            textElem: bottomTextDiv, 
            group: footer, 
            x: ((this._stage.width() / 2) - this._GetTextWidth('Get the facts. Get tested. Get treatment.', 16, 'museo, serif') / 2), 
            y: 20
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: museo900,
            fontSize: '16px',
            textColor: 'black',
            lineHeight: '1.0',
            align: 'center'
        });

        var moreInfoTextDiv = document.createElement('div');
        var moreInfoText = '<p><span style="font-size: 14px; font-family: museo, serif;">For more info, go to www.cdc.gov/hiv</span></p>';
        moreInfoTextDiv.innerHTML = moreInfoText;
        this._textHandler.AddTextElem({
            textElem: moreInfoTextDiv, 
            group: footer, 
            x: (this._stage.width() / 2) - this._GetTextWidth('For more info, go to www.cdc.gov/hiv', 14, 'museo, serif') / 2, 
            y: 40
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: museo900,
            fontSize: '14px',
            textColor: 'black',
            lineHeight: '1.0',
            align: 'center'
        });

        this._CreateImage({
            x: 500,
            y: 20,
            width: 75,
            height: 50,
            src: CDCLogo,
            group: footer,
        });
        footer.moveToTop();
        this._FinalizeInfog();
    }

    Draw()
    {
        this._main.draw();
    }
}

export { HIVTemplateOne };