/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class Scale extends EventEmitter {

        /**
         * Position Horizontally
         * Position Vertically
         * New positions & aspect ratios
         * 
         * Scale Config - :
         *      0 - No scaling - Done
         *      1 - Maximum width (keeping AR) - Done
         *      2 - Maximum height (keeping AR) - Done
         *      3 - Maximum width and height (keeping AR) - Done
         *      4 - Stretch to fix maximum width - Done
         *      5 - Stretch to fit maximum height - Done
         *      6 - Stretch to fit full width and full height  - Done
         *      7 - Stretch Full Screen
         *      8 - Scale Full Screen
         * 
         * 
         */


        private game:Engine;
        private _allowedDPR:Array<number>;
        private _originalAspectRatio:number;
        private _originalWidth:number;
        private _originalHeight:number;
        private _orientation:string;
        private _isFullscreen:boolean;
        private _autoResize: boolean;

        private _currentWidth: number;
        private _currentHeight: number;
        private _currentAPR: number;
        private _currentDPR:number;        

        private _scaleMode:number;
        private _resizeTimeout;

        private _breakPoints: Array<{width: number, height: number, value: string}>;

        constructor(game:Engine, initWidth:number, initHeight:number, scaleMode:number = 0, allowedDPR: number[] = []) {
            super();
            this.game = game;
            this._currentDPR = window.devicePixelRatio;
            this._allowedDPR = allowedDPR;
            this._autoResize = false;
            this._scaleMode = scaleMode;
            
            // run the initalisation method
            this.setup(initWidth, initHeight);
            this.calculateDPR();
            this.calculateOrientation();

            this.create("resize");
            this.create("fullscreenOpened");
            this.create("fullscreenClosed");

            window.addEventListener("resize", this.resizeThrottler.bind(this), false);   
        }

        private setup(initWidth:number, initHeight:number) {
            // check if orientation is landscape or portrait
            this._originalAspectRatio = initWidth / initHeight;
            this._originalWidth = initWidth;
            this._originalHeight = initHeight;

            this._currentAPR = initWidth / initHeight;
            this._currentWidth = initWidth;
            this._currentHeight = initHeight;
        }

        private calculateDPR() {
            let liveDPR:number = window.devicePixelRatio;
            
            let flag:boolean = false;
            for(let i of this._allowedDPR) {
                if(liveDPR === i) {
                    this._currentDPR = liveDPR;
                    flag = true;
                }
            }

            if(!flag) {
                // find closest DPR in allowedDPR's array
                if(this._allowedDPR.length === 0) {
                    // use any / all DPR's
                    // this._currentDPR = liveDPR;
                    this._currentDPR = 1;
                    // alert(this._currentDPR);
                } else {
                    let closest = Lightning.Maths.closestValue(this._allowedDPR, liveDPR);
                }
            }
        }

        private calculateOrientation() {
            if(window.screen.availWidth > window.screen.availHeight) {
                this._orientation = 'landscape';
            } else {
                this._orientation = 'portrait';
            }
        }

        public resizeThrottler (force:boolean = false) {
            if(!this._autoResize) return;

            if(force) {
                this.resizeAspectRatio();
            } else {
                if (!this._resizeTimeout) {
                    this._resizeTimeout = setTimeout(() => {
                        this._resizeTimeout = null;
                        switch(this._scaleMode) {
                            case 0: 
                                this.resize(this._originalWidth, this._originalHeight);
                                break;
                            case 1:
                                this.resizeStretch();
                                break;
                            case 2:
                                this.resizeAspectRatio();
                                break;
                            default:
                                break;
                        }
                    }, 66);
                }
            }
        }

        public stretchWidth() {
            this.game.renderer.view.style.width = window.innerWidth.toString() + 'px';
            this.game.renderer.view.style.height = this._currentHeight + 'px';
        }

        public stretchHeight() {
            this.game.renderer.view.style.width = this._currentWidth + 'px';
            this.game.renderer.view.style.height = window.innerHeight.toString() + 'px';
        }

        public stretchAll() {
            let width: number = window.innerWidth;
            let height: number = window.innerHeight;
            this.game.renderer.view.style.width = width + 'px';
            this.game.renderer.view.style.height = height + 'px';
        }

        public scaleAll() {
            let maxWidth: number = window.innerWidth / this._currentDPR;
            let maxHeight: number = window.innerHeight / this._currentDPR;

            let scaleWidth: number = maxWidth / this._originalWidth;
            let scaleHeight: number = maxHeight / this._originalHeight;

            if(scaleWidth < scaleHeight) {
                this.game.renderer.view.style.width = maxWidth + 'px';
                this.game.renderer.view.style.height = (this._originalHeight * scaleWidth) + 'px';
            } else {
                this.game.renderer.view.style.width = (this._originalWidth * scaleHeight) + 'px';
                this.game.renderer.view.style.height = maxHeight + 'px';
            }
        }

        public scaleWidth() {
            let maxWidth: number = window.innerWidth;

            let scaleRatio: number = maxWidth / this._originalWidth;

            this.game.renderer.view.style.width = maxWidth + 'px';
            this.game.renderer.view.style.height = (this._originalHeight * scaleRatio) + 'px';
        }

        public scaleHeight() {
            let maxHeight: number = window.innerHeight;
            
            let scaleRatio: number = maxHeight / this._originalHeight;

            this.game.renderer.view.style.width = (this._originalWidth * scaleRatio) + 'px';
            this.game.renderer.view.style.height = maxHeight + 'px';
        }

        public resize(width:number, height:number = null) {
            this.game.renderer.view.style.width = width + 'px';
            if(!height === null) {
                this.game.renderer.view.style.height = height + 'px';        
            }
        }

        private resizeAspectRatio() {
            let width:number = window.innerWidth;
            let height:number = window.innerHeight;
        
            let diffWidth:number = window.innerWidth - this._originalWidth;
            let diffHeight:number = window.innerHeight - this._originalHeight;

            let newWidth:number;
            let newHeight:number;

            if(diffHeight < diffWidth) {
                let scale:number = height / this._originalHeight;
                newWidth = this._originalWidth * scale;
                newHeight = this._originalHeight * scale;
            } else {
                let scale:number = width / this._originalWidth;
                newWidth = this._originalWidth * scale;
                newHeight = this._originalHeight * scale;
            }

            this.resize(newWidth, newHeight);
        }

        private resizeStretch() {
            let width:number = window.innerWidth;
            let height:number = window.innerHeight;
            this.resize(width, height);
        }

        private resizeWorld() {
            let width:number = window.innerWidth;
            let height:number = window.innerHeight;
        
            let diffWidth:number = window.innerWidth - this._originalWidth;
            let diffHeight:number = window.innerHeight - this._originalHeight;
            let scale:number;

            if(diffHeight > diffWidth) {
                scale = (height / this._currentDPR) / this._originalHeight;
            } else {
                scale = (width / this._currentDPR) / this._originalWidth;
            }

            this.resize(width, height);
        }

        public goFullScreen() {
            if(document.documentElement.requestFullscreen) {
                document.documentElement['requestFullscreen']();
            } else if(document.documentElement['mozRequestFullScreen']) {
                document.documentElement['mozRequestFullScreen']();
            } else if(document.documentElement.webkitRequestFullscreen) {
                document.documentElement['webkitRequestFullscreen']();
            } else if(document.documentElement['msRequestFullscreen']) {
                document.documentElement['msRequestFullscreen']();
            }

            // this.resizeThrottler();
            setTimeout(() => {
                this.scaleAll();        
            }, 100);
        }

        public alignVertically() {
            let height:number = window.innerHeight;
            this.game.renderer.view.style.position = 'absolute';
            let newHeight:number = height - parseInt(this.game.renderer.view.style.height);
            newHeight *= 0.5;
            this.game.renderer.view.style.top = newHeight + 'px';
        }

        public alignHorizontally() {
            let width:number = window.innerWidth;
            this.game.renderer.view.style.position = 'absolute';
            let newWidth:number = width - parseInt(this.game.renderer.view.style.width);
            newWidth *= 0.5;
            this.game.renderer.view.style.top = newWidth + 'px';
        }

        public get scaleMode():number {
            return this._scaleMode;
        }

        public set scaleMode(val:number) {
            this._scaleMode = val;
        }

        public get devicePixelRatio():number {
            return window.devicePixelRatio;
        }

        public get orientation():string {
            return this._orientation;
        }

        public get autoResize():boolean {
            return this._autoResize;
        }

        public set autoResize(val:boolean) {
            this._autoResize = val;
        }
    }
}