/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export interface iStateMap {
        key:string;
        worldIndex:number;
        active:boolean;
        fps:number;
        constructed:boolean;
        state:Lightning.State;
    }
}