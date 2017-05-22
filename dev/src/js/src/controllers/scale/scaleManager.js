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
    var ScaleManager = (function (_super) {
        __extends(ScaleManager, _super);
        function ScaleManager(game, initWidth, initHeight) {
            var _this = _super.call(this) || this;
            _this.game = game;
            _this._scaleMode = 0;
            _this._currentDPR = window.devicePixelRatio;
            _this._allowedDPR = [1, 2, 3, 4];
            // run the initalisation method
            _this.setup(initWidth, initHeight);
            _this.calculateDPR();
            _this.calculateOrientation();
            window.addEventListener("resize", _this.resizeThrottler.bind(_this), false);
            return _this;
        }
        ScaleManager.prototype.setup = function (initWidth, initHeight) {
            // check if orientation is landscape or portrait
            this._originalAspectRatio = initWidth / initHeight;
            this._originalWidth = initWidth;
            this._originalHeight = initHeight;
        };
        ScaleManager.prototype.calculateDPR = function () {
            var liveDPR = window.devicePixelRatio;
            var flag = false;
            for (var _i = 0, _a = this._allowedDPR; _i < _a.length; _i++) {
                var i = _a[_i];
                if (liveDPR === i) {
                    this._currentDPR = liveDPR;
                    flag = true;
                }
            }
            if (!flag) {
                // find closest DPR in allowedDPR's array
                if (this._allowedDPR.length === 0) {
                    // use any / all DPR's
                    this._currentDPR = liveDPR;
                }
                else {
                    var closest = Lightning.Maths.closestValue(this._allowedDPR, liveDPR);
                }
            }
        };
        ScaleManager.prototype.calculateOrientation = function () {
            if (window.innerWidth > window.innerHeight) {
                this._orientation = 'landscape';
            }
            else {
                this._orientation = 'portrait';
            }
        };
        ScaleManager.prototype.resizeThrottler = function (force) {
            var _this = this;
            if (force === void 0) { force = false; }
            if (force) {
                this.resizeAspectRatio();
            }
            else {
                if (!this._resizeTimeout) {
                    this._resizeTimeout = setTimeout(function () {
                        _this._resizeTimeout = null;
                        _this.resizeAspectRatio();
                    }, 66);
                }
            }
        };
        ScaleManager.prototype.resize = function (width, height) {
            this.game.renderer.view.style.width = width + 'px';
            this.game.renderer.view.style.height = height + 'px';
        };
        ScaleManager.prototype.resizeAspectRatio = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            // alert(width + '   ' + height);
            var diffWidth = window.innerWidth - this._originalWidth;
            var diffHeight = window.innerHeight - this._originalHeight;
            var newWidth;
            var newHeight;
            if (diffHeight > diffWidth) {
                var scale = height / this._originalHeight;
                newWidth = this._originalWidth * scale;
                newHeight = this._originalHeight * scale;
            }
            else {
                var scale = width / this._originalWidth;
                newWidth = this._originalWidth * scale;
                newHeight = this._originalHeight * scale;
            }
            this.resize(newWidth, newHeight);
        };
        ScaleManager.prototype.resizeStretch = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            this.resize(width, height);
        };
        ScaleManager.prototype.resizeWorld = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            var diffWidth = window.innerWidth - this._originalWidth;
            var diffHeight = window.innerHeight - this._originalHeight;
            var scale;
            if (diffHeight > diffWidth) {
                scale = (height / this._currentDPR) / this._originalHeight;
            }
            else {
                scale = (width / this._currentDPR) / this._originalWidth;
            }
            this.resize(width, height);
        };
        ScaleManager.prototype.goFullScreen = function () {
            if (document.documentElement.requestFullscreen) {
                document.documentElement['requestFullscreen']();
            }
            else if (document.documentElement['mozRequestFullScreen']) {
                document.documentElement['mozRequestFullScreen']();
            }
            else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement['webkitRequestFullscreen']();
            }
            else if (document.documentElement['msRequestFullscreen']) {
                document.documentElement['msRequestFullscreen']();
            }
            this.resizeThrottler();
        };
        ScaleManager.prototype.alignVertically = function () {
            var height = window.innerHeight;
            this.game.renderer.view.style.position = 'absolute';
            var newHeight = height - parseInt(this.game.renderer.view.style.height);
            newHeight *= 0.5;
            this.game.renderer.view.style.top = newHeight + 'px';
        };
        ScaleManager.prototype.alignHorizontally = function () {
            var width = window.innerWidth;
        };
        Object.defineProperty(ScaleManager.prototype, "devicePixelRatio", {
            get: function () {
                return this._currentDPR;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScaleManager.prototype, "orientation", {
            get: function () {
                return this._orientation;
            },
            enumerable: true,
            configurable: true
        });
        return ScaleManager;
    }(Lightning.EventEmitter));
    Lightning.ScaleManager = ScaleManager;
})(Lightning || (Lightning = {}));
