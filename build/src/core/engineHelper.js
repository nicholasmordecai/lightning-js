/// <reference path="./../reference.d.ts" />
/**
 * A helper class for the 'Game'. It's used for all non essential public functions.
 * This is mostly used to keep the actual engine class neat, slim and easier to develop
 */
var Lightning;
(function (Lightning) {
    var EngineHelper = (function () {
        function EngineHelper() {
        }
        EngineHelper.prototype.generateTexture = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var t = [];
            if (params.length > 1) {
                for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
                    var i = params_1[_a];
                    t.push(this._renderer.generateTexture(i));
                }
            }
            else {
                t = this._renderer.generateTexture(params[0]);
            }
            return t;
        };
        EngineHelper.prototype.goFullscreen = function () {
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
        };
        EngineHelper.prototype.texture = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var t = [];
            if (params.length > 1) {
                for (var _a = 0, params_2 = params; _a < params_2.length; _a++) {
                    var i = params_2[_a];
                    t.push(Lightning.Texture.from(i));
                }
            }
            else {
                t = Lightning.Texture.from(params[0]);
            }
            return t;
        };
        Object.defineProperty(EngineHelper.prototype, "backgroundColor", {
            set: function (val) {
                this._renderer.backgroundColor = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "world", {
            get: function () {
                return this._world;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "width", {
            get: function () {
                return this._renderer.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "height", {
            get: function () {
                return this._renderer.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "center", {
            get: function () {
                return { x: this.width * 0.5, y: this.height * 0.5 };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "tweens", {
            get: function () {
                return this._tweens;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "states", {
            get: function () {
                return this._stateManager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "fps", {
            get: function () {
                return this._ticker.FPS;
            },
            set: function (fps) {
                this._ticker.FPS = fps;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "minFPS", {
            get: function () {
                return this._ticker.minFPS;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "elapsedTime", {
            get: function () {
                return this._ticker.elapsedMS;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "deltaTime", {
            get: function () {
                return this._ticker.deltaTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "lastTime", {
            get: function () {
                return this._ticker.lastTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "dpr", {
            get: function () {
                return this._dpr;
            },
            set: function (val) {
                this._dpr = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "storage", {
            get: function () {
                return this._storageManager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "events", {
            get: function () {
                return this._eventEmitter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "ticker", {
            get: function () {
                return this._ticker;
            },
            enumerable: true,
            configurable: true
        });
        EngineHelper.prototype.service = function (key) {
            return this._serviceManager.getService(key);
        };
        Object.defineProperty(EngineHelper.prototype, "services", {
            get: function () {
                return this._serviceManager;
            },
            enumerable: true,
            configurable: true
        });
        return EngineHelper;
    }());
    Lightning.EngineHelper = EngineHelper;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=engineHelper.js.map