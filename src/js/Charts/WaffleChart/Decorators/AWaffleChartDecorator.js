// Cullen, Riley
// AWaffleChartDecorator.js
// December 23, 2020

import { AWaffleChart } from "../AWaffleChart";

class AWaffleChartDecorator extends AWaffleChart
{
    /**
     * @summary     Abstract class that provides type to waffle chart decorators.
     * @description An abstract class that provides common interface to the 
     *              waffle chart decorator class.
     * 
     * @param {AWaffleChart} chart The waffle chart we want to decorate.
     */
    constructor(chart)
    {
        super(chart._numerator, chart._denominator, chart._group, chart._presetA, chart._presetB, chart._fontSize, chart._isDynamicResize);
        this._chart = chart;

        if (this.constructor === AWaffleChartDecorator) {
            throw new TypeError('Abstract class "AWaffleChartDecorator" cannot be instantiated');
        }
    }

    /**
     * @summary     Updates the decorator.
     * @description Updates the current decorator by assigning itself new values 
     *              based on the parameterized chart object.
     * 
     * @param {AWaffleChart} chart Updated chart (or decorator) that we want to 
     *                             use to update current decorator.
     */
    UpdateDecorator(chart)
    {
        this._numerator = chart._numerator;
        this._denominator = chart._denominator;
        this._chart = chart;
        this._presetA = chart._presetA;
        this._presetB = chart._presetB;
    }
}

export { AWaffleChartDecorator };