/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning.UI {
    class Button extends Sprite {
        protected game: Engine;
        protected _primitive: string;
        protected _hitArea: HitArea;
        constructor(game: Engine, texture?: any);
        initalise(): void;
        setAnchor(aX: any, aY?: any): void;
        readonly hit: HitArea;
    }
}
