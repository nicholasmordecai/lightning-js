/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    /**
     * @description function for calculating scaling fonts
     *
     * @param {Object} game reference to the Engine instance
     * @param {number} size size of the font (in responsive pixels)
     * @param {string} font name of the font stored in resource cache
     *
     * @returns {string} concatinated string to pass directly to the PIXI.extras.BitmapText
     */
    function calcFont(game, size, font) {
        var str = ((game.width) / size).toString() + 'px ' + font;
        return str;
    }
    Lightning.calcFont = calcFont;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=font.js.map