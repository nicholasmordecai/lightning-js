/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class WebFontLoader extends EventEmitter {

        constructor() {
            super();
            let config:WebFont.Config = {};
            config.loading = this.onLoad;
            config.active = this.loadComplete;
            config.inactive = this.failed;

            this.load(config);
        }

        public load(config:WebFont.Config) {
            WebFont.load(config)
        }

        public onLoad() {

        }

        public loadComplete() {

        }

        public failed() {

        }
    }
}