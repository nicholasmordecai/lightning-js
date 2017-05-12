/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class Service {

        private manager:ServiceManager;
        private _endpoint:string;
        private _headers:Array<{content:string, value:string}>;
        private _requests:Array<Request> = [];
        private _actions:{[key: string]:iServiceAction} = {};
        private _key:string

        constructor(manager:ServiceManager, key:string, endpoint:string, headers:Array<{content:string, value:any}> = null) {
            this.manager = manager;
            this._key = key;
            this._endpoint = endpoint;
            this._headers = headers;
        }

        public registerAction(key:string, route:string, actionType:string = 'GET', headers:Array<{content:string, value:any}> = null, body:any = null, cb:Function = null, ctx:Object = null):iServiceAction {
            let action = <iServiceAction> {
                route: this._endpoint + route,
                actionType: actionType,
                headers: headers || this._headers,
                cb: cb,
                ctx: ctx
            }
            this._actions[key] = action;
            return action;
        }

        public call(key:string, headers:Array<{content:string, value:string}> = null, body:any = null):Request {
            let action = this._actions[key];
            let passHeaders:Array<{content: string, value:string}> = [];
            let passBody:any;

            if(headers === null) {
                passHeaders = action.headers;
            } else {
                passHeaders = headers;
            }

            if(body === null) {
                passBody = action.body
            } else {
                passBody = body;
            }

            let request = new Request(this, action.route, action.actionType, passHeaders, passBody, action.cb, action.ctx);
            request.call();
            return request;
        }

        public destroy() {
            this.manager.destroy(this._key);
            return true;
        }

        public despose(request:Request) {
            for(var i = 0; i < this._requests.length; i++) {
                if(request === this._requests[i]) {
                    this._requests[i] = null;
                    return true;
                }
            }
            return false;
        }

        public create(actionType:string, route:string, headers:Array<{content:string, value:any}> = null, body:Object = null, cb:Function = null, ctx:Object = null):Request {
            return new Request(this, route, actionType, headers, body, cb, ctx);
        }

        public get endpoint():string {
            return this._endpoint
        }

        public set endpoint(val:string) {
            this._endpoint = val;
        }
    }
}