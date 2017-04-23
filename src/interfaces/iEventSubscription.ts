/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export interface iEventSubscription {
        fn: Function; 
        ctx: Object;
        params: any;
        once: boolean;
    }
}