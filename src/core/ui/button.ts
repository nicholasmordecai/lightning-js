/// <reference path="./../../reference.d.ts" />

namespace Lightning.UI {
    export class Button extends Sprite {

        protected game:Engine;
        protected _primitive:string = null;
        protected _hitArea:HitArea;

        constructor(game:Engine, texture = null) {
            super(texture);
            this.game = game;
            this.initalise();
        }

        initalise() {
            this.interactive = true;
            this._hitArea = new HitArea(this.game, this.texture.width, this.texture.height);
            this.addChild(this._hitArea);
        }

        setAnchor(aX, aY = null):void {
            if(!aY) {
                this.anchor = new PIXI.Point(aX, aX);
                this._hitArea.x -= this.width * aX;
                this._hitArea.y -= this.height * aX;
            } else {
                this.anchor = new PIXI.Point(aX, aY);
                this._hitArea.x -= this.width * aX;
                this._hitArea.y -= this.height * aY;
            }
        }

        public get hit():HitArea {
            return this._hitArea;
        }
    }
}