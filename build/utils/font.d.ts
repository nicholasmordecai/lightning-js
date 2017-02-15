/// <reference path="../../src/reference.d.ts" />
declare namespace Lightning {
    /**
     * @description function for calculating scaling fonts
     *
     * @param {Object} game reference to the Engine instance
     * @param {number} size size of the font (in responsive pixels)
     * @param {string} font name of the font stored in resource cache
     *
     * @returns {string} concatinated string to pass directly to the PIXI.extras.BitmapText
     */
    function calcFont(game: Engine, size: number, font: string): string;
}
