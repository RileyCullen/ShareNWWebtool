// Cullen, Riley
// fontloader.js
// September 19, 2020
// MacOS

// Desc: This class provides the Konva.js api the ablity to redraw the canvas once
//       a custom font has been loaded. 
// Sources:
//   1. whenFontIsLoaded taken from https://konvajs.org/docs/sandbox/Custom_Font.html

class FontLoader 
{
    // desc: Constructor for FontLoader class
    //
    // parameters:
    // -----------
    // font : str
    //      This is the font we want to load
    constructor(font) {
        this._font = font;
        this._canvas = document.createElement('canvas');
        this._ctx = this._canvas.getContext('2d');
        this._text = 'test text';
        this._initialMeasure = this._ctx.measureText(this._text);
        this._initialWidth = this._initialMeasure.width;
        this._isFontLoaded = false;
    }
    
    // desc: This function loads the font passed through the constructor
    // 
    // parameters:
    // -----------
    // callback : function
    //      This is the function that is called when the font has been loaded.
    //      In other words, this is the Konva.JS code that called draw().
    //
    //      ex. whenFontIsLoaded(() => {
    //              main.draw();
    //          })
    //
    // attemptCount : int
    //      This is the attempt count that the funciton will start at. This field 
    //      can be left undefined. 
    whenFontIsLoaded(callback, attemptCount) {
        var self = this;
        var maxAttempts = 20;

        if (attemptCount === undefined) {
            attemptCount = 0;
        }
        if (attemptCount >= maxAttempts) {
            callback();
            return;
        }
        if (this._isFontLoaded) {
            callback();
            return;
        }
        const metrics = this._ctx.measureText(this._text);
        const width = metrics.width;
        if (width !== this._initialWidth) {
            this._isFontLoaded = true;
            callback();
        } else {
            setTimeout(function () {
                self.whenFontIsLoaded(callback, attemptCount + 1);
            }, 1000);
        }
    }
}