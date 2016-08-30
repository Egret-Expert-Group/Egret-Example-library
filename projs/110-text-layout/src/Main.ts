/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 文本对齐方式，可以通过egret.HorizontalAlign以及eg
 *      ret.VerticalAlign来分别设置文本的水平对齐以及垂直对齐方
 *      式。
 *      触摸舞台来查看不同的对齐方式的效果。
 */

class Main extends egret.DisplayObjectContainer {
    
    private text:egret.TextField;
        
    constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {
        this.initText();
        
        this.changeText();
    }
    
    private hAlignTexts:{[align:string]:string} = {};
    private vAlignTexts:{[align:string]:string} = {};
    
    private setAlgin(hAlign:string, vAlign:string):void {
        /*** 本示例关键代码段开始 ***/
        var text:egret.TextField = this.text;
        text.textAlign = hAlign;
        text.verticalAlign = vAlign;
        text.text = this.hAlignTexts[text.textAlign] + "\n" + this.vAlignTexts[text.verticalAlign] + "\n请轻触舞台更换对齐方式";
        /*** 本示例关键代码段结束 ***/
    }
    
    //初始化赋值
    private initText():void {
        this.hAlignTexts[egret.HorizontalAlign.LEFT] = "水平对齐：左对齐";
        this.hAlignTexts[egret.HorizontalAlign.CENTER] = "水平对齐：居中对齐";
        this.hAlignTexts[egret.HorizontalAlign.RIGHT] = "水平对齐：右对齐";
        
        this.vAlignTexts[egret.VerticalAlign.TOP] = "垂直对齐：顶对齐";
        this.vAlignTexts[egret.VerticalAlign.MIDDLE] = "垂直对齐：居中对齐";
        this.vAlignTexts[egret.VerticalAlign.BOTTOM] = "垂直对齐：底对齐";
        
        this.text = new egret.TextField();
        this.text.size = 30;
        this.text.width  = this.stage.stageWidth;
        this.text.height  = this.stage.stageHeight;
        this.text.lineSpacing = 10;
        this.addChild(this.text);
        
        this.setAlgin(egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
    }
    
    //轻触修改属性
    private changeText():void {
        var self = this;
        
        var text:egret.TextField = self.text;
        
        var hAlign:Array<string> = [egret.HorizontalAlign.LEFT, 
            egret.HorizontalAlign.CENTER, egret.HorizontalAlign.RIGHT]; 
        var vAlign:Array<string> = [egret.VerticalAlign.TOP, 
            egret.VerticalAlign.MIDDLE, 
            egret.VerticalAlign.BOTTOM];
            
        var hCount:number = 0;
        var vCound:number = 0;
        self.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
            self.setAlgin(hAlign[hCount], vAlign[vCound]);
            
            vCound++;
            if (vCound >= vAlign.length) {
                vCound = 0;
                hCount++;
                hCount %= hAlign.length;
            }
        }, self);
    }
}