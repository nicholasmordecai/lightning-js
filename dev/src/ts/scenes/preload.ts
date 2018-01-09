export default class PreloadState extends Lightning.Scene {

    private _t: number;

    init() {
        console.log(this._t);
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
        // this.game.scenes.destroy('preload');
        // this.game.scenes.start('menu');

        setTimeout(() => {
            this._t = 3;
            this.game.scenes.restart('preload');
        }, 3000);
    }
}