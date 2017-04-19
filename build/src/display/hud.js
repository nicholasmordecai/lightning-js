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
/**
 * Order the world when created
 */
var Lightning;
(function (Lightning) {
    var HUD = (function (_super) {
        __extends(HUD, _super);
        function HUD(game) {
            var _this = _super.call(this) || this;
            _this.game = game;
            return _this;
        }
        return HUD;
    }(Lightning.Group));
    Lightning.HUD = HUD;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=hud.js.map