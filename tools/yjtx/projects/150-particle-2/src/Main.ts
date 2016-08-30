/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 粒子示例，摇钱树。
 *      点击后触发掉钱粒子效果。
 */

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/silver.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
        }
    }

    private system:particle.ParticleSystem;
    private systemLeaf:particle.ParticleSystem;
    
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var sky:egret.Bitmap = this.createBitmapByName("bg_png");
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        
        var normalTree_png:egret.Bitmap = this.createBitmapByName("normalTree_png");
        this.addChild(normalTree_png);
        normalTree_png.y = this.height/2 - normalTree_png.height/2;
        normalTree_png.x = this.stage.stageWidth / 2 - normalTree_png.width / 2;
        normalTree_png.touchEnabled = true;
        normalTree_png.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rainHandler, this);
        
        var texture = RES.getRes("leaftexiao_png");
        var config = RES.getRes("leaftexiao_json");
        this.systemLeaf = new particle.GravityParticleSystem(texture, config);
        this.addChild(this.systemLeaf);
        this.systemLeaf.start();
        
        this.rainHandler(null);
    }
    
    private _rainParticle:particle.GravityParticleSystem;
    private rainHandler(e:egret.TouchEvent):void {
        if (this._rainParticle == null) {
            var texture = RES.getRes("silver_png");
            var config = RES.getRes("silverRain_json");
            this._rainParticle = new particle.GravityParticleSystem(texture, config);
            this.addChild(this._rainParticle);
        }
        
        this._rainParticle.start(1000);
    }
    
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

  
}