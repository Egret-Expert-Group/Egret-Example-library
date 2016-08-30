//libs:egret
//resources:
//docs:文本字体加粗设置。\n触摸舞台来查看加粗后的效果。
//name:110-text-bold
var TextFieldBold = (function (_super) {
    __extends(TextFieldBold, _super);
    function TextFieldBold() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=TextFieldBold,p=c.prototype;
    p.onAddToStage = function (event) {
        var text = new egret.TextField();
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
    };
    return TextFieldBold;
}(egret.DisplayObjectContainer));
egret.registerClass(TextFieldBold,'TextFieldBold');
