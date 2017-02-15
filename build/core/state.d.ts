/// <reference path="../../src/reference.d.ts" />
declare namespace Lightning {
    class State extends PIXI.Container {
        protected game: Engine;
        constructor(game: Engine, ...params: any[]);
        init(params: any): void;
        start(): void;
        update(): void;
        create(): void;
    }
}
