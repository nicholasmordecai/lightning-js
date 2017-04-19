/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    interface iEventSubscription {
        fn: Function;
        ctx: Object;
        once: boolean;
    }
}
