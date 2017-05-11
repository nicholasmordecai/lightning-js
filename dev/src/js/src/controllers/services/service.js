/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Service = (function () {
        function Service(manager, key, endpoint, headers) {
            if (headers === void 0) { headers = null; }
            this._requests = [];
            this._actions = {};
            this.manager = manager;
            this._key = key;
            this._endpoint = endpoint;
            this._headers = headers;
        }
        Service.prototype.registerAction = function (key, route, actionType, headers, body, cb, ctx) {
            if (actionType === void 0) { actionType = 'GET'; }
            if (headers === void 0) { headers = null; }
            if (body === void 0) { body = null; }
            if (cb === void 0) { cb = null; }
            if (ctx === void 0) { ctx = null; }
            var action = {
                route: this._endpoint + route,
                actionType: actionType,
                headers: headers || this._headers,
                cb: cb,
                ctx: ctx
            };
            this._actions[key] = action;
            return action;
        };
        Service.prototype.call = function (key, headers, body) {
            if (headers === void 0) { headers = null; }
            if (body === void 0) { body = null; }
            var action = this._actions[key];
            var passHeaders = [];
            var passBody;
            if (headers === null) {
                passHeaders = action.headers;
            }
            else {
                passHeaders = headers;
            }
            if (body === null) {
                passBody = action.body;
            }
            else {
                passBody = body;
            }
            var request = new Lightning.Request(this, action.route, action.actionType, passHeaders, passBody, action.cb, action.ctx);
            request.call();
            return request;
        };
        Service.prototype.destroy = function () {
            this.manager.destroy(this._key);
            return true;
        };
        Service.prototype.despose = function (request) {
            for (var i = 0; i < this._requests.length; i++) {
                if (request === this._requests[i]) {
                    this._requests[i] = null;
                    return true;
                }
            }
            return false;
        };
        Service.prototype.create = function (actionType, route, headers, body, cb, ctx) {
            if (headers === void 0) { headers = null; }
            if (body === void 0) { body = null; }
            if (cb === void 0) { cb = null; }
            if (ctx === void 0) { ctx = null; }
            return new Lightning.Request(this, route, actionType, headers, body, cb, ctx);
        };
        Object.defineProperty(Service.prototype, "endpoint", {
            get: function () {
                return this._endpoint;
            },
            set: function (val) {
                this._endpoint = val;
            },
            enumerable: true,
            configurable: true
        });
        return Service;
    }());
    Lightning.Service = Service;
})(Lightning || (Lightning = {}));
