/**
 * @copyright www.egret.com
 * @author A闪
 * @desc 此示例通过鼠标在场景中的移动来控制骨骼。我们创建了一个跟随鼠标运动的小鸟
 *      ，小龙人会与小鸟保持一定距离，同时小龙人的头和胳膊会跟随小鸟运动而做出不
 *      同姿势，非常有趣。
 */

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
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
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
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
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {

        this.initGame();
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser:egret.HtmlTextParser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield:egret.TextField = self.textfield;
        var count:number = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
    
    private factory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
    private armature: dragonBones.Armature;
    private armatureClip:egret.DisplayObject;
    private head: dragonBones.Bone;
    private armL: dragonBones.Bone;
    private armR: dragonBones.Bone;
    private lark: egret.Bitmap;
    private initGame(): void 
    {
        this.drawText();

        var skeletonData = RES.getRes("skeleton_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        
        this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        
        this.armature = this.factory.buildArmature("Dragon");
        this.armatureClip = this.armature.getDisplay();
        dragonBones.WorldClock.clock.add(this.armature);
        this.addChild(this.armatureClip);
        this.armatureClip.x = 200;
        this.armatureClip.y = 450;
        this.armature.animation.gotoAndPlay("walk");
        this.head = this.armature.getBone("head");
        this.armL = this.armature.getBone("armUpperR");
        this.armR = this.armature.getBone("armUpperR");
        /*Egret 旧版本使用如下代码。Egret 2.5 以上版本不推荐使用。
         egret.Ticker.getInstance().register(function (advancedTime) {
            this.checkDist();
            this.updateMove();
            this.updateBones();
            dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
         }, this);
        */
        /*
        *  Egret 2.5 以上版本使用如下代码：
        * */
        egret.startTick(this.onTicker, this);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.lark = new egret.Bitmap(RES.getRes("lark_png"));
        this.addChild(this.lark);
    }

    private _time:number;

    private onTicker(timeStamp:number) {

        if(!this._time) {
            this._time = timeStamp;
        }

        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;

        this.checkDist();
        this.updateMove();
        this.updateBones();

        dragonBones.WorldClock.clock.advanceTime(pass / 1000);

        return false;
    }

    
    private mouseX: number = 0;
    private mouseY: number = 0;
    private dist: number = 0;
    private moveDir: number = 0;
    private speedX: number = 0;
    private onTouchMove(evt: egret.TouchEvent): void
    {
        this.mouseX = evt.stageX;
        this.mouseY = evt.stageY;
        this.lark.x=this.mouseX - 39;
        this.lark.y=this.mouseY - 34;
    }
    private checkDist():void
    {
        this.dist = this.armatureClip.x-this.mouseX;
        if(this.dist<150)
        {
            this.updateBehavior(1);
        }
        else if(this.dist>190)
        {
            this.updateBehavior(-1)
        }
        else
        {
            this.updateBehavior(0)
        }
                    
    }
    private updateBehavior(dir:number):void
    {
        if(this.moveDir == dir) {
            return;
        }
        this.moveDir=dir;
        if (this.moveDir == 0)
        {
            this.speedX = 0;
            this.armature.animation.gotoAndPlay("stand");
        }
        else
        {
            this.speedX=6*this.moveDir;
            this.armature.animation.gotoAndPlay("walk");
        }
    }
    private updateMove():void
    {
        if (this.speedX != 0) 
        {
            this.armatureClip.x += this.speedX;
            if (this.armatureClip.x < 0) 
            {
                this.armatureClip.x = 0;
            }
            else if (this.armatureClip.x > 800) 
            {
                this.armatureClip.x = 800;
            }
        }
    }
    private updateBones():void
    {
        //update the bones' pos or rotation
        var _r = Math.PI + Math.atan2(this.mouseY - this.armatureClip.y+this.armatureClip.height/2, this.mouseX - this.armatureClip.x);
        if (_r > Math.PI)
        {
            _r -= Math.PI * 2;
        }
        this.head.offset.rotation = _r *0.3       
        this.armR.offset.rotation = _r *0.8;
        this.armL.offset.rotation = _r * 1.5;
        this.lark.rotation=_r*0.2;
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
            "通过鼠标在场景中的移动来控制骨骼";

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
