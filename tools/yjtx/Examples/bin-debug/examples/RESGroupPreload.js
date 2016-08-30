//libs:egret,res
//resources:resource/default.res.json,resource/assets/cartoon-egret_00.png,resource/assets/cartoon-egret_01.png,resource/assets/cartoon-egret_02.png,resource/assets/cartoon-egret_03.png,resource/config/description.json
//docs:res模块资源加载示例。\n通过在 default.res.json 中配置对应的 group 来加载一组文件。
//name:130-res-group-preload
var RESGroupPreload = (function (_super) {
    __extends(RESGroupPreload, _super);
    function RESGroupPreload() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=RESGroupPreload,p=c.prototype;
    p.onAddToStage = function (event) {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        /*** 本示例关键代码段开始 ***/
        //加载已经配置过的组
        RES.loadGroup("preload");
        /*** 本示例关键代码段结束 ***/
    };
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    p.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    };
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
        }
    };
    //创建游戏场景
    p.createGameScene = function () {
        this.createBitmapByName("cartoon-egret_00_png", this.stage.stageWidth / 2, 200);
        this.createBitmapByName("cartoon-egret_01_png", this.stage.stageWidth / 2 + 200, 400);
        this.createBitmapByName("cartoon-egret_02_png", this.stage.stageWidth / 2 - 200, 400);
        this.createBitmapByName("cartoon-egret_03_png", this.stage.stageWidth / 2, 600);
    };
    p.createBitmapByName = function (name, x, y) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.scaleX = result.scaleY = 0.5;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.addChild(result);
    };
    return RESGroupPreload;
}(egret.DisplayObjectContainer));
egret.registerClass(RESGroupPreload,'RESGroupPreload');
