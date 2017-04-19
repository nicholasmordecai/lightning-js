/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    interface iServiceAction {
        route: string;
        headers: Array<{
            content: string;
            value: string;
        }>;
        actionType: string;
        body: any;
        cb: Function;
        ctx: Object;
    }
}
