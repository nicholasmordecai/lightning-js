/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class ServiceManager {

        private game:Engine;
        private _services:{[key: string]:Service} = {};

        constructor(game:Engine) {
            this.game = game;
        }

        public create(key:string, endpoint:string, headers:Array<{content:string, value:any}> = null) {
            let service = new Service(this, key, endpoint, headers);
            this._services[key] = service;
        }

        public getService(key:string) {
            return this._services[key] || null;
        }

        public destroy(key:string) {
            this._services[key] = null;
        }
    }
}