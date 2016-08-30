/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 文本超级链接设置。
 *      目前只支持事件响应，前提需要设置文本的 touchEnabled = true。
 *      点击有链接的文字会有log显示，点击没有链接的文字没有任何响应。
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        var text = new egret.TextField();
        /*** 本示例关键代码段开始 ***/
        text.textFlow = new Array({ text: "这段文字有链接", style: { "href": "event:text event triggered", underline: true } }, { text: "\n这段文字没链接", style: { "textColor": 0x999999 } });
        text.touchEnabled = true;
        text.addEventListener(egret.TextEvent.LINK, function (e) {
            egret.log(e.text);
        }, this);
        /*** 本示例关键代码段结束 ***/
        this.addChild(text);
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        text.lineSpacing = 20;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
