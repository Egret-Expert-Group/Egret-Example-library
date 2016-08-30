/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 文本超级链接设置。
 *      目前只支持事件响应，前提需要设置文本的touchEnabled=true
 *      。
 *      点击有链接的文字会有log显示，点击没有链接的文字没有任何响应。
 */

class Main extends egret.DisplayObjectContainer {
    constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {
        var text:egret.TextField = new egret.TextField();
        /*** 本示例关键代码段开始 ***/
        text.textFlow = new Array<egret.ITextElement>(
            { text:"这段文字有链接", style: { "href" : "event:text event triggered", underline:true } }, 
            { text:"\n这段文字没链接", style: {"textColor" : 0x999999} }
        );
        text.touchEnabled = true;
        text.addEventListener(egret.TextEvent.LINK, function (e:egret.TextEvent) {
            egret.log( e.text );
        }, this);
        /*** 本示例关键代码段结束 ***/
        
        this.addChild(text);
        
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        text.lineSpacing = 20;
        
    }
}