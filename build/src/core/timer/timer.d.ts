/// <reference path="../../../../src/reference.d.ts" />
declare namespace Lightning {
    class Timer {
        private game;
        private _events;
        private _currentTime;
        private _lastTick;
        private _autoDestroy;
        private _isLoop;
        private _interval;
        private _active;
        constructor(game: Engine, interval: number, autoStart?: boolean, loop?: boolean, autoDestroy?: boolean);
        update(time: any): void;
        add(fn: Function, ctx?: Object): void;
        start(): void;
        stop(): void;
        reset(): void;
        destroy(): void;
        remove(): void;
    }
}
