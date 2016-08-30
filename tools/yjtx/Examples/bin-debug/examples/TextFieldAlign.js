//libs:egret
//resources:
//docs:文本对齐方式，可以通过 egret.HorizontalAlign 以及 egret.VerticalAlign 来分别设置文本的水平对齐以及垂直对齐方式。\n触摸舞台来查看不同的对齐方式的效果。
//name:110-text-layout
var TextFieldAlign = (function (_super) {
    __extends(TextFieldAlign, _super);
    function TextFieldAlign() {
        _super.call(this);
        this.hAlignTexts = {};
        this.vAlignTexts = {};
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=TextFieldAlign,p=c.prototype;
    p.onAddToStage = function (event) {
        this.initText();
        this.changeText();
    };
    p.setAlgin = function (hAlign, vAlign) {
        /*** 本示例关键代码段开始 ***/
        var text = this.text;
        text.textAlign = hAlign;
        text.verticalAlign = vAlign;
        text.text = this.hAlignTexts[text.textAlign] + "\n" + this.vAlignTexts[text.verticalAlign] + "\n请轻触舞台更换对齐方式";
        /*** 本示例关键代码段结束 ***/
    };
    //初始化赋值
    p.initText = function () {
        this.hAlignTexts[egret.HorizontalAlign.LEFT] = "水平对齐：左对齐";
        this.hAlignTexts[egret.HorizontalAlign.CENTER] = "水平对齐：居中对齐";
        this.hAlignTexts[egret.HorizontalAlign.RIGHT] = "水平对齐：右对齐";
        this.vAlignTexts[egret.VerticalAlign.TOP] = "垂直对齐：顶对齐";
        this.vAlignTexts[egret.VerticalAlign.MIDDLE] = "垂直对齐：居中对齐";
        this.vAlignTexts[egret.VerticalAlign.BOTTOM] = "垂直对齐：底对齐";
        this.text = new egret.TextField();
        this.text.size = 30;
        this.text.width = this.stage.stageWidth;
        this.text.height = this.stage.stageHeight;
        this.text.lineSpacing = 10;
        this.addChild(this.text);
        this.setAlgin(egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
    };
    //轻触修改属性
    p.changeText = function () {
        var self = this;
        var text = self.text;
        var hAlign = [egret.HorizontalAlign.LEFT,
            egret.HorizontalAlign.CENTER, egret.HorizontalAlign.RIGHT];
        var vAlign = [egret.VerticalAlign.TOP,
            egret.VerticalAlign.MIDDLE,
            egret.VerticalAlign.BOTTOM];
        var hCount = 0;
        var vCound = 0;
        self.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            self.setAlgin(hAlign[hCount], vAlign[vCound]);
            vCound++;
            if (vCound >= vAlign.length) {
                vCound = 0;
                hCount++;
                hCount %= hAlign.length;
            }
        }, self);
    };
    return TextFieldAlign;
}(egret.DisplayObjectContainer));
egret.registerClass(TextFieldAlign,'TextFieldAlign');
