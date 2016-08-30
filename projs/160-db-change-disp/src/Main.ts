/**
 * @copyright www.egret.com
 * @author A闪
 * @desc 点击不同的分类在试衣间完成换装。
 *      演示基本骨骼动画和程序换装效果。
 */

class Main extends egret.DisplayObjectContainer {


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
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

    private _armature:dragonBones.Armature = null;  //人物骨架
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        this.drawText();

        var dbdata = RES.getRes( "man_json" );
        var texturedata = RES.getRes( "texture_json" );
        var texture = RES.getRes( "texture_png" );

        var dbf:dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dbf.addSkeletonData( dragonBones.DataParser.parseDragonBonesData(dbdata) );
        dbf.addTextureAtlas( new dragonBones.EgretTextureAtlas(texture,texturedata) );
        var arm:dragonBones.Armature = dbf.buildArmature( "man" );

        arm.animation.gotoAndPlay( "runFront",0,-1,0 );
        dragonBones.WorldClock.clock.add( arm );

        this._armature = arm;
        egret.startTick(this.dbrun, this);

        this._armature.display.x = 300;
        this._armature.display.y = 500;
        this.addChild(this._armature.display);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.click,this);
    }

    private dbrun( timeStamp:number ):boolean
    {
        dragonBones.WorldClock.clock.advanceTime( 0.01 );
        return true;
    }

    private status:boolean = true;
    private c1 = ["m_121005_F_S_png","m_121005_F_L1_png","m_121005_F_L2_png","m_121005_F_R1_png","m_121005_F_R2_png"];
    private c2 = ["m_121011_F_S_png","m_121011_F_L1_png","m_121011_F_L2_png","m_121011_F_R1_png","m_121011_F_R2_png"];
    private click(evt:egret.TouchEvent)
    {
        if(this.status)
        {
            this.setCloth(this.c1);
        }
        else
        {
            this.setCloth(this.c2);
        }
        this.status = !this.status;
    }

    //设置上衣
    //参数为即将替换的纹理集ID
    public setCloth( val:string[] ):void
    {
        this.setNewSlot( "Ayifu"    , val[0] );
        this.setNewSlot( "Axiuzi11" , val[1] );
        this.setNewSlot( "Axiuzi21" , val[2] );
        this.setNewSlot( "Axiuzi12" , val[3] );
        this.setNewSlot( "Axiuzi22" , val[4] );
    }

    //针对slot设置其新内容
    private setNewSlot( slotName:string, textureName:string )
    {
        //方法1
        var slot:dragonBones.Slot = this._armature.getSlot( slotName );
        var b:egret.Bitmap = new egret.Bitmap();
        b.texture = RES.getRes( textureName );
        b.x = slot.display.x;
        b.y = slot.display.y;
        b.anchorOffsetX = b.width/2;
        b.anchorOffsetY = b.height/2;
        slot.setDisplay( b );

        //方法2，仅限于slot中内容为Bitmap
        //var slot:dragonBones.Slot = this._armature.getSlot(slotName);
        //slot.display.texture = RES.getRes(textureName);
    }

    private _txInfo:egret.TextField;
    private _bgInfo:egret.Shape;
    private drawText()
    {
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
            "点击舞台可换装";

        this._bgInfo = new egret.Shape;
        this.addChildAt( this._bgInfo, this.numChildren - 1 );

        this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill( 0xffffff, .5 );
        this._bgInfo.graphics.drawRect( 0, 0, this._txInfo.width, this._txInfo.height );
        this._bgInfo.graphics.endFill();
    }
}