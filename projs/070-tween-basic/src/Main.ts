/**
 * @copyright www.egret.com
 * @author city
 * @desc Egret提供的缓动库，从开发者角度设计API。使用力求精简。
 *      Tween.get()方法来获得缓动目标。然后可以对其任意可写的属性进行
 *      缓动控制。
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

    private _bird:egret.Bitmap;
    private _txInfo:egret.TextField;
    
    private _vcLocation:Array<egret.Point>;
    private _idxCurrLocation:number;
    
    
    private imgLoadHandler( evt:egret.Event ):void{
        
        var bmd:egret.BitmapData = evt.currentTarget.data;
        
        /// 设计几个位置便于运动
        this._vcLocation = [
            new egret.Point( bmd.width/2, 100 + bmd.height/2 )
            ,new egret.Point( this.stage.stageWidth - bmd.width/2, this.stage.stageHeight - bmd.height/2 )
            ,new egret.Point( bmd.width/2, this.stage.stageHeight - bmd.height/2 )
            ,new egret.Point( this.stage.stageWidth - bmd.width/2, 100 + bmd.height/2 )
        ];
        
        this._bird = new egret.Bitmap( bmd );
        this._bird.anchorOffsetX = bmd.width/2;
        this._bird.anchorOffsetY = bmd.height/2;
        this.addChild( this._bird );

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
        
        this._txInfo.text =
                "轻触屏幕启动一个随机位置的缓动过程";
        
        this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.launchTween();
        }, this );
        
        /// 开启显示
        this._idxCurrLocation = -1;
        
        //this.updateRdmLocation( true );       /// 从一个随机位置开启
        this._bird.x = this.stage.stageWidth / 2; 
        this._bird.y = this.stage.stageHeight / 2; 
    }
    
    /// 获得一个非当前的随机位置
    private updateRdmLocation( bApply:boolean = false ):egret.Point {
        var vcIdxLocation = [0,1,2,3];
        if( this._idxCurrLocation != -1 ){     /// 避免与之前选择雷同
            vcIdxLocation.splice( this._idxCurrLocation, 1 );
        }
        var loc:egret.Point = this._vcLocation[ this._idxCurrLocation = vcIdxLocation[ Math.floor( Math.random()*vcIdxLocation.length ) ] ];
        if( bApply ){
            this._bird.x = loc.x;
            this._bird.y = loc.y;
        }
        return loc;
    }
    
    private launchTween(){
        var loc:egret.Point = this.updateRdmLocation();
        /*** 本示例关键代码段开始 ***/
        egret.Tween.get( this._bird ).to( {x:loc.x,y:loc.y}, 300, egret.Ease.sineIn );
        /*** 本示例关键代码段结束 ***/
    }
    
}


