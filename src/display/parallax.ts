/// <reference path="./../reference.d.ts" />

declare interface iTile {
    key:string;
    object:PIXI.extras.TilingSprite;
    updateX:number;
    updateY:number;
    updateRelative:number;
    index:number;
}

namespace Lightning {
    export class Parallax extends Group {

        protected game:Engine;
        protected _tiles:Array<iTile>;
        protected _width:number;
        protected _height:number
        protected _scrollSpeed:number = 1;
        protected _incMultiplier:number = 0.3
        protected _watch:any = null;
        protected _watchX:boolean = false;
        protected _watchY:boolean = false;
        protected _watchOffset:{x:number, y:number} = {x:0, y:0};
        protected _lastWatch:{x:number, y:number} = {x:0, y:0};
        protected _watchIncMultiplier:{x:number, y:number} = {x:0.8, y:0.8};
        protected _watchDampner:{x:number, y:number} = {x:50, y:50};
        protected _referenceOffset:{x:number, y:number} = {x:0, y:0};
        
        /**
         * @param  {Engine} game
         * @param  {number=null} width
         * @param  {number=null} height
         */
        constructor(game:Engine, width:number = null, height:number = null) {
            super();
            this.game = game;
            this._width = width | this.game.width;
            this._height = height | this.game.height;
            this._tiles = [];
        }
        
        /**
         * @param  {string} key
         * @param  {Texture} texture
         * @param  {boolean=false} xy
         */
        add(key:string, texture:Texture, xy:boolean = false) {
            let xSpeed:number = 0;
            let ySpeed:number = 0;
            if(xy) {
                ySpeed = this._incMultiplier * (this._tiles.length +1);
            } else {
                xSpeed = this._incMultiplier * (this._tiles.length +1);
            }
            let object = new PIXI.extras.TilingSprite(texture, this._width, this._height);
            this.addChild(object);
            let tile = <iTile>{key: key, object, updateX: xSpeed, updateY: ySpeed, updateRelative:0, index: this._tiles.length + 1};
            this._tiles.push(tile);
        }

        /**
         * 
         */
        update() {
            let x:number, y:number = 0;

            if(this._watchX) {
                let currentPositionX = this._watch.x - this._referenceOffset.x;
                x = (currentPositionX - this._lastWatch.x) / this._watchDampner.x;
                this._lastWatch.x = currentPositionX;
            }

            if(this._watchY) {
                let currentPositionY = this._watch.y - this._referenceOffset.y;
                y = (currentPositionY - this._lastWatch.y) / this._watchDampner.y;
                this._lastWatch.y = currentPositionY;
            }

            for(let tile of this._tiles) {    
                tile.object.tilePosition.x += tile.updateX * this._scrollSpeed;
                tile.object.tilePosition.y += tile.updateY * this._scrollSpeed;
                tile.object.tilePosition.x += x * tile.index * this._watchIncMultiplier.x;
                tile.object.tilePosition.y -= y * tile.index * this._watchIncMultiplier.y;

            }
        }
        
        /**
         * @param  {string} key
         */
        getTile(key:string) {
            for(let tile of this._tiles) {
                if(tile.key === key) {
                    return tile;
                }
            }
            console.info('no tile with key', key, 'found');
        }

        /**
         * @param  {any} val
         * @returns void
         */
        setWatch(val:any, x:boolean = true, y:boolean = true):void {
            this._watch = val;
            this._watchX = x;
            this._watchY = y;
        }

        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        setWatchOffset(x:number, y:number = x):void {
            this._watchOffset = {x: x, y: y};
        }

        /**
         * @param  {boolean=false} x
         * @param  {boolean=false} y
         */
        setWatchXY(x:boolean = false, y:boolean = false) {
            this._watchX = x;
            this._watchY = y;
        }

        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        setReferenceOffset(x:number, y:number = x):void {
            this._referenceOffset = {x: x, y: y};
        }

        setWatchDampner(x:number, y:number = x) {
            this._watchDampner.x = x;
            this._watchDampner.y = y;
        }

        /**
         * @param  {string} key
         * @param  {number=0} x
         * @param  {number=0} y
         * @returns void
         */
        setUpdate(key:string, x:number = 0, y:number = 0):void {
            let tile = this.getTile(key);
            tile.updateX = x;
            tile.updateY = y;
        }

        /**
         * @param  {number} val
         * @returns void
         */
        setScrollSpeed(val:number):void {
            this._scrollSpeed = val;
        }

        /**
         * @param  {number} val
         * @param  {boolean=false} reset
         * @param  {boolean=false} xy
         * @returns void
         */
        setIncrementMultiplier(val:number, reset:boolean = false, xy:boolean = false):void {
            this._scrollSpeed = val;
            if(reset) {
                for(let tile of this._tiles) {
                    if(xy) {
                        let xSpeed:number = 0
                        let ySpeed:number = this._incMultiplier * (this._tiles.length +1);
                        tile.updateX = xSpeed;
                        tile.updateY = ySpeed;
                    } else {
                        let xSpeed:number = this._incMultiplier * (this._tiles.length +1);
                        let ySpeed:number = 0
                        tile.updateX = xSpeed;
                        tile.updateY = ySpeed;
                    }
                }
            }
        }

        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        setWatchIncerementMultiplier(x:number, y:number = x):void {
            this._watchIncMultiplier.x = x;
            this._watchIncMultiplier.y = y;
        }

        /**
         * @returns number
         */
        get scrollSpeed():number {
            return this._scrollSpeed;
        }
    }
}