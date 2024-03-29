import { AInfographic } from "./AInfographic";
import Konva from 'konva';
import { BasicBarChart, StackedBarChart, DataValueDecorator, 
    CategoryLabelDecorator, ChartDescriptorDecorator, XAxisDecorator } 
    from '../Charts/BarChart/index';
import { PieChart, FirstStatisticDecorator, ChartOutlineDecorator } 
    from '../Charts/PieChart/index';
import { MessageBubble } from '../ToolTips/index';
import { WaffleChart, GenerateWafflePreset } from '../Charts/WaffleChart/index';
import Virgina from '../../Media/States/virginia.png';
import { DonutChart } from "../Charts/PieChart/ConcreteCharts/DonutChart";
import { RectangleHeader } from "../Headers";

class ViolenceTemplateOne extends AInfographic
{
    constructor({editorHandler, textHandler, chartHandler, graphicHandler, backgroundHandler})
    {
        super(3125 / 3 - 100, 2550 / 4, editorHandler, textHandler, chartHandler, graphicHandler, backgroundHandler);
        this._colorScheme = {
            primary: '#e2f3ff',
            secondary: '#536670'
        }
    }

    CreateInfographic()
    {
        var lightBlue = '#e2f3ff', blueishGray = '#546670', yellow = '#ffc92a',
            orange = '#f8980e', mediumBlue = '#a5c3d2', blueishBlack = '#546670',
            gray = '#849daa', blueishGreen = '#89cad4';
        var roboto = '"Roboto", sans-serif';
        var background = new Konva.Group();
        background.moveToBottom();
        this._main.add(background);

        this._bkg.setAttr('fill', lightBlue);

        var header = this._CreateSwitchableContainer();
        this._main.add(header);

        var roboto700 = this._quillMap('Roboto', 700);
        var titleDiv = document.createElement('div');
        var title = '<p><span style="font-size: 50px; font-family: Roboto, sans-serif; font-weight: 700">'
            + 'VIRGINIA</span></p>';
        titleDiv.innerHTML = title;
        this._textHandler.AddTextElem({
            textElem: titleDiv, 
            group: header, 
            x: 40, 
            y: 30
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto700,
            fontSize: '50px',
            textColor: 'black',
            lineHeight: '1.0',
        });

        let descBackgroundGroup = new Konva.Group();
        header.add(descBackgroundGroup);
        let descBackground = new RectangleHeader({
            x: 1,
            y: 40 + this._GetTextWidth('M', 50, roboto) + 5,
            width: this._chartWidth - 2,
            height: 80,
            fill: blueishGray,
            cornerRadius: 0,
            group: descBackgroundGroup,
        });
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: descBackground,
            group: descBackgroundGroup
        });

        var roboto300 = this._quillMap('Roboto', 300);
        var descFontSize = 20;
        var descDiv = document.createElement('div');
        var desc = '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-weight: 300; font-size: 20px; line-height: 1.2;">The impact of stigma and</span></p>'
            + '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-weight: 300; font-size: 20px; line-height: 1.2;">discrimination against LGBT people</span></p>';
        descDiv.innerHTML = desc;
        descDiv.style.color = 'white';
        this._textHandler.AddTextElem({
            textElem: descDiv, 
            group: header, 
            x: 40, 
            y: 105,
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto300,
            fontSize: '20px',
            textColor: descDiv.style.color,
            lineHeight: '1.2',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: roboto300,
            fontSize: '20px',
            textColor: descDiv.style.color,
            lineHeight: '1.2',
        });

        let yellowStripGroup = new Konva.Group();
        header.add(yellowStripGroup);
        let yellowStrip = new RectangleHeader({
            x: 1,
            y: 165,
            width: this._chartWidth - 2,
            height: 4,
            fill: yellow,
            cornerRadius: 0,
            group: yellowStripGroup,
        })
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: yellowStrip,
            group: yellowStripGroup,
        });

        this._CreateImage({
            x: this._chartWidth - 275, 
            y: 65,
            width: 265,
            height: 120,
            src: Virgina,
            group: header,
        });

        var introHelper = new Konva.Group({
            x: 1,
            y: 165,
        });
        this._main.add(introHelper);

        var introY = 50, introFontSize = 22;

        var roboto400 = this._quillMap('Roboto', 400);
        var introDiv = document.createElement('div');
        var intro = '<p><span style="font-family: Roboto, sans-serif; font-size: 22px; font-weight: 400;">This state is home to</span>'
            + '<span style="font-family: Roboto, sans-serif; font-size: 33px; font-weight: 900; color: orange;"> 257,000 </span>'
            + '<span style="font-family: Roboto, sans-serif; font-size: 22px; font-weight: 400;">LGBT adults</span></p>';
        introDiv.innerHTML = intro;
        this._textHandler.AddTextElem({
            textElem: introDiv, 
            group: introHelper, 
            x: 25, 
            y: introY - 1.5 * this._GetTextWidth('M', introFontSize, roboto)
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '22px',
            textColor: 'black',
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: this._quillMap('Roboto', 900),
            fontSize: '33px',
            textColor: 'orange',
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '22px',
            textColor: 'black',
            lineHeight: '1.0',
        });

        var sectionOne = this._CreateSwitchableContainer({
            x: 1,
            y: 239,
        });
        this._main.add(sectionOne);

        let whiteBackgroundContainer = new Konva.Group();
        sectionOne.add(whiteBackgroundContainer);
        let whiteBackground = new RectangleHeader({
            x: 0,
            y: 0,
            width: this._chartWidth - 2,
            height: 425,
            cornerRadius: 0,
            fill: '#ffffff',
            group: whiteBackgroundContainer,
        });
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: whiteBackground,
            group: whiteBackgroundContainer,
        });

        /* STACKED BAR CHART CODE */
        var stackedBarChartData = [];
        stackedBarChartData[0] = {
            'category': 'LGBT',
            'subcategory': 'All other races',
            'value': 5,
            'color': blueishGreen,
        };
        stackedBarChartData[1] = {
            'category': 'LGBT',
            'subcategory': '>1',
            'value': 8,
            'color': gray,
        };
        stackedBarChartData[2] = {
            'category': 'LGBT',
            'subcategory': 'Latino/a',
            'value': 11,
            'color': blueishBlack,
        };
        stackedBarChartData[3] = {
            'category': 'LGBT',
            'subcategory': 'Black',
            'value': 18,
            'color': mediumBlue,
        };
        stackedBarChartData[4] = {
            'category': 'LGBT',
            'subcategory': 'White',
            'value': 58,
            'color': yellow,
        };
        stackedBarChartData[5] = {
            'category': 'Non-LGBT',
            'subcategory': 'All other races',
            'value': 4,
            'color': blueishGreen,
        };
        stackedBarChartData[6] = {
            'category': 'Non-LGBT',
            'subcategory': '>1',
            'value': 4,
            'color': gray,
        };
        stackedBarChartData[7] = {
            'category': 'Non-LGBT',
            'subcategory': 'Latino/a',
            'value': 7,
            'color': blueishBlack,
        };
        stackedBarChartData[8] = {
            'category': 'Non-LGBT',
            'subcategory': 'Black',
            'value': 16,
            'color': mediumBlue,
        };
        stackedBarChartData[9] = {
            'category': 'Non-LGBT',
            'subcategory': 'White',
            'value': 69,
            'color': yellow,
        };
        var stackedBarChartGroup = new Konva.Group({
            x: 10,
            y: 30
        });
        sectionOne.add(stackedBarChartGroup);
        var stackedBarChart = new StackedBarChart({
            data: stackedBarChartData, 
            group: stackedBarChartGroup,
            width: 225, 
            height: 300, 
            padding: 0.15
        });
        var valueFont = {
            'fontSize': 12, 
            'fontFamily': roboto, 
            'fontColor': 'black'
        };
        var categoryFont = {
            'fontSize': 18, 
            'fontFamily': roboto, 
            'fontColor': 'black'
        };
        var valueLabel = new DataValueDecorator({
            chart: stackedBarChart, 
            displayPercentage: true, 
            displayCategory: false, 
            isMiddle: true, 
            font: valueFont
        });
        var categoryLabel = new CategoryLabelDecorator({
            chart: valueLabel, 
            isWithinBars: true, 
            isTop: true, 
            font: categoryFont
        });
        var descriptor = new ChartDescriptorDecorator({
            chart: categoryLabel, 
            isTop: false, 
            font: {
            'fontSize': 10,
            'fontFamily': roboto,
            'fontColor': 'black',
            }
        });
        this._chartHandler.AddChart({
            chart: stackedBarChart, 
            group: stackedBarChartGroup, 
            type: 'Stacked'
        });
        this._chartHandler.AddDecorator({
            decorator: valueLabel, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: categoryLabel, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: descriptor, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.GetDecorator({
            chartID: this._chartHandler.GetCurrChartID(), 
            decoratorID: this._chartHandler.GetCurrDecSize()
        })
        .CreateChart();

        /* PIE CHART ONE CODE */
        var pieChartOneGroup = new Konva.Group({
            x: this._chartWidth / 2 + 15, 
            y: 160,
        });
        sectionOne.add(pieChartOneGroup);
        var pieChartOneData = [];
        pieChartOneData[0] = {
            'category': 'A',
            'value': 26,
            'color': lightBlue,
        };
        pieChartOneData[1] = {
            'category': 'B',
            'value': 74,
            'color': blueishGray,
        };
        var pieChartOneRadius = 80;
        var donut = new DonutChart({
            data: pieChartOneData,
            group: pieChartOneGroup,
            radius: pieChartOneRadius,
            innerRadius: pieChartOneRadius / 2
        });
        var minorStatistic = new FirstStatisticDecorator({
            chart: donut, 
            font: {
                'fontSize': 30,
                'fontFamily': roboto,
                'fontStyle': 900,
                'textColor': orange,
            }
        });
        this._chartHandler.AddChart({
            chart: donut, 
            group: pieChartOneGroup, 
            type: 'Donut'
        });
        this._chartHandler.AddDecorator({
            decorator: minorStatistic, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.GetDecorator({
            chartID: this._chartHandler.GetCurrChartID(), 
            decoratorID: this._chartHandler.GetCurrDecSize()
        })
        .CreateChart();

        var pieChartOneHelper = new Konva.Group({
            x: this._chartWidth / 2 + 15, 
            y: 160, 
        });
        sectionOne.add(pieChartOneHelper);

        var pieChartOneTextDiv = document.createElement('div');
        var pieChartOneText = '<p style="margin: 0px; text-align: center;"><span style="font-family: Roboto, sans-serif; font-size: 15px; font-weight: 400; line-height: 1.2;">'
            + 'are raising</span></p>'
            + '<p style="margin: 0px; text-align: center;"><span style="font-family: Roboto, sans-serif; font-size: 15px; font-weight: 400; line-height: 1.2;">children</span></p>';
        pieChartOneTextDiv.innerHTML = pieChartOneText;
        this._textHandler.AddTextElem({
            textElem: pieChartOneTextDiv, 
            group: pieChartOneHelper, 
            x: -1 * this._GetTextWidth('are raising', 15, roboto) / 2, 
            y: pieChartOneRadius + this._GetTextWidth('M', 15, roboto)
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: roboto400,
            fontSize: '15px',
            textColor: 'black',
            lineHeight: '1.2',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '15px',
            textColor: 'black',
            lineHeight: '1.2',
        }); 

        /* BAR CHART ONE CODE */
        var barChartOneData = [], barChartOneGroup = new Konva.Group({
            x: pieChartOneGroup.getAttr('x') + 95,
            y: 70,
        });
        sectionOne.add(barChartOneGroup);

        var bcOneFontSize = 15;
        var barOneTitleDiv = document.createElement('div');
        var barOneTitle = '<p><span style="font-family: Roboto, sans-serif; font-size: 15px; font-weight: 400;">' 
            + 'LGBT Age Distribution</span></p>';
        barOneTitleDiv.innerHTML = barOneTitle;
        this._textHandler.AddTextElem({
            textElem: barOneTitleDiv, 
            group: sectionOne, 
            x: pieChartOneGroup.getAttr('x') + 135, 
            y: (-10 + 2 * this._GetTextWidth('M', bcOneFontSize, roboto))
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '15px',
            textColor: 'black',
            lineHeight: '1.0',
        });

        barChartOneData[0] = {
            'category': '18-24',
            'value': 30,
            'color': mediumBlue,
        };
        barChartOneData[1] = {
            'category': '25-34',
            'value': 25,
            'color': 'black',
        };
        barChartOneData[2] = {
            'category': '35-49',
            'value': 20,
            'color': 'black',
        };
        barChartOneData[3] = {
            'category': '50-64',
            'value': 17,
            'color': 'black',
        };
        barChartOneData[4] = {
            'category': '65+',
            'value': 8,
            'color': 'black',
        };
        
        var xAxisFont = {
            'fontSize': 11, 
            'fontFamily': roboto, 
            'fontColor': 'black'
        };
        var barChartOne = new BasicBarChart({
            data: barChartOneData, 
            group: barChartOneGroup,
            width: 200, 
            height: 200, 
            padding: 0.4
        });
        var xAxisOne = new XAxisDecorator({
            chart: barChartOne, 
            lineStrokeWidth: 1, 
            tickStrokeWidth: 0.5, 
            font: xAxisFont
        });
        var valueDecoratorOne = new DataValueDecorator({
            chart: xAxisOne, 
            isPercentage: true, 
            isCategory: false, 
            isMiddle: false,
            font: {
                'fontSize': 15,
                'fontFamily': roboto,
                'fontColor': 'black',
            }
        });

        this._chartHandler.AddChart({
            chart: barChartOne, 
            group: barChartOneGroup, 
            type: 'Bar'
        });
        this._chartHandler.AddDecorator({
            decorator: xAxisOne, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: valueDecoratorOne, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.GetDecorator({
            chartID: this._chartHandler.GetCurrChartID(), 
            decoratorID: this._chartHandler.GetCurrDecSize()
        })
        .CreateChart();

        /* TOOL TIP */
        var toolTipGroup = this._CreateSwitchableContainer(), toolTip = new MessageBubble(toolTipGroup, 225, 150, '#1e2243', 300, 350);
        this._graphicsHandler.AddGraphic({
            type: 'header',
            graphic: toolTip,
            group: toolTipGroup
        });
        sectionOne.add(toolTipGroup)

        var toolTipDiv = document.createElement('div');
        toolTipDiv.style.color = 'white';
        var toolTipText = '<p style="margin:0px;"><span style="font-family: Roboto, sans-serif; font-size: 17px; font-weight: 300; line-height: 2.0;">81% of Virginia Residents</span></p>'
            + '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 17px; font-weight: 300; line-height: 2.0;">think that LGBT people</span></p>'
            + '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 17px; font-weight: 300; line-height: 2.0;">experience discrimination</span></p>'
            + '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 17px; font-weight: 300; line-height: 2.0;">in the state.</span></p>';
        toolTipDiv.innerHTML = toolTipText;
        this._textHandler.AddTextElem({
            textElem: toolTipDiv, 
            group: sectionOne, 
            x: 315, 
            y: 357
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto300,
            fontSize: '17px',
            textColor: 'white',
            lineHeight: '2.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto300,
            fontSize: '17px',
            textColor: 'white',
            lineHeight: '2.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: roboto300,
            fontSize: '17px',
            textColor: 'white',
            lineHeight: '2.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: roboto300,
            fontSize: '17px',
            textColor: 'white',
            lineHeight: '2.0',
        });

        /* WAFFLE CHART CODE */
        var PERSON = '\uf007', ICON_FONT = '"Font Awesome 5 Free"';
        var orangePersonPreset = GenerateWafflePreset(PERSON, orange, 25, ICON_FONT),
            bluePersonPreset = GenerateWafflePreset(PERSON, mediumBlue, 25, ICON_FONT);
        var waffleChartGroup = this._CreateSwitchableContainer({
            x: 20,
            y: 720,
            width: 1000,
            height: 300,
        });
        this._main.add(waffleChartGroup);

        var helperGroup = new Konva.Group();
        waffleChartGroup.add(helperGroup);
        var waffleNum = 65, waffleDenom = 80;
        var waffleChart = new WaffleChart({
            numerator: waffleNum, 
            denominator: waffleDenom, 
            group: helperGroup, 
            presetA: orangePersonPreset, 
            presetB: bluePersonPreset, 
            fontSize: 20, 
            isDynamicResize: false,
            maxIconsPerRow: 10,
        });
        this._chartHandler.AddChart({
            chart: waffleChart, 
            group: helperGroup, 
            type: 'Waffle'
        });
        this._chartHandler.GetChart(this._chartHandler.GetCurrChartID()).CreateChart();

        var circleGroup = new Konva.Group({
            x: 325,
            y: 135
        });
        waffleChartGroup.add(circleGroup);

        var circle = new PieChart({
            data: [{'category': 'test', 'value': 74, 'color': yellow},
                   {category: 'test2', value: 26, color: '#ffffff'}], 
            group: circleGroup, 
            radius: 55
        });
        var circleOutline = new ChartOutlineDecorator({
            chart: circle,  
            outlineWidth: 2.5, 
            outlineColor: 'black'
        });
        var circleMinorStatistic = new FirstStatisticDecorator({
            chart: circleOutline, 
            font: {
                'fontSize': 40,
                'fontFamily': roboto,
                'textColor': 'black',
                'fontStyle': 400,
            }
        });
        this._chartHandler.AddChart({
            chart: circle, 
            group: circleGroup, 
            type: 'Pie'
        });
        this._chartHandler.AddDecorator({
            decorator: circleOutline, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.AddDecorator({
            decorator: circleMinorStatistic, 
            id: this._chartHandler.GetCurrChartID()
        });
        this._chartHandler.GetDecorator({
            chartID: this._chartHandler.GetCurrChartID(), 
            decoratorID: this._chartHandler.GetCurrDecSize()
        })
        .CreateChart();


        var waffleDescDiv = document.createElement('div');
        var waffleDesc = '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 13px; font-weight: 400; line-height: 1.0;">of LGBT Virginia students surveyed</span></p>'
            + '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 13px; font-weight: 400; line-height: 1.0;">said they had experienced verbal</span></p>'
            + '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 13px; font-weight: 400; line-height: 1.0;">harassment based on their sexual</span></p>'
            + '<p style="margin: 0px;"><span style="font-family: Roboto, sans-serif; font-size: 13px; font-weight: 400; line-height: 1.0;">orientation at school.</span></p>'
        waffleDescDiv.innerHTML = waffleDesc;
        this._textHandler.AddTextElem({
            textElem: waffleDescDiv, 
            group: waffleChartGroup, 
            x: 400, 
            y: 100
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '13px',
            textColor: 'black',
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '13px',
            textColor: 'black',
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto400,
            fontSize: '13px',
            textColor: 'black',
            lineHeight: '1.0',
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(), 
            fontFamily: roboto400,
            fontSize: '13px',
            textColor: 'black',
            lineHeight: '1.0',
        });


        var citationOneDiv = document.createElement('div');
        var citationOne = '<p><span style="font-family: Roboto, sans-serif; font-size: 9px; font-weight: 300;">'
            + '2017 GLSEN National Scholl Climate Survey</span></p>';
        citationOneDiv.innerHTML = citationOne;
        this._textHandler.AddTextElem({
            textElem: citationOneDiv, 
            group: waffleChartGroup, 
            x: 400, 
            y: 180
        });
        this._textHandler.SetCSSInfo({
            id: this._textHandler.GetCurrID(),
            fontFamily: roboto300,
            fontSize: '9px',
            textColor: 'black',
            lineHeight: '1.0',
        });


        this._FinalizeInfog();
    }   

    Draw()
    {
        this._main.draw();
    }
}

export { ViolenceTemplateOne };