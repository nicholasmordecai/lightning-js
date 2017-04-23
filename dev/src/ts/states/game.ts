export default class GameState extends Lightning.State {

    private test:number = 1;

    create() {
        let timer = new Lightning.Timer(this.game);
        // let t1 = timer.events.subscribe('tick', function(params, event, time) {
        //     console.log(this.test)
        // }, this, 'hello', 123, true, null);

        // let t1 = timer.events.subscribe('tick', (params, event, time) => {
        //     console.log(params, this.test)
        // }, null, 3);

        // timer.events.remove('tick', t1);
        let e = new Lightning.EventEmitter();
        let event = e.create('test');
        let i = e.subscribe('test', function() {
            console.log('hi')
        });

        console.log(i)
    }
}