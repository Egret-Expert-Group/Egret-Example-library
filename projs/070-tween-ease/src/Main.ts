/**
 * @copyright www.egret.com
 * @author city
 * @desc 缓动控制函数Tween.to()可以设置控制缓动过程的参数，这个参数是一
 *      个特定的插值计算方程，Egret已经提供了所有常见的27中缓动方程，均在
 *      egret.Ease类中。
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

    private _idxEase:number;

    private _vcEaseFunc: Array<EaseFunc>;

    private imgLoadHandler( evt:egret.Event ):void{

        var bmd:egret.BitmapData = evt.currentTarget.data;

        /// 本例只提供左下与右上两个位置，便于观察缓动方程
        /// 可以配置多个位置，同时 updateRdmLocation 中按顺序给出索引值。
        this._vcLocation = [
            //new egret.Point( bmd.width/2, 160 + bmd.height/2 )
            //,new egret.Point( this.stage.stageWidth - bmd.width/2, this.stage.stageHeight - bmd.height/2 )
            new egret.Point( bmd.width/2, this.stage.stageHeight - bmd.height/2 )
            ,new egret.Point( this.stage.stageWidth - bmd.width/2, 160 + bmd.height/2 )
        ]

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
        this._txInfo.width = this.stage.stageWidth - 100;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;

        this._idxEase = -1;

        /// 轻触舞台触发缓动
        this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.launchTween();
        }, this );

        /// 缓动方程库定义
        this._vcEaseFunc = [];
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.sineIn" ,egret.Ease.sineIn ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.sineOut" ,egret.Ease.sineOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.sineInOut" ,egret.Ease.sineInOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.backIn" ,egret.Ease.backIn  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.backOut" ,egret.Ease.backOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.backInOut" ,egret.Ease.backInOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.circIn" ,egret.Ease.circIn  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.circOut" ,egret.Ease.circOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.circInOut" ,egret.Ease.circInOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.bounceIn" ,egret.Ease.bounceIn  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.bounceOut" ,egret.Ease.bounceOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.bounceInOut" ,egret.Ease.bounceInOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.elasticIn" ,egret.Ease.elasticIn  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.elasticOut" ,egret.Ease.elasticOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.elasticInOut" ,egret.Ease.elasticInOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quadIn" ,egret.Ease.quadIn  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quadOut" ,egret.Ease.quadOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quadInOut" ,egret.Ease.quadInOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.cubicIn" ,egret.Ease.cubicIn  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.cubicOut" ,egret.Ease.cubicOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.cubicInOut" ,egret.Ease.cubicInOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quartIn" ,egret.Ease.quartIn  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quartOut" ,egret.Ease.quartOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quartInOut" ,egret.Ease.quartInOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quintIn" ,egret.Ease.quintIn  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quintOut" ,egret.Ease.quintOut  ) );
        this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quintInOut" ,egret.Ease.quintInOut  ) );

        /// 开启显示
        this._idxCurrLocation = -1;
        this.updateRdmLocation( true );
        this.updatePrompt();
    }

    private updatePrompt( sAppend:string = "" ):void {
        this._txInfo.text =
            "轻触屏幕启动一个随机位置的缓动过程，每一次缓动依次使用不同的插值方程" +
            "\n 当前插值：" + sAppend ;
    }

    private updateRdmLocation( bApply:boolean = false ):egret.Point {
        var vcIdxLocation = [ 0, 1 ]; 
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
        var params:EaseFunc = this._vcEaseFunc[ ++this._idxEase % this._vcEaseFunc.length ];
        egret.Tween.get( this._bird )
            .to( {x:loc.x,y:loc.y}, 600, params.func );
        /*** 本示例关键代码段结束 ***/
        this.updatePrompt( params.name );
    }
}

class EaseFunc{
    public name:string;
    public func:Function;
    constructor( name:string, func:Function ){
        this.name = name;
        this.func = func;
    }
}


