import { AInfographic } from "./AInfographic";
import Konva from "konva";
import { PercentageBarChart, RemainderDecorator, DataValueDecorator } from '../Charts/BarChart/index';
import { ArrowHeader } from '../Headers/ArrowHeader';
import { WaffleChart, GenerateWafflePreset} from '../Charts/WaffleChart/index';
import CDCLogo from '../../Media/cdclogo.png';

class HIVTemplateOne extends AInfographic
{
    constructor({editorHandler, textHandler, chartHandler})
    {
        super(582, 582, editorHandler, textHandler, chartHandler);
    }

    CreateInfographic()
    {
        var header = new Konva.Group({
            x: 0,
            y: 0,
        }),
        sectionOne = new Konva.Group({
            x: 90,
            y: 75,
        }),
        sectionTwo = new Konva.Group({
            x: 90,
            y: 220,
        }),
        sectionThree = new Konva.Group({
            x: 90,
            y: 365,
        }), 
        footer = new Konva.Group({
            x: 0, 
            y: 500,
        });
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
        this._textHandler.AddTextElem(titleDiv, header, 
            (this._stage.width() / 2) 
            - (this._GetTextWidth('Women and HIV', 20, "museo, serif") / 2), 
            10, 0);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: museo900,
            fontSize: '20px',
            textColor: '#3c4c59',
            lineHeight: '1.2',
            align: 'center',
        });

        var questionDiv = document.createElement('div');
        var question = '<p><span style="font-size: 36px; font-family: museo, serif; color: #3c4c59;">Did you know?</span></p>';
        questionDiv.innerHTML = question;
        this._textHandler.AddTextElem(questionDiv, header, (this._stage.width() / 2) - (this._GetTextWidth('Did you know?', 36, 'museo, serif') / 2), 27);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: museo900,
            fontSize: '36px',
            textColor: '#3c4c59',
            lineHeight: '1.2',
            align: 'center',
        });
        
        const MAN = '\uf183', WOMAN = '\uf182', LIGHT_ORANGE = '#f9ab7d', ORANGE = '#ee5d26',
            DEFAULT_OFFSET = 30;
        var orangeBackground = new ArrowHeader(0, 0, 400, 125, sectionOne, ORANGE, 'white');
        orangeBackground.CreateHeader();
        
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
        this._textHandler.AddTextElem(textOneDiv, textGroupOne, 152.5, 17.5);
       
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: canada700,
            fontSize: '30px',
            textColor: '#f58928',
            lineHeight: '1.2',
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: canada400,
            fontSize: '17px',
            textColor: '#f58928',
            lineHeight: '1.2',
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: canada700,
            fontSize: '30px',
            textColor: '#f58928',
            lineHeight: '1.2',
        });

        var waffleOneGroup = new Konva.Group({
            name: 'WaffleChart',
            id: 0,
            offsetY: -27.5,
            offsetX: -25,
            width: 110,
            height: 100,
        });
        
        sectionOne.add(waffleOneGroup);
        
        var ICON_FONT = '"Font Awesome 5 Free"';
        console.log("Default offset: " + DEFAULT_OFFSET);
        var manPreset = GenerateWafflePreset(MAN, LIGHT_ORANGE, DEFAULT_OFFSET, ICON_FONT),
            orangeWomanPreset = GenerateWafflePreset(WOMAN, ORANGE, DEFAULT_OFFSET - 1, ICON_FONT);

        var waffleOne = new WaffleChart(3, 4, waffleOneGroup, manPreset, orangeWomanPreset, 33);
        this._chartHandler.AddChart(waffleOne, waffleOneGroup, 'Waffle');
        this._chartHandler.GetChart(this._chartHandler.GetCurrChartID()).CreateChart();
        
        var redBackground = new ArrowHeader(0, 0, 400, 125, sectionTwo, '#e71b32', 'white');
        redBackground.CreateHeader();

        var textGroupTwo = new Konva.Group();
        sectionTwo.add(textGroupTwo);
        
        var textTwoDiv = document.createElement('div');
        textTwoDiv.style.color = '#e71b32';
        var textTwo = '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-weight: 600; font-size: 23px; line-height: 1.2">NOT ALL WOMEN</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-weight: 200; font-size: 32px; line-height: 1.2">ARE EQUALLY</span></p>' +
            '<p style="margin: 0px;"><span style="font-family: canada-type-gibson, sans-serif; font-weight: 600; font-size: 23px; line-height: 1.2">AFFECTED BY HIV</span></p>';
        textTwoDiv.innerHTML = textTwo; 
        this._textHandler.AddTextElem(textTwoDiv, textGroupTwo, 160, 17.5);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: canada600,
            fontSize: '23px',
            textColor: textTwoDiv.style.color,
            lineHeight: '1.2',
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: canada200,
            fontSize: '32px',
            textColor: textTwoDiv.style.color,
            lineHeight: '1.2',
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
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
        this._textHandler.AddTextElem(barChartLabelDiv, sectionTwo, 30, 24, 90);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
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

        var barChart = new PercentageBarChart(barChartData, barChartGroup, 90, 115, 0.2, 90);
        var remainder = new RemainderDecorator(barChart);
        var dataValue = new DataValueDecorator({
            chart: remainder, 
            isPercentage: true, 
            isCategory: true, 
            isMiddle: true, 
            font: {
                'fontSize': 12,
                'fontFamily': 'canada-type-gibson, sans-serif',
                'fontColor': 'white',
            }
        });

        this._chartHandler.AddChart(barChart, barChartGroup, 'Bar');
        this._chartHandler.AddDecorator(remainder, this._chartHandler.GetCurrChartID());
        this._chartHandler.AddDecorator(dataValue, this._chartHandler.GetCurrChartID());
        this._chartHandler.GetDecorator(this._chartHandler.GetCurrChartID(), this._chartHandler.GetCurrDecSize())
            .CreateChart();

        const LIGHT_BLUE = '#a0b8d2', BLUE = '#1670ac';
        var blueBackground = new ArrowHeader(0, 0, 400, 125, sectionThree, BLUE, 'white');
        blueBackground.CreateHeader();

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
        this._textHandler.AddTextElem(textThreeDiv, textGroupThree, 160, 18);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: canada600,
            fontSize: '17px',
            textColor: textThreeDiv.style.color,
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: canada400,
            fontSize: '18.5px',
            textColor: textThreeDiv.style.color,
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: canada100,
            fontSize: '28.5px',
            textColor: textThreeDiv.style.color,
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
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

        var waffleTwo = new WaffleChart(2, 4, waffleTwoGroup, lightBlueWomanPreset, blueWomanPreset, 10);
        this._chartHandler.AddChart(waffleTwo, waffleTwoGroup, 'Waffle');
        this._chartHandler.GetChart(this._chartHandler.GetCurrChartID()).CreateChart();
        
        /* FOOTER */ 
        var bottomTextDiv = document.createElement('div');
        var bottomText = '<p><span style="font-size: 16px; font-family: museo, serif;">Get the facts. Get tested. Get treatment</span></p>';
        bottomTextDiv.innerHTML = bottomText;
        this._textHandler.AddTextElem(bottomTextDiv, footer, 
            ((this._stage.width() / 2) - 
            this._GetTextWidth('Get the facts. Get tested. Get treatment.', 16, 'museo, serif') / 2), 
            20);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: museo900,
            fontSize: '16px',
            textColor: 'black',
            lineHeight: '1.0',
            align: 'center'
        });

        var moreInfoTextDiv = document.createElement('div');
        var moreInfoText = '<p><span style="font-size: 14px; font-family: museo, serif;">For more info, go to www.cdc.gov/hiv</span></p>';
        moreInfoTextDiv.innerHTML = moreInfoText;
        this._textHandler.AddTextElem(moreInfoTextDiv, footer, 
            (this._stage.width() / 2) - 
            this._GetTextWidth('For more info, go to www.cdc.gov/hiv', 14, 'museo, serif') / 2, 40);
        this._textHandler.SetCSSInfo(this._textHandler.GetCurrID(),{ 
            fontFamily: museo900,
            fontSize: '14px',
            textColor: 'black',
            lineHeight: '1.0',
            align: 'center'
        });

        var logoHelper = new Image();
        logoHelper.onload = () => {
            var logo = new Konva.Image({
                offsetX: -500,
                offsetY: -20,
                image: logoHelper,
                height: 50,
                width: 75,
            });
            footer.add(logo);
            this._main.batchDraw();
        };
        logoHelper.src = CDCLogo;
        footer.moveToTop();
        this._FinalizeInfog();
    }

    Draw()
    {
        this._main.draw();
    }
}

export { HIVTemplateOne };