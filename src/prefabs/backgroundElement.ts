/// <reference path="./../reference.d.ts" />

namespace Game {
    export namespace Prefab {
        export class BGSquare extends PIXI.Sprite {

            private game:Game.Engine;
            private _idx:number;
            private _idy:number;
            private _initWidth:number;

            constructor(game:Game.Engine, width:number, idx:number, idy:number) {
                super();
                this.game = game;
                this.tint = Utils.Colours.DARK;
                this.anchor = new PIXI.Point(0.5, 0.5);
                this._idx = idx;
                this._idy = idy;
                this._initWidth = width;
                this.createTexture(width);
            }

            createTexture(width:number) {
                let texture = Game.Shapes.Rect(width, width);
                this.texture = this.game.renderer.generateTexture(texture);
            }

            drawSquare() {
                let texture = Game.Shapes.Rect(this._initWidth, this._initWidth);
                this.texture = this.game.renderer.generateTexture(texture);
            }

            drawCircle() {
                let texture = Game.Shapes.Circle(this._initWidth / 2);
                this.tint = Utils.Colours.LIGHTBLUE;
                this.texture = this.game.renderer.generateTexture(texture, 4, 4);
            }

            drawDiamond() {
                let texture = Game.Shapes.Rect(this._initWidth * 0.8, this._initWidth * 0.8);
                this.rotation = 0.785398;
                this.tint = Utils.Colours.DIAMOND;
                this.texture = this.game.renderer.generateTexture(texture, 4, 4);
            }

            drawStar() {
                let texture = Game.Shapes.Star(this._initWidth * 0.8, this._initWidth * 0.8);
                let texture2 = Game.Shapes.Star(this._initWidth * 0.8, this._initWidth * 0.8);
                texture2.rotation = 0.785398;
                texture2.x += texture2.width * 0.5;
                texture2.y -= texture2.width * 0.25;
                texture.addChild(texture2);
                this.tint = Utils.Colours.GOLD;
                this.texture = this.game.renderer.generateTexture(texture);
            }

            drawWhiteSquare() {
                let texture = Game.Shapes.Rect(this._initWidth * 1.1, this._initWidth * 1.1);
                this.tint = Utils.Colours.WHITE;
                this.texture = this.game.renderer.generateTexture(texture);  
            }

            drawTriangle() {
                let texture = Game.Shapes.Triangle(this._initWidth * 0.8);
                this.tint = Utils.Colours.ORANGE;
                this.texture = this.game.renderer.generateTexture(texture); 
            }

            typeChange(type:string) {
                switch(type) {
                    case 'circle':
                        this.drawCircle();
                        break;
                    case 'star':
                        this.drawStar();
                        break;
                    case 'triangle':
                        this.drawTriangle();
                        break;
                    case 'diamond':
                        this.drawDiamond();
                        break;
                    case 'whiteSquare':
                        this.drawWhiteSquare();
                        break;
                    case 'blank':
                        this.alpha = 0;
                        break;
                }
            }



            get idx():number {
                return this._idx;
            }

            get idy():number {
                return this._idy;
            }
        }
    }
}