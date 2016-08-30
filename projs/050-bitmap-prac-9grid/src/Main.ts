/**
 * @copyright www.egret.com
 * @author city
 * @desc 九宫格又称九切片。根据UI边角特征切成九部分，其中保持四个角部分原始显示
 *      ，对边框和中心部分进行维持图像原始品质的拉伸，从而获得风格统一且灵活可调
 *      尺寸的UI。
 */

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }

    private onAddToStage( evt:egret.Event ) {
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
        imgLoader.load( "resource/dialog-bg.png" );
    }

    private _txInfo:egret.TextField;               /// 文本提示信息
    
    private _bmpUIUse9:egret.Bitmap;
    private _bmpUINouse9:egret.Bitmap;

    private imgLoadHandler( evt:egret.Event ):void {
        
        var bmd:egret.BitmapData = evt.currentTarget.data;

        /// 产生确定数量的白鹭小鸟

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

        this._txInfo.text =
            "上方UI使用了九宫格\n下方UI没有使用九宫格";

        /// 初始状态设定
        var yClipsStart = this._txInfo.x + this._txInfo.height + L.GAP_UNIFIED;
        L.W_UI_MAX = this.stage.stageWidth - L.GAP_UNIFIED * 2;
        L.H_UI_MAX = (this.stage.stageHeight - (yClipsStart + L.GAP_UNIFIED * 2)) / 2;

        /////////////////////////////////////////////// 使用九宫格 ////////////////////////////

        this._bmpUIUse9 = new egret.Bitmap( bmd );
        this.addChild( this._bmpUIUse9 );

        this._bmpUIUse9.width = L.W_UI_MAX;
        this._bmpUIUse9.height = L.H_UI_MIN;
        this._bmpUIUse9.anchorOffsetX = this._bmpUIUse9.width / 2;          /// 设置位图的锚点在其原图的中心位置
        this._bmpUIUse9.anchorOffsetY = this._bmpUIUse9.height / 2;

        this._bmpUIUse9.x = L.GAP_UNIFIED + L.W_UI_MAX / 2;          /// 定位到其展示区域的中心
        this._bmpUIUse9.y = yClipsStart + L.H_UI_MAX / 2 ;
        
        /*** 本示例关键代码段开始 ***/
        this._bmpUIUse9.scale9Grid = new egret.Rectangle( 84,84,572,572 );
        /*** 本示例关键代码段结束 ***/
        
        /////////////////////////////////////////////// 不使用九宫格 ////////////////////////////
        this._bmpUINouse9 = new egret.Bitmap( bmd );
        this.addChild( this._bmpUINouse9 );

        this._bmpUINouse9.width = L.W_UI_MAX;
        this._bmpUINouse9.height = L.H_UI_MIN;
        this._bmpUINouse9.anchorOffsetX = this._bmpUINouse9.width / 2;          /// 设置位图的锚点在其原图的中心位置
        this._bmpUINouse9.anchorOffsetY = this._bmpUINouse9.height / 2;

        this._bmpUINouse9.x = L.GAP_UNIFIED + L.W_UI_MAX / 2;          /// 定位到其展示区域的中心
        this._bmpUINouse9.y = this._bmpUIUse9.y + L.H_UI_MAX + L.GAP_UNIFIED ;
        
        ///// debug///
        //var mark:egret.Shape = new egret.Shape;
        //mark.graphics.lineStyle( 1, 0 );
        //mark.graphics.moveTo( this._bmpUIUse9.x, this._bmpUIUse9.y );
        //mark.graphics.lineTo( this._bmpUINouse9.x, this._bmpUINouse9.y );
        //this.addChild( mark );

        /////////////////////////////////////////////// 启动计时器 ////////////////////////////
            egret.Tween.get( this._bmpUIUse9, {loop:true, onChange:()=>{
                this._bmpUIUse9.anchorOffsetX = this._bmpUIUse9.width / 2;
                this._bmpUIUse9.anchorOffsetY = this._bmpUIUse9.height / 2;
            }} )
                .to( {width:L.W_UI_MIN, height:L.H_UI_MAX}, 1000 ) 
                .to( {width:L.W_UI_MAX, height:L.H_UI_MIN}, 1000 );
        
            egret.Tween.get( this._bmpUINouse9, {loop:true, onChange:()=>{
                this._bmpUINouse9.anchorOffsetX = this._bmpUINouse9.width / 2;
                this._bmpUINouse9.anchorOffsetY = this._bmpUINouse9.height / 2;
            }} )
                .to( {width:L.W_UI_MIN, height:L.H_UI_MAX}, 1000 )
                .to( {width:L.W_UI_MAX, height:L.H_UI_MIN}, 1000 );
    }
}

class MotionMode{
    public static ROT:number = 0; 
    public static MOV:number = 1; 
}

/// 布局定义
class L{
    public static GAP_UNIFIED:number = 10;
    public static W_UI_MAX:number ;
    public static H_UI_MAX:number ;  
    public static W_UI_MIN:number = 180; 
    public static H_UI_MIN:number = 180; 
}