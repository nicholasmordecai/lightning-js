namespace Tween {
    export class Tween {

        // keep a reference to the parent
        private tweenManager:TweenManager;

        // ready to play
        private _playFlag:boolean = false;
        // total number of frames
        private _maxFrames:number = 0;
        // the current frame number
        private _currentFrame:number = 0;
        // array of all frames - extends frame interface
        private _frames:Array<Frame>;
        // destroy on completion flag
        private _autoDestroy:boolean = false;
        // tween paused flag
        private _isPaused:boolean = false;
        // tween loop flag
        private _loop:boolean = false;
        // tween number of loops remaining
        private _loopsRemaining:number = 0;
        // tween ready for deletion flag
        private _deleteFlag:boolean = false;

        private _onStartCallbacks:Events;
        private _onStopCallbacks:Events;
        private _onCompleteCallbacks:Events;
        private _onLoopCallbacks:Events;
        private _onPauseCallbacks:Events;
        private _onTickCallbacks:Events;
        private _onDestroyCallbacks:Events;
        private _onFrameCallbacks:Events;


        constructor(parent:TweenManager) {
            this.tweenManager = parent;
            this._frames = new Array();
            this._onStartCallbacks = new Events(this);
            this._onStopCallbacks = new Events(this);
            this._onLoopCallbacks = new Events(this);
            this._onPauseCallbacks = new Events(this);
            this._onTickCallbacks = new Events(this);
            this._onCompleteCallbacks = new Events(this);
            this._onDestroyCallbacks = new Events(this);
            this._onFrameCallbacks = new Events(this);
        }

        /**
         * Create an indivual frame at a specific position
         * @param  {number} frameId
         * @param  {number} val
         * @param  {string} property
         * @param  {boolean} relative
         */
        createFrame(frameId:number, properties:Array<any>, relative:boolean) {
            if(frameId == null) {
                frameId = this._frames.length;
            }

            for(let i = 0; i < properties.length; i++) {
                this.insertFrameValues(frameId, properties[i], relative);
            }
        }

        insertFrameValues(frameId:number, property:string, relative:boolean) {
            if(this._frames[frameId]) {
                let frame = this._frames[frameId];
                frame.addProperty(property['prop'], property['val']);
            } else {
            // this frame does not exist, create a new frame object
                let frame = new Frame(frameId, relative);
                frame.addProperty(property['prop'], property['val']);
                this._frames.push(frame);
            }
        }
        
        /**
         * Extend a frame with multiple properties
         * @param  {number} frameId
         * @param  {Array<Property>} properties
         * @param  {boolean} relative
         */
        extendFrame(frameId:number, properties:Array<Property>, relative:boolean) {
            let frame = new Frame(frameId, relative);
            this._frames.push(frame);
            for(let i of properties) {
                frame.properties.push(i);
            }
        }

        /**
         * Apply the current frame properties to an object
         * @param  {Object} obj
         */
        applyUpdate(obj:Object) {

            // apply the new frame values (array)
            let curFrame = this._frames[this._currentFrame];
            for(let i = 0; i < curFrame.properties.length; i++) {
                let prop = curFrame.properties[i].prop;
                let val = curFrame.properties[i].val;
                obj[prop] = val;
            }
            

            // check if there is an event callback on this frame
            let frameSpecific = this._onFrameCallbacks.exists(this._currentFrame);

            if(frameSpecific) {
                frameSpecific.funct();
            }

            this._currentFrame++;

            if(this._currentFrame == this._frames.length) {
                this.end();
            }

            this.onTickTrigger();
        }

        
        /**
         * Deals with the tween end logic
         */
        end() {
            // if the tween loop is not enabled
            if(this._loop == false) {
                // if the tween is to auto-destroy on completion
                if(this._autoDestroy) {
                    this.onCompleteTrigger();
                    this.destroy();
                } else {
                    // pause the tween and reset it
                    this.onCompleteTrigger();
                    this._isPaused = true;
                    this.reset();
                }
            } else if (this._loopsRemaining > 0) {
                // if the tween has more loops
                this.loop();
            } else {
                //if the tween has no loops left
                if(this._autoDestroy) {
                    this.onCompleteTrigger();
                    this.destroy();
                } else {
                    this.onCompleteTrigger();
                    this._isPaused = true;
                    this.reset();
                }
            }
        }

        /**
         * When the tween manager starts a new tween, the on start callbacks are triggered
         */
        onStartTrigger() {
            this._onStartCallbacks.trigger();
        }

        /**
         * Called when the tween is destroyed (can only be done from outside this class)
         */
        onDestroyTrigger() {
            this._onDestroyCallbacks.trigger();
        }

        onFrameTrigger() {
            this._onFrameCallbacks.trigger();
        }

        /**
         * Called when the tween receives an update from the tween manager
         */
        onTickTrigger() {
            this._onTickCallbacks.trigger();
        }

        onCompleteTrigger() {
            this._onCompleteCallbacks.trigger();
        }

        /**
         * Reset the current frame to 0
         */
        reset() {
            this._currentFrame = 0;
        }

        start(obj:Object, loop:boolean, loops:number, autoDestroy:boolean) {
            let tween = this.tweenManager.startDirect(obj, this, loop, loops, autoDestroy);
            return tween;
        }

        /**
         * Called when the tween is looped back to the beginning
         */
        loop() {
            this._onLoopCallbacks.trigger();
            this._loopsRemaining--;
            this._currentFrame = 0;
        }

        /**
         * Called by the user, or when 
         */
        stop() {
        this._onStopCallbacks.trigger();
            this._isPaused = true;
            this._currentFrame = 0;
        }

        complete() {
            this.end();
        }

        chain(tween:Tween) {
            //// ---- need to implement simple chain function to make the api easier to use ---- /////
            // this._onCompleteCallbacks.addOnce(null, () => {
                
            // });
        }

        /**
         * Set the destroy flag ready for deletion on the next update
         */
        destroy() {
            this._isPaused = true;
            this._deleteFlag = true;
        }

        /**
         * Pause the tween
         */
        pause() {
            this._onPauseCallbacks.trigger();
            this._isPaused = true;
        }

        /**
         * Remove a frame from the frames array
         */
        public removeFrame(frame:number, length:number = 1):void {               
            this._frames.splice(frame, length);
        }

        /**
         *
         * @returns {boolean}
         */
        get hasStarted():boolean {
            if(this._currentFrame > 0) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * Calculates if the tween has been finished
         * @returns {boolean}
         */
        get hasFinished():boolean {
            if(this._currentFrame === this._maxFrames && this._loopsRemaining === 0) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * Returns the current frame number
         * @returns {number}
         */
        get currentFrame(): number {
            return this._currentFrame;
        }

        /**
         * set the current frame number
         * @param {number} val
         */
        set currentFrame(val:number) {
            this._currentFrame = val;
        }

        /**
         * Return the maximum number of frames in this tween (not taking into account loops)
         * @returns {number}
         */
        get maxFrames(): number {
            return this._frames.length;
        }

        /**
         * Returns an array of the tween frames
         */
        get frames():Array<Frame> {
            return this._frames;
        }

        /**
         * Returns if the tween is to auto destroy on completion
         * @returns {boolean}
         */
        get autoDestroy(): boolean {
            return this._autoDestroy;
        }

        /**
         * Sets the auto destroy flag
         * @param value
         */
        set autoDestroy(value: boolean) {
            this._autoDestroy = value;
        }

        /**
         * Returns true if the tween is in a paused state
         * @returns {boolean}
         */
        get isPaused(): boolean {
            return this._isPaused;
        }

        /**
         * Returns true if looping is enabled
         * @returns {boolean}
         */
        get looping(): boolean {
            return this._loop;
        }

        /**
         * Set the looping enabled
         * @param value
         */
        set looping(value: boolean) {
            this._loop = value;
        }

        /**
         * Returns the number of loops remaining
         * @returns {number}
         */
        get loopsRemaining(): number {
            return this._loopsRemaining;
        }

        /**
         * Set the number of loops remaining
         * @param value
         */
        set loopsRemaining(value: number) {
            this._loopsRemaining = value;
        }

        /**
         * Returns true if the tween is ready to be deleted
         * @returns {boolean}
         */
        get deleteFlag(): boolean {
            return this._deleteFlag;
        }


        get playFlag(): boolean {
            return this._playFlag;
        }

        set playFlag(value: boolean) {
            this._playFlag = value;
        }

        set frame(val:number) {
            this._currentFrame = val;
        }

        get events():Object {
            return {
                "onStart": this._onStartCallbacks,
                "onStop": this._onStopCallbacks,
                "onLoop": this._onLoopCallbacks,
                "onComplete": this._onCompleteCallbacks,
                "onPause": this._onPauseCallbacks,
                "onTick" :this._onTickCallbacks,
                "onDestroy": this._onDestroyCallbacks,
                "onFrame": this._onFrameCallbacks
            }
        }

        
    }


    /**
     * Notes
     * 
     * 1. When resetting, the variables should reset to that of the initial creation including looping values etc
     * 2. Make a starting function that calls the parent to start the tween
     * 3. Potentially make functions to shuffle / reorder the events
    */
}