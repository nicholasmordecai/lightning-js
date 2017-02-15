/// <reference path="./../../reference.d.ts" />
var Tween;
(function (Tween) {
    var TweenManager = (function () {
        function TweenManager(game) {
            this.game = game;
            this._tweens = [];
            this._running = [];
            this._easing = new Tween.Easing();
        }
        /**
         * Makes a new instance of a tween
         * @param name
         * @returns {any}
         */
        TweenManager.prototype.newTween = function (name) {
            // -- TODO -- Need to change this._tweens[name] for this.find!
            // if tween name exists, throw error, else create blank tween data
            if (this._tweens[name]) {
                console.error('Tween with the name "' + name + '" already exists');
                return false;
            }
            else {
                this._tweens[name] = new Tween.Tween(this);
                return this._tweens[name];
            }
        };
        /**
         * Create a new tween
         * @param name
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        TweenManager.prototype.create = function (name, props) {
            // if null is passed as a name, then don't give the tween a name or add it to the global array of tweens
            if (name == null) {
                var tween = new Tween.Tween(this);
                this.calculateFrames(tween, props);
                return tween;
            }
            else {
                // get a new instance of an tween
                var tween = this.newTween(name);
                this.calculateFrames(tween, props);
                return tween;
            }
        };
        /**
         * Create an tween array with no tween data
         * @param name
         */
        TweenManager.prototype.createEmpty = function (name) {
            if (name == null) {
                var tween = new Tween.Tween(this);
                return tween;
            }
            else {
                var tween = this.newTween(name);
                return tween;
            }
        };
        /**
         * Calculate the frames in an tween
         * @param tween
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        TweenManager.prototype.calculateFrames = function (tween, props) {
            // calculate the number of frames as ms / 1000 * desired tween fps;
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var t = props_1[_i];
                var numOfFrames = (t.time / 1000) * 60;
                for (var i = 0; i <= numOfFrames; i++) {
                    var val = t.easing(null, i, t.from, t.to - t.from, numOfFrames);
                    tween.createFrame(i, [{ prop: t.prop, val: val }], false);
                }
            }
        };
        /**
         * Add a custom frame to the tween sequence
         * @param name
         * @param position
         * @param data
         */
        TweenManager.prototype.addFrame = function (name, position, data) {
            var tween = this.getTween(name);
        };
        /**
         * Combine 2 tween sequences together
         * @param name1
         * @param name2
         * @param position if -1 tween will chain at the end
         * @param destroyOriginals remove the original tweens after building the new one
         */
        TweenManager.prototype.extend = function (newName, tweens, position, destroyOriginals) {
            var tween = null;
            if (newName !== null) {
                tween = this.newTween(newName);
            }
            else {
                tween = new Tween.Tween(this);
            }
            // if tween creation failed, return
            if (tween instanceof Tween.Tween == false) {
                return;
            }
            ;
            var globalFrameId = 0;
            for (var i = 0; i < tweens.length; i++) {
                // get single tween
                var tempTween = null;
                if (typeof (tweens[i]) == 'string') {
                    tempTween = this.getTween(tweens[i]);
                }
                else {
                    tempTween = tweens[i];
                }
                // if tween was not found, return false
                if (!tempTween)
                    return false;
                for (var x = 0; x < tempTween.frames.length; x++) {
                    var frame = tempTween.frames[x];
                    tween.extendFrame(globalFrameId, frame.properties, frame.relative);
                }
            }
            return tween;
        };
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        TweenManager.prototype.start = function (obj, name, loop, loops, autoDestroy) {
            // retrieve the tween
            var tween = this.getTween(name);
            // if this is not a valid tween, return
            if (tween instanceof Tween.Tween == false) {
                return;
            }
            ;
            // if the tween is set to loop
            // deep clone the object to leave the original intact
            var curTween = Object.create(tween);
            if (loop) {
                curTween.loop = true;
                curTween.loopsRemaining = loops;
            }
            // set the auto destroy on completion
            curTween.autoDestroy = autoDestroy;
            // add the clone tween to the currently running array with the associated object
            var t = {
                tween: curTween,
                obj: obj
            };
            t.tween.onStartTrigger();
            this._running.push(t);
            return (t);
        };
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        TweenManager.prototype.startDirect = function (obj, tween, loop, loops, autoDestroy) {
            // deep clone the object to leave the original intact
            var curTween = Object.create(tween);
            if (loop) {
                curTween.loop = true;
                curTween.loopsRemaining = loops;
            }
            // set the auto destroy on completion
            curTween.autoDestroy = autoDestroy;
            // add the clone tween to the currently running array with the associated object
            var t = {
                tween: curTween,
                obj: obj
            };
            t.tween.onStartTrigger();
            this._running.push(t);
            return t;
        };
        /**
         * @param {string} name - Returns a deep cloned object of the requested tween
         */
        TweenManager.prototype.clone = function (name) {
            // retrieve the tween
            var tween = this.getTween(name);
            // if this is not a valid tween, return
            if (tween instanceof Tween.Tween == false) {
                return;
            }
            ;
            var clone = this.cloneObj(tween);
            return clone;
        };
        /**
         * Clones a tween object
         */
        TweenManager.prototype.cloneObj = function (obj) {
            if (!obj || (typeof obj != "object"))
                return obj;
            var clone = this.cloneEmptyObject(obj);
            this.copyObjectProps(obj, clone);
            return clone;
        };
        /**
         * Clone object properties
         */
        TweenManager.prototype.copyObjectProps = function (objFrom, objTo) {
            for (var i in objFrom) {
                if (!objFrom.hasOwnProperty(i))
                    continue;
                if (objFrom[i] instanceof Array) {
                    objTo[i] = [];
                    for (var n = 0; n < objFrom[i].length; n++) {
                        if (typeof objFrom[i][n] == "object" && objFrom[i][n] !== null) {
                            objTo[i][n] = this.cloneEmptyObject(objFrom[i][n]);
                            this.copyObjectProps(objFrom[i][n], objTo[i][n]);
                        }
                        else {
                            objTo[i][n] = objFrom[i][n];
                        }
                    }
                    continue;
                }
                if (this.isPlainObject(objFrom[i])) {
                    objTo[i] = {};
                    this.copyObjectProps(objFrom[i], objTo[i]);
                    continue;
                }
                objTo[i] = objFrom[i];
            }
        };
        /**
         * Call the object constructor, or initalise a new one
         */
        TweenManager.prototype.cloneEmptyObject = function (o) {
            return o.constructor ? new o.constructor() : {};
        };
        /**
         * Check on the object type
         */
        TweenManager.prototype.isPlainObject = function (o) {
            if (!o || !o.constructor)
                return false;
            return o.constructor === Object;
        };
        /**
         * Gets called every request frame update
         * If there are
         */
        TweenManager.prototype.update = function () {
            // put check if paused. If the running array is empty, set bool to false
            // only set this to true when a new tween is started (sleep mode)
            for (var i in this._running) {
                // if tween is not paused
                var tween = this._running[i].tween;
                var obj = this._running[i].obj;
                if (!tween.isPaused) {
                    tween.applyUpdate(obj);
                }
                else {
                    if (tween.deleteFlag) {
                        tween.onDestroyTrigger();
                        this._running.splice(parseInt(i), 1);
                    }
                    else {
                        tween.complete();
                    }
                }
            }
        };
        // TODO -- URGENT! This does not look or return tweens that are currently running
        /**
         * @param {string} name
         * @param {boolean} cached
         */
        TweenManager.prototype.remove = function (name, cached) {
            if (cached === void 0) { cached = false; }
            // look in both this._tweens and this._running for the tween
            var tween = this.getTween(name);
            // if tween creation failed, return
            if (tween instanceof Tween.Tween == false) {
                return;
            }
            ;
            // remove reference to this object
            tween = null;
        };
        /**
         * Return the tween by name
         * @param {string} name
         */
        TweenManager.prototype.getTween = function (name) {
            var flag = false;
            var index = null;
            // search the cached tweens array
            for (var i in this._tweens) {
                if (name === i) {
                    flag = true;
                    index = i;
                }
            }
            // search the currently running array
            for (var i in this._running) {
                if (name === i) {
                    flag = true;
                    index = i;
                }
            }
            // if tween has been found, return it, else throw error and return false
            if (!flag) {
                console.error('No tween with the name "' + name + '" found!');
                return false;
            }
            else {
                return this._tweens[index];
            }
        };
        /**
         * Shorter naming for retreiving a tween
         */
        TweenManager.prototype.find = function (name) {
            var tween = this.getTween(name);
            return tween || false;
        };
        Object.defineProperty(TweenManager.prototype, "easing", {
            /**
             * Provides access to Robert Penner's easing equations
             */
            get: function () {
                return this._easing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TweenManager.prototype, "events", {
            /**
             * Give access to the events class
             */
            get: function () {
                return this._events;
            },
            enumerable: true,
            configurable: true
        });
        return TweenManager;
    }());
    Tween.TweenManager = TweenManager;
})(Tween || (Tween = {}));
//# sourceMappingURL=TweenManager.js.map