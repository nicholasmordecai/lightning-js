/// <reference path="./../reference.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Lightning;
(function (Lightning) {
    var BitmapText = (function (_super) {
        __extends(BitmapText, _super);
        function BitmapText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // constructor() {
        //     super();
        // }
        /**
         * @description function for calculating scaling fonts
         *
         * @param {Object} game reference to the Engine instance
         * @param {number} size size of the font (in responsive pixels)
         * @param {string} font name of the font stored in resource cache
         *
         * @returns {string} concatinated string to pass directly to the PIXI.extras.BitmapText
         */
        BitmapText.prototype.calcFont = function (game, size, font) {
            var str = ((game.width) / size).toString() + 'px ' + font;
            return str;
        };
        return BitmapText;
    }(PIXI.extras.BitmapText));
    Lightning.BitmapText = BitmapText;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=bitmapText.js.map