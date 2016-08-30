/**
 * @copyright www.egret.com
 * @author A闪
 * @desc 摩托车骨骼示例
 *      鼠标左右滑动控制摩托车方向
 *      点击鼠标，可查看摩托车拥有状态
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
        //egret.Profiler.getInstance().run();
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
        RES.loadGroup("TestArmature");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "TestArmature") {
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
        if (event.groupName == "TestArmature") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        var gestureImage = this.createBitmapByName("gestures_png");
        gestureImage.x = 200;
        gestureImage.y = 10;
        egret.MainContext.instance.stage.addChild(gestureImage);
        this.createMotorcycleExp();

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        //RES.getResAsync("description", this.startAnimation, this)
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
    /**骨骼角色拥有的动作列表**/
    private actionArray;
    /**骨骼角色执行的当前动作索引**/
    private actionFlag;
    /**存放骨骼动画的容器**/
    private container;
    /**骨骼的实体数据**/
    private armature;
    /**骨骼的可视对象**/
    private armatureDisplay;
    /**创建骨骼模型**/
    private createMotorcycleExp():void {
        this.actionArray = ["stay", "left", "right"];
        this.container = new egret.DisplayObjectContainer();

        egret.MainContext.instance.stage.addChild(this.container);
        this.container.x = 200;
        this.container.y = 450;
        //读取一个骨骼数据,并创建实例显示到舞台
        var skeletonData = RES.getRes("skeleton_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");

        var factory = new dragonBones.EgretFactory()
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

        this.armature = factory.buildArmature("motorcycleMan");
        this.armatureDisplay = this.armature.getDisplay();
        dragonBones.WorldClock.clock.add(this.armature);
        this.container.addChild(this.armatureDisplay);
        this.armatureDisplay.x = 0;
        this.armatureDisplay.y = 0;
        this.actionFlag = 0;
        //启动骨骼动画播放
        this.armature.animation.gotoAndPlay(this.actionArray[this.actionFlag]);
		
        /* Egret 旧版本使用如下代码。Egret 2.5 以上版本不推荐使用。
			egret.Ticker.getInstance().register(function (advancedTime) {
				dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
			}, this);
		*/
		/*
        *  Egret 2.5 以上版本使用如下代码：
        * */
		egret.startTick(this.onTicker, this);

        this.myTimer = new egret.Timer(10);
        this.myTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    }
	
	private _time:number;

    private onTicker(timeStamp:number) {

        if(!this._time) {
            this._time = timeStamp;
        }

        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;

        dragonBones.WorldClock.clock.advanceTime(pass / 1000);

        return false;
    }
	
    /**用户区分用户Touch事件类型的数字标识**/
    private tapFlagNum;
    /**骨骼动画实例移动的步长值**/
    private entityFlagNumX = 0;
    /**Touch事件的结束落点X坐标**/
    private endPointX;
    /**Touch事件的结束落点Y坐标**/
    private endPointY;
    /**自定义计时，用户区分TOUCH_TAP事件和TOUCH_END事件**/
    private myTimer:egret.Timer;
    /**Touch事件是否发展为移动事件**/
    private moveFlag;

    private onTouch(evt:egret.TouchEvent):void {
        evt.stopPropagation();
        switch (evt.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.tapFlagNum = 0;
                this.moveFlag = false;
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                //Touch事件启动后开始计时，移动开关是关闭状态
                if (!this.myTimer.running) {
                    this.myTimer.start();
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                if (this.stage.hasEventListener(egret.TouchEvent.TOUCH_END)) {
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                }
                //打开移动开关
                this.moveFlag = true;

                this.endPointX = evt.stageX;
                this.endPointY = evt.stageY;

                this.moveFlag = true;
                //限制Touch落点的边界为160-640之间
                if (this.endPointX < 160) {
                    this.endPointX = 160;
                }
                if (this.endPointX > 640) {
                    this.endPointX = 640;
                }
                //根据Touch落点的位置和骨骼现有位置确定人物是否运动以及运动方向
                if ((this.container.x - this.endPointX) > 4) {
                    this.entityFlagNumX = -2;
                    this.container.scaleX = -1;
                }
                if ((this.container.x - this.endPointX) < -4) {
                    this.entityFlagNumX = 2;
                    this.container.scaleX = 1;
                }
                if (this.armature.animation.lastAnimationName != "left") {
                    this.armature.animation.gotoAndPlay("left");
                }
                //TOUCH_END事件结束后，开始启动移动计时
                if (!this.myTimer.running) {
                    this.myTimer.start();
                }
                break;
            case egret.TouchEvent.TOUCH_TAP:
                //事件为TOUCH_TAP事件，切换角色的动作
                this.myTimer.stop();
                this.moveFlag = false;
                this.tapFlagNum = 0;

                this.actionFlag++;
                if (this.actionFlag == this.actionArray.length) {
                    this.actionFlag = 0;
                };
                this.armature.animation.gotoAndPlay(this.actionArray[this.actionFlag]);
                break;
            default:
                break;
        }
    }

    private onTimer(evt:egret.TimerEvent):void {
        if (this.moveFlag) {
            //TOUCH_END事件后，移动开关打开，人物开始移动，到达指定位置后，关闭移动
            if (Math.abs(this.container.x - this.endPointX) < 4) {
                this.entityFlagNumX = 0;
            }
            this.container.x += this.entityFlagNumX;
            if (Math.abs(this.container.x - this.endPointX) < 4) {
                if (this.armature.animation.lastAnimationName != "stay") {
                    this.armature.animation.gotoAndPlay("stay");
                }
                this.myTimer.stop();
                this.moveFlag = false;
            };
        } else {
            //Touch事件启动后开始计时，移动开关关闭时，超过90毫秒，移除TOUCH_TAP事件，添加TOUCH_END事件
            this.tapFlagNum++;
            if (this.tapFlagNum > 9) {
                if (this.stage.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                };
                if (!this.stage.hasEventListener(egret.TouchEvent.TOUCH_END)) {
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                };
                this.myTimer.stop();
                this.tapFlagNum = 0;
            }
        }
    }
}


