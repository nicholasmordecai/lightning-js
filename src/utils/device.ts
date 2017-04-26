/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Device {

        private game:Engine;
        private _dpr:number;
        private _realWidth:number;
        private _realHeight:number;

        // device type
        private _mobile:boolean;
        private _tablet:boolean;
        private _desktop:boolean;

        // device operating system
        private _isAndroid:boolean;
        private _isApple:boolean;

        // device browser
        private _isChrome:boolean;
        private _isFirefox:boolean;
        private _browserInformation:boolean;

        // device input availability
        private _touchAvailable:boolean;
        private _mouseAvailavle:boolean;
        private _pointerAvailable:boolean;

        public constructor(game:Engine) {
            this.game = game;

            this._mobile = false;
            this._tablet = false;
            this._desktop = false;
            this._browserInformation = null;
            
            this._touchAvailable = false;
            this._mouseAvailavle = false;
            this._pointerAvailable = false;

            this.isMobile();
        }

        private isTouchEnabled() {
            // http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
            return 'ontouchstart' in window;
        }

        public isMobile() {
            let info = PIXI.utils.isMobile;
            console.log(info);
        }

        public isTablet() {

        }

        public isDesktop() {

        }

        public get mobile():boolean {
            return this._mobile;
        }

        public get tablet():boolean {
            return this._tablet;
        }

        public get desktop():boolean {
            return this._desktop;
        }

    }
}

/**
 * http://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
 */