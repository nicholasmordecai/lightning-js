/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Logger {

        /**
         * Log Level
         * 0 = None
         * 1 = Errors
         * 2 = Errors, Warnings
         * 3 = Errors, Warnings, Info
         */
        private _logLevel: 0 | 1 | 2 | 3;
        private _reportLogLevel: 0 | 1 | 2 | 3;
        private _service: Lightning.Service;
        private _action: string;

        public log(log: string) {
            const stackTrace: Object = new Error().stack || console.trace;

            if(this._logLevel > 0) {
                switch(this._logLevel) {
                    case 1:
                        this.logError(log, stackTrace);
                        break;
                    case 2:
                        this.logWarning(log, stackTrace);
                        break;
                    case 3:
                        this.logInfo(log, stackTrace);
                        break;
                }
            }

            if(this._reportLogLevel > 0) {
                switch(this._reportLogLevel) {
                    case 1:
                    this.reportLogError(log, stackTrace);
                    break;
                case 2:
                    this.reportLogWarning(log, stackTrace);
                    break;
                case 3:
                    this.reportLogInfo(log, stackTrace);
                    break;
                }
            }
        }

        private logError(log: string, stackTrace: Object) {
            console.error(log, stackTrace);
        }

        private logWarning(log: string, stackTrace: Object) {
            console.warn(log, stackTrace);
            
        }

        private logInfo(log: string, stackTrace: Object) {
            console.info(log, stackTrace);            
        }

        private reportLogError(log: string, stackTrace: Object) {

        }

        private reportLogWarning(log: string, stackTrace: Object) {

        }

        private reportLogInfo(log: string, stackTrace: Object) {

        }

        public set logLevel(val: 0 | 1| 2 | 3) {
            this._logLevel = val;
        }

        public set reportLogLevel(val: 0 | 1| 2 | 3) {
            this._reportLogLevel = val;
        }
    }
}