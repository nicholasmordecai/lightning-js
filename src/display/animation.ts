/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Animation extends PIXI.extras.AnimatedSprite {

        constructor(texture: Lightning.Texture | string | string[] | Lightning.Texture[], frames?: number, width: number = null, height: number = null) {

            let textures: Lightning.Texture[] = [];
            let texturesCreated: boolean = false;
            let baseTexture: Lightning.Texture;
            let isArray: boolean = false;

            if(texture instanceof Lightning.Texture) {
                baseTexture = texture;
            } else if (typeof(texture) === "string") {
                baseTexture = Lightning.Texture.fromImage(texture);
            } else if(texture instanceof Array) {
                for(var textureRef of texture) {
                    if(typeof(textureRef) === "string") {
                        textures.push(Lightning.Texture.fromImage(textureRef));
                    } else if(textureRef instanceof Lightning.Texture) {
                        textures.push(textureRef);
                    } 
                }
                texturesCreated = true;
            }

            if(texturesCreated) {
                super(textures);
                return this;
            }

            /**
             * if no width and height is passed, assume the sprite sheet is on a single line
             * in which case, divide the number of frames up by the texture length, and use that
             * as a basis for rectangle width and height
             */ 
            if(width === null && height === null) {
                let width: number = baseTexture.width / frames;
                let heigh: number = baseTexture.width / frames;
            } else if(width !== null && height === null) {
                /**
                 * if there is a valid width but no height, then assume the sprite sheet runs over multiple
                 * lines, there fore use the height from the width, and divide the texture up accordingly
                 */

            }
        }

        // reset the current frame back to 0
        public reset() {
            this.gotoAndStop(0);
        }
    }
}