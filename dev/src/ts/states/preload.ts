export default class PreloadState extends Lightning.State {

    create() {
        let g = new Lightning.Graphics();

        this.game.states.start('menu');
    }
}