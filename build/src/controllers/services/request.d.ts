/// <reference path="../../../../src/reference.d.ts" />
declare namespace Lightning {
    class Request {
        private service;
        private _endpoint;
        private _actionType;
        private _headers;
        private _body;
        private _cb;
        private _ctx;
        private _responseData;
        private _requestSucceeded;
        private _timeout;
        private _retries;
        private _currentAttempt;
        constructor(service: Service, actionType: string, headers?: Array<{
            content: string;
            value: any;
        }>, body?: Object, cb?: Function, ctx?: Object);
        dispose(): void;
        call(): string;
        private handleFailure(xhr);
        private requestWasSuccessful(statusCode);
        private endRequest();
        private createRequest();
    }
}
