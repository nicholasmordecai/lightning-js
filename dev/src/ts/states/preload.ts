export default class PreloadState extends Lightning.State {

    create() {
        this.game.states.start('menu');
    }
}