/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 视频播放，点击 播放、暂停、停止、全屏 可以对视频进行操作。
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this._pauseTime = 0;
        this.loadVideo();
        this.initCtr();
    }
    var d = __define,c=Main,p=c.prototype;
    /*** 本示例关键代码段开始 ***/
    //加载
    p.loadVideo = function () {
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
    };
    //播放
    p.play = function () {
        this.stop();
        this._video.play(this._pauseTime, false);
        this._video.addEventListener(egret.Event.ENDED, this.onComplete, this);
    };
    //停止
    p.stop = function () {
        this._video.pause();
    };
    //播放完成
    p.onComplete = function (e) {
        console.log("播放结束");
        this._video.removeEventListener(egret.Event.ENDED, this.onComplete, this);
        this.setAllAbled(false);
    };
    p.changeScreen = function () {
        if (!this._video.paused) {
            this._video.fullscreen = !this._video.fullscreen;
        }
    };
    p.initCtr = function () {
        var _video = this._video;
        var rap = this._video.width / 4 + 5;
        var rapH = 100;
        //play
        var playTxt = this._playTxt = new egret.TextField();
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
        var stopTxt = this._stopTxt = new egret.TextField();
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
        var pauseTxt = this._pauseTxt = new egret.TextField();
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
        var fullTxt = this._fullTxt = new egret.TextField();
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
    };
    p.setAllAbled = function (isPlaying) {
        this.setTextAbled(this._playTxt, !isPlaying);
        this.setTextAbled(this._stopTxt, isPlaying);
        this.setTextAbled(this._pauseTxt, isPlaying);
        this.setTextAbled(this._fullTxt, isPlaying);
    };
    p.setTextAbled = function (text, touchEnabled) {
        text.touchEnabled = touchEnabled;
        if (touchEnabled) {
            text.textColor = 0xffffff;
        }
        else {
            text.textColor = 0x999999;
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
