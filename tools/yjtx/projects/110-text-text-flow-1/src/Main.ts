/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 富文本标准格式使用方式。
 */

class Main extends egret.DisplayObjectContainer {
    constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {
        var text:egret.TextField = new egret.TextField();
        text.textColor = 0xffffff;
        text.width = 540;
        text.size = 30;
        text.lineSpacing = 40;
        
        /*** 本示例关键代码段开始 ***/
        //设置文本的混合样式
        text.textFlow = <Array<egret.ITextElement>>[
            {text: "妈妈再也不用担心我在", style: {"size": 20}}, 
            {text: "Egret", style: {"textColor": 0x336699, "size": 60, "strokeColor": 0x6699cc, "stroke": 2}},
            {text: "里说一句话不能包含", style: {"fontFamily": "楷体"}},
            {text: "各种", style: {"fontFamily": "楷体", "underline" : true}},
            {text: "五", style: {"textColor": 0xff0000}},
            {text: "彩", style: {"textColor": 0x00ff00}},
            {text: "缤", style: {"textColor": 0xf000f0}},
            {text: "纷", style: {"textColor": 0x00ffff}},
            {text: "、\n"},
            {text: "大", style: {"size": 56}},
            {text: "小", style: {"size": 16}},
            {text: "不", style: {"size": 26}},
            {text: "一", style: {"size": 34}},
            {text: "、"},
            {text: "格", style: {"italic": true, "textColor": 0x00ff00}},
            {text: "式", style: {"size": 26, "textColor": 0xf000f0}},
            {text: "各", style: {"italic": true, "textColor": 0xf06f00}},
            {text: "样的文字", style: {"fontFamily": "KaiTi"}},//楷体
            {text: "了！"}
        ];
        /*** 本示例关键代码段结束 ***/
        this.addChild(text);
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        
    }
}