//libs:egret
//resources:
//docs:文本字体斜体设置。\n触摸舞台来查看倾斜后的效果。
//name:110-text-itatic
var TextFieldItalic = (function (_super) {
    __extends(TextFieldItalic, _super);
    function TextFieldItalic() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=TextFieldItalic,p=c.prototype;
    p.onAddToStage = function (event) {
        var text = new egret.TextField();
        text.text = "这是个文本斜体示例，请轻触更换文本是否倾斜!";
        /*** 本示例关键代码段开始 ***/
        text.italic = false;
        /*** 本示例关键代码段结束 ***/
        this.addChild(text);
        text.width = 400;
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            text.italic = !text.italic;
        }, this);
    };
    return TextFieldItalic;
}(egret.DisplayObjectContainer));
egret.registerClass(TextFieldItalic,'TextFieldItalic');
