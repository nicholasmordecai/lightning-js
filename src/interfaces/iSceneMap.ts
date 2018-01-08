/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export interface iSceneMap {
        key:string;
        worldIndex:number;
        active:boolean;
        fps:number;
        constructed:boolean;
        scene:Scene;
    }
}