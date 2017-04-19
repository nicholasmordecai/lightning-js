/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Tween {
        private tweenManager;
        private _playFlag;
        private _maxFrames;
        private _currentFrame;
        private _frames;
        private _autoDestroy;
        private _isPaused;
        private _loop;
        private _loopsRemaining;
        private _deleteFlag;
        private _onStartCallbacks;
        private _onStopCallbacks;
        private _onCompleteCallbacks;
        private _onLoopCallbacks;
        private _onPauseCallbacks;
        private _onTickCallbacks;
        private _onDestroyCallbacks;
        private _onFrameCallbacks;
        constructor(parent: TweenManager);
        /**
         * Create an indivual frame at a specific position
         * @param  {number} frameId
         * @param  {number} val
         * @param  {string} property
         * @param  {boolean} relative
         */
        createFrame(frameId: number, properties: Array<any>, relative: boolean): void;
        insertFrameValues(frameId: number, property: string, relative: boolean): void;
        /**
         * Extend a frame with multiple properties
         * @param  {number} frameId
         * @param  {Array<Property>} properties
         * @param  {boolean} relative
         */
        extendFrame(frameId: number, properties: Array<iTweenProperty>, relative: boolean): void;
        /**
         * Apply the current frame properties to an object
         * @param  {Object} obj
         */
        applyUpdate(obj: Object): void;
        /**
         * Deals with the tween end logic
         */
        end(): void;
        /**
         * When the tween manager starts a new tween, the on start callbacks are triggered
         */
        onStartTrigger(): void;
        /**
         * Called when the tween is destroyed (can only be done from outside this class)
         */
        onDestroyTrigger(): void;
        onFrameTrigger(): void;
        /**
         * Called when the tween receives an update from the tween manager
         */
        onTickTrigger(): void;
        onCompleteTrigger(): void;
        /**
         * Reset the current frame to 0
         */
        reset(): void;
        start(obj: Object, loop: boolean, loops: number, autoDestroy: boolean): {
            tween: any;
            obj: Object;
        };
        /**
         * Called when the tween is looped back to the beginning
         */
        loop(): void;
        /**
         * Called by the user, or when
         */
        stop(): void;
        complete(): void;
        chain(tween: Tween): void;
        /**
         * Set the destroy flag ready for deletion on the next update
         */
        destroy(): void;
        /**
         * Pause the tween
         */
        pause(): void;
        /**
         * Remove a frame from the frames array
         */
        removeFrame(frame: number, length?: number): void;
        /**
         *
         * @returns {boolean}
         */
        readonly hasStarted: boolean;
        /**
         * Calculates if the tween has been finished
         * @returns {boolean}
         */
        readonly hasFinished: boolean;
        /**
         * Returns the current frame number
         * @returns {number}
         */
        /**
         * set the current frame number
         * @param {number} val
         */
        currentFrame: number;
        /**
         * Return the maximum number of frames in this tween (not taking into account loops)
         * @returns {number}
         */
        readonly maxFrames: number;
        /**
         * Returns an array of the tween frames
         */
        readonly frames: Array<Frame>;
        /**
         * Returns if the tween is to auto destroy on completion
         * @returns {boolean}
         */
        /**
         * Sets the auto destroy flag
         * @param value
         */
        autoDestroy: boolean;
        /**
         * Returns true if the tween is in a paused state
         * @returns {boolean}
         */
        readonly isPaused: boolean;
        /**
         * Returns true if looping is enabled
         * @returns {boolean}
         */
        /**
         * Set the looping enabled
         * @param value
         */
        looping: boolean;
        /**
         * Returns the number of loops remaining
         * @returns {number}
         */
        /**
         * Set the number of loops remaining
         * @param value
         */
        loopsRemaining: number;
        /**
         * Returns true if the tween is ready to be deleted
         * @returns {boolean}
         */
        readonly deleteFlag: boolean;
        playFlag: boolean;
        frame: number;
        readonly events: Object;
    }
}
