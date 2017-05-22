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
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(text, style, canvas) {
            if (canvas === void 0) { canvas = null; }
            return _super.call(this, text, style, canvas) || this;
        }
        return Text;
    }(PIXI.Text));
    Lightning.Text = Text;
})(Lightning || (Lightning = {}));
