/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Sprite extends PIXI.Sprite {
        
        public globalRef:string;

        private _events:EventEmitter;
        protected _body:Box2D.Dynamics.b2Body;
        protected _respectPosition:boolean;
        protected _respectPositionValues: {x:number, y:number};
        protected _input:Input;

        /**
         * @param  {PIXI.Texture=null} texture
         */
        constructor(texture:PIXI.Texture = null) {
            super(texture);
            this._events = new EventEmitter();
        }

        enableInput() {
            this.interactive = true;
            this._input = new Input(this);
        }

        public enableUpdate(event: Lightning.Event) {
            event.addSubscriber(this.update, this);
        }

        public destroy() {
            console.log('sprite destroyed', this);
            super.destroy();
        }

        /**
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        setAnchor(aX:number, aY:number = aX):void {
            this.anchor = new PIXI.Point(aX, aY);
        }

        /**
         * @description Set the scale on the sprite
         * 
         * @param  {number} aX
         * @param  {number=aX} aY
         * 
         * @example
         * ~~
         * 
         * sprite.setScale(0.5) // set both scaleX and scaleY to 0.5
         * sprite.setScale(0.1, 0.4) // set scaleX to 0.1 and scaleY to 0.4
         * ~~
         * 
         * @returns void
         */
        setScale(aX:number, aY:number = aX):void {
            this.scale.x = aX;
            this.scale.y = aY;
        }

        /**
         */
        set body(body) {
            this._body = body;
        }
        
        /**
         */
        get body() {
            return this._body;
        }

        /**
         * @param  {} ...displayObjects
         */
        add(...children) {
             for(let i = 0; i < children.length; i++) {
                this.addChild(children[i]);
             }
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

        startDrag(event:PIXI.interaction.InteractionEvent) {
            if(this._respectPosition) {
                let rpx = event.data.global.x - this.position.x;
                let rpy = event.data.global.y - this.position.y;
                this._respectPositionValues = {x: rpx, y: rpy};
            } else {
                this._respectPositionValues = {x: 0, y: 0};
            }
            this.on('mousemove', this.onDrag);
            this.on('touchmove', this.onDrag);
        }

        stopDrag(event:PIXI.interaction.InteractionEvent) {
            this.removeListener('mousemove', this.onDrag);
            this.removeListener('touchmove', this.onDrag);
        }

        onDrag(event:PIXI.interaction.InteractionEvent) {
            this.position = new PIXI.Point(
                event.data.global.x - this._respectPositionValues.x, 
                event.data.global.y - this._respectPositionValues.y
            );
        }

        public update(time: number) {

        }

        public get input():Input {
            return this._input;
        }
    }
}