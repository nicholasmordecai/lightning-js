export default class GameState extends Lightning.State {

    create() {
        let s = new Lightning.Group();
        this.add(s);

        let g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        s.add(g);

        let tween = this.game.tweens.create('test', g);
        tween.createAnim(0, 300, 1000, 0, 'x', Lightning.Easing.inOutCirc);

        let tween2 = this.game.tweens.create('test2', g);
        tween2.createAnim(300, 0, 1000, 0, 'x', Lightning.Easing.inOutCirc);
        
        tween.chain(tween2);
        tween.start();
        
    }
}