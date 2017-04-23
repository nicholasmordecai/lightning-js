/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class EventEmitter {

        private _events:{[key:string]: Event};
        private _enabled:boolean

        constructor() {
            this._events = {};
            this._enabled = true;
        }

        /**
         * @description Create an event 
         * 
         * @param {string} key 
         * @param {boolean} emitOnce
         * 
         * @returns {Event} 
         */
        public create(key:string, emitOnce:boolean = false):Event {
            let event = new Event(this, emitOnce);
            this._events[key] = event;
            this._events[key].emitOnce = emitOnce;
            return event;
        }

        /**
         * @description Subscribe to an event
         * 
         * @param {string} key 
         * @param {Function} fn 
         * @param {Object} ctx 
         * @param {Array} params 
         * 
         * @returns {Event}
         */
        public subscribe(key:string, fn:Function, ctx:Object = null, ... params:Array<any>):iEventSubscription {
            return this._events[key].addSubscriber(fn, ctx, false, params);
        }

        /**
         * @description Subscribe to an event once. Same process as regular subscription, however gets removed after first emit
         * 
         * @param {string} key 
         * @param {Function} fn 
         * @param {Object} ctx 
         * @param {Array} params 
         * 
         * @returns {Event}
         */
        public subscribeOnce(key:string, fn:Function, ctx:Object = null, ... params:Array<any>):iEventSubscription {
            return this._events[key].addSubscriber(fn, ctx, true, params);
        }

        /**
         * @description Emits any events with the given key
         * 
         * @param {string} key 
         * @param {Array} params 
         * 
         * @returns {void}
         */
        public emit(key:string, params:Array<any> = null) {
            // check if event emitter is enabled
            if(!this._enabled) return;
            this._events[key].emit(params);
        }

        /**
         * @description returns an event by it's key pair value
         * 
         * @param {string} key 
         * 
         * @returns {Event}
         */
        public event(key:string):Event {
            return this._events[key];
        }

        /**
         * @description Remove an event from the emitter
         * 
         * @param {string} key 
         * 
         * @returns {Event}
         */
        public remove(key:string):Event {
            let event = this._events[key];
            this._events[key] = null;
            return event;
        }

        /**
         * @description Remove a callback from an event
         * 
         * @param {string} key
         * @param {iEventSubscription} event
         * 
         * @returns {void}
         */
        public unsubscribe(key:string, event:iEventSubscription):void {
            this._events[key].removeSubscriber(event);
        }

        /**
         * @description Enable a specific event
         * 
         * @param {string} key 
         * 
         * @returns {boolean}
         */
        public enableEvent(key:string):boolean {
            this._events[key].enabled = true;
            return true;
        }

        /**
         * @description Disable a specific event
         * 
         * @param {string} key
         * 
         * @returns {boolean} 
         */
        public disableEvent(key:string):boolean {
            this._events[key].enabled = false;
            return true;
        }

        /**
         * @description Public setter for the emitter enabled property
         * 
         * @param {boolean} enabled
         */
        public set enabled(val:boolean) {
            this._enabled = val;
        }

        /**
         * @description Public getter fro the emitter enabled property
         * 
         * @returns {boolean} enabled
         */
        public get enabled():boolean {
            return this._enabled;
        }
    }
}