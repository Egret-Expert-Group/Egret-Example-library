/**
 * @copyright www.egret.com
 * @author dily
 * @desc 向一个容器中添加或者删除一个显示对象。
 *      整个示例分四个区域，如果当前区域有对象点击则移除，如果没有显示对象则添加
 *      一个显示对象。
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
        
        /*** 以下代码使用shape和graphics区分四个区域 ***/
        var upLeft = new egret.Shape();
        upLeft.graphics.beginFill(0xf7acbc);
        upLeft.graphics.drawRect(0, 0, this.stage.stageWidth/2, this.stage.stageHeight/2);
        upLeft.graphics.endFill();
        upLeft.touchEnabled = true;
        upLeft.x = 0;
        upLeft.y = 0;
        this.addChild(upLeft);
        
        var upRight = new egret.Shape();
        upRight.graphics.beginFill(0xdeab8a);
        upRight.graphics.drawRect(0, 0, this.stage.stageWidth/2, this.stage.stageHeight/2);
        upRight.graphics.endFill();
        upRight.touchEnabled = true;
        upRight.x = this.stage.stageWidth/2;
        upRight.y = 0;       
        this.addChild(upRight);
        
        var downLeft = new egret.Shape();
        downLeft.graphics.beginFill(0xef5b9c);
        downLeft.graphics.drawRect(0, 0, this.stage.stageWidth/2, this.stage.stageHeight/2);
        downLeft.graphics.endFill();
        downLeft.touchEnabled = true;
        downLeft.x = 0;
        downLeft.y = this.stage.stageHeight/2;         
        this.addChild(downLeft);
        
        var downRight = new egret.Shape();
        downRight.graphics.beginFill(0xfedcbd);
        downRight.graphics.drawRect(0, 0, this.stage.stageWidth/2, this.stage.stageHeight/2);
        downRight.graphics.endFill();
        downRight.touchEnabled = true;
        downRight.x = this.stage.stageWidth/2;
        downRight.y = this.stage.stageHeight/2;   
        this.addChild(downRight);

        /*** 先初始化四个白鹭小鸟 ***/
        var upLeftBird:egret.Bitmap = new egret.Bitmap( data );
        upLeftBird.x = upLeft.x + upLeft.width/2 - upLeftBird.width/2;
        upLeftBird.y = upLeft.y + upLeft.height/2 - upLeftBird.height/2;
        
        var upRightBird:egret.Bitmap = new egret.Bitmap( data );
        upRightBird.x = upRight.x + upRight.width/2 - upRightBird.width/2;
        upRightBird.y = upRight.y + upRight.height/2 - upRightBird.height/2;
        
        var downLeftBird:egret.Bitmap = new egret.Bitmap( data );
        downLeftBird.x = downLeft.x + downLeft.width/2 - downLeftBird.width/2;
        downLeftBird.y = downLeft.y + downLeft.height/2 - downLeftBird.height/2;
        
        var downRightBird:egret.Bitmap = new egret.Bitmap( data );
        downRightBird.x = downRight.x + downRight.width/2 - downRightBird.width/2;
        downRightBird.y = downRight.y + downRight.height/2 - downRightBird.height/2;
        
        /*** 以下代码四个区域添加监听事件 ***/
        upLeft.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            /*** 本示例关键代码段开始 ***/
            if(this.contains(upLeftBird)){
                this.removeChild(upLeftBird);
            }else{
                this.addChild(upLeftBird);
            }
            /*** 本示例关键代码段结束 ***/
        }, this );      
        
        upRight.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            /*** 本示例关键代码段开始 ***/
            if(this.contains(upRightBird)){
                this.removeChild(upRightBird);
            }else{
                this.addChild(upRightBird);
            }
            /*** 本示例关键代码段结束 ***/
        }, this );      
        
        downLeft.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            /*** 本示例关键代码段开始 ***/
            if(this.contains(downLeftBird)){
                this.removeChild(downLeftBird);
            }else{
                this.addChild(downLeftBird);
            }
            /*** 本示例关键代码段结束 ***/
        }, this );      
        
        downRight.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            /*** 本示例关键代码段开始 ***/
            if(this.contains(downRightBird)){
                this.removeChild(downRightBird);
            }else{
                this.addChild(downRightBird);
            }
            /*** 本示例关键代码段结束 ***/
        }, this );       

        /// 提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.size = 28;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x843900;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同色块";
        this._txInfo.x = this.stage.stageWidth/2 - this._txInfo.width/2;
        this._txInfo.y = 10;
        this.addChild( this._txInfo );
    }
    
}


