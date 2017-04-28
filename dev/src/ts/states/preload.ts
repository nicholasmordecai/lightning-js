export default class PreloadState extends Lightning.State {

    create() {
        this.game.states.destroy('preload');
        this.game.states.start('menu');
    }
}