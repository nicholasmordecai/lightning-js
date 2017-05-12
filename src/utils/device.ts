/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Device {

        private game:Engine;
        private _dpr:number;
        private _realWidth:number;
        private _realHeight:number;

        // device type
        private _isMobile:boolean;
        private _isTablet:boolean;
        private _isDesktop:boolean;
        private _isIpod:boolean;

        // device system
        private _isAndroid:boolean;
        private _isApple:boolean;
        private _isAmazon:boolean;
        private _operatingSystem:string;

        // device browser
        private _isChrome:boolean;
        private _isFirefox:boolean;
        private _isOpera:boolean;
        private _isIE:boolean;
        private _isEdge:boolean;
        private _isSafari:boolean;
        private _isBrowserUnknown:boolean;
        private _browserInfo:string;
        private _browserVersion:string;

        // device input availability
        private _touchAvailable:boolean;
        private _mouseAvailavle:boolean;
        private _pointerAvailable:boolean;

        public constructor(game:Engine) {
            this.game = game;

            this._isMobile = false;
            this._isTablet = false;
            this._isDesktop = false;
            this._isIpod = false;
            
            this._touchAvailable = false;
            this._mouseAvailavle = false;
            this._pointerAvailable = false;
            this._operatingSystem = null;

            this._isChrome = false;
            this._isFirefox = false;
            this._isOpera = false;
            this._isIE = false;
            this._isEdge = false;
            this._isSafari = false;
            this._isBrowserUnknown = false;
            this._browserInfo = null;
            this._browserVersion = null;

            this._isAndroid = false;
            this._isAmazon = false;
            this._isApple = false;

            // inputs available
            this.isTouchEnabled();
            this.isMouseEnabled();
            this.isPointerEnabled();

            // device detection
            this.isMobile();
            this.osDetection();
            this.browserDetection();
            this.cookiesEnabled();
        }

        private osDetection() {
            let os:string;
            let nAgt:string = navigator.userAgent;
            let clientStrings:Array<{s:string, r:RegExp}> = [
                {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
                {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
                {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
                {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
                {s:'Windows Vista', r:/Windows NT 6.0/},
                {s:'Windows Server 2003', r:/Windows NT 5.2/},
                {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
                {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
                {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
                {s:'Windows 98', r:/(Windows 98|Win98)/},
                {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
                {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
                {s:'Windows CE', r:/Windows CE/},
                {s:'Windows 3.11', r:/Win16/},
                {s:'Android', r:/Android/},
                {s:'Open BSD', r:/OpenBSD/},
                {s:'Sun OS', r:/SunOS/},
                {s:'Linux', r:/(Linux|X11)/},
                {s:'iOS', r:/(iPhone|iPad|iPod)/},
                {s:'Mac OS X', r:/Mac OS X/},
                {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
                {s:'QNX', r:/QNX/},
                {s:'UNIX', r:/UNIX/},
                {s:'BeOS', r:/BeOS/},
                {s:'OS/2', r:/OS\/2/},
                {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
            ];

            for (let id in clientStrings) {
                let cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }

            let osVersion:string;

            if (/Windows/.test(os)) {
                osVersion = /Windows (.*)/.exec(os)[1];
                os = 'Windows';
            }

            this._operatingSystem = os;
            this._browserVersion = osVersion;
        }

        private browserDetection() {
            let nVer:string = navigator.appVersion;
            let nAgt:string = navigator.userAgent;
            let browser:string = navigator.appName;
            let version:string = '' + parseFloat(navigator.appVersion);
            let majorVersion:number = parseInt(navigator.appVersion, 10);
            let nameOffset:number, verOffset:number, ix:number;

            // Opera
            if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                browser = 'Opera';
                version = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
                this._isOpera = true;
            }
            // Opera Next
            if ((verOffset = nAgt.indexOf('OPR')) != -1) {
                browser = 'Opera';
                version = nAgt.substring(verOffset + 4);
                this._isOpera = true;
            }
            // Edge
            else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
                browser = 'Microsoft Edge';
                version = nAgt.substring(verOffset + 5);
                this._isEdge = true;
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(verOffset + 5);
                this._isIE = true;
            }
            // Chrome
            else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                browser = 'Chrome';
                version = nAgt.substring(verOffset + 7);
                this._isChrome = true;
            }
            // Safari
            else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                browser = 'Safari';
                version = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
                this._isSafari = true;
            }
            // Firefox
            else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                browser = 'Firefox';
                version = nAgt.substring(verOffset + 8);
                this._isFirefox = true;
            }
            // MSIE 11+
            else if (nAgt.indexOf('Trident/') != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                this._isIE = true;
            }
            // Other browsers
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                browser = nAgt.substring(nameOffset, verOffset);
                version = nAgt.substring(verOffset + 1);
                if (browser.toLowerCase() == browser.toUpperCase()) {
                    browser = navigator.appName;
                }
                this._isBrowserUnknown = true;
            }
            // trim the version string
            if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

            majorVersion = parseInt('' + version, 10);
            if (isNaN(majorVersion)) {
                version = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            this._browserInfo = browser 
            this._browserVersion = version;
        }

        private isTouchEnabled() {
            this._touchAvailable = 'ontouchstart' in window;
        }

        private isMouseEnabled() {
            this._mouseAvailavle = 'onmousedown' in window;
        }

        private isPointerEnabled() {
            this._mouseAvailavle = 'onpointerdown' in window;
        }

        private cookiesEnabled() {
            let cookieEnabled = (navigator.cookieEnabled) ? true : false;

            if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
                document.cookie = 'testcookie';
                cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
            }
        }

        public isMobile() {
            let info = PIXI.utils.isMobile;

            if(info.any === false) {
                // not any kind of known mobile - default to desktop mode
                this._isDesktop = true;
                this._isMobile = false;
            } else if(info.any === true) {
                // it's a mobile of some kind
                this._isDesktop = false;
                this._isMobile = true;
                
                // is some kind of apple device
                if(info.apple.device === true) {
                    this._isApple = true;
                    if(info.apple.ipod === true) {
                        // is apple ipod
                        this._isIpod = true;
                    } else if(info.apple.phone === true) {
                        // is apple phone
                        this._isMobile = true;
                    } else if(info.apple.tablet === true) {
                        // is apple tablet
                        this._isTablet = true;
                    }

                // is some kind of android device
                } else if(info.android.device === true) {
                    this._isAndroid = true;
                    if(info.android.phone === true) {
                        // is android mobile
                        this._isMobile = true;
                    } else if (info.android.tablet === true) {
                        // is android tablet
                        this._isTablet = true;
                    }

                // is some kind of amazon device
                } else if(info.amazon.device === true) {
                    this._isAmazon = true;
                    if(info.amazon.phone === true) {
                        // is amazon mobile
                        this._isMobile = true;
                    } else if (info.amazon.table === true) {
                        // is amazon tablet
                        this._isTablet = true;
                    }
                } 
            }
        }

        public get mobile():boolean {
            return this._isMobile;
        }

        public get tablet():boolean {
            return this._isTablet;
        }

        public get ipod():boolean {
            return this._isIpod;
        }

        public get desktop():boolean {
            return this._isDesktop;
        }

        public get android():boolean {
            return this._isAndroid;
        }

        public get apple():boolean {
            return this._isApple;
        }

        public get amazon():boolean {
            return this._isAmazon;
        }
    }
}