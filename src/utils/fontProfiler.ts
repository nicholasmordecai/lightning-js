/// <reference path="./../reference.d.ts" />

declare interface iBitmapStyle {
    font: string | {
        name: string,
        size: number
    }
}

declare interface iTextStyle extends PIXI.TextStyle {

}

declare interface iFontProfile {
    bitmap: boolean;
    text: boolean;
    style?: iBitmapStyle | iTextStyle;
    responsive: boolean;
}

namespace Lightning {
    export class FontProfiler {
        
        private _fonts: {[key: string]: iFontProfile};

        constructor() {
            this._fonts = {};
        }
        
        public add(id: string) {
            let newProfile:iFontProfile = {
                bitmap: false,
                text: false,
                responsive: true
            };

            this._fonts[id] = newProfile;
        }

        public get(id: string): iFontProfile {
            let profile: iFontProfile = this._fonts[id];
            if(!profile) {
                return null;
            } else {
                return profile;
            }
        }

        public style(id: string): iBitmapStyle | iTextStyle {
            let profile: iFontProfile = this.get(id);
            if(profile.bitmap) {
                return profile.style;
            } else if(profile.text) {
                return profile.style;
            } else {
                return null;
            }
        }

        public remove() {

        }
    }

}