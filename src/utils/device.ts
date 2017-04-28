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
        private _ipod:boolean;

        // device operating system
        private _isAndroid:boolean;
        private _isApple:boolean;
        private _isAmazon:boolean;

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
            this._ipod = false;
            this._browserInformation = null;
            
            this._touchAvailable = false;
            this._mouseAvailavle = false;
            this._pointerAvailable = false;

            this._isAndroid = false;
            this._isAmazon = false;
            this._isApple = false;

            this.isMobile();
        }

        private isTouchEnabled() {
            // http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
            return 'ontouchstart' in window;
        }

        public isMobile() {
            let info = PIXI.utils.isMobile;
            console.log(info);

            if(info.any === false) {
                // not any kind of known mobile - default to desktop mode
                this._desktop = true;
                this._mobile = false;
            } else if(info.any === true) {
                // it's a mobile of some kind
                this._desktop = false;
                this._mobile = true;
                
                // is some kind of apple device
                if(info.apple.device === true) {
                    this._isApple = true;
                    if(info.apple.ipod === true) {
                        // is apple ipod
                        this._ipod = true;
                    } else if(info.apple.phone === true) {
                        // is apple phone
                        this._mobile = true;
                    } else if(info.apple.tablet === true) {
                        // is apple tablet
                        this._tablet = true;
                    }

                // is some kind of android device
                } else if(info.android.device === true) {
                    this._isAndroid = true;
                    if(info.android.phone === true) {
                        // is android mobile
                        this._mobile = true;
                    } else if (info.android.tablet === true) {
                        // is android tablet
                        this._tablet = true;
                    }

                // is some kind of amazon device
                } else if(info.amazon.device === true) {
                    this._isAmazon = true;
                    if(info.amazon.phone === true) {
                        // is amazon mobile
                        this._mobile = true;
                    } else if (info.amazon.table === true) {
                        // is amazon tablet
                        this._tablet = true;
                    }

                } else {
                    // fallback
                }
            }
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