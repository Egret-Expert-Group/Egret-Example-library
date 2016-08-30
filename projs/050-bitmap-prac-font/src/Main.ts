/**
 * @copyright www.egret.com
 * @author city
 * @desc 位图字体为游戏UI、特效或者有特殊美术需求的文字提供了完全自定义的实现方
 *      式。
 */

class Main extends egret.DisplayObjectContainer {

    private static NUM:number = 32;
    private static SCALE_BASE:number = .5;
    private static SCALE_RANGE:number = .5;

    public constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }

    private onAddToStage( evt:egret.Event ) {
        /*** 本示例关键代码段开始 ***/
        RES.getResByUrl( "resource/cartoon-font.fnt", this.onLoadComplete, this,
            RES.ResourceItem.TYPE_FONT );
    }

    private _bitmapText:egret.BitmapText;
    private onLoadComplete( font:egret.BitmapFont ):void {
        this._bitmapText = new egret.BitmapText();
        this._bitmapText.font = font;
        /*** 本示例关键代码段结束 ***/

        this._bitmapText.x = 50;
        this._bitmapText.y = 300;
        this.addChild( this._bitmapText );
        
        this.addPrompt();

        this._idxPrevFocus = -1;
        
        /// 轻触舞台以改变位图文本所用文字
        this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, ( evt:egret.TouchEvent )=>{
            this.updateBitmapTextContent();
        }, this );
        
        this.updateBitmapTextContent();
    }
    
    /// 当前随机短语的索引
    private _idxPrevFocus:number;
    
    /// 用户交互触发位图文本内容变更
    private updateBitmapTextContent(){
        var vcPhraseIdx = [0,1,2,3,4,5];
        if( this._idxPrevFocus != -1 ){     /// 避免与之前选择短语雷同
            vcPhraseIdx.splice( this._idxPrevFocus, 1 ); 
        }
        this._bitmapText.text =  [
            "No pain no gain!"
            ,"Let's change the subject!"
            ,"Don't make up a story."
            ,"He is a fast talker."
            ,"You have my word!"
            ,"What brought you here?"
        ][ this._idxPrevFocus = vcPhraseIdx[ Math.floor( Math.random()*vcPhraseIdx.length ) ] ];
        //console.log( "hit:", vcPhraseIdx, this._idxPrevFocus );
    }

    private _txInfo:egret.TextField;               /// 文本提示信息

    private addPrompt( ):void {
        
        /// 提示信息
        this._txInfo = new egret.TextField;
        this.addChild( this._txInfo );

        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.width = this.stage.stageWidth - 100;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        //this._txInfo.background = true;
        //this._txInfo.backgroundColor = 0xffffff;
        this._txInfo.text =
            "以下文本是位图字体生成" +
            "\n轻触舞台以改变位图文本所用文字";
    }
}