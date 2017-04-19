/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    interface iTweenCallback {
        name: string;
        funct: Function;
        functContext: any;
        functParams: any[];
        frame: number;
        once: boolean;
    }
}
