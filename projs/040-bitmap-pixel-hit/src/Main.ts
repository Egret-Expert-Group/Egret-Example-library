/**
 * @copyright www.egret.com
 * @author city
 * @desc 点击穿透功能是与碰撞检测的形状检测开关接近的概念。
 *      这两个功能，都是针对位图的完全透明像素区域来说的。打开点击穿透开关的位图
 *      ，触摸其透明区域将不会再派发事件。
 *      请注意本示例与碰撞检测示例的示例表现虽然很接近，但实现方式完全不同：点击
 *      穿透需要通过触摸事件来检测，而碰撞检测不需要任何触摸，是直接用一个点对一
 *      个显示对象进行检测。
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

    private launchCollisionTest():void {

        this._bigbird.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this );
        this._bigbird.pixelHitTest = false;
        this._bigbird.touchEnabled = true;

        this.updateInfo( false );
    }

    private checkCollision( stageX:number, stageY:number, bTouch:boolean ):void {

            /// 小圆点同步手指位置
        this._dot.x = stageX;
        this._dot.y = stageY;

        /// 文字信息更新
        this.updateInfo( bTouch );
    }

    private touchHandler( evt:egret.TouchEvent ){
        switch ( evt.type ){
            case egret.TouchEvent.TOUCH_MOVE:
                this.checkCollision( evt.stageX, evt.stageY, true );
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                if( !this._txInfo.hitTestPoint( evt.stageX, evt.stageY ) ){ /// if代码确保触摸开始位置不在文字区域
                    evt.currentTarget.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this );
                    evt.currentTarget.once( egret.TouchEvent.TOUCH_END, this.touchHandler, this );
                    this.addChild( this._dot );
                    this.checkCollision( evt.stageX, evt.stageY, true );
                }
                break;
            case egret. TouchEvent.TOUCH_END:
            case egret. TouchEvent.TOUCH_RELEASE_OUTSIDE:
                evt.currentTarget.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this );
                evt.currentTarget.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this );
                if( this._dot.parent ){
                    this._dot.parent.removeChild( this._dot );
                }
                this.updateInfo( false );
                break;
        }
    }
    
    private updateInfo( bTouch:boolean ){
        this._txInfo.text =
            "点击穿透检测结果：" + ( bTouch ? "别碰我！！": "还没碰到！" )
            +"\n\n点击穿透检测模式：" +( this._bigbird.pixelHitTest ? "小白鹭透明穿透" : "小白鹭无穿透" )
            +"\n（轻触文字区切换）";
    }

    private _bigbird:egret.Bitmap;
    private _dot:egret.Shape;
    private _txInfo:egret.TextField;

    private imgLoadHandler( evt:egret.Event ):void {
        
        /// 展示用显示对象： 白鹭小鸟
        this._bigbird = new egret.Bitmap( evt.currentTarget.data );
        this.addChild( this._bigbird );

        this._bigbird.anchorOffsetX = this._bigbird.width / 2;
        this._bigbird.anchorOffsetY = this._bigbird.height / 2;
        this._bigbird.x = this.stage.stageWidth * 0.5;
        this._bigbird.y = this.stage.stageHeight * 0.618;
        this._bigbird.rotation = 35;
        
        /// 小圆点，用以提示用户按下位置
        this._dot = new egret.Shape;
        this._dot.graphics.beginFill( 0x00ff00 );
        this._dot.graphics.drawCircle( 0, 0, 5 );
        this._dot.graphics.endFill();

        /// 提示信息
        this._txInfo = new egret.TextField;
        this.addChild( this._txInfo );

        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.touchEnabled = true;
        this._txInfo.addEventListener( egret.TouchEvent.TOUCH_TAP, ( evt:egret.TouchEvent )=>{
            evt.stopImmediatePropagation();

            /*** 本示例关键代码段开始 ***/
            this._bigbird.pixelHitTest = !this._bigbird.pixelHitTest;
            /*** 本示例关键代码段结束 ***/
            
            this.updateInfo( false );
        }, this );
        
        this.launchCollisionTest();
    }

}


class TouchCollideStatus{
    public static NO_TOUCHED:number = 0;
    public static TOUCHED_NO_COLLIDED:number = 1;
    public static COLLIDED:number = 2;
}