/// <reference path="./../../reference.d.ts" />
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
    var Key = (function (_super) {
        __extends(Key, _super);
        function Key(asciiCode, alias) {
            var _this = _super.call(this) || this;
            // create events
            _this.create('pressed');
            _this.create('released');
            _this._asciiCode = asciiCode;
            _this._alias = alias;
            _this._isDown = false;
            _this._isUp = true;
            return _this;
        }
        Key.prototype.press = function () {
            if (this._isDown)
                return;
            this.emit('pressed');
            this._isDown = true;
            this._isUp = false;
        };
        Key.prototype.release = function () {
            if (this._isUp)
                return;
            this.emit('released');
            this._isDown = false;
            this._isUp = true;
        };
        Object.defineProperty(Key.prototype, "isDown", {
            get: function () {
                return this._isDown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Key.prototype, "isUp", {
            get: function () {
                return this._isUp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Key.prototype, "ascii", {
            get: function () {
                return this._asciiCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Key.prototype, "alias", {
            get: function () {
                return this._alias;
            },
            enumerable: true,
            configurable: true
        });
        return Key;
    }(Lightning.EventEmitter));
    Lightning.Key = Key;
})(Lightning || (Lightning = {}));
