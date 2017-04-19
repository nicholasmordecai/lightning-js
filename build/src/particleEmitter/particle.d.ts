/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Particle extends ParticleBase {
        constructor(texture: PIXI.Texture, emitter: ParticleEmitter, minX: number, maxX: number, minY: number, maxY: number);
        renderWebGL(renderer: any): void;
        renderAdvancedWebGL(renderer: any): void;
        renderCanvas(renderer: any): void;
        updateTransform(): void;
        destroy(): void;
        calculateBounds(): void;
        _returnToPool(): void;
        velocity: {
            x: number;
            y: number;
        };
        gravity: {
            x: number;
            y: number;
        };
        lifeSpan: number;
        alphaIncrement: number;
        rotationIncrement: number;
        scaleIncrement: {
            x: number;
            y: number;
        };
        createdAt: number;
        lifeTime: number;
        isDead: boolean;
    }
}
