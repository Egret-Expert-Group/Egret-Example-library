//libs:egret
//resources:
//docs:文本超级链接设置。\n目前只支持事件响应，前提需要设置文本的 touchEnabled = true。\n点击有链接的文字会有log显示，点击没有链接的文字没有任何响应。
//name:110-text-href
//log:true
var TextFieldHref = (function (_super) {
    __extends(TextFieldHref, _super);
    function TextFieldHref() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=TextFieldHref,p=c.prototype;
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
    return TextFieldHref;
}(egret.DisplayObjectContainer));
egret.registerClass(TextFieldHref,'TextFieldHref');
