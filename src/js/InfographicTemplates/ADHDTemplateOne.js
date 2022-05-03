import Konva from "konva";
import { AInfographic } from "./AInfographic";
import { ArrowHeader } from '../Headers/ArrowHeader';
import { RectangleHeader } from "../Headers";

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
            y: 225
        }, "sectionHead")

        this._main.add(sectionHead)
    }

    Draw()
    {
        this._main.draw();
    }
}

export { ADHDTemplateOne };