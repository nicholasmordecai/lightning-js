/// <reference path="./../reference.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lightning;
(function (Lightning) {
    var State = (function (_super) {
        __extends(State, _super);
        function State(game) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this.game = game;
            return _this;
        }
        State.prototype.init = function (params) {
        };
        State.prototype.start = function () {
        };
        State.prototype.update = function () {
        };
        State.prototype.create = function () {
        };
        return State;
    }(PIXI.Container));
    Lightning.State = State;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=state.js.map