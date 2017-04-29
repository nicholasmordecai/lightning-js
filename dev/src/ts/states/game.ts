export default class GameState extends Lightning.State {

    create() {
        let s = new Lightning.Group();
        this.add(s);

        let g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        s.add(g);

        console.log(this.children)
    }
}