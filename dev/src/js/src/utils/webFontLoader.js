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
    var WebFontLoader = (function (_super) {
        __extends(WebFontLoader, _super);
        function WebFontLoader() {
            var _this = _super.call(this) || this;
            var config = {};
            config.loading = _this.onLoad;
            config.active = _this.loadComplete;
            config.inactive = _this.failed;
            _this.load(config);
            return _this;
        }
        WebFontLoader.prototype.load = function (config) {
            WebFont.load(config);
        };
        WebFontLoader.prototype.onLoad = function () {
        };
        WebFontLoader.prototype.loadComplete = function () {
        };
        WebFontLoader.prototype.failed = function () {
        };
        return WebFontLoader;
    }(Lightning.EventEmitter));
    Lightning.WebFontLoader = WebFontLoader;
})(Lightning || (Lightning = {}));
