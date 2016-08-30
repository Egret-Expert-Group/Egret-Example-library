/**
 * @copyright www.egret.com
 * @author city
 * @desc 这里放一些该示
 *      例的说明
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
        /*** 本示例关键代码段开始 ***/
        var img:egret.Bitmap = new egret.Bitmap( evt.currentTarget.data );
        img.x = 100;
        img.y = 100;
        this.addChild( img );
        /*** 本示例关键代码段结束 ***/

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
        
        this._txInfo.text = "提示信息";
    }
    
}


