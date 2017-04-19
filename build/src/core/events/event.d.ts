/// <reference path="../../../../src/reference.d.ts" />
declare namespace Lightning {
    class Event {
        private _emitter;
        private _subscribers;
        private _proporgationAllowed;
        private _enabled;
        constructor(emitter: EventEmitter);
        addSubscriber(fn: Function, ctx: Object, once?: boolean): void;
        emit(params: any): void;
        removeSubscriber(subscriber: iEventSubscription): void;
        enabled: boolean;
    }
}
