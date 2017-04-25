/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var ServiceManager = (function () {
        function ServiceManager(game) {
            this._services = {};
            this.game = game;
        }
        ServiceManager.prototype.create = function (key, endpoint, headers) {
            if (headers === void 0) { headers = null; }
            var service = new Lightning.Service(this, key, endpoint, headers);
            this._services[key] = service;
        };
        ServiceManager.prototype.getService = function (key) {
            return this._services[key] || null;
        };
        ServiceManager.prototype.destroy = function (key) {
            this._services[key] = null;
        };
        return ServiceManager;
    }());
    Lightning.ServiceManager = ServiceManager;
})(Lightning || (Lightning = {}));
