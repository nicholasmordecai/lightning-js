/// <reference path="./../reference.d.ts" />

/**
 * Fade in / Scale in sprites - optional
 * Simple / Advanced -- for creating ultra performant particles in the 50k+ range
 * Colour Shift
 * Checking the container class in pixi, I should think about refactoring the calculate bounds function.. if it's looping over 10k children to calculate it's bounds, that's going to get expensive!
 */

namespace Lightning {

    export class ParticleEmitter extends Group {

        protected game:Engine;
        protected state:State;

        protected _debug:boolean = false;
        // find typings for set interval function
        protected _debugFn:any;
        protected _aliveText:PIXI.Text;
        protected _deadPoolText:PIXI.Text;
        protected _intervalText:PIXI.Text;
        protected _strengthText:PIXI.Text;

        protected _emit:boolean = false;
        protected _nextEmit:number = null;
        protected _interval:number = 100;
        protected _lastStart:number = null;
        protected _time:number = null;
        protected _textures:Array<PIXI.Texture> = [];

        protected _respectPosition:boolean;
        protected _respectPositionValues: iPoint;
        
        protected _deadPool:Array<Particle> = [];

        protected _gravity:iPoint = {x: 0  * window.devicePixelRatio, y: 0.2  * window.devicePixelRatio};
        protected _spread:iPointRange= {xFrom: -2  * window.devicePixelRatio, xTo: 2  * window.devicePixelRatio, yFrom: -2  * window.devicePixelRatio, yTo: 2  * window.devicePixelRatio};
        protected _lifeSpanRange:iRange = {from:3000, to:3000};
        protected _particleStrength:number = 1;

        protected _particleScaleRange:iPointRange = {xFrom: 0.7, xTo: 1, yFrom: 0.7, yTo: 1};
        protected _particleAlphaRange:iRange = {from: 1, to: 1};
        protected _particleRotationRange:iRange = {from: 0, to: 1.9};
        protected _particleVelocityRange:iPointRange = {xFrom: -1  * window.devicePixelRatio, xTo: 1  * window.devicePixelRatio, yFrom: -4  * window.devicePixelRatio, yTo: -6  * window.devicePixelRatio}; 

        protected _particleRotationIncrement:iRange = {from: 0, to: 0};
        protected _particleScaleIncrement:iPointRange = {xFrom: 0, xTo: 0, yFrom: 0, yTo: 0};
        protected _particleAlphaIncrement:iRange = {from: 0, to: 0};

        constructor(state:State, x:number = 0, y:number = 0) {
            super();
            this.state = state;
            this.game = state.game;
            this.x = x;
            this.y = y;
        }

        private tick():void {

            for(let i of this.children) {
                // see if it's more performant to use an array for alivePool, and remove dead object from there
                if(!i['isDead']) {
                    i['update']();
                }
            }

            if(this._time !== null && Date.now() > this._lastStart + this._time) {
                this.stop();
                return;
            }

            // get delta time from update loop
            if(this._emit && this._nextEmit < Date.now()) {
                this._nextEmit = Date.now() + this._interval;
                this.fireEmitter();
            }
        }

        updateTransform() {
            this._boundsID++;

            this.transform.updateTransform(this.parent.transform);

            // TODO: check render flags, how to process stuff here
            this.worldAlpha = this.alpha * this.parent.worldAlpha;
            
            // let this class handle the flags to update children or not
            this.tick();
        };

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

            let isChild:boolean = false;

            // // create new particle
            if(this._deadPool.length > 0) {
                particle = this._deadPool.pop();
                particle.isDead = false;
                particle.visible = true;
                particle.renderable = true;
                isChild = true;
            } else {
                // increment the id hash value to create the particle
                particle = new Particle(texture, this, -this.x, this.game.width - this.x, -this.y, this.game.height - this.y);
            }
            
            // set gravity -- need to move the gravity into the emitter, not the particle
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
                particle.scale.x = scaleX;
                particle.scale.y = scaleX;
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

            if(!isChild) {
                this.addChild(particle);
            }

            // call the particle's update transformation to create / re-create it's matrix
            particle.updateTransform();
        }

        stop() {
            this._emit = false;
        }

        returnToPool(particle:Particle) {
            this._deadPool.push(particle);
        }

        /**
         * TODO this seems to break the create particle function for some reason
         */
        private clearPool() {
            for(let i = 0; i < this._deadPool.length; i++) {
                this._deadPool[i].destroy();
            }
        }

        startDrag(event:PIXI.interaction.InteractionEvent) {
            if(this._respectPosition) {
                let rpx = event.data.global.x * window.devicePixelRatio - this.position.x;
                let rpy = event.data.global.y * window.devicePixelRatio - this.position.y;
                this._respectPositionValues = {x: rpx, y: rpy};
            } else {
                this._respectPositionValues = {x: 0, y: 0};
            }
            this.on('mousemove', this.onDrag);
            this.on('touchmove', this.onDrag);
        }

        enableDebug(interval:number = 500, floatLeft:boolean = true, floatTop:boolean = true) {
            let font = { fontSize: 16 * window.devicePixelRatio, fill: 0xffffff }
            let gap = 25 * window.devicePixelRatio;
            
            this._aliveText = new PIXI.Text('Alive: ' + this.alive, font);
            this._deadPoolText = new PIXI.Text('Dead: ' + this.pool, font);
            this._intervalText = new PIXI.Text('Interval: ' + this._interval, font);
            this._strengthText = new PIXI.Text('Strength: ' + this._particleStrength, font);

            let x:number, y:number;
            if(floatLeft) {
                x = this.game.width * 0.02;
            } else {
                x = this.game.width * 0.85;
            }

            if(floatTop) {
                y = this.game.height * 0.02;
            } else {
                y = this.game.height * 0.75;
            }

            this._aliveText.x = x;
            this._aliveText.y = y;
            
            this._deadPoolText.x = x;
            this._deadPoolText.y = y + gap;

            this._intervalText.x = x;
            this._intervalText.y = y + (gap * 2);

            this._strengthText.x = x;
            this._strengthText.y = y + (gap * 3);

            this.state.add(this._aliveText, this._deadPoolText, this._intervalText, this._strengthText);

            this._debugFn = setInterval(() => {
                this._aliveText.text = 'Alive: ' + this.alive;
                this._deadPoolText.text = 'Dead: ' + this.pool;
                this._intervalText.text = 'Interval: ' + this._interval;
                this._strengthText.text = 'Strength: ' + this._particleStrength;
            }, interval);
        }

        enableDrag(respectPosition:boolean = false) {
            this._respectPosition = respectPosition;
            
            // check to see if interaction is already enabled
            if(this.interactive === false) {
                this.interactive = true;
            }
            
            this.on('mousedown', (e) => {
                this.startDrag(e);
            });

            this.on('touchstart', (e) => {
                this.startDrag(e);
            });

            this.on('mouseup', (e) => {
                this.stopDrag(e);
            });

            this.on('touchend', (e) => {
                this.stopDrag(e);
            });

            /**
             * need to think about handling pointer events
             */
        }

        stopDrag(event:PIXI.interaction.InteractionEvent) {
            this.removeListener('mousemove', this.onDrag);
            this.removeListener('touchmove', this.onDrag);
        }

        onDrag(event:PIXI.interaction.InteractionEvent) {
            this.position = new PIXI.Point(
                (event.data.global.x * window.devicePixelRatio) - this._respectPositionValues.x, 
                (event.data.global.y * window.devicePixelRatio) - this._respectPositionValues.y
            );
        }

        setSpread(xFrom:number, xTo:number, yFrom:number, yTo:number):void {
            this._spread = {xFrom: xFrom * window.devicePixelRatio, xTo: xTo * window.devicePixelRatio, yFrom: yFrom * window.devicePixelRatio, yTo: yTo * window.devicePixelRatio};
        }

        setGravity(x:number, y:number = x):void {
            this._gravity = {x: x  * window.devicePixelRatio, y: y  * window.devicePixelRatio};
        }

        setLifeSpan(from:number, to:number = from):void {
            this._lifeSpanRange = {from: from, to: to};
        }

        setInterval(val:number):void {
            this._interval = val;
        }

        setVelocityRange(xFrom:number, xTo:number, yFrom:number = xFrom, yTo:number = xTo):void {
            this._particleVelocityRange = {xFrom: xFrom  * window.devicePixelRatio, xTo: xTo  * window.devicePixelRatio, yFrom: yFrom  * window.devicePixelRatio, yTo: yTo  * window.devicePixelRatio};
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
            let c:number = 0;
            for(let i of this.children) {
                if(!i['isDead']) c++;
            }
            return c;
        }

        public get pool():number {
            return this._deadPool.length;
        }
    }
}