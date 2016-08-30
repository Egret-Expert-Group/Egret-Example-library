/**
 * @copyright www.egret.com
 * @author 东北大客
 * @desc 使用滑块控件，用户可通过在滑块轨道的端点之间移动滑块来选择值。滑块的当前
 *      值由滑块端点（对应于滑块的最小值和最大值）之间滑块的相对位置确定。
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
    ///水平滑动选择器
    private _hSlider:eui.HSlider;
    ///垂直滑动选择器
    private _vSlider:eui.VSlider;
    ///显示信息
    private _info:eui.Label;
    ///显示水平滑动选择器的值
    private _hLabel:eui.Label;

    protected startCreateScene():void {
           /*** 本示例关键代码段开始 ***/         
           var hSlilder:eui.HSlider = new eui.HSlider();
           hSlilder.width = 280;
           hSlilder.maximum = 100;
           hSlilder.horizontalCenter = 0;
           hSlilder.verticalCenter = 0;
           ///监听 CHANGE 事件
           hSlilder.addEventListener(egret.Event.CHANGE,this.onHSliderChange,this);

           this._hSlider = hSlilder;
           this.addChild(this._hSlider);
           
           var vSlider:eui.VSlider = new eui.VSlider();
           vSlider.height = 200;
           vSlider.verticalCenter = 0;
           vSlider.horizontalCenter = 240;
		   ///通过 minimum 属性设置最小值。
           vSlider.minimum = 100;
		   ///通过 maximum 属性设置最大值。
           vSlider.maximum = 1000;
		   ///通过 snapInterval 属性设置增加的有效值。
           vSlider.snapInterval = 100;
           ///监听 CHANGE 事件
           vSlider.addEventListener(egret.Event.CHANGE,this.onVSLiderChange,this);
           this._vSlider = vSlider;
           this.addChild(this._vSlider);

           /*** 本示例关键代码段结束 ***/
		   
           var hLabel:eui.Label = new eui.Label();
           
           hLabel.textColor = 0x1122cc;
           hLabel.size = 18;
           hLabel.verticalCenter = 30; 
           hLabel.horizontalCenter = 0;
           hLabel.text = "Value:" + hSlilder.pendingValue;
           this._hLabel = hLabel;
           this.addChild(this._hLabel);
           
           var vLabel:eui.Label = new eui.Label();
           vLabel.textColor = 0x1122cc;
           vLabel.size = 18;
           vLabel.horizontalCenter = 240;
           vLabel.verticalCenter = -120;
           vLabel.text = "Max:1000"; 
           this.addChild(vLabel);
           
           var info:eui.Label = new eui.Label();
           info.size = 19;
           info.textColor = 0x000000;
           info.text = "滑动垂直滑块设置水平滑块的最大值。"
           info.verticalCenter = 100;
           info.horizontalCenter = 0;
           this._info = info
           this.addChild(this._info);
    }

    private onHSliderChange(e:egret.Event) {
        var slilder = <eui.HSlider>e.target;
        var hSlider = this._hSlider;
        var hLabel = this._hLabel;
        ///通过 pendingValue 属性获得滑块当前值。
        hLabel.text = "Value:" + hSlider.pendingValue;
    }

    private onVSLiderChange(e:egret.Event) {
        var slilder = <eui.HSlider>e.target;
        var hSlider = this._hSlider;
        var info = this._info;
        var scale = slilder.pendingValue / hSlider.maximum;
        hSlider.maximum = slilder.pendingValue;
        hSlider.value *= scale;
        info.text = "设置水平滑块的最大值为" + slilder.pendingValue;
    }
}
