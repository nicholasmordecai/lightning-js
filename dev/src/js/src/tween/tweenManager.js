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
    var TweenManeger = (function (_super) {
        __extends(TweenManeger, _super);
        function TweenManeger(game) {
            var _this = _super.call(this, game, true, true) || this;
            _this.game = game;
            _this._active = true;
            _this._tweens = [];
            _this._toBeDestroyed = [];
            return _this;
        }
        TweenManeger.prototype.update = function (dt) {
            if (!this._active)
                return;
            /**
             * Deal with tweens that should be destroyed
             */
            var t = this._tweens.length;
            while (t--) {
                if (this._tweens[t].toBeDestroyed) {
                    var tween = this._tweens[t];
                    // get index of tween in the tweens array and remove
                    var index = this._tweens.indexOf(tween);
                    this._tweens.splice(index, 1);
                    // remove reference to the manager
                    tween.manager = null;
                }
            }
            for (var i = 0, len = this._tweens.length; i < len; i++) {
                var tween = this._tweens[i];
                if (tween.active) {
                    tween.update(dt);
                }
            }
        };
        TweenManeger.prototype.create = function (objRef, autoDestroy, key) {
            if (autoDestroy === void 0) { autoDestroy = false; }
            if (key === void 0) { key = null; }
            var tween = new Lightning.Tween(this, objRef, autoDestroy);
            if (key !== null) {
                this._tweens[key] = tween;
            }
            else {
                this._tweens.push(tween);
            }
            return tween;
        };
        TweenManeger.prototype.start = function (tween) {
            if (typeof (tween) === 'string') {
                this._tweens[tween].active = true;
            }
            else {
                tween.active = true;
            }
        };
        TweenManeger.prototype.destroy = function (tween) {
            if (typeof (tween) === 'string') {
                var t = this._tweens[tween];
                t.toBeDestroyed = true;
                return t;
            }
            else {
                tween.toBeDestroyed = true;
                return tween;
            }
        };
        /**
         * probably not going to work, needs to be refatored
         */
        TweenManeger.prototype.getTween = function (key) {
            return this._tweens[key];
        };
        TweenManeger.prototype.pause = function (key) {
            this._tweens[key].pause();
        };
        TweenManeger.prototype.stopUpdate = function () {
            this.game.ticker.remove(this.update, this);
        };
        TweenManeger.prototype.startUpdate = function () {
            this.game.ticker.add(this.update, this);
        };
        TweenManeger.prototype.pauseUpdate = function () {
            this._active = false;
        };
        return TweenManeger;
    }(Lightning.Plugin));
    Lightning.TweenManeger = TweenManeger;
})(Lightning || (Lightning = {}));
