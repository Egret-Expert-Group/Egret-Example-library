//libs:egret
//resources:
//docs:
//name:110-text-all
class TextFieldAll extends egret.DisplayObjectContainer {
    constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {
        /*** 本示例关键代码段开始 ***/
        var text:egret.TextField = new egret.TextField();
        //设置文本
        text.text = "这是个文本\n属性示例";
        //设置字体
        text.fontFamily = "Microsoft YaHei";
        //设置颜色
        text.textColor = 0xff0000;
        //设置字体大小
        text.size = 40;
        //设置粗体
        text.bold = true;
        //设置斜体
        text.italic = true;
        //设置文本水平对齐方式
        text.textAlign = egret.HorizontalAlign.CENTER;
        //设置文本垂直对齐方式
        text.verticalAlign = egret.VerticalAlign.BOTTOM;
        //设置行间距
        text.lineSpacing = 14;
        //设置文本描边宽度
        text.stroke = 1;
        //设置文本描边颜色
        text.strokeColor = 0xffff00;
        //显示文本边框
        text.border = true;
        //设置文本边框颜色
        text.borderColor = 0xffff00;
        //显示文本背景
        text.background = true;
        //设置文本背景颜色
        text.backgroundColor = 0x0000ff;
        //设置文本宽度
        text.width = 440;
        //设置文本高度
        text.height = 300;
        //设置文本水平坐标
        text.x = 320 - text.width / 2;
        //设置文本垂直坐标
        text.y = 400 - text.height / 2;
        /*** 本示例关键代码段结束 ***/
        
        this.addChild(text);
    }
}