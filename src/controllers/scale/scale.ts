/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class Scale extends EventEmitter {

        /**
         * Position Horizontally
         * Position Vertically
         */

        public static NONE:number = 0;
        public static FILL:number = 1;
        public static ASPECT_RATIO:number = 2;

        private game:Engine;
        private _allowedDPR:Array<number>;
        private _currentDPR:number;
        private _originalAspectRatio:number;
        private _originalWidth:number;
        private _originalHeight:number;
        private _orientation:string;
        private _isFullscreen:boolean;

        private _scaleMode:number;
        private _resizeTimeout:number;

        private _breakPoints: Array<{width: number, height: number, value: string}>;

        constructor(game:Engine, initWidth:number, initHeight:number, scaleMode:number = 0) {
            super();
            this.game = game;
            this._currentDPR = window.devicePixelRatio;
            this._allowedDPR = [1, 2];
            this._scaleMode = scaleMode;
            
            // run the initalisation method
            this.setup(initWidth, initHeight);
            this.calculateDPR();
            this.calculateOrientation();
            window.addEventListener("resize", this.resizeThrottler.bind(this), false);   
        }

        private setup(initWidth:number, initHeight:number) {
            // check if orientation is landscape or portrait
            this._originalAspectRatio = initWidth / initHeight;
            this._originalWidth = initWidth;
            this._originalHeight = initHeight;
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
                    this._currentDPR = liveDPR;
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

        public resize(width:number, height:number) {
            this.game.renderer.view.style.width = width + 'px';
            this.game.renderer.view.style.height = height + 'px';
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

            this.resize(newWidth, newHeight)
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

            this.resizeThrottler();
            this.scaleMode = Scale.ASPECT_RATIO;
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
    }
}