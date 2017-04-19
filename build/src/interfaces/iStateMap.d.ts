/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    interface iStateMap {
        key: string;
        worldIndex: number;
        active: boolean;
        fps: number;
        state: Lightning.State;
    }
}
