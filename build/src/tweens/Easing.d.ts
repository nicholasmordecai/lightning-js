/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Easing {
        none(x: number, t: number, b: number, c: number, d: number): number;
        easeInQuad(t: number, b: number, c: number, d: number): number;
        easeOutQuad(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutQuad(x: number, t: number, b: number, c: number, d: number): number;
        easeInCubic(x: number, t: number, b: number, c: number, d: number): number;
        easeOutCubic(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutCubic(x: number, t: number, b: number, c: number, d: number): number;
        easeInQuart(x: number, t: number, b: number, c: number, d: number): number;
        easeOutQuart(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutQuart(x: number, t: number, b: number, c: number, d: number): number;
        easeInQuint(x: number, t: number, b: number, c: number, d: number): number;
        easeOutQuint(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutQuint(x: number, t: number, b: number, c: number, d: number): number;
        easeInSine(x: number, t: number, b: number, c: number, d: number): number;
        easeOutSine(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutSine(x: number, t: number, b: number, c: number, d: number): number;
        easeInExpo(x: number, t: number, b: number, c: number, d: number): number;
        easeOutExpo(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutExpo(x: number, t: number, b: number, c: number, d: number): number;
        easeInCirc(x: number, t: number, b: number, c: number, d: number): number;
        easeOutCirc(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutCirc(x: number, t: number, b: number, c: number, d: number): number;
        easeInElastic(x: number, t: number, b: number, c: number, d: number): number;
        easeOutElastic(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutElastic(x: number, t: number, b: number, c: number, d: number): number;
        easeInBack(x: number, t: number, b: number, c: number, d: number, s: number): number;
        easeOutBack(x: number, t: number, b: number, c: number, d: number, s: number): number;
        easeInOutBack(x: number, t: number, b: number, c: number, d: number, s: number): number;
        easeOutBounce(x: number, t: number, b: number, c: number, d: number): number;
    }
}
