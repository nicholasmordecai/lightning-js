/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export interface iStateMap {
        key:string;
        worldIndex:number;
        active:boolean;
        fps:number;
        state:Lightning.State;
    }
}