/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Device = (function () {
        function Device(game) {
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
        Device.prototype.osDetection = function () {
            var os;
            var nAgt = navigator.userAgent;
            var clientStrings = [
                { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
                { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
                { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
                { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
                { s: 'Windows Vista', r: /Windows NT 6.0/ },
                { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
                { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
                { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
                { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
                { s: 'Windows 98', r: /(Windows 98|Win98)/ },
                { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
                { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
                { s: 'Windows CE', r: /Windows CE/ },
                { s: 'Windows 3.11', r: /Win16/ },
                { s: 'Android', r: /Android/ },
                { s: 'Open BSD', r: /OpenBSD/ },
                { s: 'Sun OS', r: /SunOS/ },
                { s: 'Linux', r: /(Linux|X11)/ },
                { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
                { s: 'Mac OS X', r: /Mac OS X/ },
                { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
                { s: 'QNX', r: /QNX/ },
                { s: 'UNIX', r: /UNIX/ },
                { s: 'BeOS', r: /BeOS/ },
                { s: 'OS/2', r: /OS\/2/ },
                { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
            ];
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }
            var osVersion;
            if (/Windows/.test(os)) {
                osVersion = /Windows (.*)/.exec(os)[1];
                os = 'Windows';
            }
            this._operatingSystem = os;
            this._browserVersion = osVersion;
        };
        Device.prototype.browserDetection = function () {
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browser = navigator.appName;
            var version = '' + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;
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
            else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
                browser = 'Microsoft Edge';
                version = nAgt.substring(verOffset + 5);
                this._isEdge = true;
            }
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(verOffset + 5);
                this._isIE = true;
            }
            else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                browser = 'Chrome';
                version = nAgt.substring(verOffset + 7);
                this._isChrome = true;
            }
            else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                browser = 'Safari';
                version = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
                this._isSafari = true;
            }
            else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                browser = 'Firefox';
                version = nAgt.substring(verOffset + 8);
                this._isFirefox = true;
            }
            else if (nAgt.indexOf('Trident/') != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                this._isIE = true;
            }
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                browser = nAgt.substring(nameOffset, verOffset);
                version = nAgt.substring(verOffset + 1);
                if (browser.toLowerCase() == browser.toUpperCase()) {
                    browser = navigator.appName;
                }
                this._isBrowserUnknown = true;
            }
            // trim the version string
            if ((ix = version.indexOf(';')) != -1)
                version = version.substring(0, ix);
            if ((ix = version.indexOf(' ')) != -1)
                version = version.substring(0, ix);
            if ((ix = version.indexOf(')')) != -1)
                version = version.substring(0, ix);
            majorVersion = parseInt('' + version, 10);
            if (isNaN(majorVersion)) {
                version = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }
            this._browserInfo = browser;
            this._browserVersion = version;
        };
        Device.prototype.isTouchEnabled = function () {
            this._touchAvailable = 'ontouchstart' in window;
        };
        Device.prototype.isMouseEnabled = function () {
            this._mouseAvailavle = 'onmousedown' in window;
        };
        Device.prototype.isPointerEnabled = function () {
            this._mouseAvailavle = 'onpointerdown' in window;
        };
        Device.prototype.cookiesEnabled = function () {
            var cookieEnabled = (navigator.cookieEnabled) ? true : false;
            if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
                document.cookie = 'testcookie';
                cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
            }
        };
        Device.prototype.isMobile = function () {
            var info = PIXI.utils.isMobile;
            if (info.any === false) {
                // not any kind of known mobile - default to desktop mode
                this._isDesktop = true;
                this._isMobile = false;
            }
            else if (info.any === true) {
                // it's a mobile of some kind
                this._isDesktop = false;
                this._isMobile = true;
                // is some kind of apple device
                if (info.apple.device === true) {
                    this._isApple = true;
                    if (info.apple.ipod === true) {
                        // is apple ipod
                        this._isIpod = true;
                    }
                    else if (info.apple.phone === true) {
                        // is apple phone
                        this._isMobile = true;
                    }
                    else if (info.apple.tablet === true) {
                        // is apple tablet
                        this._isTablet = true;
                    }
                    // is some kind of android device
                }
                else if (info.android.device === true) {
                    this._isAndroid = true;
                    if (info.android.phone === true) {
                        // is android mobile
                        this._isMobile = true;
                    }
                    else if (info.android.tablet === true) {
                        // is android tablet
                        this._isTablet = true;
                    }
                    // is some kind of amazon device
                }
                else if (info.amazon.device === true) {
                    this._isAmazon = true;
                    if (info.amazon.phone === true) {
                        // is amazon mobile
                        this._isMobile = true;
                    }
                    else if (info.amazon.table === true) {
                        // is amazon tablet
                        this._isTablet = true;
                    }
                }
            }
        };
        Object.defineProperty(Device.prototype, "mobile", {
            get: function () {
                return this._isMobile;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Device.prototype, "tablet", {
            get: function () {
                return this._isTablet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Device.prototype, "ipod", {
            get: function () {
                return this._isIpod;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Device.prototype, "desktop", {
            get: function () {
                return this._isDesktop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Device.prototype, "android", {
            get: function () {
                return this._isAndroid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Device.prototype, "apple", {
            get: function () {
                return this._isApple;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Device.prototype, "amazon", {
            get: function () {
                return this._isAmazon;
            },
            enumerable: true,
            configurable: true
        });
        return Device;
    }());
    Lightning.Device = Device;
})(Lightning || (Lightning = {}));
