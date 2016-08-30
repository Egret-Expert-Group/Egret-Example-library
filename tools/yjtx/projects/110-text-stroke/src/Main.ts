/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 文本描边设置，通过设置 stroke 以及 strokeColor 来设置描边的粗细、颜色。
 *      触摸舞台更改文本字体描边粗细以及颜色值。
 */

class Main extends egret.DisplayObjectContainer {
    constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {
        var text:egret.TextField = new egret.TextField();
        text.text = "这是个文本描边示例，\n请轻触更换文本描边数值!";
        /*** 本示例关键代码段开始 ***/
        text.stroke = 1;
        text.strokeColor = 0xff0000;
        /*** 本示例关键代码段结束 ***/
        this.addChild(text);
        
        text.lineSpacing = 20;
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        
        var sizes:Array<any> = [];
        sizes.push([1, 0xff0000]);
        sizes.push([2, 0xffff00]);
        sizes.push([2.5, 0xff00ff]);
        sizes.push([3, 0x00ff00]);
        sizes.push([6, 0xff0000]);
        sizes.push([0, 0xff0000]);
        var count:number = 1;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            text.stroke = sizes[count][0];
            text.strokeColor = sizes[count][1];
            
            text.x = 320 - text.textWidth / 2;
            text.y = 400 - text.textHeight / 2;
            
            count++;
            count %= sizes.length;
        }, this);
    }
}