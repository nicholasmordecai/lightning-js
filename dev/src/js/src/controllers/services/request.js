/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Request = (function () {
        function Request(service, actionType, headers, body, cb, ctx) {
            if (headers === void 0) { headers = null; }
            if (body === void 0) { body = null; }
            if (cb === void 0) { cb = null; }
            if (ctx === void 0) { ctx = null; }
            this._requestSucceeded = false;
            this._timeout = 10000;
            this._retries = 5;
            this._currentAttempt = 0;
            this.service = service;
            this._endpoint = service.endpoint;
            this._actionType = actionType;
            this._headers = headers;
            this._body = body;
            this._cb = cb;
            this._ctx = ctx;
        }
        Request.prototype.dispose = function () {
            this.service.despose(this);
        };
        Request.prototype.call = function () {
            var _this = this;
            this._currentAttempt++;
            var xhr = this.createRequest();
            xhr.onerror = function (err) {
                _this._responseData = "Error occurred calling " + _this._endpoint + ". Message: " + err.message;
                _this._requestSucceeded = false;
                _this.handleFailure(xhr);
            };
            xhr.onload = function () {
                if (_this.requestWasSuccessful(xhr.status)) {
                    _this._responseData = xhr.responseText;
                    _this._requestSucceeded = true;
                    _this.endRequest();
                }
                else {
                    _this.handleFailure(xhr);
                }
            };
            try {
                xhr.send(this._body);
            }
            catch (err) {
                this.handleFailure(xhr);
            }
            return this._responseData;
        };
        Request.prototype.handleFailure = function (xhr) {
            if (this._retries > this._currentAttempt) {
                this.call();
            }
            else {
                this._responseData = "Request responded with an error status: " + xhr.status.toString() + " - " + xhr.statusText;
                this._requestSucceeded = false;
                this.endRequest();
            }
        };
        Request.prototype.requestWasSuccessful = function (statusCode) {
            return (((statusCode > 99) && (statusCode < 299)) ? true : false);
        };
        Request.prototype.endRequest = function () {
            if (this._cb) {
                this._cb.call(this._ctx, this._requestSucceeded, this._responseData);
                this.dispose();
            }
        };
        Request.prototype.createRequest = function () {
            var xhr = new XMLHttpRequest();
            xhr.open(this._actionType, this._endpoint, true);
            return xhr;
        };
        return Request;
    }());
    Lightning.Request = Request;
})(Lightning || (Lightning = {}));
