/// <reference path="./../../reference.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lightning;
(function (Lightning) {
    var UI;
    (function (UI) {
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(game, texture) {
                if (texture === void 0) { texture = null; }
                var _this = _super.call(this, texture) || this;
                _this._primitive = null;
                _this.game = game;
                _this.initalise();
                return _this;
            }
            Button.prototype.initalise = function () {
                this.interactive = true;
                this._hitArea = new UI.HitArea(this.game, this.texture.width, this.texture.height);
                this.addChild(this._hitArea);
            };
            Button.prototype.setAnchor = function (aX, aY) {
                if (aY === void 0) { aY = null; }
                if (!aY) {
                    this.anchor = new PIXI.Point(aX, aX);
                    this._hitArea.x -= this.width * aX;
                    this._hitArea.y -= this.height * aX;
                }
                else {
                    this.anchor = new PIXI.Point(aX, aY);
                    this._hitArea.x -= this.width * aX;
                    this._hitArea.y -= this.height * aY;
                }
            };
            Object.defineProperty(Button.prototype, "hit", {
                get: function () {
                    return this._hitArea;
                },
                enumerable: true,
                configurable: true
            });
            return Button;
        }(UI.Sprite));
        UI.Button = Button;
    })(UI = Lightning.UI || (Lightning.UI = {}));
})(Lightning || (Lightning = {}));
//# sourceMappingURL=button.js.map