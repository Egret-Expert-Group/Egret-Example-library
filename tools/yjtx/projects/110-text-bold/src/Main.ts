/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 文本字体加粗设置。
 *      触摸舞台来查看加粗后的效果。
 */

class Main extends egret.DisplayObjectContainer {
    constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {
        var text:egret.TextField = new egret.TextField();
        text.text = "这是个文本粗体示例，请轻触更换文本是否加粗!";
        /*** 本示例关键代码段开始 ***/
        text.bold = false;
        /*** 本示例关键代码段结束 ***/
        this.addChild(text);
        
        text.width = 400;
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            text.bold = !text.bold;
        }, this);
    }
}