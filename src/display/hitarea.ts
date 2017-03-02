/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class HitArea extends Graphics {

        private game:Engine;
        private _texture:PIXI.Texture;

        /**
         *
         * @param game
         * @returns {HitArea}
         */
        constructor(game:Engine, width:number, height:number) {
            super();
            this.game = game;
            this.interactive = true;
            this.alpha = 0;
            this.beginFill(0xffffff, 1);
            this.drawRect(0, 0, width, height);
            this.endFill();
        }

        setRect(width, height) {

        }

        setCircle(radius) {

        }

        /**
         * @description Pass a function to be added to the click events
         * @param fnct
         */
        onClick(fnct:Function):void {
            this.on('click', fnct);
        }

        /**
         * @description Pass a function to be added to the mouse, pointer and touch down events
         * @param fnct
         */
        down(fnct:Function):void {
            this.on('mousedown', fnct);
            this.on('touchend', fnct);
            if(this['pointertap'] !== undefined ) {
                this.on('pointertap', fnct);
            }
            if(this['pointerdown'] !== undefined ) {
                this.on('pointerdown', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the mouse, touch and pointer up events
         * @param fnct
         */
        up(fnct:Function):void {
            this.on('mouseup', fnct);
            this.on('touchend', fnct);
            if(this['pointerup'] !== undefined ) {
                this.on('pointerup', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the mouse, pointer and touch up outside events
         * @param fnct
         */
        upOutside(fnct:Function):void {
            this.on('mouseupoutside', fnct);
            this.on('touchendoutside', fnct);
            if(this['pointerupoutside'] !== undefined ) {
                this.on('pointerupoutside', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the mouse and pointer over events
         * @param fnct
         */
        over(fnct:Function):void {
            this.on('mouseover', fnct);
            if(this['pointerover'] !== undefined ) {
                this.on('pointerover', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the mouse and pointer out events
         * @param fnct
         */
        out(fnct:Function):void {
            this.on('mouseout', fnct);
            if(this['pointerout'] !== undefined ) {
                this.on('pointerout', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the mouse and pointer move event
         * @param fnct
         */
        move(fnct:Function):void {
            this.on('mousemove', fnct);
            if(this['pointermove'] !== undefined ) {
                this.on('pointermove', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the right click events
         * @param fnct
         */
        rightClick(fnct:Function):void {
            this.on('rightclick', fnct);
        }

        /**
         * @description Pass a function to be added to the right down events
         * @param fnct
         */
        rightDown(fnct:Function):void {
            this.on('rightdown', fnct);
        }

        /**
         * @description Pass a function to be added to the right up events
         * @param fnct
         */
        rightUp(fnct:Function):void {
            this.on('rightup', fnct);
        }

        /**
         * @description Pass a function to be added to the right up outside events
         * @param fnct
         */
        rightUpOutside(fnct:Function):void {
            this.on('rightupoutside', fnct);
        }

        /**
         * @description Pass a function to be added to the tap event
         * 
         * @param fnct
         */
        onTap(fnct:Function):void {
            this.on('tap', fnct);
        }
    }
}