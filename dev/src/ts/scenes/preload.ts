export default class PreloadState extends Lightning.Scene {

    create() {
        console.log('init preload');
        this.game.scenes.start('menu');
    }
}