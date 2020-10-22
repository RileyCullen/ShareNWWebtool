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

        var ribbonText = "AN EVERYDAY HEALTH INFOGRAM",
            ribbonFontFamily = '"Montserrat", sans-serif',
            ribbonTextWidth = this._GetTextWidth(ribbonText, 20, ribbonFontFamily);
        ribbonGroup.add(new Konva.Text({
            text: ribbonText,
            x: (this._chartWidth / 2) - (ribbonTextWidth / 2),
            y: (ribbonHeight / 2) - this._GetTextWidth('M', 20, ribbonFontFamily) / 2,
            fontFamily: ribbonFontFamily,
            fontSize: 20,
            fill: 'white',
        }));

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

        sectionArr[0] = new Konva.Group();
        sectionArr[1] = new Konva.Group({
            y: sectionArr[0].getAttr('y') + rectHeight + rectOffset
        });
        sectionArr[2] = new Konva.Group({
            y: sectionArr[1].getAttr('y') + rectHeight + rectOffset
        });
        sectionArr[3] = new Konva.Group({
            y: sectionArr[2].getAttr('y') + rectHeight + rectOffset
        });

        sectionArr.forEach((section, i) => {
            content.add(section);
            section.add(new Konva.Rect({
                x: rectX,
                y: 0,
                fill: sectionColorArr[i],
                width: rectWidth,
                height: rectHeight,
                cornerRadius: rectCornerRadius,
            }));
            section.moveToBottom();
        });

        // Section 1 content
        var CHILD = '\uf1ae', CHILD_OFFSET = 40, ICON_FONT = '"Font Awesome 5 Free"';
        var whiteChildPreset = GenerateWafflePreset(CHILD, 'white', CHILD_OFFSET, ICON_FONT),
            redChildPreset = GenerateWafflePreset(CHILD, '#9a2418', CHILD_OFFSET, ICON_FONT);
        var sectionOneWaffleContainer = new Konva.Group({
            x: 0, 
            y: 0,
            width: 225,
            height: 100,
        });
        sectionArr[0].add(sectionOneWaffleContainer);
        sectionOneWaffleContainer.moveToTop();

        var waffleOne = new WaffleChart(1, 3, 50, whiteChildPreset, redChildPreset);
        waffleOne.GenerateChart(60, 50, sectionOneWaffleContainer);

        // Section 2 Content
        var RUNNER = '\uf70c';
        var whiteRunnerPreset = GenerateWafflePreset(RUNNER, 'white', 0, ICON_FONT),
            blueRunnerPreset = GenerateWafflePreset(RUNNER, '#11578a', 0, ICON_FONT);

        var sectionTwoWaffleContainer = new Konva.Group({
            x: 0,
            y: 0,
            width: 225,
            height: 100,
        });
        sectionArr[1].add(sectionTwoWaffleContainer);

        var waffleTwo = new WaffleChart(2, 3, 50, whiteRunnerPreset, blueRunnerPreset);
        waffleTwo.GenerateChart(60, 50, sectionTwoWaffleContainer);

        // Section 3 content
        var pieChartData = [];
        pieChartData[0] = {
            'category':  'A',
            'value': 96,
            'color': 'white'
        }
        pieChartData[1] = {
            'category': 'B',
            'value': 4,
            'color': sectionColorArr[2],
        }

        var pieChartGroup = new Konva.Group({
            x: 160,
            y: rectHeight / 2,
        });
        sectionArr[2].add(pieChartGroup);

        var pieChart = new PieChart(pieChartData, pieChartGroup, 80);
        var donutDecorator = new DonutDecorator(pieChart, 50, sectionColorArr[2]);
        var outerOutline = new ChartOutlineDecorator(donutDecorator, pieChart.GetRadius(), 5, '#7b706a');
        var innerOutline = new ChartOutlineDecorator(outerOutline, donutDecorator.GetRadius(), 3, '#7b706a');
        innerOutline.CreateChart();

        // Section 4 content
        var TV = '\uf26c';
        var tvHelper = new Konva.Text({
            text: TV,
            fontFamily: ICON_FONT,
            fontStyle: '900',
            x: 70,
            y: 25,
            fill: 'white',
            fontSize: 150,
        });
        sectionArr[3].add(tvHelper);

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