/**
 * @copyright www.egret.com
 * @author 东北大客
 * @desc 打开脏矩形显示调试开关可以看到屏幕刷新区域。
 *      在index.html文件内找到data-show-paint-rect
 *      字段设置为true即可打开脏矩形显示调试开关,反之关闭。
 */

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }

    private onAddToStage(event:egret.Event) {
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
        imgLoader.load( "resource/cartoon-egret_00.png" );
    }
    
	private _img:egret.Bitmap;
	private _iDirection = 1;
	private _iSpeed = 1;
	
    private imgLoadHandler( evt:egret.Event ):void{
       
        var img:egret.Bitmap = new egret.Bitmap( evt.currentTarget.data );
        img.x = this.stage.stageWidth / 2;
        img.y = this.stage.stageHeight / 2;
		img.anchorOffsetX = img.width / 2;
		img.anchorOffsetY = img.height / 2;
		this._img = img;
        this.addChild( this._img );
      
		/// 添加帧动画显示脏矩形刷新区域
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
	private onEnterFrame() {
		var img = this._img;
		img.rotation += this._iDirection * this._iSpeed;
		if ( img.rotation > 45 )
			this._iDirection = -1;
		else if ( img.rotation < -45 )
			this._iDirection = 1;
	}
}


