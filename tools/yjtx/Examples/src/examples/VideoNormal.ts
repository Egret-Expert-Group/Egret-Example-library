//libs:egret
//resources:resource/assets/posterfullscreen.jpg,resource/assets/posterinline.jpg,resource/assets/trailer.mp4
//docs:视频播放，点击 播放、暂停、停止、全屏 可以对视频进行操作。
//name:120-media-video

class VideoNormal extends egret.DisplayObjectContainer {

    private _video:egret.Video;

    constructor() {
        super();

        this.loadVideo();
        
        this.initCtr();
    }
    
    /*** 本示例关键代码段开始 ***/
    //加载
    private loadVideo(): void {
        this._video = new egret.Video();
        this._video.x = 100;
        this._video.y = 200;
        this._video.width = 427;
        this._video.height = 240;
        this._video.fullscreen = false;
        this._video.poster = this._video.fullscreen ? "resource/assets/posterfullscreen.jpg" : "resource/assets/posterinline.jpg";
        this._video.load("resource/assets/trailer.mp4");
        this.addChild(this._video);

        this._video.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log("complete");
        }, this);
        // this._video.fullscreen = false;
    }
    //播放
    private play():void {
        this.stop();
            
        this._video.play(this._pauseTime, false);
        this._video.addEventListener(egret.Event.ENDED, this.onComplete, this);
    }
    //停止
    private stop():void {
        this._video.pause();
    }
    //播放完成
    private onComplete(e:egret.Event):void {
        console.log("播放结束");
        this._video.removeEventListener(egret.Event.ENDED, this.onComplete, this);
        
        this.setAllAbled(false);
    }
    
    private changeScreen():void {
        if (!this._video.paused) {
            this._video.fullscreen = !this._video.fullscreen;
        }
    }
    /*** 本示例关键代码段结束 ***/
    
    /** 以下为 UI 代码 **/
    private _playTxt:egret.TextField;
    private _pauseTxt:egret.TextField;
    private _stopTxt:egret.TextField;
    private _fullTxt:egret.TextField;
    
    private _pauseTime: number = 0;
    private initCtr(): void {
        var _video:egret.Video = this._video;
        var rap:number = this._video.width / 4 + 5;
        var rapH:number = 100;
        
        //play
        var playTxt: egret.TextField = this._playTxt = new egret.TextField();
        playTxt.text = "播放";
        playTxt.size = 40;
        playTxt.x = this._video.x;
        playTxt.y = 400 + rapH;
        playTxt.touchEnabled = true;
        playTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.play(this._pauseTime, false);
            
            this.setAllAbled(true);
        }, this);
        this.addChild(playTxt);

        //stop
        var stopTxt: egret.TextField = this._stopTxt = new egret.TextField();
        stopTxt.text = "停止";
        stopTxt.size = 40;
        stopTxt.x = playTxt.x + rap * 1;
        stopTxt.y = 400 + rapH;
        stopTxt.touchEnabled = true;
        stopTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this._pauseTime = 0;
            _video.pause();

            this.setAllAbled(false);
        }, this);
        this.addChild(stopTxt);

        //pause 
        var pauseTxt: egret.TextField = this._pauseTxt = new egret.TextField();
        pauseTxt.text = "暂停";
        pauseTxt.size = 40;
        pauseTxt.x = playTxt.x + rap * 2;
        pauseTxt.y = 400 + rapH;
        pauseTxt.touchEnabled = true;
        pauseTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this._pauseTime = _video.position;
            _video.pause();

            this.setAllAbled(false);
        }, this);
        this.addChild(pauseTxt);

        //fullscreen 
        var fullTxt: egret.TextField = this._fullTxt = new egret.TextField();
        fullTxt.text = "全屏";
        fullTxt.size = 40;
        fullTxt.x = playTxt.x + rap * 3;
        fullTxt.y = 400 + rapH;
        fullTxt.touchEnabled = true;
        fullTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.changeScreen();
        }, this);
        this.addChild(fullTxt);
        
        this.setAllAbled(false);
    }
    
    private setAllAbled(isPlaying:boolean):void {
        this.setTextAbled(this._playTxt, !isPlaying);
        this.setTextAbled(this._stopTxt, isPlaying);
        this.setTextAbled(this._pauseTxt, isPlaying);
        this.setTextAbled(this._fullTxt, isPlaying);
    }
    
    private setTextAbled(text:egret.TextField, touchEnabled:boolean):void {
        text.touchEnabled = touchEnabled;
        if (touchEnabled) {
            text.textColor = 0xffffff;
        }
        else {
            text.textColor = 0x999999;
        }
    }
}