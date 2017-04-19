/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export interface iTweenCallback {
        name:string;
        funct:Function;
        functContext:any;
        functParams:any[];
        frame:number;
        once:boolean;
    }
}