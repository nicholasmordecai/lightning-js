/// <reference path="../../../src/reference.d.ts" />
/**
 * A helper class for the 'Game'. It's used for all non essential public functions.
 * This is mostly used to keep the actual engine class neat, slim and easier to develop
 */
declare namespace Lightning {
    class EngineHelper {
        protected _dpr: number;
        protected _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        protected _world: PIXI.Container;
        protected _hud: HUD;
        protected _ticker: PIXI.ticker.Ticker;
        protected _tweens: TweenManager;
        protected _stateManager: StateManager;
        protected _physicsManager: PhysicsManager;
        protected _eventEmitter: EventEmitter;
        protected _storageManager: StorageManager;
        protected _serviceManager: ServiceManager;
        generateTexture(...params: any[]): any;
        goFullscreen(): void;
        texture(...params: any[]): any;
        backgroundColor: number;
        readonly world: PIXI.Container;
        readonly width: number;
        readonly height: number;
        readonly center: {
            x: number;
            y: number;
        };
        readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
        readonly tweens: TweenManager;
        readonly states: StateManager;
        fps: number;
        readonly minFPS: number;
        readonly elapsedTime: number;
        readonly deltaTime: number;
        readonly lastTime: number;
        dpr: number;
        readonly storage: StorageManager;
        readonly events: EventEmitter;
        readonly ticker: PIXI.ticker.Ticker;
        service(key: string): Service;
        readonly services: ServiceManager;
    }
}
