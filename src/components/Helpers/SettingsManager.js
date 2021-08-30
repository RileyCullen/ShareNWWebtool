class SettingsManager 
{
    constructor({ cSettings, dSettings, setChartSettings, setDecoratorSettings})
    {
        this._cSettings = cSettings;
        this._dSettings = dSettings;
        this._setChartSettings = setChartSettings;
        this._setDecoratorSettings = setDecoratorSettings;
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