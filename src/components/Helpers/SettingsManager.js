class SettingsManager 
{
    constructor({ cSettings, dSettings, setChartSettings, setDecoratorSettings})
    {
        this._cSettings = cSettings;
        this._dSettings = dSettings;
        this._setChartSettings = setChartSettings;
        this._setDecoratorSettings = setDecoratorSettings;
    }

    /**
     * @summary Directly updates the _cSettings member. Typically used to keep
     *          state consistent after an undo/redo operation.
     *              
     * @param {JSON} cSettings 
     */
    SetCSettings(cSettings)
    {
        this._cSettings = cSettings;
    }

    /**
     * @summary Directly updates the _dSettings member. Typically used to keep
     *          state consistent after an undo/redo operation.
     *              
     * @param {JSON} cSettings 
     */
    SetDSettings(dSettings)
    {
        this._dSettings = dSettings;
    }

    SetChartSettings(category, key, value)
    {
        let settings = this._cSettings;
        settings[category][key] = value;
        this._setChartSettings(settings);
    }

    UpdateDecoratorSettings(decorator, category, key, value)
    {
        let settings = this._dSettings;
        if (!(decorator in settings)) return; 
        settings[decorator][category][key] = value;
        this._setDecoratorSettings(settings);
    }

    DecoratorToggle(checkboxValue, key, decoratorSettings = 0)
    {
        if (checkboxValue === true) {
            this._setDecoratorSettings(this.AddDecorator(decoratorSettings));
        } else {
            this.RemoveDecorator(key);
            this._setDecoratorSettings(this._dSettings);
        }
    }

    AddDecorator(decoratorSettings)
    {
        let settings = {};
        Object.keys(this._dSettings)
            .forEach(key => settings[key] = this._dSettings[key]);
        Object.keys(decoratorSettings)
            .forEach(key => settings[key] = decoratorSettings[key]);
        this._dSettings = settings;
        return settings;
    }

    RemoveDecorator(key)
    {
        delete this._dSettings[key];
    }
}

export { SettingsManager };