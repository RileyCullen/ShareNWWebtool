import Konva from "konva";
import { AInfographic } from "./AInfographic";
import { ArrowHeader } from '../Headers/ArrowHeader';
import { RectangleHeader } from "../Headers";
import { WaffleChart, GenerateWafflePreset} from '../Charts/WaffleChart/index';

class ADHDTemplateOne extends AInfographic
{
    constructor({editorHandler, textHandler, chartHandler, graphicHandler, backgroundHandler})
    {
        super(700, 800, editorHandler, textHandler, chartHandler, graphicHandler, backgroundHandler);
        this._colorScheme = {
            primary: '#F9ab7c',
            secondary: '#ee5d25'
        }
    }

    CreateInfographic()
    {
        this._CreateHeader()
        this._CreateSectionHeader()
        this._CreateCharts()
        this._FinalizeInfog()
    }

    _CreateHeader()
    {
        var header = this._CreateSwitchableContainer({
            x: 0,
            y: 0,
        }, 'header')
        
        this._main.add(header);
        
        var background = new Konva.Group();
        background.moveToBottom();
        this._main.add(background);

        this._bkg.setAttr('fill','#fff9d5');

        var roboto700 = this._quillMap('Roboto', 700);
        
        let descBackgroundGroup = new Konva.Group();
        header.add(descBackgroundGroup);
        let descBackground = new RectangleHeader({
            x: 1,
            y: 0,
            width: this._chartWidth - 2,
            height: 200,
            fill: '#bd4932',
            cornerRadius: 0,
            group: descBackgroundGroup,
        });
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: descBackground,
            group: descBackgroundGroup
        });

        var titleDiv = document.createElement('div');
        var title = '<p><span style="font-size: 50px; font-family: Roboto, sans-serif; font-weight: 700">'
            + 'Understanding</span></p>';
        titleDiv.innerHTML = title;
        titleDiv.style.color = '#fefbd9'
        this._textHandler.AddTextElem({
            textElem: titleDiv, 
            group: header, 
            x: 50, 
            y: 40
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto700,
            fontSize: '50px',
            textColor: titleDiv.style.color,
            lineHeight: '1.0',
            align: 'center',
        });

        var underTitleDiv = document.createElement('div');
        var underTitle = '<p><span style="font-size: 40px; font-family: Roboto, sans-serif; font-weight: 700">'
            + 'ADD / ADHD</span></p>';
        underTitleDiv.innerHTML = underTitle;
        underTitleDiv.style.color = '#fad349';
        this._textHandler.AddTextElem({
            textElem: underTitleDiv, 
            group: header, 
            x: 50, 
            y: 100
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto700,
            fontSize: '40px',
            textColor: underTitleDiv.style.color,
            lineHeight: '1.2',
            align: 'center',
        });

        let strip = new RectangleHeader(
            {
                x: 1,
                y: 200,
                width: this._chartWidth - 2,
                height: 25,
                fill: '#ffd34e',
                group: descBackgroundGroup
            }
        );
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: strip,
            group: descBackgroundGroup
        });
    }

    _CreateSectionHeader(){
        let sectionHead = this._CreateSwitchableContainer({
            x: 0,
            y: 250
        }, 'sectionHead')

        this._main.add(sectionHead)

        var roboto700 = this._quillMap('Roboto', 700);

        let sideBarGroup = new Konva.Group();
        sectionHead.add(sideBarGroup)
        let sideBarLeft = new RectangleHeader(
            {
                x: 1,
                y: 0,
                width: 40,
                height: 110,
                fill: '#db9d36',
                group: sideBarGroup
            }
        );
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: sideBarLeft,
            group: sideBarGroup
        });
       
        let sideBarRightGroup = new Konva.Group();
        sectionHead.add(sideBarRightGroup)
        let sideBarRight = new RectangleHeader(
            {
                x: 410,
                y: 0,
                width: 800-330,
                height: 110,
                fill: '#db9d36',
                group: sideBarRightGroup
            }
        );
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: sideBarRight,
            group: sideBarRightGroup
        });

        var sectionTitleDiv = document.createElement('div')
        var sectionTitle = '<p><span style="font-size: 55px; font-family: Roboto, sans-serif; font-weight: 800">'
            + 'ADD / ADHD</span></p>';
        sectionTitleDiv.innerHTML = sectionTitle;
        sectionTitleDiv.style.color = '#145860';
        this._textHandler.AddTextElem({
            textElem: sectionTitleDiv, 
            group: sectionHead, 
            x: 50, 
            y: 0
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto700,
            fontSize: '55px',
            textColor: sectionTitleDiv.style.color,
            lineHeight: '1.2',
            align: 'center',
        });

        var subTitleDiv = document.createElement('div')
        var subTitle = '<p><span style="font-size: 45px; font-family: Roboto, sans-serif; font-weight: 400">'
            + 'Facts and Figures</span></p>';
        subTitleDiv.innerHTML = subTitle;
        subTitleDiv.style.color = '#ae4d34';
        this._textHandler.AddTextElem({
            textElem: subTitleDiv, 
            group: sectionHead, 
            x: 50, 
            y: 55
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto700,
            fontSize: '45px',
            textColor: subTitleDiv.style.color,
            lineHeight: '1.2',
            align: 'center',
        });
    }

    _CreateCharts() 
    {
        let sectionOne = this._CreateSwitchableContainer(
        {
            x:0,
            y:300
        }, 'sectionOne')

        this._main.add(sectionOne)

        var roboto400 = this._quillMap('Roboto', 400);

        const ADHD = '\uf183', DARK_BLUE = '#185963', RED = '#c04637',
            DEFAULT_OFFSET = 30;

        let chartBackgroundGroup = new Konva.Group();
        sectionOne.add(chartBackgroundGroup);
        let chartBackground = new RectangleHeader(
            {
                x: 0,
                y: 70,
                width: (this._chartWidth - 2)/2,
                height: 160,
                fill: '#ffd34e',
                group: chartBackgroundGroup,
            }
        );
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: chartBackground,
            group: chartBackgroundGroup
        });

        var waffleOneGroup = new Konva.Group({
            name: 'WaffleChart',
            id: 0,
            offsetY: -90,
            offsetX: -55,
            width: 280,
            height: 100,
        });
        
        sectionOne.add(waffleOneGroup);
        
        var ICON_FONT = '"Font Awesome 5 Free"';
        console.log("Default offset: " + DEFAULT_OFFSET);
        var ADHDPreset = GenerateWafflePreset(ADHD, DARK_BLUE, DEFAULT_OFFSET, ICON_FONT),
            redADHDPreset = GenerateWafflePreset(ADHD, RED, DEFAULT_OFFSET - 1, ICON_FONT);

        var waffleOne = new WaffleChart({
            numerator: 9, 
            denominator: 10, 
            group: waffleOneGroup, 
            presetA: ADHDPreset, 
            presetB: redADHDPreset, 
            fontSize: 20,
            maxIconsPerRow: 10
        });
        this._chartHandler.AddChart({
            chart: waffleOne, 
            group: waffleOneGroup, 
            type:'Waffle'
        });
        this._chartHandler.GetChart(this._chartHandler.GetCurrChartID()).CreateChart();

        var waffleOneTextDiv = document.createElement('div')
        var waffleOneText = '<p style="margin: 0px;"><span style="font-size: 20px; font-family: Roboto, sans-serif; font-weight: 400; line-height: 1.0;">'
        + '8.4% of children  ages 3-17 are</span></p>'
        +'<p style="margin: 0px;"><span style="font-size: 20px; font-family: Roboto, sans-serif; font-weight: 400; line-height: 1.0;">'
        + 'diagnosed with ADHD</span></p>';
        waffleOneTextDiv.innerHTML = waffleOneText;
        waffleOneTextDiv.style.color = '#ae4d34';
        this._textHandler.AddTextElem({
            textElem: waffleOneTextDiv, 
            group: sectionOne, 
            x: 50, 
            y: 175
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '20px',
            textColor: waffleOneTextDiv.style.color,
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '20px',
            textColor: waffleOneTextDiv.style.color,
            lineHeight: '1.0',
        });

        var waffleTwoGroup = new Konva.Group({
            name: 'WaffleChart',
            id: 0,
            offsetY: -75,
            offsetX: -500,
            width: 180,
            height: 100,
        });
        sectionOne.add(waffleTwoGroup);

        var BoysPreset = GenerateWafflePreset(ADHD, DARK_BLUE, DEFAULT_OFFSET, ICON_FONT),
            redBoysPreset = GenerateWafflePreset(ADHD, RED, DEFAULT_OFFSET - 1, ICON_FONT);


        var waffleTwo = new WaffleChart({
            numerator: 3, 
            denominator: 6, 
            group: waffleTwoGroup, 
            presetA: BoysPreset, 
            presetB: redBoysPreset, 
            fontSize: 20,
            maxIconsPerRow: 10
        });
        this._chartHandler.AddChart({
            chart: waffleTwo, 
            group: waffleTwoGroup, 
            type:'Waffle'
        });
        this._chartHandler.GetChart(this._chartHandler.GetCurrChartID()).CreateChart();

        var waffleTwoTextDiv = document.createElement('div')
        var waffleTwoText = '<p style="margin: 0px;"><span style="font-size: 20px; font-family: Roboto, sans-serif; font-weight: 400; line-height: 1.0;">'
        + '3-6 times more boys</span></p>'
        +'<p style="margin: 0px;"><span style="font-size: 20px; font-family: Roboto, sans-serif; font-weight: 400; line-height: 1.0;">'
        + 'than girls are diagnosed</span></p>'
        +'<p style="margin: 0px;"><span style="font-size: 20px; font-family: Roboto, sans-serif; font-weight: 400; line-height: 1.0;">'
        + 'with ADHD</span></p>';
        waffleTwoTextDiv.innerHTML = waffleTwoText;
        waffleTwoTextDiv.style.color = '#ae4d34';
        this._textHandler.AddTextElem({
            textElem: waffleTwoTextDiv, 
            group: sectionOne, 
            x: 500, 
            y: 165
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '20px',
            textColor: waffleTwoTextDiv.style.color,
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '20px',
            textColor: waffleTwoTextDiv.style.color,
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '20px',
            textColor: waffleTwoTextDiv.style.color,
            lineHeight: '1.0',
        });

    }

    Draw()
    {
        this._main.draw();
    }
}

export { ADHDTemplateOne };