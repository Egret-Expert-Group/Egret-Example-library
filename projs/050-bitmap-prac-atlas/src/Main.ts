/**
 * @copyright www.egret.com
 * @author city
 * @desc 一个纹理集可以包含若干图片的纹理，可以理解为一个图片库。
 *      其中每一个图片都包含一个ID，当使用白鹭官方的纹理集生成工具Textur
 *      eMerger制作纹理集时，默认将图片的主文件名作为其在纹理集中的ID。
 */

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }

    private onAddToStage( evt:egret.Event ) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, ()=>{
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            RES.loadGroup("preload");
        }, this);
        RES.loadConfig("resource/resources.json", "resource/");
        
    }

    private _txInfo:egret.TextField;               /// 文本提示信息
    private _bgInfo:egret.Shape;
    
    private onGroupComplete() {

        /// 设计纹理的ID时，确定某个规律 将有助于你在程序中巧妙的获取到这些资源
        var vcBirds:Array<egret.Bitmap> = new Array();
        for( var i = 0; i<4; ++i ){
            /*** 本示例关键代码段开始 ***/
            var txtr:egret.Texture = RES.getRes( "atlas.cartoon-egret_0"+i+"_small" );
            /*** 本示例关键代码段结束 ***/
            var bird:egret.Bitmap = new egret.Bitmap( txtr );
            var wHalfBird:number = bird.anchorOffsetX = txtr.textureWidth / 2;
            var hHalfBird:number = bird.anchorOffsetY = txtr.textureHeight / 2;
            bird.x = wHalfBird + ( this.stage.stageWidth - wHalfBird * 2 ) * Math.random() ;
            bird.y = hHalfBird + ( this.stage.stageHeight - hHalfBird * 2 ) * Math.random() ;
            vcBirds.push( bird );
            this.addChild( bird );
        }

        /// 提示信息
        this._txInfo = new egret.TextField;

        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.width = this.stage.stageWidth - 100;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.wordWrap = true;
        this._txInfo.multiline = true;
        //this._txInfo.background = true;
        //this._txInfo.backgroundColor = 0xFFFFFF;

        this._txInfo.text =
            "这些散落的图片均来自于同一张作为纹理集的PNG图片。轻触以改变位置";

        this._bgInfo = new egret.Shape;
        this.addChild( this._bgInfo );
        this.addChild( this._txInfo );

        this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.cacheAsBitmap = true;

        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill( 0xffffff, .5 );
        this._bgInfo.graphics.drawRect( 0, 0, this._txInfo.width, this._txInfo.height );
        this._bgInfo.graphics.endFill();
        
        /// 增加一点互动
        this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            for( var i = 0; i<4; ++i ){
                var bird:egret.Bitmap = vcBirds[i];
                bird.x = wHalfBird + ( this.stage.stageWidth - wHalfBird * 2 ) * Math.random() ;
                bird.y = hHalfBird + ( this.stage.stageHeight - hHalfBird * 2 ) * Math.random() ;
            }
        }, this );
    }
}