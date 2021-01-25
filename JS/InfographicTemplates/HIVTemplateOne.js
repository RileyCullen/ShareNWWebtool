class HIVTemplateOne extends AInfographic
{
    constructor()
    {
        super(582, 582);
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
        
        /* HEADER */
        var titleDiv = document.createElement('div');
        var title = '<p style="font-size: 20px; font-family: museo, serif; font-style: 500; color: #3c4c59;">Women and HIV</p>';
        titleDiv.innerHTML = title;
        this._textHandler.AddTextElem(titleDiv, header, (this._stage.width() / 2) - (this._GetTextWidth('Women and HIV', 20, "museo, serif") / 2), 10);

        var questionDiv = document.createElement('div');
        var question = '<p style="font-size: 36px; font-family: museo, serif; color: #3c4c59;">Did you know?</p>';
        questionDiv.innerHTML = question;
        this._textHandler.AddTextElem(questionDiv, header, (this._stage.width() / 2) - (this._GetTextWidth('Did you know?', 36, 'museo, serif') / 2), 27);
        
        /* SECTION ONE */ 
        /*var orangeBorderImg = new Image();
        orangeBorderImg.onload = () => {
            var orangeBorder = new Konva.Image({
                width: 400,
                height: 125,
                image: orangeBorderImg,
            });
            sectionOne.add(orangeBorder);
            orangeBorder.moveToBottom();
            this._main.batchDraw();
        };
        orangeBorderImg.src = "JS/InfographicTemplates/src/orangeborder.png";*/
        const MAN = '\uf183', WOMAN = '\uf182', LIGHT_ORANGE = '#f9ab7d', ORANGE = '#ee5d26',
            DEFAULT_FONT_SIZE = 50, DEFAULT_OFFSET = 30;
        var orangeBackground = new ArrowHeader(10, 0, 400, 125, sectionOne, ORANGE, 'white');
        orangeBackground.CreateHeader();
        
        var textGroupOne = new Konva.Group({
            offsetX: -5,
            offsetY: 0,
        });
        sectionOne.add(textGroupOne);
       
        var textOneDiv = document.createElement('div');
        textOneDiv.style.color = '#f58928';
        var textOne = '<p style="font-family: canada-type-gibson, sans-serif; font-size: 30px; font-weight: 700; margin-bottom: -18px;">ONE IN FOUR</p>' +
            '<p style="font-family: canada-type-gibson, sans-serif; font-size: 17px; font-weight: 400; margin-bottom: -32px;">PEOPLE LIVING WITH HIV</p>' +
            '<p style="font-family: canada-type-gibson, sans-serif; font-size: 30px; font-weight: 700; margin-bottom: -18px;">IS A WOMAN</p>';
        textOneDiv.innerHTML = textOne;
        this._textHandler.AddTextElem(textOneDiv, textGroupOne, 150, 20);
        
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
        var manPreset = GenerateWafflePreset(MAN, LIGHT_ORANGE, DEFAULT_OFFSET, ICON_FONT),
            orangeWomanPreset = GenerateWafflePreset(WOMAN, ORANGE, DEFAULT_OFFSET - 1, ICON_FONT);

        var waffleOne = new WaffleChart(3, 4, waffleOneGroup, manPreset, orangeWomanPreset, 33);
        this._chartHandler.AddChart(waffleOne, waffleOneGroup, 'Waffle');
        this._chartHandler.GetChart(this._chartHandler.GetCurrChartID()).CreateChart();
        
        /* SECTION TWO */ 
        /*var redBorderImg = new Image();
        redBorderImg.onload = () => {
            var redBorder = new Konva.Image({
                width: 400,
                height: 125,
                image: redBorderImg,
            });
            sectionTwo.add(redBorder);
            redBorder.moveToBottom();
            this._main.batchDraw();
        };
        redBorderImg.src = "JS/InfographicTemplates/src/redborder.png";*/
        var redBackground = new ArrowHeader(10, 0, 400, 125, sectionTwo, '#e71b32', 'white');
        redBackground.CreateHeader();

        var textGroupTwo = new Konva.Group();
        sectionTwo.add(textGroupTwo);
        
        var textTwoDiv = document.createElement('div');
        textTwoDiv.style.color = '#e71b32';
        var textTwo = '<p style="margin-bottom: -35px; font-family: canada-type-gibson, sans-serif; font-weight: 600; font-size: 23px;">NOT ALL WOMEN</p>' +
            '<p style="margin-bottom: -30px; font-family: canada-type-gibson, sans-serif; font-weight: 200; font-size: 32px;">ARE EQUALLY</p>' +
            '<p style="margin-bottom: -35px; font-family: canada-type-gibson, sans-serif; font-weight: 600; font-size: 23px;">AFFECTED BY HIV</p>';
        textTwoDiv.innerHTML = textTwo;
        this._textHandler.AddTextElem(textTwoDiv, textGroupTwo, 160, 20);
        
        var barChartGroup = new Konva.Group({
            offsetX: -147,
            offsetY: -17.5,
        });
        var barChartLabel = new Konva.Text({
            text: 'New Infections',
            fill: '#e71b32',
            fontSize: 12,
            fontFamily: 'canada-type-gibson, sans-serif',
            offsetX: -25,
            offsetY: 30,
        });
        barChartLabel.rotate(90);
        sectionTwo.add(barChartLabel);
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
        var dataValue = new DataValueDecorator(remainder, true, true, true, {
            'fontSize': 12,
            'fontFamily': 'canada-type-gibson, sans-serif',
            'fontColor': 'white',
        });

        this._chartHandler.AddChart(barChart, barChartGroup, 'Bar');
        this._chartHandler.AddDecorator(remainder, this._chartHandler.GetCurrChartID());
        this._chartHandler.AddDecorator(dataValue, this._chartHandler.GetCurrChartID());
        this._chartHandler.GetDecorator(this._chartHandler.GetCurrChartID(), this._chartHandler.GetCurrDecSize())
            .CreateBarChart();
        
        /* SECTION THREE */ 
        /*var blueBorderImg = new Image();
        blueBorderImg.onload = () => {
            var blueBorder = new Konva.Image({
                width: 400,
                height: 125,
                image: blueBorderImg,
            });
            sectionThree.add(blueBorder);
            blueBorder.moveToBottom();
            this._main.batchDraw();
        };
        
        blueBorderImg.src = "JS/InfographicTemplates/src/blueborder.png";*/

        const LIGHT_BLUE = '#a0b8d2', BLUE = '#1670ac';
        var blueBackground = new ArrowHeader(10, 0, 400, 125, sectionThree, BLUE, 'white');
        blueBackground.CreateHeader();

        var helper = new Konva.Group();
        barChartGroup.add(helper);
        var textGroupThree = new Konva.Group();
        sectionThree.add(textGroupThree);
        
        var textThreeDiv = document.createElement('div');
        textThreeDiv.style.color = '#2f6b8d';
        var textThree = '<p style="margin-bottom: -20px; font-family: canada-type-gibson, sans-serif; font-weight: 600; font-size: 17px;">ONLY HALF OF WOMEN</p>' +
            '<p style="margin-bottom: -34px; font-family: canada-type-gibson, sans-serif; font-weight: 400; font-size: 18.5px;">DIAGNOSED WITH HIV</p>' +
            '<p style="margin-bottom: -38px; font-family: canada-type-gibson, sans-serif; font-weight: 100; font-size: 28.5px;">ARE RECEIVING</p>' +
            '<p style="margin-bottom: 0px; font-family: canada-type-gibson, sans-serif; font-weight: 600; font-size: 28.5Px;">CARE FOR HIV</p>';
        textThreeDiv.innerHTML = textThree;
        this._textHandler.AddTextElem(textThreeDiv, textGroupThree, 160, 18);

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
        var bottomText = '<p style="font-size: 16px; font-family: museo, serif;">Get the facts. Get tested. Get treatment</p>';
        bottomTextDiv.innerHTML = bottomText;
        this._textHandler.AddTextElem(bottomTextDiv, footer, 
            ((this._stage.width() / 2) - 
            this._GetTextWidth('Get the facts. Get tested. Get treatment.', 16, 'museo, serif') / 2), 
            20);

        var moreInfoTextDiv = document.createElement('div');
        var moreInfoText = '<p style="font-size: 14px; font-family: museo, serif;">For more info, go to www.cdc.gov/hiv</p>';
        moreInfoTextDiv.innerHTML = moreInfoText;
        this._textHandler.AddTextElem(moreInfoTextDiv, footer, 
            (this._stage.width() / 2) - 
            this._GetTextWidth('For more info, go to www.cdc.gov/hiv', 14, 'museo, serif') / 2, 40);
        
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
        logoHelper.src = "JS/InfographicTemplates/src/cdclogo.png";
        
        footer.moveToTop();
        this._FinalizeInfog();
    }

    Draw()
    {
        this._main.draw();
    }
}