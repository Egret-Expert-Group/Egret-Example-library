//libs:egret
//resources:
//docs:文本字体颜色设置。\n触摸舞台更改文本字体颜色。
//name:110-text-color
var TextFieldColor = (function (_super) {
    __extends(TextFieldColor, _super);
    function TextFieldColor() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=TextFieldColor,p=c.prototype;
    p.onAddToStage = function (event) {
        var text = new egret.TextField();
        text.text = "这是个文本颜色示例，\n请轻触更换文本颜色!";
        /*** 本示例关键代码段开始 ***/
        text.textColor = 0xffffff;
        /*** 本示例关键代码段结束 ***/
        this.addChild(text);
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        var colors = [];
        colors.push(0xff0000);
        colors.push(0xFFA500);
        colors.push(0xffff00);
        colors.push(0x00ff00);
        colors.push(0x0000ff);
        colors.push(0x800080);
        var count = 0;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            count %= colors.length;
            text.textColor = colors[count++];
        }, this);
    };
    return TextFieldColor;
}(egret.DisplayObjectContainer));
egret.registerClass(TextFieldColor,'TextFieldColor');
