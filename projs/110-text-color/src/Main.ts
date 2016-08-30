/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 文本字体颜色设置。
 *      触摸舞台更改文本字体颜色。
 */

class Main extends egret.DisplayObjectContainer {
    constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {
        var text:egret.TextField = new egret.TextField();
        text.text = "这是个文本颜色示例，\n请轻触更换文本颜色!";
        /*** 本示例关键代码段开始 ***/
        text.textColor = 0xffffff;
        /*** 本示例关键代码段结束 ***/
        this.addChild(text);
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        
        var colors:Array<number> = [];
        colors.push(0xff0000);
        colors.push(0xFFA500);
        colors.push(0xffff00);
        colors.push(0x00ff00);
        colors.push(0x0000ff);
        colors.push(0x800080);
        var count:number = 0;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            count %= colors.length;
            text.textColor = colors[count++];
        }, this);
    }
}