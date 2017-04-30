/// <reference path="./../reference.d.ts" />

namespace Lightning {

    export class Easing {
        public static linear(t, b, c, d) {
            return c*t/d + b;
        };

        public static inQuad(t, b, c, d) {
            t /= d;
            return c*t*t + b;
        };

        public static outQuad(t, b, c, d) {
            t /= d;
            return -c * t*(t-2) + b;
        };

        public static inOutQuad(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };

        public static inCubic(t, b, c, d) {
            t /= d;
            return c*t*t*t + b;
        };

        public static outCubic(t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t + 1) + b;
        };

        public static inOutCubic(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        };

        public static inQuart(t, b, c, d) {
            t /= d;
            return c*t*t*t*t + b;
        };

        public static outQuart(t, b, c, d) {
            t /= d;
            t--;
            return -c * (t*t*t*t - 1) + b;
        };

        public static inOutQuart(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t*t + b;
            t -= 2;
            return -c/2 * (t*t*t*t - 2) + b;
        };

        public static inQuint(t, b, c, d) {
            t /= d;
            return c*t*t*t*t*t + b;
        };

        public static outQuint(t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t*t*t + 1) + b;
        };

        public static inOutQuint(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t*t*t + 2) + b;
        };

        public static inSine(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        };

        public static outSine(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        };

        public static inOutSine(t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        };

        public static inExpo(t, b, c, d) {
            return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
        };

        public static outExpo(t, b, c, d) {
            return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
        };

        public static inOutExpo(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
            t--;
            return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
        };
            
        public static inCirc(t, b, c, d) {
            t /= d;
            return -c * (Math.sqrt(1 - t*t) - 1) + b;
        };

        public static outCirc(t, b, c, d) {
            t /= d;
            t--;
            return c * Math.sqrt(1 - t*t) + b;
        };

        public static inOutCirc(t, b, c, d) {
            t /= d/2;
            if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            t -= 2;
            return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
        };

        public static inBack(x:number, t:number, b:number, c:number, d:number, s:number):number {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        }

        public static outBack(x:number, t:number, b:number, c:number, d:number, s:number):number {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }

        public static inOutBack(x:number, t:number, b:number, c:number, d:number, s:number):number {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }

        public static inElastic(x:number, t:number, b:number, c:number, d:number):number {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }

        public static outElastic(x:number, t:number, b:number, c:number, d:number):number {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        }

        public static inOutElastic(x:number, t:number, b:number, c:number, d:number):number {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }

        /**
         * -- Missing --
         * Bounce
         * 
         */
    }
}