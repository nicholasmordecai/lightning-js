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
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
         * @param  {Engine} game
         * @param  {} texture=null
         */
        function Button(game, texture) {
            if (texture === void 0) { texture = null; }
            var _this = _super.call(this, texture) || this;
            _this._primitive = null;
            _this.game = game;
            _this.initalise();
            return _this;
        }
        /**
         */
        Button.prototype.initalise = function () {
            this.interactive = true;
            this._hitArea = new Lightning.HitArea(this.game, this.texture.width, this.texture.height);
            this.addChild(this._hitArea);
        };
        /**
         * @param  {number} aX
         * @param  {number=null} aY
         * @returns void
         */
        Button.prototype.setAnchor = function (aX, aY) {
            if (aY === void 0) { aY = aX; }
            this.anchor = new PIXI.Point(aX, aY);
            this._hitArea.x -= this.width * aX;
            this._hitArea.y -= this.height * aY;
        };
        Object.defineProperty(Button.prototype, "hit", {
            /**
             * @returns HitArea
             */
            get: function () {
                return this._hitArea;
            },
            enumerable: true,
            configurable: true
        });
        return Button;
    }(Lightning.Sprite));
    Lightning.Button = Button;
})(Lightning || (Lightning = {}));
