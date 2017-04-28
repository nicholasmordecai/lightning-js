/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Tween = (function () {
        function Tween(parent) {
            // ready to play
            this._playFlag = false;
            // total number of frames
            this._maxFrames = 0;
            // the current frame number
            this._currentFrame = 0;
            // destroy on completion flag
            this._autoDestroy = false;
            // tween paused flag
            this._isPaused = false;
            // tween loop flag
            this._loop = false;
            // tween number of loops remaining
            this._loopsRemaining = 0;
            // tween ready for deletion flag
            this._deleteFlag = false;
            this.tweenManager = parent;
            this._frames = new Array();
            this._onStartCallbacks = new Lightning.Events(this);
            this._onStopCallbacks = new Lightning.Events(this);
            this._onLoopCallbacks = new Lightning.Events(this);
            this._onPauseCallbacks = new Lightning.Events(this);
            this._onTickCallbacks = new Lightning.Events(this);
            this._onCompleteCallbacks = new Lightning.Events(this);
            this._onDestroyCallbacks = new Lightning.Events(this);
            this._onFrameCallbacks = new Lightning.Events(this);
        }
        /**
         * Create an indivual frame at a specific position
         * @param  {number} frameId
         * @param  {number} val
         * @param  {string} property
         * @param  {boolean} relative
         */
        Tween.prototype.createFrame = function (frameId, properties, relative) {
            if (frameId == null) {
                frameId = this._frames.length;
            }
            for (var i = 0; i < properties.length; i++) {
                this.insertFrameValues(frameId, properties[i], relative);
            }
        };
        Tween.prototype.insertFrameValues = function (frameId, property, relative) {
            if (this._frames[frameId]) {
                var frame = this._frames[frameId];
                frame.addProperty(property['prop'], property['val']);
            }
            else {
                // this frame does not exist, create a new frame object
                var frame = new Lightning.Frame(frameId, relative);
                frame.addProperty(property['prop'], property['val']);
                this._frames.push(frame);
            }
        };
        /**
         * Extend a frame with multiple properties
         * @param  {number} frameId
         * @param  {Array<Property>} properties
         * @param  {boolean} relative
         */
        Tween.prototype.extendFrame = function (frameId, properties, relative) {
            var frame = new Lightning.Frame(frameId, relative);
            this._frames.push(frame);
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var i = properties_1[_i];
                frame.properties.push(i);
            }
        };
        /**
         * Apply the current frame properties to an object
         * @param  {Object} obj
         */
        Tween.prototype.applyUpdate = function (obj) {
            // apply the new frame values (array)
            var curFrame = this._frames[this._currentFrame];
            for (var i = 0; i < curFrame.properties.length; i++) {
                var prop = curFrame.properties[i].prop;
                var val = curFrame.properties[i].val;
                obj[prop] = val;
            }
            // check if there is an event callback on this frame
            var frameSpecific = this._onFrameCallbacks.exists(this._currentFrame);
            if (frameSpecific) {
                frameSpecific.funct();
            }
            this._currentFrame++;
            if (this._currentFrame == this._frames.length) {
                this.end();
            }
            this.onTickTrigger();
        };
        /**
         * Deals with the tween end logic
         */
        Tween.prototype.end = function () {
            // if the tween loop is not enabled
            if (this._loop == false) {
                // if the tween is to auto-destroy on completion
                if (this._autoDestroy) {
                    this.onCompleteTrigger();
                    this.destroy();
                }
                else {
                    // pause the tween and reset it
                    this.onCompleteTrigger();
                    this._isPaused = true;
                    this.reset();
                }
            }
            else if (this._loopsRemaining > 0) {
                // if the tween has more loops
                this.loop();
            }
            else {
                //if the tween has no loops left
                if (this._autoDestroy) {
                    this.onCompleteTrigger();
                    this.destroy();
                }
                else {
                    this.onCompleteTrigger();
                    this._isPaused = true;
                    this.reset();
                }
            }
        };
        /**
         * When the tween manager starts a new tween, the on start callbacks are triggered
         */
        Tween.prototype.onStartTrigger = function () {
            this._onStartCallbacks.trigger();
        };
        /**
         * Called when the tween is destroyed (can only be done from outside this class)
         */
        Tween.prototype.onDestroyTrigger = function () {
            this._onDestroyCallbacks.trigger();
        };
        Tween.prototype.onFrameTrigger = function () {
            this._onFrameCallbacks.trigger();
        };
        /**
         * Called when the tween receives an update from the tween manager
         */
        Tween.prototype.onTickTrigger = function () {
            this._onTickCallbacks.trigger();
        };
        Tween.prototype.onCompleteTrigger = function () {
            this._onCompleteCallbacks.trigger();
        };
        /**
         * Reset the current frame to 0
         */
        Tween.prototype.reset = function () {
            this._currentFrame = 0;
        };
        Tween.prototype.start = function (obj, loop, loops, autoDestroy) {
            var tween = this.tweenManager.startDirect(obj, this, loop, loops, autoDestroy);
            return tween;
        };
        /**
         * Called when the tween is looped back to the beginning
         */
        Tween.prototype.loop = function () {
            this._onLoopCallbacks.trigger();
            this._loopsRemaining--;
            this._currentFrame = 0;
        };
        /**
         * Called by the user, or when
         */
        Tween.prototype.stop = function () {
            this._onStopCallbacks.trigger();
            this._isPaused = true;
            this._currentFrame = 0;
        };
        Tween.prototype.complete = function () {
            this.end();
        };
        Tween.prototype.chain = function (tween) {
            //// ---- need to implement simple chain function to make the api easier to use ---- /////
            // this._onCompleteCallbacks.addOnce(null, () => {
            // });
        };
        /**
         * Set the destroy flag ready for deletion on the next update
         */
        Tween.prototype.destroy = function () {
            this._isPaused = true;
            this._deleteFlag = true;
        };
        /**
         * Pause the tween
         */
        Tween.prototype.pause = function () {
            this._onPauseCallbacks.trigger();
            this._isPaused = true;
        };
        /**
         * Remove a frame from the frames array
         */
        Tween.prototype.removeFrame = function (frame, length) {
            if (length === void 0) { length = 1; }
            this._frames.splice(frame, length);
        };
        Object.defineProperty(Tween.prototype, "hasStarted", {
            /**
             *
             * @returns {boolean}
             */
            get: function () {
                if (this._currentFrame > 0) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "hasFinished", {
            /**
             * Calculates if the tween has been finished
             * @returns {boolean}
             */
            get: function () {
                if (this._currentFrame === this._maxFrames && this._loopsRemaining === 0) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "currentFrame", {
            /**
             * Returns the current frame number
             * @returns {number}
             */
            get: function () {
                return this._currentFrame;
            },
            /**
             * set the current frame number
             * @param {number} val
             */
            set: function (val) {
                this._currentFrame = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "maxFrames", {
            /**
             * Return the maximum number of frames in this tween (not taking into account loops)
             * @returns {number}
             */
            get: function () {
                return this._frames.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "frames", {
            /**
             * Returns an array of the tween frames
             */
            get: function () {
                return this._frames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "autoDestroy", {
            /**
             * Returns if the tween is to auto destroy on completion
             * @returns {boolean}
             */
            get: function () {
                return this._autoDestroy;
            },
            /**
             * Sets the auto destroy flag
             * @param value
             */
            set: function (value) {
                this._autoDestroy = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "isPaused", {
            /**
             * Returns true if the tween is in a paused state
             * @returns {boolean}
             */
            get: function () {
                return this._isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "looping", {
            /**
             * Returns true if looping is enabled
             * @returns {boolean}
             */
            get: function () {
                return this._loop;
            },
            /**
             * Set the looping enabled
             * @param value
             */
            set: function (value) {
                this._loop = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "loopsRemaining", {
            /**
             * Returns the number of loops remaining
             * @returns {number}
             */
            get: function () {
                return this._loopsRemaining;
            },
            /**
             * Set the number of loops remaining
             * @param value
             */
            set: function (value) {
                this._loopsRemaining = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "deleteFlag", {
            /**
             * Returns true if the tween is ready to be deleted
             * @returns {boolean}
             */
            get: function () {
                return this._deleteFlag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "playFlag", {
            get: function () {
                return this._playFlag;
            },
            set: function (value) {
                this._playFlag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "frame", {
            set: function (val) {
                this._currentFrame = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "events", {
            get: function () {
                return {
                    "onStart": this._onStartCallbacks,
                    "onStop": this._onStopCallbacks,
                    "onLoop": this._onLoopCallbacks,
                    "onComplete": this._onCompleteCallbacks,
                    "onPause": this._onPauseCallbacks,
                    "onTick": this._onTickCallbacks,
                    "onDestroy": this._onDestroyCallbacks,
                    "onFrame": this._onFrameCallbacks
                };
            },
            enumerable: true,
            configurable: true
        });
        return Tween;
    }());
    Lightning.Tween = Tween;
    /**
     * Notes
     *
     * 1. When resetting, the variables should reset to that of the initial creation including looping values etc
     * 2. Make a starting function that calls the parent to start the tween
     * 3. Potentially make functions to shuffle / reorder the events
    */
})(Lightning || (Lightning = {}));
