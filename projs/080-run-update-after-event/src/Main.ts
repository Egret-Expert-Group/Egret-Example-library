/**
 * @copyright www.egret.com
 * @author dily
 * @desc 强制刷新
 *      设置帧频为5，默认没有打开强制刷新，点击舞台切换是否强制刷新
 */

class Main extends egret.DisplayObjectContainer {

    private _txInfo: egret.TextField;
    private timer: egret.Timer
    private timer2: egret.Timer
    public constructor() {
        super();

        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
        imgLoader.load( "resource/cartoon-egret_00.png" );
    }
    
    private bird:egret.Bitmap;
    private isUpdate:boolean;
    private imgLoadHandler( evt:egret.Event ):void{
        // 存储加载完毕的数据
        var data = evt.currentTarget.data;

        this.bird = new egret.Bitmap( data );
        this.bird.anchorOffsetX = this.bird.width/2;
        this.bird.anchorOffsetY = this.bird.height/2;
        this.bird.x = this.stage.stageWidth/2;
        this.bird.y = this.stage.stageHeight/2;
        this.addChild(this.bird);
        
        /// 提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.size = 24;
        this._txInfo.textColor = 0x000000;
        this._txInfo.lineSpacing = 10;
        this._txInfo.multiline = true;
        this._txInfo.text = "设置帧频为5\n默认没有打开强制刷新\n点击舞台切换是否强制刷新";
        this._txInfo.x = 30;
        this._txInfo.y = 150;
        this.addChild(this._txInfo);

        this.timer = new egret.Timer(50, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
            this.isUpdate = !this.isUpdate;
        }, this); 
    }    

    /*** 本示例关键代码段开始 ***/
    private timerFunc(event: egret.TimerEvent) {
        this.bird.rotation += 10;
        if(this.isUpdate){
            event.updateAfterEvent();
        }
    }
    /*** 本示例关键代码段结束 ***/
    
}


