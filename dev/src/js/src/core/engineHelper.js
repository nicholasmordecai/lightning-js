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
        EngineHelper.prototype.displayInfo = function () {
            console.log("%c\n __    _     _   _       _         \n|  |  |_|___| |_| |_ ___|_|___ ___ \n|  |__| | . |   |  _|   | |   | . |\n|_____|_|_  |_|_|_| |_|_|_|_|_|_  |\n        |___|                 |___|\n             ", "font-family:monospace");
            console.log('Lightning-js | version : 0.4.5');
        };
        EngineHelper.prototype.generateTexture = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var t = [];
            if (params.length > 1) {
                for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
                    var i = params_1[_a];
                    t.push(this._renderer.generateTexture(i, PIXI.SCALE_MODES.LINEAR, this._scaleManager.devicePixelRatio));
                }
            }
            else {
                t = this._renderer.generateTexture(params[0], PIXI.SCALE_MODES.LINEAR, this._scaleManager.devicePixelRatio);
            }
            return t;
        };
        EngineHelper.prototype.goFullScreen = function () {
            this._scaleManager.goFullScreen();
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
        EngineHelper.prototype.enableDebug = function (game) {
            this._debug = new Lightning.Debug(game);
        };
        EngineHelper.prototype.recycle = function (obj) {
            obj = null;
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
                return this._renderer.width / this._scaleManager.devicePixelRatio;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "height", {
            get: function () {
                return this._renderer.height / this._scaleManager.devicePixelRatio;
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
        Object.defineProperty(EngineHelper.prototype, "debug", {
            get: function () {
                return this._debug;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "physics", {
            get: function () {
                return { lite: this._physicsLite };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "tweens", {
            get: function () {
                return this._tweenManager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "scale", {
            get: function () {
                return this._scaleManager;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @description recursive pattern to loop over every child and recursivly loop over all of it's children and returning a count of them all from the root object.
         * You must specify an object root
         *
         * Example:
         * this.game.debug.displayCount(this.game.world);
         * this.game.debug.displayCount(myContainer);
         *
         * @see {Lightning.Engine}
         *
         * @param rootObject
         * @returns {number}
         */
        EngineHelper.prototype.displayCount = function (rootObject) {
            return (function (d) {
                var c = 0;
                var r = function (d) {
                    c++;
                    for (var _i = 0, _a = d['children']; _i < _a.length; _i++) {
                        var i = _a[_i];
                        r(i);
                    }
                };
                r(d);
                return c;
            })(rootObject);
        };
        /**
         * @description recursive pattern to loop over every child and recursivly loop over all of it's children and returning an array of display objects that conform to any references.
         * You may pass multiple references into a spread operator
         * You can specify the starting root object
         *
         * Example:
         * this.game.getObjectsByReference(this.game.world, 'alive', 'jimmy', 'fubar');
         * this.game.getObjectsByReference(myContainer, 'onlyOneReference');
         *
         * @see {Lightning.Engine}
         *
         * @param rootObject
         * @returns {number}
         */
        EngineHelper.prototype.getObjectsByReference = function (rootObject) {
            var refs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                refs[_i - 1] = arguments[_i];
            }
            return (function (d) {
                var result = [];
                var r = function (d) {
                    var ref = d.globalRef;
                    for (var _i = 0, refs_1 = refs; _i < refs_1.length; _i++) {
                        var i = refs_1[_i];
                        if (ref === i) {
                            result.push(d);
                        }
                    }
                    for (var _a = 0, _b = d['children']; _a < _b.length; _a++) {
                        var t = _b[_a];
                        r(t);
                    }
                };
                r(d);
                return result;
            })(rootObject);
        };
        EngineHelper.prototype.sizeof = function (object) {
            var objectList = [];
            var stack = [object];
            var bytes = 0;
            while (stack.length) {
                var value = stack.pop();
                if (typeof value === 'boolean') {
                    bytes += 4;
                }
                else if (typeof value === 'string') {
                    bytes += value.length * 2;
                }
                else if (typeof value === 'number') {
                    bytes += 8;
                }
                else if (typeof value === 'object'
                    && objectList.indexOf(value) === -1) {
                    objectList.push(value);
                    for (var i in value) {
                        stack.push(value[i]);
                    }
                }
            }
            return bytes;
        };
        return EngineHelper;
    }());
    Lightning.EngineHelper = EngineHelper;
})(Lightning || (Lightning = {}));
