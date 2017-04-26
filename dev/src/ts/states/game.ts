export default class GameState extends Lightning.State {

    create() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000, 1);
        graphics.drawRect(0, 0, 10000, 10000);
        let texture = this.game.generateTexture(graphics);
        let s = new PIXI.Sprite(texture);
        this.add(s);

        this.game.storage.length();
        this.game.enableDebug(this.game);
        // let cPos:number = 0;
        // let posData:Array<number> = [];

        // let width:number = 300;
        // let height:number = 200;
        // let segmentation:number = 20;
        // let maxSegmentsToShow:number = 15;
        // let wInc:number = width / segmentation;
        // let minLineHeight:number = height * 0.85;
        // let maxLineHeight:number = height * 0.15;
        // let paddingTop:number = height * 0.15;

        // let g = Lightning.Geometry.Rect(width, height);
        // g.tint = 0x1a1a1a;
        // let sprite = new Lightning.Sprite(this.game.generateTexture(g));
        // this.addChild(sprite);
        // sprite.enableInput();
        // sprite.input.onClick(() => {
        //     console.log(window.performance);
        // });
        // sprite.enableDrag(true);


        // let line = new Lightning.Sprite(null);
        // sprite.addChild(line);

        // let t = new Lightning.Timer(this.game);
        // t.interval = 500;
        // t.events.subscribe('tick', () => {
        //     let fps = Math.round(this.game.fps);
        //     // let fps:number = Math.floor(Math.random() * 60) + 0; 

        //     if(cPos >= maxSegmentsToShow) {
        //         posData.splice(0, 1);
        //     }
        //     posData.push(fps);

        //     let nLine = new Lightning.Graphics();
        //     nLine.lineStyle(1, 0xffa500, 1);
        //     nLine.moveTo(0, 0);

        //     let c:number = 0;
        //     let flag:boolean = false;
        //     let s:number = 100 / 60;
        //     let dist:number = minLineHeight - maxLineHeight;

        //     for(var i of posData) {  
        //         let drawWidth:number = c * wInc;
        //         let percentage:number = i * s / 100;
        //         let drawHeight:number = (dist - (dist * percentage) + paddingTop);
        //         nLine.lineTo(drawWidth, drawHeight);
        //         c++;
        //     }
            
        //     // console.log(this.game.debug.displayCount())

        //     line.texture = this.game.generateTexture(nLine);

        //     if(cPos < 20) {
        //         cPos++;
        //     }
        // });
    }
}