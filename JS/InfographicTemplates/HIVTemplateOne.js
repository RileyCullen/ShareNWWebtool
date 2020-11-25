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
        
        /*main.add(new Konva.Line({
            stroke: "black",
            points: [stage.width() / 2, 0, stage.width() / 2, stage.height()],
        }));*/
        
        /* HEADER */
        var title = new Konva.Text({
            text: "Women and HIV",
            fontSize: 20,
            fontFamily: "museo, serif",
            fontStyle: "500",
            fill: '#3c4c59',
            name: 'EditableText',
            x: (this._stage.width() / 2) - (this._GetTextWidth('Women and HIV', 20, "museo, serif") / 2),
            y: 10,
        });
        title.on('dblclick', () => {
            console.log('hello');
        });
        header.add(title);
        
        var question = new Konva.Text({
            text: "Did You Know?",
            fontSize: 36,
            fontFamily: "museo, serif",
            fill: '#3c4c59',
            name: 'EditableText',
            x: (this._stage.width() / 2) - (this._GetTextWidth('Did You Know?', 36, 'museo, serif') / 2),
            y: 35,
        });
        header.add(question);
        
        /* SECTION ONE */ 
        var orangeBorderImg = new Image();
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
        orangeBorderImg.src = "JS/InfographicTemplates/src/orangeborder.png";
        
        var textGroupOne = new Konva.Group({
            offsetX: -5,
            offsetY: 0,
        });
        sectionOne.add(textGroupOne);
        
        textGroupOne.add(new Konva.Text({
            text: "ONE IN FOUR",
            fontSize: 30,
            fontFamily: "canada-type-gibson, sans-serif",
            fontStyle: "700",
            fill: "#f58928",
            offsetX: -150,
            offsetY: -25,
        }));
        textGroupOne.add(new Konva.Text({
            text: "PEOPLE LIVING WITH HIV",
            fontSize: 17,
            fontFamily: "canada-type-gibson, sans-serif",
            fontStyle: "400",
            fill: "#f58928",
            offsetX: -152,
            offsetY: -55,
        }));
        textGroupOne.add(new Konva.Text({
            text: "IS A WOMAN",
            fontSize: 30,
            fontFamily: "canada-type-gibson, sans-serif",
            fontStyle: "700",
            fill: "#f58928",
            offsetX: -152,
            offsetY: -75,
        }));
        
        const MAN = '\uf183', WOMAN = '\uf182', LIGHT_ORANGE = '#f9ab7d', ORANGE = '#ee5d26',
            DEFAULT_FONT_SIZE = 50, DEFAULT_OFFSET = 30;
        
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
        var redBorderImg = new Image();
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
        redBorderImg.src = "JS/InfographicTemplates/src/redborder.png";
        
        var textGroupTwo = new Konva.Group();
        sectionTwo.add(textGroupTwo);
        
        textGroupTwo.add(new Konva.Text({
            text: "NOT ALL WOMEN",
            fontSize: 23,
            fontFamily: "canada-type-gibson, sans-serif",
            fontStyle: "600",
            fill: "#e71b32",
            offsetX: -160,
            offsetY: -25,
        }));
        textGroupTwo.add(new Konva.Text({
            text: "ARE EQUALLY",
            fontSize: 32,
            fontFamily: "canada-type-gibson, sans-serif",
            fontStyle: "200",
            fill: "#e71b32",
            offsetX: -161,
            offsetY: -50,
        }));
        textGroupTwo.add(new Konva.Text({
            text: "AFFECTED BY HIV",
            fontSize: 23,
            fontFamily: "canada-type-gibson, sans-serif",
            fontStyle: "600",
            fill: "#e71b32",
            offsetX: -160,
            offsetY: -80,
        }));
        
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
        var blueBorderImg = new Image();
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
        
        blueBorderImg.src = "JS/InfographicTemplates/src/blueborder.png";
        var helper = new Konva.Group();
        barChartGroup.add(helper);
        var textGroupThree = new Konva.Group();
        sectionThree.add(textGroupThree);
        
        textGroupThree.add(new Konva.Text({
            text: "ONLY HALF OF WOMEN",
            fontSize: 17,
            fontFamily: "canada-type-gibson, sans-serif",
            fontStyle: "600",
            fill: "#2f6b8d",
            offsetX: -160,
            offsetY: -20
        }));
        textGroupThree.add(new Konva.Text({
            text: "DIAGNOSED WITH HIV",
            fontSize: 18.5,
            fontFamily: "canada-type-gibson, sans-serif",
            fontStyle: "400",
            fill: "#2f6b8d",
            offsetX: -160,
            offsetY: -40
        }));
        textGroupThree.add(new Konva.Text({
            text: "ARE RECEIVING",
            fontSize: 28.5,
            fontFamily: "canada-type-gibson, sans-serif",
            fontStyle: "100",
            fill: "#2f6b8d",
            offsetX: -160,
            offsetY: -60
        }));
        textGroupThree.add(new Konva.Text({
            text: "CARE FOR HIV",
            fontSize: 28.5,
            fontFamily: "canada-type-gibson, sans-serif",
            fontStyle: "600",
            fill: "#2f6b8d",
            offsetX: -160,
            offsetY: -85,
        }));
        
        const LIGHT_BLUE = '#a0b8d2', BLUE = '#1670ac';
        
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
        var bottomText = new Konva.Text({
            text: "Get the facts. Get tested. Get treatment.",
            fontSize: 16,
            fontFamily: "museo, serif",
            fill: "black",
            offsetX: -((this._stage.width() / 2) - this._GetTextWidth('Get the facts. Get tested. Get treatment.', 16, 'museo, serif') / 2),
            offsetY: -25,
        });
        footer.add(bottomText);
        
        var moreInfoText = new Konva.Text({
            text: "For more info, go to www.cdc.gov/hiv",
            fontSize: 14,
            fontFamily: "museo, serif",
            fill: "black",
            offsetX: -((this._stage.width() / 2) - this._GetTextWidth('For more info, go to www.cdc.gov/hiv', 14, 'museo, serif') / 2),
            offsetY: -45,
        });
        footer.add(moreInfoText);
        
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
        this._AddGraphSelection();
    }

    Draw()
    {
        this._main.draw();
    }
}