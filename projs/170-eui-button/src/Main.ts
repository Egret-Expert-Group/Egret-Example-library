/**
 * @copyright www.egret.com
 * @author 东北大客
 * @desc 按钮组件是EUI的基本组件之一。可以通过按钮的icon属性设置按钮的ic
 *      on显示。通过按钮的label属性可以设置按钮的显示文字。
 *      按钮的labelDisplay属性可以获得到文本标签对象，如果需要操作需
 *      要注意类型的转换。
 *      按钮的皮肤一般由包括背景图片，文字标签，和icon组成。其中icon的i
 *      d应为iconDisplay。按钮的默认行为中在触摸开始和结束时默认获得
 *      按钮的down和up事件。可以显示设置按钮的状态，或通过设置curren
 *      tState为null来取消显示设置。
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

    ///自定义按钮的 icon 显示对象
    private _icon:egret.DisplayObject;

    protected startCreateScene():void {
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

        ///绘制icon，并保存。
        var icon:egret.Shape = new egret.Shape();
        icon.graphics.beginFill(0xcc2211);
        icon.graphics.drawCircle(12,12,6);
        icon.graphics.endFill();
        this._icon = icon;

        var renderTexture:egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(icon);

        /*** 本示例关键代码段开始 ***/
        var btn1 = new eui.Button();
        ///设置按钮的标签
        btn1.label = "按钮";
        btn1.icon = renderTexture;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        group.addChild(btn1);

        var btn2 = new eui.Button();
        btn2.label = "按下状态";
        ///显式设置按钮组件的视图状态为 down。可通过设置 currentState 为 null 来取消显示设置，设置为 null 之后视图状态将由内部的 getCurrentState() 决定。
        btn2.currentState = "down";
        btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
        btn2.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this);
        group.addChild(btn2);

        var btn3 = new eui.Button();
        btn3.label = "禁用状态";
        ///显式设置按钮组件的视图状态为 disabled。
        btn3.currentState = "disabled";
        btn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
        btn3.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this);
        group.addChild(btn3);

        var btn4 = new eui.Button();
        btn4.label = "正常状态";
        btn4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        group.addChild(btn4);
        /*** 本示例关键代码段结束 ***/

        ///获得按钮的标签对象，并设置其值。需要注意类型转换。
        var label:eui.Label = <eui.Label>btn4.labelDisplay;
        label.size = 28;
        label.border = true;
        label.textColor = 0xcccccc;
        label.borderColor = 0xcccccc;
        label.text = "定义字体";
    }

    ///处理按钮的触摸事件回调
    private onTouch(event:egret.TouchEvent) {
        ///获得当前按钮
        var btn:eui.Button = <eui.Button>event.target;
        ///获得按钮icon，并绘转换为纹理
        var renderTexture:egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(this._icon);

        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                //设置按钮的 icon
                btn.icon = renderTexture;
                break;
            case egret.TouchEvent.TOUCH_END:
                //取消按钮的 icon
                btn.icon = null;
                break;
            default :
                break;
        }

    }
}
