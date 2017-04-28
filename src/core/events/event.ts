/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class Event {

        private _emitter:EventEmitter;
        private _subscribers:Array<iEventSubscription>;
        private _proporgationAllowed:boolean;
        private _enabled:boolean;
        private _emitOnce:boolean;

        constructor(emitter:EventEmitter, emitOnce:boolean) {
            this._emitter = emitter;
            this._subscribers = [];
            this._enabled = true;
            this._proporgationAllowed = true;
            this._emitOnce = emitOnce;
        }

        /**
         * Add a subscriber
         * 
         * @param {Function} fn 
         * @param {Object} ctx 
         * @param {Array} params 
         * @param {Boolean} once 
         * 
         * @returns {iEventSubscription}
         */
        addSubscriber(fn:Function, ctx:Object, once:boolean = false, params:any = null):iEventSubscription {
            let subscriber:iEventSubscription = <iEventSubscription>{};
            subscriber.fn = fn;
            subscriber.ctx = ctx;
            subscriber.once = once;
            subscriber.params = params;
            this._subscribers.push(subscriber);
            return subscriber;
        }

        /**
         * When the event has been emitted, cycle through all subscribers and trigger their callback
         * 
         * @param params 
         * 
         * @returns {void}
         */
        emit(params):void {
            // if the event has been dissabled
            if(!this._enabled) return;

            // loop over all subscribers
            for(let i:number = 0; i < this._subscribers.length; i++) {
                // store subscription for local reference
                let subscription:iEventSubscription = this._subscribers[i];

                // call the stored function within the specific subscription instance
                subscription.fn.call(subscription.ctx, subscription.params, this, params);

                // if the subscription was added once, then remove it now
                if(subscription.once) {
                    this.removeSubscriber(subscription);
                }

                // if the event is not allowed to propogate, stop here
                if(!this._proporgationAllowed) {
                    return;
                }
            }
        }

        /**
         * Remove a subscriber from the event
         * 
         * @param subscriber 
         * 
         * @returns {boolean} true or false if the subscriber has been removed
         */
        removeSubscriber(subscriber:iEventSubscription):boolean {
            for(let i:number = 0; i < this._subscribers.length; i++) {
                if(this._subscribers[i] === subscriber) {
                    this._subscribers.splice(i, 1);
                    return true;
                }
            }
            return false;
        }


        /**
         * @description Public setter for event enabled
         * 
         * @param {boolean} Enabled
         * 
         * @returns {void}
         */
        public set enabled(val:boolean) {
            this._enabled = val;
        }

        /**
         * @description Public getter for event enabled
         * 
         * @returns {boolean} Enabled
         */
        public get enabled():boolean {
            return this._enabled;
        }

        /**
         * @description Public setter for emit once
         * 
         * @param {boolean} EmitOnce
         * 
         * @returns {void}
         */
        public set emitOnce(val:boolean) {
            this._emitOnce = val;
        }

        /**
         * @description Public getter for emit once
         * 
         * @returns {boolean} EmitOnce
         */
        public get emitOnce():boolean {
            return this._emitOnce;
        }

        public get subscribers():Array<iEventSubscription> {
            return this._subscribers;
        }
    }
}