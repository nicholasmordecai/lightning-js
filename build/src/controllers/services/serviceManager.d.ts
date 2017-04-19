/// <reference path="../../../../src/reference.d.ts" />
declare namespace Lightning {
    class ServiceManager {
        private game;
        private _services;
        constructor(game: Engine);
        create(key: string, endpoint: string, headers?: Array<{
            content: string;
            value: any;
        }>): void;
        getService(key: string): Service;
        destroy(key: string): void;
    }
}
