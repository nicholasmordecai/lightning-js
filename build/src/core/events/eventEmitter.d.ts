/// <reference path="../../../../src/reference.d.ts" />
declare namespace Lightning {
    class EventEmitter {
        private _events;
        constructor();
        create(key: string, emitOnce?: boolean): Event;
        subscribe(key: string, fn: Function, ctx?: Object): boolean;
        subscribeOnce(key: string, fn: Function, ctx?: Object): boolean;
        emit(key: string, params?: Array<any>): boolean;
        event(key: string): Event;
        remove(key: string): boolean;
        enable(key: string): boolean;
        disable(key: string): boolean;
    }
}
