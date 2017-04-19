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
    var Parallax = (function (_super) {
        __extends(Parallax, _super);
        /**
         * @param  {Engine} game
         * @param  {number=null} width
         * @param  {number=null} height
         */
        function Parallax(game, width, height) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            var _this = _super.call(this) || this;
            _this._scrollSpeed = 1;
            _this._incMultiplier = 0.3;
            _this._watch = null;
            _this._watchX = false;
            _this._watchY = false;
            _this._watchOffset = { x: 0, y: 0 };
            _this._lastWatch = { x: 0, y: 0 };
            _this._watchIncMultiplier = { x: 0.8, y: 0.8 };
            _this._watchDampner = { x: 50, y: 50 };
            _this._referenceOffset = { x: 0, y: 0 };
            _this.game = game;
            _this._width = width | _this.game.width;
            _this._height = height | _this.game.height;
            _this._tiles = [];
            return _this;
        }
        /**
         * @param  {string} key
         * @param  {Texture} texture
         * @param  {boolean=false} xy
         */
        Parallax.prototype.add = function (key, texture, xy) {
            if (xy === void 0) { xy = false; }
            var xSpeed = 0;
            var ySpeed = 0;
            if (xy) {
                ySpeed = this._incMultiplier * (this._tiles.length + 1);
            }
            else {
                xSpeed = this._incMultiplier * (this._tiles.length + 1);
            }
            var object = new PIXI.extras.TilingSprite(texture, this._width, this._height);
            this.addChild(object);
            var tile = { key: key, object: object, updateX: xSpeed, updateY: ySpeed, updateRelative: 0, index: this._tiles.length + 1 };
            this._tiles.push(tile);
        };
        /**
         *
         */
        Parallax.prototype.update = function () {
            var x = 0;
            var y = 0;
            if (this._watchX) {
                var currentPositionX = this._watch.x - this._referenceOffset.x;
                x = (currentPositionX - this._lastWatch.x) / this._watchDampner.x;
                this._lastWatch.x = currentPositionX;
            }
            if (this._watchY) {
                var currentPositionY = this._watch.y - this._referenceOffset.y;
                y = (currentPositionY - this._lastWatch.y) / this._watchDampner.y;
                this._lastWatch.y = currentPositionY;
            }
            for (var _i = 0, _a = this._tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                tile.object.tilePosition.x += tile.updateX * this._scrollSpeed;
                tile.object.tilePosition.y += tile.updateY * this._scrollSpeed;
                tile.object.tilePosition.x += x * tile.index * this._watchIncMultiplier.x;
                tile.object.tilePosition.y -= y * tile.index * this._watchIncMultiplier.y;
            }
        };
        /**
         * @param  {string} key
         */
        Parallax.prototype.getTile = function (key) {
            for (var _i = 0, _a = this._tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (tile.key === key) {
                    return tile;
                }
            }
            console.info('no tile with key', key, 'found');
        };
        /**
         * @param  {any} val
         * @returns void
         */
        Parallax.prototype.setWatch = function (val, x, y) {
            if (x === void 0) { x = true; }
            if (y === void 0) { y = true; }
            this._watch = val;
            this._watchX = x;
            this._watchY = y;
        };
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        Parallax.prototype.setWatchOffset = function (x, y) {
            if (y === void 0) { y = x; }
            this._watchOffset = { x: x, y: y };
        };
        /**
         * @param  {boolean=false} x
         * @param  {boolean=false} y
         */
        Parallax.prototype.setWatchXY = function (x, y) {
            if (x === void 0) { x = false; }
            if (y === void 0) { y = false; }
            this._watchX = x;
            this._watchY = y;
        };
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        Parallax.prototype.setReferenceOffset = function (x, y) {
            if (y === void 0) { y = x; }
            this._referenceOffset = { x: x, y: y };
        };
        Parallax.prototype.setWatchDampner = function (x, y) {
            if (y === void 0) { y = x; }
            this._watchDampner.x = x;
            this._watchDampner.y = y;
        };
        /**
         * @param  {string} key
         * @param  {number=0} x
         * @param  {number=0} y
         * @returns void
         */
        Parallax.prototype.setUpdate = function (key, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var tile = this.getTile(key);
            tile.updateX = x;
            tile.updateY = y;
        };
        /**
         * @param  {number} val
         * @returns void
         */
        Parallax.prototype.setScrollSpeed = function (val) {
            this._scrollSpeed = val;
        };
        /**
         * @param  {number} val
         * @param  {boolean=false} reset
         * @param  {boolean=false} xy
         * @returns void
         */
        Parallax.prototype.setIncrementMultiplier = function (val, reset, xy) {
            if (reset === void 0) { reset = false; }
            if (xy === void 0) { xy = false; }
            this._scrollSpeed = val;
            if (reset) {
                for (var _i = 0, _a = this._tiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    if (xy) {
                        var xSpeed = 0;
                        var ySpeed = this._incMultiplier * (this._tiles.length + 1);
                        tile.updateX = xSpeed;
                        tile.updateY = ySpeed;
                    }
                    else {
                        var xSpeed = this._incMultiplier * (this._tiles.length + 1);
                        var ySpeed = 0;
                        tile.updateX = xSpeed;
                        tile.updateY = ySpeed;
                    }
                }
            }
        };
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        Parallax.prototype.setWatchIncerementMultiplier = function (x, y) {
            if (y === void 0) { y = x; }
            this._watchIncMultiplier.x = x;
            this._watchIncMultiplier.y = y;
        };
        Object.defineProperty(Parallax.prototype, "scrollSpeed", {
            /**
             * @returns number
             */
            get: function () {
                return this._scrollSpeed;
            },
            enumerable: true,
            configurable: true
        });
        return Parallax;
    }(Lightning.Group));
    Lightning.Parallax = Parallax;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=parallax.js.map