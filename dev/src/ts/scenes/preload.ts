export default class PreloadState extends Lightning.Scene {

    init() {
        this.create();
    }

    preload() {
        // this.loader.addResource('music1', 'big.mp3');
        // this.loader.load();
    }

    preloadComplete() {
        this.create();
    }

    create() {
        // this.game.audio.play('music1');
        this.game.scenes.destroy('preload');
        this.game.scenes.start('game');
    }
}