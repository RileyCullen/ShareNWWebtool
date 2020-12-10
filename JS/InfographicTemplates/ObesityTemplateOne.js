// Cullen, Riley
// ObesityTemplateOne.js
// October 26, 2020

class ObesityTemplateOne extends AInfographic
{
    constructor()
    {
        super(1181, 564);
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

        var ribbonHeight = 35, ribbonWidth = 500;
        var ribbon = new RibbonHeader('#94bd31', '#5f9400', ribbonGroup, ribbonWidth,
            ribbonHeight, this._chartWidth, this._chartHeight);
        ribbon.CreateHeader();

        var ribbonFontFamily = '"Montserrat", sans-serif',
            ribbonTextWidth = this._GetTextWidth(ribbonText, 20, ribbonFontFamily);

        var ribbonTextDiv = document.createElement('div');
        ribbonTextDiv.style.color = 'white';
        var ribbonText = '<p style="font-family: Montserrat, sans-serif; font-size: 20px; ">' +
            'AN EVERYDAY HEALTH INFOGRAM</p>';
        ribbonTextDiv.innerHTML = ribbonText;
        this._textHandler.AddTextElem(ribbonTextDiv, ribbonGroup, 
            (this._chartWidth / 2) - 100 , 
            (ribbonHeight / 2) - this._GetTextWidth('M', 20, ribbonFontFamily) / 2);

        var titleFont = '"Roboto", sans-serif', titleFontSize = 75;
        var titleWidth = this._GetTextWidth('CHILDHOOD', titleFontSize, titleFont)
        var title = new Konva.Text({
            fontFamily: titleFont,
            fontSize: titleFontSize,
            fill: 'black',
            x: this._CenterXAbout(titleWidth, this._chartWidth / 2),
            y: 60,
            text: 'CHILDHOOD\nOBESITY BY'
        });
        titleWidth = this._GetTextWidth('THE NUMBERS', titleFontSize - 15, titleFont);
        var titleTwo = new Konva.Text({
            fontFamily: titleFont,
            fontSize: titleFontSize - 15,
            fill: 'black',
            x: this._CenterXAbout(titleWidth, this._chartWidth / 2),
            y: title.getAttr('y') + 150,
            text: 'THE NUMBERS'
        });
        header.add(title);
        header.add(titleTwo);

        var descText = 'Many U.S. kids are overweight or obese, and most don\'t exercise',
            descFontSize = 15,
            descFontFamily = '"Open Sans", sans-serif',
            descWidth = this._GetTextWidth(descText, descFontSize, descFontFamily);
        var desc = new Konva.Text({
            text: descText,
            fontFamily: descFontFamily,
            fontSize: descFontSize,
            fill: 'black',
            x: this._CenterXAbout(descWidth, this._chartWidth / 2),
            y: titleTwo.getAttr('y') + 70,
        });
        header.add(desc);

        // CONTENT
        var content = new Konva.Group({
            x: 0,
            y: desc.getAttr('y') + 40,
        });
        this._main.add(content);

        var rectWidth = 450, rectHeight = 190, rectCornerRadius = 10, rectOffset = 15,
            rectX = this._CenterXAbout(rectWidth, this._chartWidth / 2);

        // Creating section backgrounds
        var sectionArr = [], sectionColorArr = ['#e33c29', '#2e8acb', '#aea59e', '#94bd31'];
        var textGroupArr = [];
        var sectionFontSize = 18.5, statisticFontSize = 47.5;

        for (var i = 0; i < 4; i++) {
            sectionArr[i] = (i === 0) ? new Konva.Group() : new Konva.Group({
                y: sectionArr[i - 1].getAttr('y') + rectHeight + rectOffset
            });
            content.add(sectionArr[i]);
            sectionArr[i].add(new Konva.Rect({
                x: rectX,
                y: 0,
                fill: sectionColorArr[i],
                width: rectWidth,
                height: rectHeight,
                cornerRadius: rectCornerRadius,
            }));

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
        var waffleOne = new WaffleChart(waffleOneNum, waffleOneDenom, sectionOneWaffleContainer,
            whiteChildPreset, redChildPreset, 50);
        var waffleOneStat = new StatisticDecorator(waffleOne, 'in', textGroupArr[0], {
            'fontSize': statisticFontSize,
            'fontFamily': titleFont,
            'fontStyle': 400,
            'textColor': 'white',
        });

        this._chartHandler.AddChart(waffleOne, sectionOneWaffleContainer, 'Waffle');
        this._chartHandler.AddDecorator(waffleOneStat, this._chartHandler.GetCurrChartID());
        this._chartHandler.GetDecorator(this._chartHandler.GetCurrChartID(), this._chartHandler.GetCurrDecSize())
            .CreateChart();

        var sectionOneText = 'children and teens age\n2 to 19 are considered\noverweight or obese';
        textGroupArr[0].add(new Konva.Text({
            text: sectionOneText,
            fill: '#9a2418',
            fontFamily: descFontFamily,
            fontSize: sectionFontSize,
            fontStyle: 'bold',
            y: this._GetTextWidth('M', 50, titleFont) + 5,
        }));

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
        var waffleTwo = new WaffleChart(waffleTwoNum, waffleTwoDenom, sectionTwoWaffleContainer,
            whiteRunnerPreset, blueRunnerPreset, 50);
        var waffleTwoStat = new StatisticDecorator(waffleTwo, 'out of', textGroupArr[1], {
            'fontSize': statisticFontSize,
            'fontFamily': titleFont,
            'fontStyle': 400,
            'textColor': 'white',
        });

        this._chartHandler.AddChart(waffleTwo, sectionTwoWaffleContainer, 'Waffle');
        this._chartHandler.AddDecorator(waffleTwoStat, this._chartHandler.GetCurrChartID());
        this._chartHandler.GetDecorator(this._chartHandler.GetCurrChartID(), this._chartHandler.GetCurrDecSize())
            .CreateChart();;

        textGroupArr[1].setAttr('y', textGroupArr[1].getAttr('y') + 10);

        var sectionTwoText = 'don\'t get any daily\nphysical activity';
        textGroupArr[1].add(new Konva.Text({
            text: sectionTwoText,
            fill: '#11578a',
            fontFamily: descFontFamily,
            fontSize: sectionFontSize,
            fontStyle: 'bold',
            y: this._GetTextWidth('M', 50, titleFont) + 5,
        }));

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

        var pieChart = new PieChart(pieChartData, pieChartGroup, 70);
        var donutDecorator = new DonutDecorator(pieChart, 40, sectionColorArr[2]);
        var outerOutline = new ChartOutlineDecorator(donutDecorator, pieChart.GetRadius(), 5, '#7b706a');
        var innerOutline = new ChartOutlineDecorator(outerOutline, donutDecorator.GetRadius(), 3, '#7b706a');
        var majorStatistic = new FirstStatisticDecorator(innerOutline, {'fontSize': statisticFontSize,
            'fontFamily': titleFont, 'textColor': 'white',}, 5, 0, textGroupArr[2]);

        this._chartHandler.AddChart(pieChart, pieChartGroup, 'Pie');
        this._chartHandler.AddDecorator(donutDecorator, this._chartHandler.GetCurrChartID());
        this._chartHandler.AddDecorator(outerOutline, this._chartHandler.GetCurrChartID());
        this._chartHandler.AddDecorator(innerOutline, this._chartHandler.GetCurrChartID());
        this._chartHandler.AddDecorator(majorStatistic, this._chartHandler.GetCurrChartID());
        this._chartHandler.GetDecorator(this._chartHandler.GetCurrChartID(), this._chartHandler.GetCurrDecSize())
            .CreateChart();

        /*var pieChartStatistic = percentage(pieChartData, 0) + "%";
        textGroupArr[2].add(new Konva.Text({
            text: pieChartStatistic,
            fill: 'white',
            fontFamily: titleFont,
            fontSize: statisticFontSize,
        }));*/

        var sectionThreeText = 'of elementary schools\noffer no physical\neducation classes';
        textGroupArr[2].add(new Konva.Text({
            text: sectionThreeText,
            fill: '#7b706a',
            fontFamily: descFontFamily,
            fontSize: sectionFontSize, 
            fontStyle: 'bold',
            y: this._GetTextWidth('M', 50, titleFont) + 5 
        }));

        // Section 4 content
        var TV = '\uf26c';
        var tvHelper = new Konva.Text({
            text: TV,
            fontFamily: ICON_FONT,
            fontStyle: '900',
            x: 95,
            y: 40,
            fill: 'white',
            fontSize: 110,
        });
        sectionArr[3].add(tvHelper);

        textGroupArr[3].setAttr('y', textGroupArr[3].getAttr('y') + 10);

        var sectionThreeStatistic = '7 hours';
        textGroupArr[3].add(new Konva.Text({
            text: sectionThreeStatistic,
            fill: 'white',
            fontFamily: titleFont,
            fontSize: statisticFontSize,
        }));

        var sectionThreeText = 'is the amount of time kids\nspend in front of TV or\ncomputer screens daily';
        textGroupArr[3].add(new Konva.Text({
            text: sectionThreeText,
            fill: '#5f9400',
            fontFamily: descFontFamily,
            fontSize: sectionFontSize - 1.5,
            fontStyle: 'bold',
            y: this._GetTextWidth('M', 50, titleFont) + 5 
        }));

        // Footer
        var footer = new Konva.Group({
            x: 0,
            y: this._chartHeight - 30,
        });
        this._main.add(footer);

        var sourceText =  'Source: CDC',
            sourceTextWidth = this._GetTextWidth(sourceText, 10, ribbonFontFamily);
        var source = new Konva.Text({
            x: (this._chartWidth / 2) - (sourceTextWidth / 2),
            text: sourceText,
            fontFamily: ribbonFontFamily,
            fontSize: 10,
            fill: 'gray'
        });
        footer.add(source);

        this._FinalizeInfog();
    }

    Draw()
    {   
        var fontLoader = new FontLoader('"Font Awesome 5 Free"');
        this._main.draw();
        fontLoader.whenFontIsLoaded(() => {
            this._main.batchDraw();
        });
    }
}