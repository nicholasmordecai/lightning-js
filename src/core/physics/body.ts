/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class PhysicsBody extends Box2D.Dynamics.b2Body {
        protected _displayObject

        constructor(displayObject) {
            super();
            this._displayObject = displayObject;
        }
    

        public get displayObject() {
            return this._displayObject;
        }

        public set displayObject(obj) {
            this._displayObject = obj;
        }
    }
}