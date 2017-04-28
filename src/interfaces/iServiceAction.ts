/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export interface iServiceAction {
        route:string;
        headers:Array<{content:string, value:string}>;
        actionType:string;
        body:any;
        cb:Function;
        ctx:Object;
    } 
}