/// <reference path="./../reference.d.ts" />

/**
 * Pool Sprites
 */

declare interface iPosition {
    x: number;
    y: number;
}

declare interface iRange {
    from:number;
    to:number;
}

declare interface iPointRange {
    xFrom:number;
    xTo:number;
    yFrom:number;
    yTo:number;
}

namespace Lightning {
    export class ParticleEmitter extends Group {

        protected _emit:boolean = false;
        protected _nextEmit:number = null;
        protected _interval:number = 500;
        protected _lastStart:number = null;
        protected _time:number = null;
        protected _textures:Array<PIXI.Texture> = [];
        
        protected _deadPool:Array<Particle> = [];

        protected _gravity:iPosition = {x: 0, y: 0};
        protected _spread:iPointRange= {xFrom: -2, xTo: 2, yFrom: -2, yTo: 2};
        protected _lifeSpanRange:iRange = {from:3000, to:3000};
        protected _particleStrength:number = 1;

        protected _particleScaleRange:iPointRange = null;
        protected _particleAlphaRange:iRange = null;
        protected _particleRotationRange:iRange = null;
        protected _particleVelocityRange:iPointRange = null; 

        protected _particleRotationIncrement:iRange = null;
        protected _particleScaleIncrement:iPointRange = null;
        protected _particleAlphaIncrement:iRange = null;

        constructor(x:number = 0, y:number = 0) {
            super();
            this.x = x;
            this.y = y;
        }

        update():void {

            for(let i of this.children) {
                i['update']();
            }

            if(this._time !== null && Date.now() > this._lastStart + this._time) {
                this.stop();
                return;
            }

            if(this._emit && this._nextEmit < Date.now()) {
                this._nextEmit = Date.now() + this._interval;
                this.fireEmitter();
            }
        }

        /**
         * @param  {string} key
         * @param  {DisplayObject} particle
         */
        add(...params:Array<PIXI.Texture>):void {
            for(let i of params) {
                this._textures.push(i);
            }
        }

        start(time:number = null):void {
            if(time === 0) {
                this.fireEmitter();
            } else {
                this._emit = true;
                this._time = time;
                this._lastStart = Date.now();
            }
        }

        fireEmitter() {
            if(this._particleStrength === 1) {
                this.createParticle(); 
            } else {
                for(let i = 0; i < this._particleStrength; i++) {
                    this.createParticle();
                }
            }
        }

        createParticle():void {
            // get the texture from the textures array
            let texture:PIXI.Texture = this._textures[Math.floor(Math.random() * this._textures.length)];

            let particle:Particle = null;

            // create new particle
            if(this._deadPool.length > 0) {
                particle = this._deadPool.splice(0, 1)[0];
            } else {
                // increment the id hash value to create the particle
                particle = new Particle(texture, this);
            }
            
            // set gravity
            particle.gravity = (this._gravity);
            
            // calculate positions
            let x:number = Maths.rngInt(this._spread.xFrom, this._spread.xTo);
            let y:number = Maths.rngInt(this._spread.yFrom, this._spread.yTo);
            particle.x = x;
            particle.y = y;

            // calculate random velocity ranges
            let rndVelX:number = Maths.rngFloat(this._particleVelocityRange.xFrom, this._particleVelocityRange.xTo);
            let rndVelY:number = Maths.rngFloat(this._particleVelocityRange.yFrom, this._particleVelocityRange.yTo);
            particle.velocity = ({x: rndVelX, y: rndVelY});

            // calculate random life span
            let rndLifeSpan:number = Maths.rngInt(this._lifeSpanRange.to, this._lifeSpanRange.from);
            particle.lifeSpan = rndLifeSpan;

            // calculate alpha
            if(this._particleAlphaRange) {
                let alpha:number = Maths.rngFloat(this._particleAlphaRange.from, this._particleAlphaRange.to);
                particle.alpha = alpha;
            }

            // calculate scale
            if(this._particleScaleRange) {
                let scaleX:number = Maths.rngFloat(this._particleScaleRange.xFrom, this._particleScaleRange.xTo);
                // commented this out because of undesiered effects
                // let scaleY:number = Maths.rngFloat(this._particleScaleRange.yFrom, this._particleScaleRange.yTo);
                particle.setScale(scaleX, scaleX);
            }

            // calculate rotation
            if(this._particleRotationRange) {
                let rotation:number = Maths.rngFloat(this._particleRotationRange.from, this._particleRotationRange.to);
                particle.rotation = rotation;
            }

            // calculate rotation increment
            if(this._particleRotationIncrement) {
                let rotationIncrement:number =  Maths.rngFloat(this._particleRotationIncrement.from, this._particleRotationIncrement.to);
                particle.rotationIncrement = rotationIncrement;
            }
            
            // calculate alpha increment
            if(this._particleAlphaIncrement) {
                let alphaIncrement:number = Maths.rngFloat(this._particleAlphaIncrement.from, this._particleAlphaIncrement.to);
                particle.alphaIncrement = alphaIncrement;
            }
            
            // calculate scale increment
            if(this._particleScaleIncrement) {
                let scaleIncrementX:number = Maths.rngFloat(this._particleScaleIncrement.xFrom, this._particleScaleIncrement.xTo);

                // commented this out because it was causing the scaling to give undesired effects

                // let scaleIncrementY:number = Maths.rngFloat(this._particleScaleIncrement.yFrom, this._particleScaleIncrement.yTo);

                particle.scaleIncrement = {x: scaleIncrementX, y: scaleIncrementX};
            }

            particle.createdAt = Date.now();
            this.addChild(particle);
        }

        stop() {
            this._emit = false;
        }

        returnToPool(particle:Particle) {
            let p:any = this.removeChild(particle);

            this._deadPool.push(p);
        }

        setSpread(xFrom:number, xTo:number, yFrom:number, yTo:number):void {
            this._spread = {xFrom: xFrom, xTo: xTo, yFrom: yFrom, yTo: yTo};
        }

        setGravity(x:number, y:number = x):void {
            this._gravity = {x: x, y: y};
        }

        setLifeSpan(from:number, to:number = from):void {
            this._lifeSpanRange = {from: from, to: to};
        }

        setInterval(val:number):void {
            this._interval = val;
        }

        setVelocityRange(xFrom:number, xTo:number, yFrom:number = xFrom, yTo:number = xTo):void {
            this._particleVelocityRange = {xFrom: xFrom, xTo: xTo, yFrom: yFrom, yTo: yTo};
        }

        setRotationIncrement(from:number, to:number = from):void {
            this._particleRotationIncrement = {from: from, to: to};
        }

        setScaleIncrement(xFrom:number, xTo:number, yFrom:number = xFrom, yTo:number = xTo):void {
            this._particleScaleIncrement = {xFrom: xFrom, xTo: xTo, yFrom: yFrom, yTo: yTo};
        }

        setAlphaIncrement(from:number, to:number = from):void {
            this._particleAlphaIncrement = {from: from, to: to};
        }

        setScaleRange(xFrom:number, xTo:number, yFrom:number = xFrom, yTo:number = xTo):void {
            this._particleScaleRange = {xFrom: xFrom, xTo: xTo, yFrom: yFrom, yTo: yTo};
        }

        setAlphaRange(from:number, to:number = from):void {
            this._particleAlphaRange = {from: from, to: to};
        }

        setRotationRange(from:number, to:number = from):void {
            this._particleRotationRange = {from: from, to: to};
        }

        setStrength(val:number) {
            this._particleStrength = val;
        }

        public get alive():number {
            return this.children.length;
        }

        public get pool():number {
            return this._deadPool.length;
        }
    }
}