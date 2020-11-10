class ViolenceTemplateOne extends AInfographic
{
    constructor()
    {
        super(3125 / 3 - 100, 2550 / 4);
    }

    CreateInfographic()
    {
        var lightBlue = '#e2f3ff', blueishGray = '#546670', yellow = '#ffc92a',
            orange = '#f8980e', mediumBlue = '#a5c3d2', blueishBlack = '#546670',
            gray = '#849daa', blueishGreen = '#89cad4';
        var background = new Konva.Group();
        background.moveToBottom();
        this._main.add(background);

       var backgroundRect = new Konva.Rect({
            x: 1,
            y: 1,
            width: this._chartWidth - 2,
            height: this._chartHeight - 2,
            fill: lightBlue,
        });
        background.add(backgroundRect);

        var header = new Konva.Group();
        this._main.add(header);

        var titleText = 'VIRGINIA', textFontSize = 50, roboto = '"Roboto", sans-serif';
        var title = new Konva.Text({
            x: 40,
            y: 40,
            text: titleText,
            fontFamily: roboto,
            fontSize: textFontSize,
            fontStyle: 700,
        });
        header.add(title);

        var descBackground = new Konva.Rect({
            x: 1,
            y: title.getAttr('y') + this._GetTextWidth('M', textFontSize, roboto) + 5,
            width: this._chartWidth - 2,
            height: 80,
            fill: blueishGray,
        });
        header.add(descBackground);

        var descText = 'The impact of stigma and\ndiscrimination against LGBT people', descFontSize = 20;
        var desc = new Konva.Text({
            x: title.getAttr('x'),
            y: (descBackground.getAttr('y') + descBackground.getAttr('height') / 2) 
                - this._GetTextWidth('M', descFontSize, roboto),
            text: descText, 
            fill: 'white',
            fontFamily: roboto,
            fontSize: descFontSize,
            fontStyle: 300
        });
        header.add(desc);        

        var yellowStrip = new Konva.Rect({
            x: 1,
            y: descBackground.getAttr('y') + descBackground.getAttr('height'),
            width: this._chartWidth - 2,
            height: 4,
            fill: yellow
        });
        header.add(yellowStrip);

        var virginiaImage = new Image();
        virginiaImage.onload = () => {
            var virginia = new Konva.Image({
                x: this._chartWidth - 275, 
                y: 65, 
                width: 265,
                height: 120,
                image: virginiaImage,
            });
            header.add(virginia);
            virginia.moveToTop();
            this._main.batchDraw();
        };
        virginiaImage.src = 'InfographicTemplates/src/virginia.png';

        var introOne = 'The state is home to ', stat = '257,000 ', introTwo = 'LGBT adults';

        var introHelper = new Konva.Group({
            x: 1,
            y: yellowStrip.getAttr('y'),
        });
        this._main.add(introHelper);

        var introY = 50, introFontSize = 22, 
            statFontSize = introFontSize * 1.5;

        var tmpOne = new Konva.Text({
            text: introOne,
            x: title.getAttr('x') - 15,
            y: introY - (this._GetTextWidth('M', introFontSize, roboto)),
            fontFamily: roboto,
            fontSize: introFontSize,
            fontStyle: 400,
            fill: 'black',
        });
        var tmpTwo = new Konva.Text({
            text: stat,
            x: tmpOne.getAttr('x') + this._GetTextWidth(introOne, introFontSize, roboto),
            y: introY - (0.8 * this._GetTextWidth('M', statFontSize, roboto)),
            fontFamily: roboto,
            fontSize: statFontSize,
            fontStyle: 900,
            fill: orange,
        });
        var tmpThree = new Konva.Text({
            text: introTwo,
            x: tmpTwo.getAttr('x') + this._GetTextWidth(stat, statFontSize, roboto),
            y: introY - (this._GetTextWidth('M', introFontSize, roboto)),
            fontFamily: roboto,
            fontSize: introFontSize,
            fontStyle: 400,
            fill: 'black',
        });

        introHelper.add(tmpOne);
        introHelper.add(tmpTwo);
        introHelper.add(tmpThree);

        var sectionOne = new Konva.Group({
            x: 1,
            y: yellowStrip.getAttr('y') + yellowStrip.getAttr('height') + 70,
        });
        this._main.add(sectionOne);

        var whiteBackground = new Konva.Rect({
            width: this._chartWidth - 2,
            height: 425,
            fill: 'white',
            draggable: true,
        });
        sectionOne.add(whiteBackground);

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
        var stackedBarChart = new StackedBarChart(stackedBarChartData, stackedBarChartGroup,
            225, 300, 0.15);
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
        var valueLabel = new DataValueDecorator(stackedBarChart, true, false, true, valueFont);
        var categoryLabel = new CategoryLabelDecorator(valueLabel, true, true, categoryFont);
        var descriptor = new ChartDescriptorDecorator(categoryLabel, false, {
            'fontSize': 10,
            'fontFamily': roboto,
            'fontColor': 'black',
        });
        descriptor.SetPadding(20);
        descriptor.SetOffsetX(7);
        descriptor.SetOffsetY(-10);
        descriptor.CreateBarChart();

        /* PIE CHART ONE CODE */
        var pieChartOneGroup = new Konva.Group({
            x: this._chartWidth / 2 + 15, 
            y: 160,
        });
        sectionOne.add(pieChartOneGroup);
        var pieChartOneData = [];
        pieChartOneData[0] = {
            'category': 'A',
            'value': 74,
            'color': lightBlue,
        };
        pieChartOneData[1] = {
            'category': 'B',
            'value': 26,
            'color': blueishGray,
        };
        var pieChartOneRadius = 80;
        var pieChartOne = new PieChart(pieChartOneData, pieChartOneGroup, pieChartOneRadius);
        var donutDecorator = new DonutDecorator(pieChartOne, pieChartOneRadius / 2);   
        var minorStatistic = new MinorStatisticDecorator(donutDecorator, {
            'fontSize': 30,
            'fontFamily': roboto,
            'fontStyle': 900,
            'textColor': orange,
        });
        minorStatistic.CreateChart();

        var pieChartOneHelper = new Konva.Group();
        pieChartOneGroup.add(pieChartOneHelper);
        var pieChartOneText_1 = 'are raising';
        var pieChartOneText_2 = 'children';
        var pieChartOneTextElem = new Konva.Text({
            x: -this._GetTextWidth(pieChartOneText_1, 15, roboto) / 2,
            y: pieChartOneRadius + (this._GetTextWidth('M', 15, roboto)),
            text: pieChartOneText_1,
            fontSize: 15,
            fontFamily: roboto,
            fontStyle: 400,
        });
        pieChartOneHelper.add(pieChartOneTextElem);
        var pieChartOneTextElemTwo = new Konva.Text({
            x: -this._GetTextWidth(pieChartOneText_2, 15, roboto) / 2,
            y: pieChartOneRadius + 2 * this._GetTextWidth('M', 15, roboto) + 5,
            text: pieChartOneText_2,
            fontSize: 15, 
            fontFamily: roboto,
            fontStyle: 400,
        });
        pieChartOneHelper.add(pieChartOneTextElemTwo);

        /* BAR CHART ONE CODE */
        var barChartOneData = [], barChartOneGroup = new Konva.Group({
            x: pieChartOneGroup.getAttr('x') + 95,
            y: 70,
        });
        sectionOne.add(barChartOneGroup);

        var bcOneTitleText = 'LGBT Age Distribution', bcOneFontSize = 15;
        var bcOneTitle = new Konva.Text({
            x: 40,
            y: -(20 + 2 * this._GetTextWidth('M', bcOneFontSize, roboto)),
            text: bcOneTitleText,
            fill: 'black',
            fontFamily: roboto,
            fontSize: bcOneFontSize,
            fontStyle: 400,
        });
        barChartOneGroup.add(bcOneTitle);

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
        var barChartOne = new BasicBarChart(barChartOneData, barChartOneGroup,
            200, 200, 0.4, 0);
        var xAxisOne = new XAxisDecorator(barChartOne, 'black', 1, 0.5, xAxisFont);
        var valueDecoratorOne = new DataValueDecorator(xAxisOne, true, false, false,{
            'fontSize': 15,
            'fontFamily': roboto,
            'fontColor': 'black',
        });
        valueDecoratorOne.CreateBarChart();

        /* TOOL TIP */
        var toolTip = new MessageBubble(sectionOne, 225, 150, '#1e2243');
        toolTip.CreateMessageBubble(300, 350);

        var toolTipText = [
            '81% of Virginia Residents',
            'think that LGBT people ',
            'experience discrimination',
            'in the state.'
        ];

        var prev = 0;
        toolTipText.forEach((d, i) => {
            var helper = new Konva.Text({
                text: toolTipText[i],
                x: 300 + 15,
                y: 375 + prev,
                fill: 'white',
                fontSize: 17,
                fontFamily: roboto,
                fontStyle: 300,
            });
            prev += 2 * this._GetTextWidth('M', 17, roboto);
            sectionOne.add(helper);
        });

        /* WAFFLE CHART CODE */
        var PERSON = '\uf007', ICON_FONT = '"Font Awesome 5 Free"';
        var orangePersonPreset = GenerateWafflePreset(PERSON, orange, 25, ICON_FONT),
            bluePersonPreset = GenerateWafflePreset(PERSON, mediumBlue, 25, ICON_FONT);
        var waffleChartGroup = new Konva.Group({
            x: 0,
            y: whiteBackground.getAttr('y') + 1.6 * whiteBackground.getAttr('height'),
            width: 1000,
            height: 300,
        });
        this._main.add(waffleChartGroup);

        var waffleNum = 65, waffleDenom = 80;
        var waffleChart = new WaffleChart(waffleNum, waffleDenom, 20, orangePersonPreset, bluePersonPreset);
        waffleChart.GenerateChart(20, 30, waffleChartGroup, false);

        var circleGroup = new Konva.Group({
            x: 345,
            y: 165
        });
        waffleChartGroup.add(circleGroup);

        var circle = new PieChart([{'category': 'test', 'value': 74, 'color': yellow}], circleGroup, 55)
        var circleOutline = new ChartOutlineDecorator(circle, 60, 2.5, 'black');
        var circleMinorStatistic = new MinorStatisticDecorator(circleOutline, {
            'fontSize': 40,
            'fontFamily': roboto,
            'textColor': 'black',
            'fontStyle': 400,
        });
        circleMinorStatistic.CreateChart();

        var waffleDescHelper = [
            'of LGBT Virginia students surveyed',
            'said they had experienced verbal',
            'harassment based on their sexual',
            'orientation at school.'
        ];
        var waffleDesc = [];
        prev = 0;

        waffleDescHelper.forEach((d, i) => {
            waffleDesc[i] = new Konva.Text({
                x: 420,
                y: 130 + prev,
                text: d,
                fontSize: 13,
                fontFamily: roboto,
                fontStyle: 400,
            });
            waffleChartGroup.add(waffleDesc[i]);
            prev += 1.5 * this._GetTextWidth('M', 15, roboto);
        });

        var citationOneText = '2017 GLSEN National School Climate Survey';
        var citationOne = new Konva.Text({
            x: 420,
            y: waffleDesc[3].getAttr('y') + 4 * this._GetTextWidth('M', 11, roboto),
            text: citationOneText,
            fontSize: 9,
            fontFamily: roboto,
            fontStyle: 300,
        });
        waffleChartGroup.add(citationOne);
    }   

    Draw()
    {
        this._main.draw();
    }
}
