/**
 * @copyright www.egret.com
 * @author city
 * @desc 网格布局包含水平和垂直两个方向，设定比较复杂。
 *      本示例展示网格布局的主要设定：行/列的对齐方式。
 *      此种布局可配置参数较多，可逐个测试来理解各自含义。
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

    private _txInfo:egret.TextField;
    private _grpLayout:eui.Group;

    private _iAlignMode:number;

    protected startCreateScene():void {

        /// 创建容器，在其中进行布局
        this._grpLayout = new eui.Group();
        this._grpLayout.bottom = 100;
        this._grpLayout.horizontalCenter = 0;

        this.addChild( this._grpLayout );
        this._grpLayout.width = L.WBASE_OUTLINE;
        this._grpLayout.height = L.HBASE_OUTLINE;

        /// 绘制矩形用于显示 _grpLayout 的轮廓
        var iFillColor:number = ( Math.floor( Math.random() * 0xff ) << 16 )
            + ( Math.floor( Math.random() * 0xff ) << 8 )
            + Math.floor( Math.random() * 0xff );
        var outline:egret.Shape = new egret.Shape;
        outline.graphics.clear();
        outline.graphics.lineStyle( 3, iFillColor );
        outline.graphics.beginFill( 0x000000, 0 );
        outline.graphics.drawRect( 0, 0, L.WBASE_OUTLINE, L.HBASE_OUTLINE ); /// 注意该轮廓为Shape，没有参与布局，所以其尺寸并不能影响容器的尺寸
        outline.graphics.endFill();
        this._grpLayout.addChild( outline );

        /*** 本示例关键代码段开始 ***/

        for ( var i:number = 1; i <= 18; ++i ) {
            var btn:eui.Button = new eui.Button();
            btn.label = "按钮" + ( i < 10 ? "0" : "" ) + i;
            this._grpLayout.addChild( btn );
        }

        var tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.paddingTop = 30;
        tLayout.paddingLeft = 30;
        tLayout.paddingRight = 30;
        tLayout.paddingBottom = 30;
        this._grpLayout.layout = tLayout;

        this._iAlignMode = AlignMode.GAP;
        tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_GAP;
        tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_GAP;

        /// 创建事件，在轻触时随机改变间隙
        this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, ( evt:egret.TouchEvent )=> {
            this.prudRdmElemSize( tLayout );
        }, this );

        /*** 本示例关键代码段结束 ***/

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

        this._txInfo.touchEnabled = true;
        this._txInfo.addEventListener( egret.TouchEvent.TOUCH_TAP, ( evt:egret.TouchEvent )=> {
            console.log( "text!!!!" );
            evt.stopImmediatePropagation();
            this._iAlignMode = ( this._iAlignMode + 1 ) % 2;        /// 在序列元素间切换模式 
            switch ( this._iAlignMode ) {
                case AlignMode.GAP:
                    tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_GAP;
                    tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_GAP;
                    break;
                case AlignMode.WH:
                    tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
                    tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
                    break;
            }
            this.updateInfo( tLayout );
        }, this );

        this.prudRdmElemSize( tLayout  );
    }
    
    /// 生成随机的元素宽高
    private prudRdmElemSize( tLayout:eui.TileLayout ){
        tLayout.horizontalGap = L.WBASE_GAP + L.WRANGE_GAP * Math.random();
        tLayout.verticalGap = L.HBASE_GAP + L.HRANGE_GAP * Math.random();
        this.updateInfo( tLayout );
    }

    private updateInfo( tLayout:eui.TileLayout ) {
        this._txInfo.text =
            "轻触UI区域随机调整水平与垂直间隙" +
            "\n轻触本文字区调整行列对齐方式" +
            "\n当前行列布局对齐：" + ( this._iAlignMode == 0 
                ? "调整间隙"
                    +  "\n调整间隙将会不会改变布局元素尺寸"
                : "调整元素宽高"
                    +  "\n调整后水平/垂直间隙：" + (tLayout.horizontalGap << 0) + "/" + (tLayout.verticalGap << 0) 
            );
    }
}

class L {
    public static WBASE_OUTLINE:number = 580;
    public static HBASE_OUTLINE:number = 650;

    public static WBASE_GAP:number = 10;
    public static WRANGE_GAP:number = 100;

    public static HBASE_GAP:number = 10;
    public static HRANGE_GAP:number = 30;
}

class AlignMode {
    public static GAP:number = 0;
    public static WH:number = 1;
}