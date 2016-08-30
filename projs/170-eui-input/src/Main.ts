/**
 * @copyright www.egret.com
 * @author 东北大客
 * @desc TextInput是一个文本输入控件，供用户输入和编辑统一格式文本。输入
 *      文本控件的皮肤一般由输入文本--EditableText,背景--Rec
 *      t,标签--Label组成。
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
    ///输入文本
    private _nameInput:eui.TextInput;
    ///输入密码文本
    private _passInput:eui.TextInput;
    ///显示文本
    private _label:eui.Label;

    protected startCreateScene():void {
        var background:eui.Rect = new eui.Rect(300,300,0xcccccc);
        background.verticalCenter = 0;
        background.horizontalCenter = 0;
        this.addChild(background);
        /*** 本示例关键代码段开始 ***/
        var nameInput:eui.TextInput = new eui.TextInput();
        nameInput.prompt = "输入文本:";
        nameInput.horizontalCenter = 0;
        nameInput.verticalCenter = -150;
        this._nameInput = nameInput;
        this.addChild( this._nameInput);

        var passInput:eui.TextInput = new eui.TextInput();
        passInput.prompt = "密码文本:";
        ///设置显示为密码文本
        passInput.displayAsPassword = true;
        passInput.horizontalCenter = 0;
        passInput.verticalCenter = -108;
        this._passInput = passInput;
        this.addChild(this._passInput);
        /*** 本示例关键代码段结束 ***/

        var label:eui.Label = new eui.Label();
        label.size = 20;
        label.text = "已输入:";
        label.width = 280;
        label.height = 160;
        label.verticalCenter = 0;
        label.horizontalCenter = 0;
        this._label = label
        this.addChild(this._label);

        nameInput.addEventListener(egret.Event.CHANGE,this.onChange,this);

        passInput.addEventListener(egret.Event.CHANGE,this.onChange,this);
    }
    ///显示输入的文本
    private onChange(e:egret.Event) {
        var label = this._label;
        var nameInput = this._nameInput;
        var passInput = this._passInput;

        label.text = "已输入:" + "\r\n" +
            "输入文本:" + nameInput.text + "\r\n" +
            "密码文本:" + passInput.text;
    }
}
