/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class Input {

        private parent:DisplayObject;        

        constructor(parent:DisplayObject) {
            this.parent = parent;
        }

        /**
         * @description Pass a function to be added to the click events
         * @param fnct
         */
        public onClick(fnct:Function):void {
            this.parent.on('click', fnct);
        }

        /**
         * @description Pass a function to be added to the mouse, pointer and touch down events
         * @param fnct
         */
        public down(fnct:Function):void {
            this.parent.on('mousedown', fnct);
            this.parent.on('touchend', fnct);
            if(this['pointertap'] !== undefined ) {
                this.parent.on('pointertap', fnct);
            }
            if(this['pointerdown'] !== undefined ) {
                this.parent.on('pointerdown', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the mouse, touch and pointer up events
         * @param fnct
         */
        public up(fnct:Function):void {
            this.parent.on('mouseup', fnct);
            this.parent.on('touchend', fnct);
            if(this['pointerup'] !== undefined ) {
                this.parent.on('pointerup', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the mouse, pointer and touch up outside events
         * @param fnct
         */
        public upOutside(fnct:Function):void {
            this.parent.on('mouseupoutside', fnct);
            this.parent.on('touchendoutside', fnct);
            if(this['pointerupoutside'] !== undefined ) {
                this.parent.on('pointerupoutside', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the mouse and pointer over events
         * @param fnct
         */
        public over(fnct:Function):void {
            this.parent.on('mouseover', fnct);
            if(this['pointerover'] !== undefined ) {
                this.parent.on('pointerover', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the mouse and pointer out events
         * @param fnct
         */
        public out(fnct:Function):void {
            this.parent.on('mouseout', fnct);
            if(this['pointerout'] !== undefined ) {
                this.parent.on('pointerout', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the mouse and pointer move event
         * @param fnct
         */
        public move(fnct:Function):void {
            this.parent.on('mousemove', fnct);
            if(this['pointermove'] !== undefined ) {
                this.parent.on('pointermove', fnct);
            }
        }

        /**
         * @description Pass a function to be added to the right click events
         * @param fnct
         */
        public rightClick(fnct:Function):void {
            this.parent.on('rightclick', fnct);
        }

        /**
         * @description Pass a function to be added to the right down events
         * @param fnct
         */
        public rightDown(fnct:Function):void {
            this.parent.on('rightdown', fnct);
        }

        /**
         * @description Pass a function to be added to the right up events
         * @param fnct
         */
        public rightUp(fnct:Function):void {
            this.parent.on('rightup', fnct);
        }

        /**
         * @description Pass a function to be added to the right up outside events
         * @param fnct
         */
        public rightUpOutside(fnct:Function):void {
            this.parent.on('rightupoutside', fnct);
        }

        /**
         * @description Pass a function to be added to the tap event
         * 
         * @param fnct
         */
        public onTap(fnct:Function):void {
            this.parent.on('tap', fnct);
        }
    }
}