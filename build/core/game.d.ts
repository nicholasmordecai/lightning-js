/// <reference path="../../src/reference.d.ts" />
declare namespace Lightning {
    class Engine {
        private _renderer;
        private _world;
        private _ticker;
        private _activateState;
        private _tweens;
        private _signals;
        private _physicsActive;
        private _physicsWorld;
        private _physicsWorldBounds;
        private _stats;
        private _statsEnabled;
        constructor(width: any, height: any, canvasId?: string);
        update(time: any): void;
        startState(state: any, ...params: any[]): void;
        initState(state: State, params: any): void;
        startPhysics(): void;
        collideOnWorldBounds(): void;
        backgroundColor: number;
        state: State;
        readonly world: PIXI.Container;
        readonly width: number;
        readonly height: number;
        readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
        readonly tweens: Tween.TweenManager;
        readonly signals: Signals.SignalManager;
        readonly physics: Box2D.Dynamics.b2World;
        readonly physicsWorldBounds: Box2D.Dynamics.b2BodyDef;
    }
}
