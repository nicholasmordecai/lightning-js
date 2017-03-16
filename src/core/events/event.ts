/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class Event {

        private _emitter:EventEmitter;
        private _subscribers:Array<iEventSubscription>;
        private _proporgationAllowed:boolean = true;
        private _enabled:boolean = true;

        constructor(emitter:EventEmitter) {
            this._emitter = emitter;
            this._subscribers = [];
        }

        addSubscriber(fn:Function, ctx:Object, once:boolean = false) {
            let subscriber:iEventSubscription = <iEventSubscription>{};
            subscriber.fn = fn;
            subscriber.ctx = ctx;
            subscriber.once = once;
            this._subscribers.push(subscriber);
        }

        emit(params) {
            if(!this._enabled) return;
            for(let i:number = 0; i < this._subscribers.length; i++) {
                let subscription:iEventSubscription = this._subscribers[i];
                subscription.fn(params, subscription.ctx);

                if(subscription.once) {
                    this.removeSubscriber(subscription);
                }

                if(!this._proporgationAllowed) {
                    return;
                }
            }
        }

        removeSubscriber(subscriber:iEventSubscription) {
            for(let i:number = 0; i < this._subscribers.length; i++) {
                if(this._subscribers[i] === subscriber) {
                    this._subscribers.splice(i, 1);
                }
            }
        }

        public set enabled(val:boolean) {
            this._enabled = val;
        }

        public get enabled():boolean {
            return this._enabled;
        }
    }
}