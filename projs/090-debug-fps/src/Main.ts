/**
 * @copyright www.egret.com
 * @author 东北大客
 * @desc 开启帧频信息面板Egret会在舞台的左上角显示FPS和其他性能指标
 *      在index文件内找到data-show-fps字段，设置为true即可
 *      显示帧频信息，反之关闭。
 *      其中:
 *      FPS:-帧频
 *      Draw:-每帧draw方法调用的平均次数，脏区域占舞台的百分比
 *      Cost:-Ticker和EnterFrame阶段显示的耗时,每帧舞台所
 *      有事件处理和矩阵运算耗时，绘制显示对象耗时（单位是ms）
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
	private _iDirection = -1;
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


