/**
 * @copyright www.egret.com
 * @author 东北大客
 * @desc CheckBox组件包含一个可选标签和一个小方框，该方框内可以包含/不包
 *      含复选标记。用户单击CheckBox组件或其关联文本时，CheckBox
 *      组件会将其selected属性设置为true（表示选中）或false（表
 *      示取消选中）。
 */

class Main extends eui.UILayer {
    private loadingView:LoadingUI;

    protected createChildren():void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation( "eui.IAssetAdapter", assetAdapter );
        this.stage.registerImplementation( "eui.IThemeAdapter", new ThemeAdapter() );
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild( this.loadingView );
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this );
        RES.loadConfig( "resource/default.res.json", "resource/" );
    }

    private onConfigComplete( event:RES.ResourceEvent ):void {
        RES.removeEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this );
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme( "resource/default.thm.json", this.stage );
        theme.addEventListener( eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this );

        RES.addEventListener( RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this );
        RES.addEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this );
        RES.addEventListener( RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this );
        RES.addEventListener( RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this );
        RES.loadGroup( "preload" );
    }

    private isThemeLoadEnd:boolean = false;

    private onThemeLoadComplete():void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }

    private isResourceLoadEnd:boolean = false;

    private onResourceLoadComplete( event:RES.ResourceEvent ):void {
        if ( event.groupName == "preload" ) {
            this.stage.removeChild( this.loadingView );
            RES.removeEventListener( RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this );
            RES.removeEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this );
            RES.removeEventListener( RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this );
            RES.removeEventListener( RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this );
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }

    private createScene() {
        if ( this.isThemeLoadEnd && this.isResourceLoadEnd ) {
            this.startCreateScene();
        }
    }

    private onItemLoadError( event:RES.ResourceEvent ):void {
        console.warn( "Url:" + event.resItem.url + " has failed to load" );
    }

    private onResourceLoadError( event:RES.ResourceEvent ):void {
        //TODO
        console.warn( "Group:" + event.groupName + " has failed to load" );
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete( event );
    }

    private onResourceProgress( event:RES.ResourceEvent ):void {
        if ( event.groupName == "preload" ) {
            this.loadingView.setProgress( event.itemsLoaded, event.itemsTotal );
        }
    }

    ///显示文字
    private _label:eui.Label;

    protected startCreateScene():void {
        ///设置Group,用于给按钮布局，具体可参看布局示例。
        var group = new eui.Group();
        group.width = 150;
        group.height = this.stage.stageHeight;
        this.addChild(group);

        var layout = new eui.VerticalLayout();
        layout.gap = 45;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        layout.horizontalAlign = egret.HorizontalAlign.LEFT;
        group.layout = layout;

        group.horizontalCenter = 0;

        ///显示的label
        var label = new eui.Label();
        label.text = "当前选中条目：4 5 6";
        label.textColor = 0x000000;
        label.size = 20;
        this._label = label;
        group.addChild(this._label);

        /*** 本示例关键代码段开始 ***/
        var checkBox1:eui.CheckBox = new eui.CheckBox();
        ///设置按钮的标签
        checkBox1.label = "1.正常状态";
        checkBox1.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(checkBox1);

        var checkBox2:eui.CheckBox = new eui.CheckBox();
        checkBox2.label = "2.按下状态";
        ///显式设置按钮组件的视图状态为 down。
        checkBox2.currentState = "down";
        checkBox2.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(checkBox2);

        var checkBox3:eui.CheckBox = new eui.CheckBox();
        checkBox3.label = "3.禁用状态";
        ///显式设置按钮组件的视图状态为 disabled
        checkBox3.currentState = "disabled";
        checkBox3.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(checkBox3);

        var checkBox4:eui.CheckBox = new eui.CheckBox();
        checkBox4.label = "4.抬起并选中状态";
        ///显式设置按钮组件的视图状态为 upAndSelected
        checkBox4.currentState = "upAndSelected";
        checkBox4.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(checkBox4);

        var checkBox5:eui.CheckBox = new eui.CheckBox();
        checkBox5.label = "5.按下并选中状态";
        ///显式设置按钮组件的视图状态为 downAndSelected
        checkBox5.currentState = "downAndSelected";
        checkBox5.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(checkBox5);

        var checkBox6:eui.CheckBox = new eui.CheckBox();
        checkBox6.label = "6.禁用并选中状态";
        ///显式设置按钮组件的视图状态为 downAndSelected
        checkBox6.currentState = "disabledAndSelected";
        checkBox6.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(checkBox6);
        /*** 本示例关键代码段结束 ***/
    }

    ///处理复选框的change事件回调
    private onChange(event:egret.TouchEvent) {
        ///获得当前复选框
        var checkBox:eui.CheckBox = <eui.CheckBox>event.target;

        var label = this._label;

        if (checkBox.currentState === "disabled" || checkBox.currentState === "disabledAndSelected" ) {
            label.text = "禁用状态，无法选择";
        } else {
            ///获得当前复选框的标签并显示出来
            label.text = "状态改变：" + checkBox.label;
            ///取消显示设置复选框的状态，由内部的 getCurrentState() 决定。
            checkBox.currentState = null;
        }

    }
}
