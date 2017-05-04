export default class GameState extends Lightning.State {

    create() {
        let s = new Lightning.Group();
        this.add(s);

        let g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        s.add(g);

        let tween = this.game.tweens.create('test', g);
        tween.createAnim(0, 300, 1000, 0, 'x', Lightning.Easing.BounceIn);

        tween.start();

        g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        g.x = this.game.width - 100;
        s.add(g);

        g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        g.x = this.game.width - 100;
        g.y = this.game.height - 100;
        s.add(g);


        g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        g.y = this.game.height - 100;
        s.add(g);

        g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);

        g.x = 430;
        g.y = 220;
        s.add(g);

        g.interactive = true;
        g.on('mousedown', () => {
            this.game.goFullScreen();
            setTimeout(() => {
                this.game.scale.alignVertically();
            }, 250);
        });
        g.on('touchend', () => {
            this.game.goFullScreen();
            setTimeout(() => {
                this.game.scale.alignVertically();
            }, 250);
        })

                     
    }
}