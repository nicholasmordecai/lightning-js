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
        private static _logLevel: number = 3;
        private static _reportLogLevel: number = 0;
        private static _service: Lightning.Service;
        private static _action: string;

        public static log(level: number, log: string) {

            const stackTrace: Object = new Error().stack || console.trace;

            if(Logger._logLevel >= level) {
                switch(level) {
                    case 1:
                        Logger.logError(log, stackTrace);
                        break;
                    case 2:
                        Logger.logWarning(log, stackTrace);
                        break;
                    case 3:
                        Logger.logInfo(log, stackTrace);
                        break;
                }
            }

            if(Logger._reportLogLevel >= level) {
                switch(level) {
                    case 1:
                    Logger.reportLogError(log, stackTrace);
                    break;
                case 2:
                    Logger.reportLogWarning(log, stackTrace);
                    break;
                case 3:
                    Logger.reportLogInfo(log, stackTrace);
                    break;
                }
            }
        }

        private static logError(log: string, stackTrace: Object) {
            console.error(log, stackTrace);
        }

        private static logWarning(log: string, stackTrace: Object) {
            console.warn(log, stackTrace);
            
        }

        private static logInfo(log: string, stackTrace: Object) {
            console.info(log, stackTrace);            
        }

        private static reportLogError(log: string, stackTrace: Object) {

        }

        private static reportLogWarning(log: string, stackTrace: Object) {

        }

        private static reportLogInfo(log: string, stackTrace: Object) {

        }

        public static set logLevel(val: number) {
            this._logLevel = val;
        }

        public static set reportLogLevel(val: number) {
            this._reportLogLevel = val;
        }

        // public static set service
    }
}