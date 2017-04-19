/// <reference path="../../../../src/reference.d.ts" />
declare namespace Lightning {
    class Service {
        private manager;
        private _endpoint;
        private _headers;
        private _requests;
        private _actions;
        private _key;
        constructor(manager: ServiceManager, key: string, endpoint: string, headers?: Array<{
            content: string;
            value: any;
        }>);
        registerAction(key: string, route: string, actionType?: string, headers?: Array<{
            content: string;
            value: any;
        }>, body?: any, cb?: Function, ctx?: Object): iServiceAction;
        call(key: string, body?: any): Request;
        destroy(): boolean;
        despose(request: Request): boolean;
        create(actionType: string, headers?: Array<{
            content: string;
            value: any;
        }>, body?: Object, cb?: Function, ctx?: Object): Request;
        readonly endpoint: string;
    }
}
