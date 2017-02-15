/**
 * Callback interface. Defines the properties of a callback request for a specific frame in the animation
 */
interface Callback {
    name: string;
    funct: Function;
    functContext: any;
    functParams: any[];
    frame: number;
    once: boolean;
}
