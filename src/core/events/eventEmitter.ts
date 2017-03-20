/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class EventEmitter {

        private _events:{[key:string]: Event};

        constructor() {
            this._events = {};
        }

        create(key:string, emitOnce:boolean = false):Event {
            let event = new Event(this);
            this._events[key] = event;
            return event;
        }

        subscribe(key:string, fn:Function, ctx:Object = null):boolean {
            this._events[key].addSubscriber(fn, ctx);
            return true;
        }

        subscribeOnce(key:string, fn:Function, ctx:Object = null):boolean {
            this._events[key].addSubscriber(fn, ctx, true);
            return true;
        }

        emit(key:string, params:Array<any> = null):boolean {
            this._events[key].emit(params);
            return true;
        }

        event(key:string):Event {
            return this._events[key];
        }

        remove(key:string):boolean {
            this._events[key] = null;
            return true;
        }

        enable(key:string):boolean {
            this._events[key].enabled = true;
            return true;
        }

        disable(key:string):boolean {
            this._events[key].enabled = false;
            return true;
        }
    }
}