/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Sprite extends PIXI.Sprite {
        
        protected _body:Box2D.Dynamics.b2Body;
        protected _respectPosition:boolean;
        protected _respectPositionValues: {x:number, y:number};

        /**
         * @param  {PIXI.Texture=null} texture
         */
        constructor(texture:PIXI.Texture = null) {
            super(texture);
        }
        
        /**
         * @param  {boolean} val
         */
        enableBody(val:boolean) {
            if(val) {
                
            }
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
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        setScale(aX:number, aY:number = aX):void {
            this.scale.x = aX;
            this.scale.y = aY;
        }

        /**
         * @param  {Box2D.Dynamics.b2Body} body
         */
        set body(body:Box2D.Dynamics.b2Body) {
            this._body = body;
        }
        
        /**
         * @returns Box2D
         */
        get body():Box2D.Dynamics.b2Body {
            return this._body;
        }

        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects) {
             for(let i = 0; i < displayObjects.length -1; i++) {
                this.addChild(displayObjects[i]);
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
                let rpx = event.data.global.x * window.devicePixelRatio - this.position.x;
                let rpy = event.data.global.y * window.devicePixelRatio - this.position.y;
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
                (event.data.global.x * window.devicePixelRatio) - this._respectPositionValues.x, 
                (event.data.global.y * window.devicePixelRatio) - this._respectPositionValues.y
            );
        }
    }
}