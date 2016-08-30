/**
 * @copyright www.egret.com
 * @author dily
 * @desc 显示对象的深度管理。
 *      点击不同白鹭小鸟提升到最上层。
 */

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }

    private onAddToStage(event:egret.Event) {
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
        imgLoader.load( "resource/cartoon-egret_00.png" );
    }

    private _txInfo:egret.TextField;
    private imgLoadHandler( evt:egret.Event ):void{
        // 存储加载完毕的数据
        var data = evt.currentTarget.data;
        
        /*** 先初始化四个白鹭小鸟 ***/
        var upBird:egret.Bitmap = new egret.Bitmap( data );
        upBird.x = this.stage.stageWidth / 2 - upBird.width / 2;
        upBird.y = this.stage.stageHeight/2 - upBird.height/2;
        upBird.touchEnabled = true;
        upBird.pixelHitTest = true;
        this.addChild(upBird);
        
        var leftBird:egret.Bitmap = new egret.Bitmap( data );
        leftBird.x = 50;
        leftBird.y = this.stage.stageHeight / 2 - leftBird.height / 2;
        leftBird.touchEnabled = true;
        leftBird.pixelHitTest = true;
        this.addChild(leftBird);
        
        var rightBird:egret.Bitmap = new egret.Bitmap( data );
        rightBird.x = this.stage.stageWidth - rightBird.width - 50;
        rightBird.y = this.stage.stageHeight / 2 - rightBird.height / 2;
        rightBird.touchEnabled = true;
        rightBird.pixelHitTest = true;
        this.addChild(rightBird);
        /*** 以下代码三个按钮添加监听事件 ***/
        upBird.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            this.setChildIndex(upBird, this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this );      
        
        leftBird.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            this.setChildIndex(leftBird, this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this );      
        
        rightBird.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            this.setChildIndex(rightBird, this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this); 

        /// 提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.size = 28;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x843900;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同白鹭小鸟提升到最上层";
        this._txInfo.x = this.stage.stageWidth/2 - this._txInfo.width/2;
        this._txInfo.y = 10;
        this.addChild( this._txInfo );
    }
    
}


