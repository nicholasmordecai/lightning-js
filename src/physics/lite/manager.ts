/// <reference path="./../../reference.d.ts" />

/**
 * Scope Definitions
 * 
 * Pool = An array of physics bodies that all collide with eachother
 * Group = An array of physics bodies that don't collide with eachother
 * 
 * 
 */

namespace Lightning {
    export class LitePhysicsManager extends Plugin {

        protected game: Engine;
        private _enabled: boolean;
        private _paused: boolean;
        private _pools: { [key: string]: Array<DisplayObject> };
        private _groups: { [key: string]: Array<DisplayObject> };
        private _worldBounds: { x: number, y: number, width: number, height: number };

        constructor(game: Engine) {
            super(game, true, true);
            this.game = game;
            this._worldBounds = { x: 0, y: 0, width: this.game.width, height: this.game.height };

            this._enabled = false;
        }

        /**
         * initalise / reset the properties when enabled, not constructed
         */
        public enable() {
            this._enabled = true;
            this._pools = {};
            this._paused = false;
        }

        public disable() {
            this._enabled = false;
        }

        protected update() {
            if (!this._enabled) return;
            if (this._paused) return;
        }

        public createPool(key: string, ...objects): Array<DisplayObject> {
            if (this._pools[key] !== null || this._pools[key] !== undefined) {
                this._pools[key] = [];
                for (let i of objects) {
                    this._pools[key].push(i);
                }
                return this._pools[key];
            } else {
                console.info('Physics pool with key:', key, 'alread exists');
                return null;
            }
        }

        public pool(key: string) {
            return this._pools[key];
        }

        private checkWorldCollide(body) {
            if (body.x + body.width >= this._worldBounds.width + this._worldBounds.x) {
                // right side collide
                if (body.velocity.x < 1) {
                    body.velocity.x = body._velocity.x *= -1 * body.restitution;
                } else if (body._velocity.x < 0) {
                    body.x = body.view.core.renderer.width - body.width;
                    body.velocity.x = 0;
                }
                body.velocity.x = body.velocity.x *= -1 * body.restitution;
                // left side collide
            } else if (body.x <= this._worldBounds.x) {
                if (body.velocity.x < -1) {
                    body.velocity.x = body.velocity.x *= -1 * body.restitution;
                } else if (body.velocity.x < 0) {
                    body.x = 0;
                    body.velocity.x = 0;
                }

            }

            // if (this.y + this.height > this.view.core.renderer.height) {
            //     if (this._velocity.y > 1) {
            //         this._velocity.y = this._velocity.y *= -1 * this._restitution
            //     } else if (this._velocity.y > 0) {
            //         this.y = this.view.core.renderer.height - this.height;
            //         this._velocity.y = 0;
            //     }
            // } else if (this.y < 0) {
            //     if (this._velocity.y < -1) {
            //         this._velocity.y = this._velocity.y *= -1 * this._restitution
            //     } else if (this._velocity.y < 0) {
            //         this.y = 0;
            //         this._velocity.y = 0;
            //     }
            // }
        }

    }
}