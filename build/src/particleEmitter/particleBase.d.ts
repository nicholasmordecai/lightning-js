/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class ParticleBase extends PIXI.Sprite {
        protected _texture: PIXI.Texture;
        protected _emitter: ParticleEmitter;
        protected _minX: number;
        protected _maxX: number;
        protected _minY: number;
        protected _maxY: number;
        protected _autoCull: boolean;
        protected _velX: number;
        protected _velY: number;
        protected _gX: number;
        protected _gY: number;
        protected _alphaIncrement: number;
        protected _rotationIncrement: number;
        protected _scaleIncrement: {
            x: number;
            y: number;
        };
        protected _isDead: boolean;
        protected _createdAt: number;
        protected _lifeSpan: number;
        protected _deadTime: number;
        protected _lifeTime: number;
        update: (time: number) => void;
        returnToPool: () => void;
        constructor();
        updateSimple(time: number): void;
        updateComplex(time: number): void;
    }
}
