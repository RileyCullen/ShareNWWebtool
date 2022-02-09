import Konva from "konva";
import { InsertChartCommand, RemoveChartCommand } from "..";
import { ACommand } from "../ACommand";

class ReplaceChartCommand extends ACommand
{
    constructor({
        targetType,
        id,
        handler,
        transformer,
        main,
        colorScheme, 
    })
    {
        super();
        this._targetType = targetType;
        this._id = id;
        this._handler = handler;
        this._tr = transformer;
        this._main = main;
        this._colorScheme = colorScheme;

        this._originalGroup = this._handler.GetGroup(this._id);
        this._parent = this._originalGroup.getParent();
        this._newGroup = new Konva.Group();

        this._removeCommand = null;
        this._insertCommand = null;
        this._isInitialCall = true;
    }

    Execute()
    {
        if (this._isInitialCall) this._ReplaceChart();
        else this._ExecuteReplacement();
    }

    Unexecute()
    {
        this._insertCommand.Unexecute();
        this._removeCommand.Unexecute();
    }

    _ReplaceChart()
    {
        let attrs = this._handler.GetConvertedAttrs(this._id, this._targetType);
        attrs['group'] = this._newGroup;
        this._parent.add(this._newGroup);
        this._newGroup.absolutePosition(this._originalGroup.absolutePosition());
        this._removeCommand = new RemoveChartCommand({
            id: this._id,
            handler: this._handler,
            transformer: this._tr,
            main: this._main,
        });
        this._insertCommand = new InsertChartCommand({
            chartType: this._targetType,
            group: this._newGroup,
            colorScheme: this._colorScheme,
            handler: this._handler,
            transformer: this._tr,
            main: this._main,
            chartAttrs: attrs,
            index: this._id,
        });
        this._isInitialCall = false;
        this._ExecuteReplacement();

    }

    _ExecuteReplacement()
    {
        this._removeCommand.Execute();
        this._insertCommand.Execute();
    }
}

export { ReplaceChartCommand }; 