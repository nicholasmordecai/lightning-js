/// <reference path="../../../src/reference.d.ts" />
/**
 * Fade in / Scale in sprites - optional
 * Simple / Advanced -- for creating ultra performant particles in the 50k+ range
 * Colour Shift
 * Checking the container class in pixi, I should think about refactoring the calculate bounds function.. if it's looping over 10k children to calculate it's bounds, that's going to get expensive!
 */
declare namespace Lightning {
    class ParticleEmitter extends Group {
        protected game: Engine;
        protected state: State;
        protected _debug: boolean;
        protected _debugFn: any;
        protected _aliveText: PIXI.Text;
        protected _deadPoolText: PIXI.Text;
        protected _intervalText: PIXI.Text;
        protected _strengthText: PIXI.Text;
        protected _emit: boolean;
        protected _nextEmit: number;
        protected _interval: number;
        protected _lastStart: number;
        protected _time: number;
        protected _textures: Array<PIXI.Texture>;
        protected _respectPosition: boolean;
        protected _respectPositionValues: iPoint;
        protected _deadPool: Array<Particle>;
        protected _gravity: iPoint;
        protected _nGravity: number;
        protected _spread: iPointRange;
        protected _lifeSpanRange: iRange;
        protected _particleStrength: number;
        protected _particleScaleRange: iPointRange;
        protected _particleAlphaRange: iRange;
        protected _particleRotationRange: iRange;
        protected _particleVelocityRange: iPointRange;
        protected _particleRotationIncrement: iRange;
        protected _particleScaleIncrement: iPointRange;
        protected _particleAlphaIncrement: iRange;
        gravityWells: Array<any>;
        obstacles: Array<any>;
        constructor(state: State, x?: number, y?: number);
        private tick(time);
        updateTransform(): void;
        /**
         * @param  {string} key
         * @param  {DisplayObject} particle
         */
        add(...params: Array<PIXI.Texture>): void;
        start(time?: number): void;
        fireEmitter(): void;
        createParticle(): void;
        stop(): void;
        returnToPool(particle: Particle): void;
        /**
         * TODO this seems to break the create particle function for some reason
         */
        private clearPool();
        startDrag(event: PIXI.interaction.InteractionEvent): void;
        enableDebug(interval?: number, floatLeft?: boolean, floatTop?: boolean): void;
        enableDrag(respectPosition?: boolean): void;
        stopDrag(event: PIXI.interaction.InteractionEvent): void;
        onDrag(event: PIXI.interaction.InteractionEvent): void;
        setSpread(xFrom: number, xTo: number, yFrom: number, yTo: number): void;
        setGravity(x: number, y?: number): void;
        setLifeSpan(from: number, to?: number): void;
        setInterval(val: number): void;
        setVelocityRange(xFrom: number, xTo: number, yFrom?: number, yTo?: number): void;
        setRotationIncrement(from: number, to?: number): void;
        setScaleIncrement(xFrom: number, xTo: number, yFrom?: number, yTo?: number): void;
        setAlphaIncrement(from: number, to?: number): void;
        setScaleRange(xFrom: number, xTo: number, yFrom?: number, yTo?: number): void;
        setAlphaRange(from: number, to?: number): void;
        setRotationRange(from: number, to?: number): void;
        setStrength(val: number): void;
        readonly alive: number;
        readonly pool: number;
        nGravity: number;
    }
}
