/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 绘制直线api。
 *      点击舞台，会在随机出现由线组成的锥形。
 */

class Main extends egret.DisplayObjectContainer {
    
    private _shape:egret.Shape; 
        
    constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {
        this._shape = new egret.Shape();
        this.addChild(this._shape);
        // this.initGraphics();
        this.drawCone();
        
        this.changeGraphics();
    }
    
    //初始化赋值
    private initGraphics():void {
        var shape:egret.Shape = this._shape;
         
        /*** 本示例关键代码段开始 ***/
        shape.graphics.lineStyle(2, 0xff00ff);
        shape.graphics.moveTo(320, 400);
        shape.graphics.lineTo(380, 300);
        /*** 本示例关键代码段结束 ***/
    }
     
    //轻触修改属性
    private changeGraphics():void {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
            this.drawCone();
        }, this);
    }
    
    private drawCone():void {
        var shape:egret.Shape = this._shape;
        
        var array = [{x:320 - 200, y:400}, {x:320 + 200, y:400}, {x: Math.random() * 300 + 180, y:200}, {x: Math.random() * 300 + 180, y:600}];
            
        shape.graphics.clear();
        
        for (var i:number = 0; i < array.length; i++) {
            for (var j:number = i; j < array.length; j++) {
                shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
                shape.graphics.moveTo(array[i]["x"], array[i]["y"]);
                shape.graphics.lineTo(array[j]["x"], array[j]["y"]);
            }
        }
    }
}