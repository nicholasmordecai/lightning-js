export default class PreloadState extends Lightning.State {

    create() {
        this.game.states.destroy('boot');

        let g = new Lightning.Graphics();
        g.beginFill(0xff33aa, 1);
        g.drawRect(0,0,50,50);
        g.endFill();
        this.addChild(g);

        this.game.states.start('menu');
    }
}