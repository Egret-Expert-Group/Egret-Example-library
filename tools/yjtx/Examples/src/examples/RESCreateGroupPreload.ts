//libs:egret,res
//resources:resource/default.res.json,resource/assets/cartoon-egret_00.png,resource/assets/cartoon-egret_01.png,resource/assets/cartoon-egret_02.png,resource/assets/cartoon-egret_03.png,resource/config/description.json
//docs:res模块资源加载示例。\n通过创建新的group来加载一组文件。
//name:130-res-create-group-preload

class RESCreateGroupPreload extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        
        /*** 本示例关键代码段开始 ***/
        //加载已经配置过的组
        egret.log("创建前：" + RES.getGroupByName("icons").length);
        //创建动态 group
        RES.createGroup("icons", ["cartoon-egret_00_png", "cartoon-egret_01_png", "cartoon-egret_02_png", "cartoon-egret_03_png"]);
        egret.log("创建后：" + RES.getGroupByName("icons").length);
        //加载
        RES.loadGroup("icons");
        /*** 本示例关键代码段结束 ***/
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "icons") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }

    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "icons") {
        }
    }

    //创建游戏场景
    private createGameScene():void {
        this.createBitmapByName("cartoon-egret_00_png", this.stage.stageWidth / 2, 200);
        this.createBitmapByName("cartoon-egret_01_png", this.stage.stageWidth / 2 + 200, 400);
        this.createBitmapByName("cartoon-egret_02_png", this.stage.stageWidth / 2 - 200, 400);
        this.createBitmapByName("cartoon-egret_03_png", this.stage.stageWidth / 2, 600);
    }

    private createBitmapByName(name:string, x:number, y:number):void {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.scaleX = result.scaleY = 0.5;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.addChild(result);
    }
}


