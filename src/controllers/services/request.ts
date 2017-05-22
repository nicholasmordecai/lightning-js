/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class Request {

        private service:Service;
        private _endpoint:string;
        private _actionType:string;
        private _headers:Array<{content:string, value:any}>;
        private _body:any;
        private _cb:Function;
        private _ctx:Object;

        private _responseData:string;
        private _requestSucceeded:boolean = false;

        private _timeout:number = 10000;
        private _retries:number = 0;
        private _currentAttempt:number = 0;


        constructor(service:Service, route:string, actionType:string, headers:Array<{content:string, value:any}> = null, body:Object = null, cb:Function = null, ctx:Object = null) {
            this.service = service;
            this._endpoint = route
            this._actionType = actionType;
            this._headers = headers || [];
            this._body = body;
            this._cb = cb;
            this._ctx = ctx;
        }

        public dispose() {
            this.service.despose(this);
        }

        public call() {
            this._currentAttempt++;
            var xhr: XMLHttpRequest = this.createRequest();
            for(let i of this._headers) {
                xhr.setRequestHeader(i.content, i.value);
            }
            xhr.onerror = (err) => {
                this._responseData = "Error occurred calling " + this._endpoint + ". Message: " + err.message;
                this._requestSucceeded = false;
                this.handleFailure(xhr);
            }

            xhr.onload = () => {

                if (this.requestWasSuccessful(xhr.status)) {
                    this._responseData = xhr.responseText;
                    this._requestSucceeded = true;
                    this.endRequest();
                }
                else {
                    this.handleFailure(xhr);
                }
            };

            try {
                 xhr.send(JSON.stringify(this._body));
            } catch(err) {
                this.handleFailure(xhr);
            }
           

            return this._responseData;
        }

        private handleFailure(xhr:XMLHttpRequest) {
            if(this._retries > this._currentAttempt) {
                this.call();
            } else {
                this._responseData = "Request responded with an error status: " + xhr.status.toString() + " - " + xhr.statusText;
                this._requestSucceeded = false;
                this.endRequest();
            }
        }

        private requestWasSuccessful(statusCode: number): boolean {
            return (((statusCode > 99) && (statusCode < 299)) ? true : false);
        }
        
        private endRequest() {
            if(this._cb) {
                this._cb.call(this._ctx, this._requestSucceeded, this, this._responseData);
                this.dispose();
            }
        }

        private createRequest() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            xhr.open(this._actionType, this._endpoint, true); 

            return xhr;
        }
    }
}