/// <reference path="./../reference.d.ts" />

namespace Game {
    export namespace Prefab {
        export class ObstacleRect extends PIXI.Sprite {

            private game:Game.Engine;

            constructor(game:Game.Engine) {
                super();
                this.game = game;
                this.x = this.game.width * 0.5;
                this.y = 200;
                this.tint = 0x846552;
                this.scale = new PIXI.Point(0.5, 0.5);
                this.anchor = new PIXI.Point(0.5, 0.5);
                this.createTexture();
            }

            createTexture() {
                let texture = Game.Shapes.Rect3D(this.game.width * 0.2, this.game.height * 0.2, this.game.width * 0.015);
                this.texture = this.game.renderer.generateTexture(texture);
            }
        }
    }
}