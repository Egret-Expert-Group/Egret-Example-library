/**
 * @copyright www.egret.com
 * @author city
 * @desc 基本布局是默认的布局，在基本布局容器中，可以对布局元素进行绝对定位、居中
 *      定位、边距定位，以及百分比定位。
 *      本示例使用了居中定位和边距定位，可以根据实际需求灵活选择对应的定位方法。
 */

class Main extends eui.UILayer {
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
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
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
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private _txInfo:egret.TextField;
    private _grpLayout:eui.Group;
    
    protected startCreateScene(): void {
        
        /// 创建容器，在其中进行布局
        this._grpLayout = new eui.Group();
        this._grpLayout.horizontalCenter = 0;
        this._grpLayout.verticalCenter = 0;
        
        this.addChild( this._grpLayout );
        this._grpLayout.width = L.WBASE;
        this._grpLayout.height = L.HBASE;
        
        /// 绘制矩形用于显示 _grpLayout 的轮廓
        var iFillColor:number = ( Math.floor( Math.random() * 0xff ) << 16 )
            + ( Math.floor( Math.random() * 0xff ) << 8 )
            + Math.floor( Math.random() * 0xff ) ;
        var outline:egret.Shape = new egret.Shape;
        outline.graphics.lineStyle( 3, iFillColor );
        outline.graphics.beginFill(0x000000,0);
        outline.graphics.drawRect( 0,0,L.WBASE, L.HBASE ); /// 注意该轮廓为Shape，没有参与布局，所以其尺寸并不能影响容器的尺寸
        outline.graphics.endFill();
        this._grpLayout.addChild( outline );


        /*** 本示例关键代码段开始 ***/
        this._grpLayout.layout = new eui.BasicLayout();

        var btn:eui.Button = new eui.Button();
        btn.label = "居中的按钮";
        btn.horizontalCenter = 0;
        btn.verticalCenter = 0;
        this._grpLayout.addChild( btn );

        var btn:eui.Button = new eui.Button();
        btn.label = "左上固定的按钮";
        btn.top = 20;
        btn.left = 20;
        this._grpLayout.addChild( btn );

        var btn:eui.Button = new eui.Button();
        btn.label = "右下固定的按钮";
        btn.right = 20;
        btn.bottom = 20;
        this._grpLayout.addChild( btn );
        /*** 本示例关键代码段结束 ***/
        
        /// 创建事件，在轻触时随机改变容器及轮廓的尺寸
        this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            var w:number = L.WBASE + L.WRANGE * Math.random();
            var h:number = L.HBASE + L.HRANGE * Math.random();
            outline.graphics.clear();
            outline.graphics.lineStyle( 3, iFillColor );
            outline.graphics.beginFill(0x000000,0);
            outline.graphics.drawRect( 0,0,w, h ); 
            outline.graphics.endFill();
            this._grpLayout.width = w;
            this._grpLayout.height = h;
        }, this );

        /// 提示信息 （该部分不参与布局）
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
            "轻触舞台随机调整布局容器的尺寸";
    }
}

class L{
    public static WBASE:number = 400;
    public static HBASE:number = 300;
    public static WRANGE:number = 120;
    public static HRANGE:number = 300;
}