/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Locale {

        private game: Engine;
        private _currency: string;
        private _language: string;
        private _languagePack: JSON;
        private _availableLanguages: string[];

        private _arg1: string;
        private _arg2: string;
        private _regex: RegExp;

        /**
         * @description Class for handling the translations
         *
         * @param {string} lang
         * @param {string} defaultLang
         * @param {JSON} text
         */
        constructor(lang: string, defaultLang: string, text: JSON) {
            this._language = lang;
            this._languagePack = text;
            this._arg1 = "{{";
            this._arg2 = "}}";
            this._regex = /[^{}]+(?=\})/g;
            this.checkLanguageExists(defaultLang);
        }

        /**
         * @description check if the language given exists in the config
         *
         * @param {string} defaultLang default language to use if the given language does not exist
         *
         * @returns {void}
         */
        private checkLanguageExists(defaultLang: string): void {
            let flag: boolean = null;
            try {
                const i = this._languagePack[this._language];
                if (i) {
                    flag = true;
                }
            } catch (e) {
                flag = false;
            }
            if (flag === true) {
                // language exists in the json file
            } else {
                console.error("No language found for", this._language, "\n Switching to ", defaultLang);
                this._language = defaultLang;
            }
        }

        /**
         * 
         * @param key 
         * @param params 
         */
        public translate(key: string, params: {}) {
            let string: string;

            try {
                string = this._languagePack[this._language][key];
            } catch (e) {
                const log = "No key " + key + "found for language " + this._language;
                Logger.log(1, log)
                return;
            }

            const arrayToInject: string[] = string.match(this._regex);

            for (const inject of arrayToInject) {
                const replace: string = this._arg1 + inject + this._arg2;
                if (replace && params[inject] !== undefined) {
                    string = string.replace(this._arg1 + inject + this._arg2, params[inject]);
                } else {
                    const log = "No parameter with key " + inject + " was found.";
                    Logger.log(1, log)
                }
            }

            return string;
        }

        /**
         * 
         * @param regex 
         */
        public setRegex(regex: RegExp) {
            this._regex = regex;
        }

        /**
         * 
         * @param arg1 
         * @param arg2 
         */
        public setArgs(arg1: string, arg2: string) {
            this._arg1 = arg1;
            this._arg2 = arg2;
        }

        /**
         * @description getter for the language
         */
        public get language(): string {
            return this._language;
        }

        public get arg1(): string {
            return this._arg1;
        }

        public get arg2(): string {
            return this._arg2;
        }

        public get regex(): RegExp {
            return this._regex;
        }
    }
}