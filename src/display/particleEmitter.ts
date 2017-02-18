/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class ParticleEmitter extends Group {

        protected _particles:Array<Particle> = [];
        protected _lifeSpan:number = 1000;
        protected _emitStrength:number = 10;
        protected _emitFrequency:number = 5;
        protected _gravity:{x:number, y:number} = {x: 0, y: 0};

        constructor() {
            super();
        }

        /**
         * @param  {string} key
         * @param  {DisplayObject} particle
         */
        add(particle:Particle) {
            this._particles.push(particle);
        }

        start(time:number = null) {
            setInterval(() => {
                let particle = this._particles[Math.floor(Math.random() * this._particles.length)];
                this.addChild(particle);
            }, 1000 / this._emitFrequency);
        }

        stop() {

        }
    }
}