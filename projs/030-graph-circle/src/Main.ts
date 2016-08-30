/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 绘制圆形矢量，点击舞台，会在点击位置出现一个随机圆。
 */

class Main extends egret.DisplayObjectContainer {
    
    private shape:egret.Shape = new egret.Shape();
        
    constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {
        this.initGraphics();
        
        this.changeGraphics();
    }
    
    private drawCircle(x:number, y:number):void {
        var shape:egret.Shape = this.shape;
        shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        shape.graphics.drawCircle(x, y, Math.random() * 50 + 50);
        shape.graphics.endFill();
    }
    
    //初始化赋值
    private initGraphics():void {
        var shape:egret.Shape = this.shape;
        this.addChild(shape);
        
        this.drawCircle(this.stage.stageWidth / 2, this.stage.stageHeight / 2);
    }
    
    //轻触修改属性
    private changeGraphics():void {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
            this.drawCircle(e.stageX, e.stageY);
        }, this);
    }
}