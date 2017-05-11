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
    var Group = (function (_super) {
        __extends(Group, _super);
        function Group() {
            var _this = _super.call(this) || this;
            _this._events = new Lightning.EventEmitter;
            return _this;
        }
        /**
         * @param  {} ...displayObjects
         */
        Group.prototype.add = function () {
            var displayObjects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                displayObjects[_i] = arguments[_i];
            }
            for (var i = 0; i < displayObjects.length; i++) {
                this.addChild(displayObjects[i]);
            }
        };
        return Group;
    }(PIXI.Container));
    Lightning.Group = Group;
})(Lightning || (Lightning = {}));
