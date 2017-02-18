/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Sprite extends PIXI.Sprite {
        
        protected _body:Box2D.Dynamics.b2Body;

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
            this.scale = new PIXI.Point(aX, aY);
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
    }
}