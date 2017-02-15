/// <reference path="Interfaces/Property.d.ts" />
/// <reference path="Interfaces/Callback.d.ts" />
/**
 * Frame class. Defines what each frame should consist of in an animation
 */
declare namespace Tween {
    class Frame {
        private _frameId;
        private _properties;
        private _relative;
        private _complex;
        constructor(frameId: number, relative: boolean);
        /**
         * Add another property to this frame
         */
        addProperty(property: string, val: number): void;
        frameId: number;
        properties: Array<Property>;
        relative: boolean;
        complex: boolean;
    }
}
