//libs:egret
//resources:
//docs:输入文本示例。\n点击输入文本，并会伴随 获得焦点、失去焦点、输入过程 中的事件响应。
//name:110-text-input
var TextFieldInput = (function (_super) {
    __extends(TextFieldInput, _super);
    function TextFieldInput() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=TextFieldInput,p=c.prototype;
    p.onAddToStage = function (event) {
        var input = new egret.TextField();
        input.text = "这是个单行输入文本示例";
        this.addChild(input);
        input.width = 480;
        input.height = 60;
        input.x = 80;
        input.border = true;
        input.borderColor = 0x999999;
        input.verticalAlign = egret.VerticalAlign.MIDDLE;
        /*** 本示例关键代码段开始 ***/
        input.type = egret.TextFieldType.INPUT;
        input.addEventListener(egret.FocusEvent.FOCUS_IN, function (e) {
            label.text = "输入开始：";
        }, this);
        input.addEventListener(egret.FocusEvent.FOCUS_OUT, function (e) {
            label.text += "\n输入结束";
        }, this);
        input.addEventListener(egret.Event.CHANGE, function (e) {
            label.text = "输入开始：\n" + input.text;
        }, this);
        /*** 本示例关键代码段结束 ***/
        var area = new egret.TextField();
        area.text = "这是个多行\n输入文本示例";
        this.addChild(area);
        area.width = 480;
        area.height = 460;
        area.x = 80;
        area.y = 100;
        area.border = true;
        area.borderColor = 0x999999;
        /*** 本示例关键代码段开始 ***/
        area.multiline = true;
        area.type = egret.TextFieldType.INPUT;
        area.addEventListener(egret.FocusEvent.FOCUS_IN, function (e) {
            label.text = "输入开始";
        }, this);
        area.addEventListener(egret.FocusEvent.FOCUS_OUT, function (e) {
            label.text += "\n输入结束";
        }, this);
        area.addEventListener(egret.Event.CHANGE, function (e) {
            label.text = "输入开始：\n" + area.text;
        }, this);
        /*** 本示例关键代码段结束 ***/
        var label = new egret.TextField();
        this.addChild(label);
        label.width = 480;
        label.x = 80;
        label.y = 600;
        label.textColor = 0x999999;
        label.size = 18;
    };
    return TextFieldInput;
}(egret.DisplayObjectContainer));
egret.registerClass(TextFieldInput,'TextFieldInput');
