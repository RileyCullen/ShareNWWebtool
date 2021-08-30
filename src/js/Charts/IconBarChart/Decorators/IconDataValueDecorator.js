import { AIconBarDecorator } from "./AIconBarDecorator";
import Konva from 'konva';
import Lodash from 'lodash';

class IconDataValueDecorator extends AIconBarDecorator
{
    constructor({
        chart, 
        isPercentage = true, 
        isCategory = false, 
        isMiddle = true, 
        font = {
            fontSize: 8, 
            fontFamily: 'Times New Roman, Times, serif', 
            fontColor: 'black'
        },
        backgroundStroke = 'black',
        backgroundFill = 'white',
    })
    {
        super(chart);
        this._font = Lodash.cloneDeep(font);
        this._isPercentage = isPercentage;
        this._isCategory = isCategory;
        this._isMiddle = isMiddle;
        this._backgroundStroke = backgroundStroke;
        this._backgroundFill = backgroundFill;
    }

     /**
     * @summary     This function adds a label to the bars within a bar chart.
     * @description See summary. This is done by calling _chart's CreateBarChart
     *              function and by calling _AddLabels.
     */
      CreateChart()
      {
            this._chart.CreateChart();
            this._AddIconLabels();
      }
  
    GetDecoratorSettings()
    {
        return {
            dataValue: {
                font: this._font,
                display: {
                    percentage: this._isPercentage,
                    category: this._isCategory,
                    isMiddle: this._isMiddle,
                },
                backgroundColor: {
                    stroke: this._backgroundStroke,
                    fill: this._backgroundFill
                }
            }
        }
    }

      /**
       * @summary     Creates the data value labels for the IconBar type.
       * @description A function that iterates through all of the data in _data 
       *              and creates a label for each value. 
       */
      _AddIconLabels()
      {
          var helper = new Konva.Group();
          var minCategory = this._FindMinCategory();
          this._data.forEach((d,i) => {
              var label = d.value;
  
              if (this._isPercentage) label += '%';
              if (this._isCategory) label += ' ' + d.category;
  
              /**
               * Setting up initial values. See CategoryLabelDecorator for description
               * on what xIcon, xMiddle, and x represent.
               */
              var labelWidth = this._GetTextWidth(label, this._font),
                  labelHeight = this._GetTextHeight(label, this._font),
                  offset = (i === 0) ? 0 : this._padding,
                  iconWidth = this._GetIconWidth(this._icon, this._iconSize),
                  iconHeight = this._GetIconHeight(this._icon, this._iconSize),
                  xIcon = (this._xScale(d.category) - this._xScale(minCategory) + offset),
                  xMiddle = xIcon + (iconWidth / 2),
                  x = xMiddle - (labelWidth / 2),
                  y = 2.5 * iconHeight / 2;
  
              var text = new Konva.Text({
                  x: x,
                  y: y - 1,
                  text: label,
                  fontSize: this._font.fontSize,
                  fontFamily: this._font.fontFamily,
                  fill: this._font.fontColor,
              }); 
              helper.add(this._CreateBackgroundRegion(x, y, labelWidth, labelHeight));
              helper.add(text);
          });
          this._group.add(helper);
      }
  
      /**
       * @summary     Creates a background region for the a data value label.
       * 
       * @param {double} x      Starting x position for background region.
       * @param {double} y      Starting y position for background region.
       * @param {double} width  Width of background region.
       * @param {double} height Height of background region.
       * 
       * @returns A Konva.Rect object representing the newly created background 
       *          region.
       */
      _CreateBackgroundRegion(x, y, width, height)
      {
          return new Konva.Rect({
              x: x - 5,
              y: y - 5,
              width: width + 10,
              height: height + 10,
              fill: this._backgroundFill,
              stroke: this._backgroundStroke,
          });
      }
}

export { IconDataValueDecorator }; 