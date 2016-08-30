/**
 * @copyright www.egret.com
 * @author 东北大客
 * @desc RadioButton即单选框组件，使用户可在一组互相排斥的选择中做出一
 *      种选择。
 */

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
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
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private _info:eui.Label;

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {

        ///设置Group,用于给按钮布局，具体可参看布局示例。
        var group = new eui.Group();
        group.width = this.stage.stageWidth;
        group.height = this.stage.stageHeight;
        this.addChild(group);

        var layout = new eui.VerticalLayout();
        layout.gap = 30;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        group.layout = layout;

        var info:eui.Label = new eui.Label();
        info.text = "单选按钮";
        info.textColor = 0x030303;
        info.size = 24;
        this._info = info;
        group.addChild(this._info);

        ///单选按钮组
        var radioGroup:eui.RadioButtonGroup = new eui.RadioButtonGroup();

        /*** 本示例关键代码段开始 ***/
        var radio1:eui.RadioButton = new eui.RadioButton();
        radio1.label = "选项 A";
        ///设置单选按钮所属组件，同一组件内的只能选择一个单选按钮组
        radio1.group = radioGroup;
        radio1.value = "A";
        radio1.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(radio1);

        var radio2:eui.RadioButton = new eui.RadioButton();
        radio2.label = "选项 B";
        radio2.group = radioGroup;
        radio2.value = "B";
        radio2.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(radio2);

        var radio3:eui.RadioButton = new eui.RadioButton();
        radio3.label = "选项 C";
        radio3.group = radioGroup;
        radio3.value = "C";
        radio3.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(radio3);

        var radio4:eui.RadioButton = new eui.RadioButton();
        radio4.label = "选项 D";
        radio4.value = "D";
        ///通过设置 groupName 修改单选按钮所属组
        radio4.groupName = "Group2";
        radio4.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(radio4);

        var radio5:eui.RadioButton = new eui.RadioButton();
        radio5.label = "选项 E";
        radio5.value = "E";
        radio5.groupName = "Group2";
        radio5.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(radio5);
        /*** 本示例关键代码段结束 ***/
    }

    private onChange(e:egret.Event){
        var label:eui.Label = this._info;
        var radioButton = <eui.RadioButton>e.target;
        ///获取选择到的单选按钮的值
        label.text = "选择" + radioButton.value;
    }
}
