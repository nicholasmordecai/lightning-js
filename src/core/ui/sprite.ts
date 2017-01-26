/// <reference path="./../../reference.d.ts" />

namespace Lightening.UI {
    export class Sprite extends PIXI.Sprite {
        
        private _body;

        constructor(texture:PIXI.Texture = null) {
            super(texture);
        }

        set body(body) {
            this._body = body;
        }

        get body() {
            return this._body;
        }
    }
}