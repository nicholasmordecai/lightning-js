/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Button extends Sprite {

        protected game:Engine;
        protected _primitive:string = null;
        protected _hitArea:HitArea;
        
        /**
         * @param  {Engine} game
         * @param  {} texture=null
         */
        constructor(game:Engine, texture = null) {
            super(texture);
            this.game = game;
            this.initalise();
        }

        /**
         */
        initalise() {
            this.interactive = true;
            this._hitArea = new HitArea(this.game, this.texture.width, this.texture.height);
            this.addChild(this._hitArea);
        }

        /**
         * @param  {number} aX
         * @param  {number=null} aY
         * @returns void
         */
        setAnchor(aX:number, aY:number = aX):void {
            this.anchor = new PIXI.Point(aX, aY);
            this._hitArea.x -= this.width * aX;
            this._hitArea.y -= this.height * aY;
        }
        
        /**
         * @returns HitArea
         */
        public get hit():HitArea {
            return this._hitArea;
        }
    }
}