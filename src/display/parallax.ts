/// <reference path="./../reference.d.ts" />

declare interface iTile {
    key:string;
    object:PIXI.extras.TilingSprite;
    updateX:number;
    updateY:number;
    updateRelative:number;
}

namespace Lightning {
    export class Parallax extends Group {

        protected game:Engine;
        protected _tiles:Array<iTile>;
        protected _width:number;
        protected _height:number
        protected _speed:number = null;
        protected _watch:any = null;

        constructor(game:Engine, width:number = null, height:number = null) {
            super();
            this.game = game;
            this._width = width | this.game.width;
            this._height = height | this.game.height;
            this._tiles = [];
        }

        add(key:string, texture:Texture, xSpeed:number = -0.3 * (this._tiles.length +1), ySpeed:number = 0) {
            let object = new PIXI.extras.TilingSprite(texture, this._width, this._height);
            this.addChild(object);
            let tile = <iTile>{key: key, object, updateX: xSpeed, updateY: ySpeed, updateRelative:0};
            this._tiles.push(tile);
        }

        setUpdate(key:string, x:number = 0, y:number = 0) {
            let tile = this.getTile(key);
            tile.updateX = x;
            tile.updateY = y;
        }

        setSpeed(val:number) {

        }

        update() {
            for(let tile of this._tiles) {
                if(this._watch) {

                } else {
                    if(this._speed) {
                        tile.object.tilePosition.x += tile.updateRelative * this._speed;
                        tile.object.tilePosition.y += tile.updateRelative * this._speed;
                    } else {
                        tile.object.tilePosition.x += tile.updateX;
                        tile.object.tilePosition.y += tile.updateY;
                    }
                }
            }
        }

        getTile(key:string) {
            for(let tile of this._tiles) {
                if(tile.key === key) {
                    return tile;
                }
            }
            console.info('no tile with key', key, 'found');
        }
    }
}