/// <reference path="./../../reference.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lightning;
(function (Lightning) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(texture) {
            if (texture === void 0) { texture = null; }
            return _super.call(this, texture) || this;
        }
        Sprite.prototype.enableBody = function (val) {
            if (val) {
            }
        };
        Sprite.prototype.setAnchor = function (aX, aY) {
            if (aY === void 0) { aY = aX; }
            this.anchor = new PIXI.Point(aX, aY);
        };
        Sprite.prototype.setScale = function (aX, aY) {
            if (aY === void 0) { aY = aX; }
            this.scale = new PIXI.Point(aX, aY);
        };
        Object.defineProperty(Sprite.prototype, "body", {
            get: function () {
                return this._body;
            },
            set: function (body) {
                this._body = body;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param  {} ...displayObjects
         */
        Sprite.prototype.add = function () {
            var displayObjects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                displayObjects[_i] = arguments[_i];
            }
            for (var i = 0; i < displayObjects.length - 1; i++) {
                this.addChild(displayObjects[i]);
            }
        };
        return Sprite;
    }(PIXI.Sprite));
    Lightning.Sprite = Sprite;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=sprite.js.map